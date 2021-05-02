import React, { useContext } from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { JoinScreen } from "./screens/JoinScreen";
import { RoomScreen } from "./screens/RoomScreen";
import { HostScreen } from "./screens/HostScreen";

import Background from "./components/Background";

import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

import { RoomContext } from "./contexts/RoomContext";

import { ActivityIndicator } from "react-native-paper";
import { theme } from "./core/theme";

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  const { isLoaded } = useContext(RoomContext);

  if (!isLoaded) {
    return (
      <Background>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </Background>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      headerMode="none"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Host" component={HostScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="Room" component={RoomScreen} />
    </Stack.Navigator>
  );
};
