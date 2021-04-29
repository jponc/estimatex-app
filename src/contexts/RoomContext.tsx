import React, { useState, useEffect } from "react";
import { callHostRoom } from "../api/room";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RoomContextType = {
  roomId: string;
  hostRoom: (name: string) => Promise<string>;
  isLoaded: boolean;
};

export const RoomContext = React.createContext<RoomContextType>({
  roomId: "",
  hostRoom: () => Promise.resolve(""),
  isLoaded: false,
});

export const RoomContainer: React.FC = ({ children }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (roomId !== "") {
        await AsyncStorage.setItem("roomId", roomId);
      }
    })();
  }, [roomId]);

  useEffect(() => {
    (async () => {
      if (accessToken !== "") {
        await AsyncStorage.setItem("accessToken", roomId);
      }
    })();
  }, [accessToken]);

  useEffect(() => {
    (async () => {
      const savedRoomId = await AsyncStorage.getItem("roomId");
      const savedAccessToken = await AsyncStorage.getItem("accessToken");

      if (savedRoomId !== null) {
        setRoomId(savedRoomId);
      }

      if (savedAccessToken !== null) {
        setAccessToken(savedAccessToken);
      }

      setIsLoaded(true);
    })();
  }, []);

  const hostRoom = async (name: string): Promise<string> => {
    const res = await callHostRoom(name);
    setAccessToken(res.access_token);
    setRoomId(res.room_id);

    return res.room_id;
  };

  const contextValue = {
    roomId,
    hostRoom,
    isLoaded,
  };

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  );
};
