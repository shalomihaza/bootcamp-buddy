import { Pressable, Text, View } from "react-native";
import AuthStorage from "@/src/services/AuthStorage";
import { router } from "expo-router";

export default function Index() {
  const authStorage = AuthStorage.getInstance();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => {
          authStorage.deleteUser();
          router.replace("/auth");
        }}
      >
        <Text>Logout</Text>
      </Pressable>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
