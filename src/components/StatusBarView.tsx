import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

type Props = {};

export const StatusBarView: React.FC<Props> = ({ children }) => {
  return <View style={styles.background}>{children}</View>;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    marginTop: Constants.statusBarHeight,
  },
});
