import { useTheme } from "@/src/components/context/Theme";
import Colors from "@/src/constants/Colors";
import { Sizes } from "@/src/constants/Sizes";
import { Stack } from "expo-router";

const Layout = () => {
  const { dark } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="index"
      />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: dark
              ? Colors.dark.background
              : Colors.light.background,
          },
        }}
      />
    
    </Stack>
  );
};

export default Layout;
