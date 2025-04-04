import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Sizes } from "@/src/constants/Sizes";
import Colors from "@/src/constants/Colors";
import { Fonts } from "@/src/constants/Fonts";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  loading,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      disabled={loading || disabled}
      style={{
        backgroundColor: disabled ? Colors.light.accent : Colors.light.primary,
        padding: Sizes.padding.medium,
        borderRadius: Sizes.radius.medium,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.dark.white} size="small" />
      ) : (
        <Text
          style={{
            fontSize: Sizes.font.medium,
            fontFamily: Fonts.Regular,
            color: Colors.light.text,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
