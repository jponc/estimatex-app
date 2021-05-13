import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Chip, Avatar } from "react-native-paper";
import AnswerOptions from "../components/AnswerOptions";
import Background from "../components/Background";
import Button from "../components/Button";
import { StatusBarView } from "../components/StatusBarView";
import { VoteResults } from "../components/VoteResults";
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
import { useInterval } from "../hooks/useInterval";

const PARTICIPANTS_REFRESH_INTERVAL_MILLISECONDS = 30000;

type Props = {
  route: RoomScreenRouteProp;
  navigation: RoomScreenNavigationProp;
};

export const RoomScreen: React.FC<Props> = ({ navigation }) => {
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
    votes,
  } = useContext(ParticipantsContext);

  const [isVotesVisible, setIsVotesVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const [currentParticipant, setCurrentParticipant] = useState<
    Participant | undefined
  >(undefined);

  const handleOnVoteSelect = (val: string) => {
    if (!isVotesVisible) {
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

  const refreshParticipants = async () => {
    try {
      await fetchParticipants();
    } catch {
      showMessage("Failed to fetch room participants");
    }
  };

  useInterval(refreshParticipants, PARTICIPANTS_REFRESH_INTERVAL_MILLISECONDS);

  useEffect(() => {
    const pusherParticipantJoined = (data: PusherParticipantJoinedData) => {
      if (data.participant_name !== name) {
        addParticipant(data.participant_name, false);
      }
    };

    const pusherParticipantVoted = (data: PusherParticipantVotedData) => {
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
    refreshParticipants();
  }, []);

  useEffect(() => {
    const p = participants.find((p) => p.name === name);
    if (p) {
      setCurrentParticipant(p);
    }
  }, [participants]);

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content
          title={`Room ID: ${roomId}`}
          subtitle={`Logged as: ${name}`}
        />
      </Appbar>
      <Background>
        <View style={isVotesVisible ? styles.resultsContainer : styles.resultsContainerHidden}>
          <VoteResults votes={votes} />
        </View>
        <View style={styles.participantsContainer}>
          {participants.map((participant) => {
            const avatar = isVotesVisible ? (
              <Avatar.Text size={24} label={votes[participant.name] || "0"} />
            ) : null;

            return (
              <Chip
                key={participant.name}
                mode="outlined"
                style={styles.participantChip}
                avatar={avatar}
                selected={!!votes[participant.name] && !isVotesVisible}
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
          onSelect={handleOnVoteSelect}
        />
      </Background>
    </StatusBarView>
  );
};

const styles = StyleSheet.create({
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
  resultsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    marginBottom: 30,
    backgroundColor: "white",
  },
  resultsContainerHidden: {
    display: "none",
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
