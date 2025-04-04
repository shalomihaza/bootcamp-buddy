import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getApps, getApp } from "firebase/app";
import {
  EXPO_PUBLIC_FIREBASE_API_KEY,
  EXPO_PUBLIC_FIREBASE_APP_ID,
  EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_FIREBASE_PROJECTID,
} from "../config/env";

const firebaseConfig = {
  apiKey: `${EXPO_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${EXPO_PUBLIC_FIREBASE_PROJECTID}.firebaseapp.com`,
  projectId: `${EXPO_PUBLIC_FIREBASE_PROJECTID}`,
  storageBucket: `${EXPO_PUBLIC_FIREBASE_PROJECTID}.firebasestorage.app`,
  messagingSenderId: `${EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${EXPO_PUBLIC_FIREBASE_APP_ID}`,
  measurementId: `${EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
  popupRedirectResolver: undefined,
});
const db = getFirestore(app);

export { auth, db, app };
