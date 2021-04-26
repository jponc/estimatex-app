import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Title } from "react-native-paper";
import AnswerOptions from "../components/AnswerOptions";
import Background from "../components/Background";
import { RoomScreenNavigationProp, RoomScreenRouteProp } from "../types";

type Props = {
  route: RoomScreenRouteProp;
  navigation: RoomScreenNavigationProp;
};

export const RoomScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, name } = route.params;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const onSelect = (val: string) => {
    if (val === selectedValue) {
      setSelectedValue(undefined);
    } else {
      setSelectedValue(val);
    }
  }

  return (
    <View style={styles.background}>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Login")} />
        <Appbar.Content title={`Room: ${id}`} subtitle={`Logged as: ${name}`} />
      </Appbar>
      <Background>
        <View style={styles.titleContainer}>
          <Title style={styles.title}>IOTS-111</Title>
        </View>
        <AnswerOptions
          selectedValue={selectedValue}
          values={["1", "2", "3", "5", "8"]}
          onSelect={onSelect}
        />
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 40,
  },
  titleContainer: {
    marginBottom: 80,
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
});
