import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { LoginScreenNavigationProp } from "../types";
import Background from "../components/Background";

type Props = {
  navigation: LoginScreenNavigationProp;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onPress = () => {
    console.log("HMASDF");
    navigation.push("Room", {
      id: "123",
      name: "julian",
    });
  };

  return (
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
  );
};
