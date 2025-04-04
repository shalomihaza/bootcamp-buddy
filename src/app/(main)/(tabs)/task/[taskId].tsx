import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useObject, useRealm } from "@realm/react";
import { Task } from "@/src/models/Task";
import { BSON } from "realm";
import { useState } from "react";

const TaskDetails = () => {
  const { taskId } = useLocalSearchParams();
  const task = useObject<Task>(Task, new BSON.ObjectID(taskId as string));

  const [updatedDescription, setUpdatedDescription] = useState(
    task?.description
  );

  const realm = useRealm();

  const updateDescription = () => {
    if (!task) {
      return;
    }
    realm.write(() => {
      task.description = updatedDescription ?? "";
    });
  };

  if (!task) {
    return <Text>Not found</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1D2125",
      }}
    >
      <Stack.Screen
        options={{
          title: "Task Details",

          headerBackTitle: "Back",
        }}
      />

      <TextInput
        value={updatedDescription}
        onChangeText={setUpdatedDescription}
        onEndEditing={updateDescription}
        style={{ color: "white", padding: 15, paddingBottom: 0, fontSize: 18 }}
      />
    </View>
  );
};

export default TaskDetails;
