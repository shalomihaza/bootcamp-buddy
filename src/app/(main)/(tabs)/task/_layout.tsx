import { SafeAreaComp } from "@/src/components/ui/SafeAreaComp";
import { Fonts } from "@/src/constants/Fonts";
import { Sizes } from "@/src/constants/Sizes";
import { Stack } from "expo-router";

export default function TaskLayout() {
  return (
    <SafeAreaComp>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "Task",
            headerTitleStyle: {
              fontFamily: Fonts.Medium,
              fontSize: Sizes.font.large,
            },
          }}
        />
        <Stack.Screen name="[taskId]" />
      </Stack>
    </SafeAreaComp>
  );
}
