import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { App } from "./App";

import { RoomContainer } from "./contexts/RoomContext";
import { NotificationsContainer } from "./contexts/NotificationsContext";
import { ParticipantsContainer } from "./contexts/ParticipantsContext";

import { theme } from "./core/theme";

const config = {
  screens: {
    Home: "",
    Host: "host",
    Join: "join",
    Room: "rooms/:id",
  },
};

const linking: LinkingOptions = {
  prefixes: ["https://mychat.com", "mychat://"],
  config,
};

export const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer linking={linking}>
        <NotificationsContainer>
          <RoomContainer>
            <ParticipantsContainer>
              <App />
            </ParticipantsContainer>
          </RoomContainer>
        </NotificationsContainer>
      </NavigationContainer>
    </PaperProvider>
  );
};
