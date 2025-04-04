import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="task" options={{ headerShown: false }} />
      <Tabs.Screen name="account" />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
