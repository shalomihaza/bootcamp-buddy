import { router, SplashScreen, Stack, useRootNavigation } from "expo-router";

import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../components/context/Theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../services/firebase";
import AuthStorage from "../services/AuthStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Realm from "../providers/Realm";

console.log("WebClientID:", process.env.EXPO_PUBLIC_WEB_CLIENT_ID);
console.log("iOSClientID:", process.env.EXPO_PUBLIC_IOS_CLIENT_ID);

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

const authStorage = AuthStorage.getInstance();

const client = new QueryClient();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Realm>
          <SafeAreaProvider>
            <QueryClientProvider client={client}>
              <RootLayout />
            </QueryClientProvider>
          </SafeAreaProvider>
        </Realm>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

function RootLayout() {
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    if (rootNavigation?.isReady()) {
      const user = authStorage.getUser();
      console.log(user);
      if (!user) {
        router.push("/auth");
      }
    }
  }, [rootNavigation, authStorage]);

  return (
    <Stack>
      <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="auth"
      />
    </Stack>
  );
}

export default App;
