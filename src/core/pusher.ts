import Pusher from "pusher-js";
import PusherRN from "pusher-js/react-native";
import Constants from 'expo-constants';

const appKey = Constants.manifest.extra!.pusherKey;
const cluster = "ap4";

export const getPusher = (): Pusher => {
  let pusher: Pusher;

  pusher = new PusherRN(appKey, {
    cluster: cluster,
  });

  return pusher;
};
