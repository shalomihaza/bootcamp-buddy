import { Stack } from "expo-router";

export default function TaskLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Chats" }} />
      <Stack.Screen name="[taskId]" options={{ title: "Chat" }} />
    </Stack>
  );
}
