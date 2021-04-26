import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Room: {
    id: string;
    name: string;
  };
};

// Login
export type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

// Room
export type RoomScreenRouteProp = RouteProp<RootStackParamList, "Room">;
export type RoomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Room"
>;
