import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Join: undefined;
  Host: undefined;
  Room: {
    id: string;
    name: string;
  };
};

// Home
export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

// Host
export type HostScreenRouteProp = RouteProp<RootStackParamList, "Host">;
export type HostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Host"
>;

// Join
export type JoinScreenRouteProp = RouteProp<RootStackParamList, "Join">;
export type JoinScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Join"
>;

// Room
export type RoomScreenRouteProp = RouteProp<RootStackParamList, "Room">;
export type RoomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Room"
>;
