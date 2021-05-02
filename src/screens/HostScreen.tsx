import React, { useContext, useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { HostScreenNavigationProp } from "../types";
import Background from "../components/Background";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { RoomContext } from "../contexts/RoomContext";
import { NotificationsContext } from "../contexts/NotificationsContext";
import { StatusBarView } from "../components/StatusBarView";

type Props = {
  navigation: HostScreenNavigationProp;
};

export const HostScreen: React.FC<Props> = ({ navigation }) => {
  const { hostRoom } = useContext(RoomContext);
  const { showMessage } = useContext(NotificationsContext);

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const onPress = async () => {
    setIsButtonLoading(true);

    try {
      const roomId = await hostRoom(name);
      showMessage("Successfully created the room");
      setIsButtonLoading(false);
      navigation.push("Room", {
        id: roomId,
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
        <Appbar.Content title={`Host a room`} />
      </Appbar>
      <Background>
        <TextInput
          label="Your name"
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
          Host a Room
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
