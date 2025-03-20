import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore
} from "firebase/firestore";
import { getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: `${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.firebaseapp.com`,
  projectId: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECTID}.firebasestorage.app`,
  messagingSenderId: `${process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.EXPO_PUBLIC_FIREBASE_APP_ID}`,
  measurementId: `${process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
  popupRedirectResolver: undefined,
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };
