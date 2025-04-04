import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Fonts } from "@/src/constants/Fonts";
import { Sizes } from "@/src/constants/Sizes";
import Colors from "@/src/constants/Colors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 70 : 60,
        },
        tabBarActiveTintColor: Colors.light.secondary,
        tabBarInactiveTintColor: Colors.light.muted,
        tabBarLabelStyle: {
          fontFamily: Fonts.Medium,
          fontSize: Sizes.font.small,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Forum",
          headerTitle: "Forum",
          headerTitleStyle: {
            fontFamily: Fonts.SemiBold,
            fontSize: Sizes.font.large,
          },
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={20}
                color={focused ? Colors.dark.primary : Colors.dark.muted}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          tabBarLabel: "Task",
          headerShown: false,
          headerTitleStyle: {
            fontFamily: Fonts.Medium,
            fontSize: Sizes.font.large,
          },
          tabBarIcon: ({ color, focused }) => (
            <View>
              <MaterialIcons
                name={focused ? "task" : "task-alt"}
                size={20}
                color={focused ? Colors.dark.primary : Colors.dark.muted}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          headerTitle: "Account",
          headerTitleStyle: {
            fontFamily: Fonts.SemiBold,
            fontSize: Sizes.font.large,
          },
          tabBarIcon: ({ color, focused }) => (
            <View>
              <FontAwesome
                name={focused ? "user" : "user-o"}
                size={20}
                color={focused ? Colors.dark.primary : Colors.dark.muted}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
