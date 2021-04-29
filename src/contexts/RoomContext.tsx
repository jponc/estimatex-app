import React, { useState } from 'react';
import { callHostRoom } from "../api/room";

type RoomContextType = {
  roomId?: string;
  hostRoom: (name: string) => Promise<string>;
};

export const RoomContext = React.createContext<RoomContextType>({
  roomId: undefined,
  hostRoom: () => Promise.resolve("")
});

export const RoomContainer: React.FC = ({ children }) => {
  const [roomId, setRoomId] = useState<undefined | string>(undefined)
  const [accessToken, setAccessToken] = useState<string>("");

  const hostRoom = async (name: string): Promise<string> => {
    const res = await callHostRoom(name)
    setAccessToken(res.access_token);
    setRoomId(res.room_id);

    return res.room_id
  }

  const contextValue = {
    roomId,
    hostRoom,
  }

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  )
}
