import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./screens/LoginScreen";
import { RootStackParamList } from "./types";
import { RoomScreen } from "./screens/RoomScreen";
import { theme } from "./core/theme";

const Stack = createStackNavigator<RootStackParamList>();

const config = {
  screens: {
    Room: "rooms/:id",
    Login: "login",
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
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Room" component={RoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
