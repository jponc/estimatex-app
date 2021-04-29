import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Title, Chip, Avatar } from "react-native-paper";
import AnswerOptions from "../components/AnswerOptions";
import Background from "../components/Background";
import Button from "../components/Button";
import {
  RoomScreenNavigationProp,
  RoomScreenRouteProp,
  PusherParticipantJoinedData,
  PusherParticipantVotedData,
  Participant,
} from "../types";
import { RoomContext } from "../contexts/RoomContext";
import { ParticipantsContext } from "../contexts/ParticipantsContext";
import { getPusher } from "../core/pusher";
import Pusher from "pusher-js";
import { NotificationsContext } from "../contexts/NotificationsContext";

type Props = {
  route: RoomScreenRouteProp;
  navigation: RoomScreenNavigationProp;
};

export const RoomScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId, name } = useContext(RoomContext);
  const { showMessage } = useContext(NotificationsContext);
  const {
    participants,
    addParticipant,
    setParticipantVote,
    fetchParticipants,
    adminResetVotes,
    adminRevealVotes,
    castVote,
    resetVotes,
  } = useContext(ParticipantsContext);

  const [isVotesVisible, setIsVotesVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const [currentParticipant, setCurrentParticipant] = useState<
    Participant | undefined
  >(undefined);

  const handleOnSelect = (val: string) => {
    if (selectedValue === undefined) {
      setSelectedValue(val);
      castVote(val);
    }
  };

  const handleOnReveal = async () => {
    if (isVotesVisible) {
      try {
        resetVotes();
        setIsVotesVisible(false);
        setSelectedValue(undefined);

        await adminResetVotes();
      } catch {
        showMessage("Failed to reset votes");
      }
    } else {
      try {
        setIsVotesVisible(true);

        await adminRevealVotes();
      } catch {
        showMessage("Failed to reveal votes");
      }
    }
  };

  useEffect(() => {
    addParticipant(name, true);
  }, []);

  useEffect(() => {
    const pusherParticipantJoined = (data: PusherParticipantJoinedData) => {
      console.log(`adding, current length: ${participants.length}`);
      addParticipant(data.participant_name, false);
    };

    const pusherParticipantVoted = (data: PusherParticipantVotedData) => {
      console.log(data);
      setParticipantVote(data.participant_name, data.vote);
    };

    const pusherRevealVotes = () => {
      setIsVotesVisible(true);
    };

    const pusherResetVotes = () => {
      resetVotes();
      setIsVotesVisible(false);
      setSelectedValue(undefined);
    };

    const pusher: Pusher = getPusher();
    const channel = pusher.subscribe(`room-${roomId}`);

    channel.bind("participant-joined", pusherParticipantJoined);
    channel.bind("participant-voted", pusherParticipantVoted);
    channel.bind("reset-votes", pusherResetVotes);
    channel.bind("reveal-votes", pusherRevealVotes);

    return function cleanup() {
      channel.unbind();
      pusher.disconnect();
    };
  });

  useEffect(() => {
    (async () => {
      try {
        await fetchParticipants();
      } catch {
        showMessage("Failed to fetch room participants");
      }
    })();
  }, []);

  useEffect(() => {
    const p = participants.find((p) => p.name === name);
    if (p) {
      setCurrentParticipant(p);
    }
  }, [participants]);

  return (
    <View style={styles.background}>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content title={roomId} subtitle={`Logged as: ${name}`} />
      </Appbar>
      <Background>
        <View style={styles.participantsContainer}>
          {participants.map((participant) => {
            const avatar = isVotesVisible ? (
              <Avatar.Text size={24} label={participant.vote || "0"} />
            ) : null;

            return (
              <Chip
                key={participant.name}
                mode="outlined"
                style={styles.participantChip}
                avatar={avatar}
                selected={!!participant.vote && !isVotesVisible}
              >
                {participant.name}
              </Chip>
            );
          })}
        </View>
        {currentParticipant && currentParticipant.isAdmin && (
          <View>
            <Button mode="contained" onPress={handleOnReveal}>
              {isVotesVisible ? "Reset" : "Reveal"}
            </Button>
          </View>
        )}
        <AnswerOptions
          selectedValue={selectedValue}
          values={["1", "2", "3", "5", "8"]}
          onSelect={handleOnSelect}
        />
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 40,
  },
  titleContainer: {
    marginBottom: 80,
  },
  participantsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 30,
    justifyContent: "center",
  },
  participantChip: {
    marginRight: 10,
    marginBottom: 10,
  },

  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
});
