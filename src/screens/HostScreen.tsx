import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { HostScreenNavigationProp } from "../types";
import Background from "../components/Background";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";

type Props = {
  navigation: HostScreenNavigationProp;
};

export const HostScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>("");

  const onPress = () => {
    // navigation.push("Room", {
    //   id: roomId,
    //   name: name,
    // });
  };

  return (
    <View style={styles.background}>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content title={`Host a room`} />
      </Appbar>
      <Background>
        <TextInput
          label="Your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Button mode="contained" onPress={onPress}>
          Host a Room
        </Button>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
});