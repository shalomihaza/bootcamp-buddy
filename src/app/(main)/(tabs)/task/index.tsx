import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TaskBoard } from "@/src/components/lib/TaskManager";

const Tasks = () => {
  return (
    <View style={{ flex: 1 }}>
      <TaskBoard />
    </View>
  );
};

export default Tasks;
