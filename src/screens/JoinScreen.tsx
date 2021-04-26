import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { JoinScreenNavigationProp } from "../types";
import Background from "../components/Background";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";

type Props = {
  navigation: JoinScreenNavigationProp;
};

export const JoinScreen: React.FC<Props> = ({ navigation }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onPress = () => {
    navigation.push("Room", {
      id: roomId,
      name: name,
    });
  };

  return (
    <View style={styles.background}>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content title={`Join a room`} />
      </Appbar>
      <Background>
        <TextInput
          label="Room ID"
          value={roomId}
          onChangeText={(text) => setRoomId(text)}
        />
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Button mode="contained" onPress={onPress}>
          Get In!
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
