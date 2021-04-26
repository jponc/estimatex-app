import React from "react";
import { Card, Paragraph, Title } from "react-native-paper";
import { RoomScreenRouteProp } from "../types";

type Props = {
  route: RoomScreenRouteProp;
};

export const RoomScreen: React.FC<Props> = ({ route }) => {
  const { id, name } = route.params;

  return (
    <Card>
      <Card.Content>
        <Title>{id}</Title>
        <Paragraph>{name}</Paragraph>
      </Card.Content>
    </Card>
  );
};
