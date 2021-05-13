import React, { useState, useContext } from "react";
import { RoomContext } from "./RoomContext";
import { Participant, VotesMap, Username } from "../types";
import { callFindParticipants, callCastVote, callResetVotes, callRevealVotes } from "../api/room";
import { useInterval } from "../hooks/useInterval";

const VOTES_QUEUE_PROCESS_INTERVAL_MILLISECONDS = 2000;
const PARTICIPANTS_QUEUE_PROCESS_INTERVAL_MILLISECONDS = 2000;

type ParticipantsContextType = {
  participants: Participant[];
  setParticipantVote: (participantName: string, vote: string) => void;
  addParticipant: (participantName: string, isAdmin: boolean) => void;
  fetchParticipants: () => Promise<void>
  adminRevealVotes: () => Promise<void>
  adminResetVotes: () => Promise<void>
  castVote: (vote: string) => Promise<void>
  resetVotes: () => void
  votes: VotesMap
};

export const ParticipantsContext = React.createContext<
  ParticipantsContextType
>({
  participants: [],
  setParticipantVote: () => {},
  addParticipant: () => {},
  fetchParticipants: () => Promise.resolve(),
  adminRevealVotes: () => Promise.resolve(),
  adminResetVotes: () => Promise.resolve(),
  castVote: () => Promise.resolve(),
  resetVotes: () => {},
  votes: {},
});

export const ParticipantsContainer: React.FC = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [votes, setVotes] = useState<VotesMap>({});


  const { accessToken } = useContext(RoomContext)

  let votesQueue: VotesMap = {};
  let participantsQueue: Record<Username, Participant> = {};

  const addParticipant = (participantName: string, isAdmin: boolean) => {
    if (participantName === "") {
      return;
    }

    const newParticipant: Participant = {
      name: participantName,
      isAdmin,
    }

    participantsQueue[participantName] = newParticipant;
  }

  const setParticipantVote = (participantName: string, vote: string) => {
    votesQueue[participantName] = vote;
  }


  useInterval(() => {
    if (Object.keys(participantsQueue).length === 0) {
      return;
    }

    const newParticipants: Participant[] = Object.values(participantsQueue);
    participantsQueue = {};

    setParticipants([...participants, ...newParticipants]);
  }, PARTICIPANTS_QUEUE_PROCESS_INTERVAL_MILLISECONDS);

  useInterval(() => {
    if (Object.keys(votesQueue).length === 0) {
      return;
    }

    const newVotes: VotesMap = Object.assign({}, votes, votesQueue);
    votesQueue = {};

    setVotes(newVotes);
  }, VOTES_QUEUE_PROCESS_INTERVAL_MILLISECONDS);


  const fetchParticipants = async (): Promise<void> => {
    const fetchedParticipants = await callFindParticipants(accessToken);
    const newParticipants: Participant[] = fetchedParticipants.map((p) => {
      return {
        name: p.name,
        isAdmin: p.is_admin,
      }
    });

    setParticipants(newParticipants);
  }

  const adminRevealVotes = async (): Promise<void> => {
    await callRevealVotes(accessToken)
  };

  const adminResetVotes = async (): Promise<void> => {
    await callResetVotes(accessToken)
  };

  const castVote = async (vote: string): Promise<void> => {
    await callCastVote(accessToken, vote)
  };

  const resetVotes = () => {
    setVotes({});
  };


  const contextValue = {
    participants,
    addParticipant,
    setParticipantVote,
    fetchParticipants,
    adminResetVotes,
    adminRevealVotes,
    castVote,
    resetVotes,
    votes,
  }

  return (
    <ParticipantsContext.Provider value={contextValue}>
      {children}
    </ParticipantsContext.Provider>
  );
}
