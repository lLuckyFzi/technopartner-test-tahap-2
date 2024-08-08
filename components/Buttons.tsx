import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React, { ReactNode } from "react";

type ButtonsProps = TouchableOpacityProps;
type ButtonPrimaryProps = ButtonsProps & {
  children: ReactNode;
};

export default function PrimaryButton(props: ButtonPrimaryProps) {
  const { children, ...otherProps } = props;

  return (
    <View style={styles.primaryButtonContainer}>
      <TouchableOpacity {...otherProps}>
        <Text style={styles.primaryButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButtonContainer: {
    backgroundColor: "white",
    elevation: 2,
    padding: 10,
    borderRadius: 8,

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  primaryButtonText: {
    textAlign: "center",
    fontWeight: '500'
  },
});
