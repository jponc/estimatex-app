import { HostRoomResponse } from "./types";

// TODO: Change
const baseUrl = "https://api-staging.estimatex.io";

export const callHostRoom = async (name: string): Promise<HostRoomResponse> => {
  const res = await fetch(`${baseUrl}/HostRoom`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name
    }),
  });

  if (!res.ok) {
    throw new Error("failed to host a room")
  }

  return res.json()
}
