import React, { useState, useEffect } from "react";
import { callHostRoom, callJoinRoom } from "../api/room";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RoomContextType = {
  roomId: string;
  name: string;
  accessToken: string;
  hostRoom: (name: string) => Promise<string>;
  joinRoom: (roomId: string, name: string) => Promise<string>
  isLoaded: boolean;
};

export const RoomContext = React.createContext<RoomContextType>({
  roomId: "",
  name: "",
  accessToken: "",
  hostRoom: () => Promise.resolve(""),
  joinRoom: () => Promise.resolve(""),
  isLoaded: false,
});

export const RoomContainer: React.FC = ({ children }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");
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
        await AsyncStorage.setItem("accessToken", accessToken);
      }
    })();
  }, [accessToken]);

  useEffect(() => {
    (async () => {
      if (name !== "") {
        await AsyncStorage.setItem("name", name);
      }
    })();
  }, [name]);

  useEffect(() => {
    (async () => {
      const savedRoomId = await AsyncStorage.getItem("roomId");
      const savedAccessToken = await AsyncStorage.getItem("accessToken");
      const savedName = await AsyncStorage.getItem("name");

      if (savedRoomId !== null) {
        setRoomId(savedRoomId);
      }

      if (savedAccessToken !== null) {
        setAccessToken(savedAccessToken);
      }

      if (savedName !== null) {
        setName(savedName);
      }

      setIsLoaded(true);
    })();
  }, []);

  const hostRoom = async (name: string): Promise<string> => {
    const res = await callHostRoom(name);
    setAccessToken(res.access_token);
    setRoomId(res.room_id);
    setName(name);

    return res.room_id;
  };

  const joinRoom = async (roomId: string, name: string): Promise<string> => {
    const res = await callJoinRoom(roomId, name);
    setAccessToken(res.access_token);
    setRoomId(roomId);
    setName(name);

    return roomId;
  };

  const contextValue = {
    roomId,
    name,
    accessToken,
    hostRoom,
    joinRoom,
    isLoaded,
  };

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  );
};
