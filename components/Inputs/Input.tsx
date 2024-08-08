import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";

type InputsProps = TextInputProps;
type InputProps = InputsProps & {
  label: string;
};

export default function Input(props: InputProps) {
  const { label, ...otherProps } = props;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label || "Label"}</Text>
      <TextInput {...otherProps} style={styles.primaryInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    gap: 10,
  },
  label: {
    textAlign: "center",
    color: "gray",
  },
  primaryInput: {
    elevation: 2,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});
