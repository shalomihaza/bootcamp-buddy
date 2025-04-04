import React from "react";

import { View, ViewProps } from "react-native";
import FocusAwareStatusBar, {
  FocusAwareStatusBarProps,
} from "./FocusAwareStatusBar";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Log } from "@/src/utils/Logger";
import { width } from "@/src/utils/Dimensions";

export interface SafeAreaCompProps extends ViewProps {
  statusBarProps?: FocusAwareStatusBarProps;
  style?: any;
}

export const SafeAreaComp: React.FC<SafeAreaCompProps> = ({
  children,
  style,
  statusBarProps,
}) => {
  const insets = useSafeAreaInsets();

  Log.dev("insets", insets);

  const computedStyles = [
    {
      flex: 1,
      width: width,
      backgroundColor: "#fff",
      // Paddings to handle safe area

      paddingTop: insets.top,
      // paddingBottom: insets.bottom,
      // paddingLeft: insets.left,
      // paddingRight: insets.right,
    },
    style,
  ];
  return (
    <View style={computedStyles}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={
          style?.backgroundColor ? style.backgroundColor : "#fff"
        }
        {...statusBarProps}
      />

      <>{children}</>
    </View>
  );
};
