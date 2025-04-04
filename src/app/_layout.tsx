import { router, SplashScreen, Stack, useRootNavigation } from "expo-router";

import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../components/context/Theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthStorage from "../services/AuthStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../constants/Fonts";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});


const client = new QueryClient();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={client}>
            <RootLayout />
          </QueryClientProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

function RootLayout() {
  const authStorage = new AuthStorage();
  const rootNavigation = useRootNavigation();
  useEffect(() => {
    if (rootNavigation?.isReady()) {
      const user = authStorage.getUser();
      if (!user) {
        router.push("/auth");
      }
    }
  }, [rootNavigation, authStorage]);
  
  return (
    <Stack>
      <Stack.Screen
        name="(main)/(tabs)"
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name="(main)/posts/create-post"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(main)/posts/[postId]"
        options={{
          headerTitle: "Post Detail",
          headerTitleStyle: {
            fontFamily: Fonts.Medium,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default App;
