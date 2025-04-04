import { SafeAreaComp } from "@/src/components/ui/SafeAreaComp";
import { Stack } from "expo-router";

export default function TaskLayout() {
  return (
    <SafeAreaComp>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[taskId]" />
      </Stack>
    </SafeAreaComp>
  );
}
