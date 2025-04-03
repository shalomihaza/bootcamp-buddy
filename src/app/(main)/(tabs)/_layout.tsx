import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Fonts } from "@/src/constants/Fonts";
import { Sizes } from "@/src/constants/Sizes";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Feeds",
          headerTitleStyle: {
            fontFamily: Fonts.SemiBold,
            fontSize: Sizes.font.large,
          },
        }}
      />
      <Tabs.Screen name="task" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
