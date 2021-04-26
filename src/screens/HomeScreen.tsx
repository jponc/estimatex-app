import React from "react";
import { Headline } from "react-native-paper";
import { HomeScreenNavigationProp } from "../types";
import Background from "../components/Background";
import Button from "../components/Button";
import { View, StyleSheet } from "react-native";

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const onPressJoin = () => {
    navigation.push("Join");
  };

  const onPressHost = () => {
    navigation.push("Host");
  };

  return (
    <Background>
      <View style={styles.titleContainer}>
        <Headline style={styles.title}>Welcome to EstimateX</Headline>
      </View>
      <Button mode="contained" onPress={onPressHost}>
        Host
      </Button>
      <Button mode="contained" onPress={onPressJoin}>
        Join
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
  },
  titleContainer: {
    marginBottom: 80,
  },
});
