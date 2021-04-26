import React from "react";
import { Surface, Text } from "react-native-paper";
import { StyleSheet, View, StyleProp, ViewStyle, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../core/theme";

type Props = {
  values: string[];
  onSelect: (value: string) => void;
  selectedValue?: string;
};

const AnswerOptions: React.FC<Props> = ({
  values,
  onSelect,
  selectedValue,
}) => {
  return (
    <View style={styles.container}>
      {values.map((value) => {
        const surfaceStyles: StyleProp<ViewStyle> = [styles.surface]
        const textStyles: StyleProp<TextStyle> = [styles.text]

        if (selectedValue === value) {
          surfaceStyles.push(styles.optionSelected);
          textStyles.push(styles.textSelected)
        }


        return (
          <TouchableOpacity onPress={() => onSelect(value)} key={value}>
            <Surface style={surfaceStyles} key={value}>
              <Text style={textStyles}>{value}</Text>
            </Surface>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  surface: {
    padding: 8,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontSize: 20,
  },
  textSelected: {
    color: "white"
  },
});

export default AnswerOptions;
