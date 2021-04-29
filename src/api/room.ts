import { HostRoomResponse, FindParticipantsResponse } from "./types";

// const baseUrl = process.env.API_BASE_URL;
const baseUrl = "https://api-staging.estimatex.io"

export const callHostRoom = async (name: string): Promise<HostRoomResponse> => {
  const res = await fetch(`${baseUrl}/HostRoom`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });

  if (!res.ok) {
    throw new Error("failed to host a room");
  }

  return res.json();
};

export const callJoinRoom = async (roomId: string, name: string): Promise<HostRoomResponse> => {
  const res = await fetch(`${baseUrl}/JoinRoom`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      "room_id": roomId,
      name: name,
    }),
  });

  if (!res.ok) {
    throw new Error("failed to join a room");
  }

  return res.json();
};

export const callFindParticipants = async (
  accessToken: string
): Promise<FindParticipantsResponse> => {
  const res = await fetch(`${baseUrl}/FindParticipants`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("failed to find participants");
  }

  return res.json();
};

export const callRevealVotes = async (
  accessToken: string
): Promise<void> => {
  const res = await fetch(`${baseUrl}/RevealVotes`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("failed to reveal votes");
  }
};

export const callResetVotes = async (
  accessToken: string
): Promise<void> => {
  const res = await fetch(`${baseUrl}/ResetVotes`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("failed to reset votes");
  }
};

export const callCastVote = async (
  accessToken: string,
  vote: string,
): Promise<void> => {
  const res = await fetch(`${baseUrl}/CastVote`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      vote,
    }),
  });

  if (!res.ok) {
    throw new Error("failed to cast a vote");
  }
};
