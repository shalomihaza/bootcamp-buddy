import { router, SplashScreen, Stack, useRootNavigation } from "expo-router";

import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../components/context/Theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../services/firebase";

SplashScreen.preventAutoHideAsync();

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <RootLayout />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

function RootLayout() {
  const rootNavigation = useRootNavigation();

  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async () => {
      setAuthInitialized(true);

      await SplashScreen.hideAsync();
    });
    return () => unsubscribe();
  }, []);

  console.log(auth.currentUser);
  useEffect(() => {
    if (authInitialized && rootNavigation?.isReady()) {
      if (!auth.currentUser) {
        router.replace("/(auth)");
      }
    }
  }, [authInitialized, rootNavigation, auth.currentUser]);
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="(auth)"
      />
    </Stack>
  );
}

export default App;
