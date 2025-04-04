import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { TaskListItem } from "./TaskListItem";
import { useState } from "react";
import { useRealm, useQuery, useUser } from "@realm/react";
import { Task } from "@/src/models/Task";

import { useDraggingContext } from "./TaskDragArea";
import AuthStorage from "@/src/services/AuthStorage";
import { Log } from "@/src/utils/Logger";
import { BSON } from "realm";

export function TaskList() {
  const realm = useRealm();
  const tasks = useQuery(Task).sorted("position");
  // const user = useUser();
  const user = AuthStorage.getInstance().getUser();

  Log.dev("user", user);

  const maxPosition = (useQuery(Task).max("position") as number) || 0;

  const [newTask, setNewTask] = useState("");

  const { dragOffsetY } = useDraggingContext();

  const createTask = () => {
    realm.write(() => {
      realm.create(Task, {
        _id: new BSON.ObjectId(),
        description: newTask,
        createdAt: new Date(),
        isComplete: false,
        user_id: user?.uid ?? "",
        position: maxPosition + 1,
      });
    });

    setNewTask("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo</Text>

      {/* The list of tasks */}
      <FlatList
        onScroll={(event) =>
          (dragOffsetY.value = event.nativeEvent.contentOffset.y)
        }
        data={tasks}
        renderItem={({ item, index }) => (
          <TaskListItem task={item} index={index} />
        )}
        // CellRendererComponent={({ children, index }) => (
        //   <View onLayout={(event) => console.log(event.nativeEvent.layout)}>
        //     {children}
        //   </View>
        // )}
      />

      {/* New task input */}
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        placeholder="New task"
        placeholderTextColor="gray"
        style={styles.input}
      />
      <Button title="Add task" onPress={createTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101112",
    padding: 10,
    borderRadius: 5,
    gap: 5,
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    color: "white",
    padding: 15,
    backgroundColor: "#1D2125",
    borderRadius: 5,
  },
});
