import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TaskBoard } from "@/src/components/lib/TaskManager";

const Tasks = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>Tasks</Text>

      <TaskBoard />
    </View>
  );
};

export default Tasks;
