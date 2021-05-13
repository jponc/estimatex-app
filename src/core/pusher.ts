import Pusher from "pusher-js";
import PusherRN from "pusher-js/react-native";

const appKey = "d6c13fcdb63d08397795";
const cluster = "ap4";

export const getPusher = (): Pusher => {
  let pusher: Pusher;

  pusher = new PusherRN(appKey, {
    cluster: cluster,
  });

  return pusher;
};
