import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { router } from "expo-router";

const FloatingAction = () => {
  return (
    <TouchableOpacity
    onPress={()=>router.push("/(main)/posts/create-post")}
      activeOpacity={0.6}
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Colors.light.primary,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        right:20,
        bottom:20
      }}
    >
      <AntDesign name="plus" size={24} color={Colors.light.white} />
    </TouchableOpacity>
  );
};

export default FloatingAction;

const styles = StyleSheet.create({});
