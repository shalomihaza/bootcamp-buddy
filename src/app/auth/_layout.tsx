import { useTheme } from "@/src/components/context/Theme";
import Colors from "@/src/constants/Colors";
import { Sizes } from "@/src/constants/Sizes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

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
      <Stack.Screen
        name="account-setup"
        options={{
          title: "",
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: Colors.light.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={Sizes.icon.medium} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
