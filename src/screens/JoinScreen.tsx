import React, { useState, useContext } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { JoinScreenNavigationProp } from "../types";
import Background from "../components/Background";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { RoomContext } from "../contexts/RoomContext";
import { NotificationsContext } from "../contexts/NotificationsContext";
import { StatusBarView } from "../components/StatusBarView";

type Props = {
  navigation: JoinScreenNavigationProp;
};

export const JoinScreen: React.FC<Props> = ({ navigation }) => {
  const { joinRoom } = useContext(RoomContext);
  const { showMessage } = useContext(NotificationsContext);

  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const onPress = async () => {
    setIsButtonLoading(true);

    try {
      const rId = await joinRoom(roomId, name);
      showMessage("Successfully joined the room");
      setIsButtonLoading(false);
      navigation.push("Room", {
        id: rId,
      });
    } catch (e) {
      setIsButtonLoading(false);
      showMessage(e.message);
    }
  };

  return (
    <StatusBarView>
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
          onSubmitEditing={onPress}
          onChangeText={(text) => setName(text)}
        />
        <Button
          mode="contained"
          onPress={onPress}
          disabled={isButtonLoading}
          loading={isButtonLoading}
        >
          Get In!
        </Button>
      </Background>
    </StatusBarView>
  );
};

const styles = StyleSheet.create({
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
});
