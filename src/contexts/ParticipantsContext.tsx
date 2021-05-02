import React, { useState, useContext } from "react";
import { RoomContext } from "./RoomContext";
import { Participant } from "../types";
import { callFindParticipants, callCastVote, callResetVotes, callRevealVotes } from "../api/room";

type ParticipantsContextType = {
  participants: Participant[];
  setParticipantVote: (participantName: string, vote: string) => void;
  addParticipant: (participantName: string, isAdmin: boolean) => void;
  fetchParticipants: () => Promise<void>
  adminRevealVotes: () => Promise<void>
  adminResetVotes: () => Promise<void>
  castVote: (vote: string) => Promise<void>
  resetVotes: () => void
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
  resetVotes: () => {}
});

export const ParticipantsContainer: React.FC = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const { accessToken } = useContext(RoomContext)


  const addParticipant = (participantName: string, isAdmin: boolean) => {
    if (participantName === "") {
      return;
    }

    const newParticipant: Participant = {
      name: participantName,
      vote: undefined,
      isAdmin,
    }

    setParticipants([...participants, newParticipant])
  }

  const setParticipantVote = (participantName: string, vote: string) => {
    const newParticipants = participants.map((p) => {
      if (p.name !== participantName) {
        return p;
      }

      return {
        ...p,
        vote: vote,
      }
    });

    setParticipants(newParticipants);
  }

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
    const newParticipants: Participant[] = participants.map(p => ({...p, vote: undefined}))
    setParticipants(newParticipants);
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
  }

  return (
    <ParticipantsContext.Provider value={contextValue}>
      {children}
    </ParticipantsContext.Provider>
  );
}
