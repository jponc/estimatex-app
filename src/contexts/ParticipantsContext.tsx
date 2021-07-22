import React, { useState, useContext } from "react";
import { RoomContext } from "./RoomContext";
import { Participant, VotesMap } from "../types";
import { callFindParticipants, callCastVote, callResetVotes, callRevealVotes } from "../api/room";
import { useInterval } from "../hooks/useInterval";

const REFRESH_PARTICIPANTS_INTERVAL_MILLISECONDS = 10000;

type ParticipantsContextType = {
  participants: Participant[];
  fetchParticipants: () => Promise<void>
  adminRevealVotes: () => Promise<void>
  adminResetVotes: () => Promise<void>
  castVote: (vote: string) => Promise<void>
};

export const ParticipantsContext = React.createContext<
  ParticipantsContextType
>({
  participants: [],
  fetchParticipants: () => Promise.resolve(),
  adminRevealVotes: () => Promise.resolve(),
  adminResetVotes: () => Promise.resolve(),
  castVote: () => Promise.resolve(),
});

export const ParticipantsContainer: React.FC = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const { accessToken } = useContext(RoomContext)

  useInterval(() => {
    fetchParticipants();
  }, REFRESH_PARTICIPANTS_INTERVAL_MILLISECONDS);


  const fetchParticipants = async (): Promise<void> => {
    const fetchedParticipants = await callFindParticipants(accessToken);
    const newParticipants: Participant[] = fetchedParticipants.map((p) => {
      return {
        name: p.name,
        isAdmin: p.is_admin,
        latestVote: p.latest_vote,
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


  const contextValue = {
    participants,
    fetchParticipants,
    adminResetVotes,
    adminRevealVotes,
    castVote,
  }

  return (
    <ParticipantsContext.Provider value={contextValue}>
      {children}
    </ParticipantsContext.Provider>
  );
}
