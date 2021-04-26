import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { HomeScreen } from "./screens/HomeScreen";
import { JoinScreen } from "./screens/JoinScreen";
import { RoomScreen } from "./screens/RoomScreen";
import { theme } from "./core/theme";
import { HostScreen } from "./screens/HostScreen";

const Stack = createStackNavigator<RootStackParamList>();

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
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Host" component={HostScreen} />
          <Stack.Screen name="Join" component={JoinScreen} />
          <Stack.Screen name="Room" component={RoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
