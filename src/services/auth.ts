import {
    createUserWithEmailAndPassword,
    UserCredential,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
  } from "firebase/auth";
  import { auth } from "./firebase";
  import { AuthType } from "../types/auth";
  import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
  } from "@react-native-google-signin/google-signin";
  import { Alert, Platform, ToastAndroid } from "react-native";
  
  
  export const signUpWithEmailPassword = async (
    body: AuthType
  ): Promise<UserCredential> => {
    const provider = createUserWithEmailAndPassword(
      auth,
      body.email,
      body.password
    )
      .then((result) => {
        // console.log(result)
        return result;
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          if (Platform.OS === "ios") {
            Alert.alert(
              "Authentication Error",
              "You already have an account with this email"
            );
          } else if (Platform.OS === "android") {
            ToastAndroid.show("You already have an account with this email", 200);
          }
        }
        throw new Error(error.message);
      });
    return provider;
  };
  
  // Email/Password Sign-In
  export const signInWithEmailPassword = async (
    body: AuthType
  ): Promise<any> => {
    const result = signInWithEmailAndPassword(auth, body.email, body.password)
      .then((result: any) => {
        
        console.log("Signed in with Email/Password:", result.user.accessToken as string);
        return result.user.accessToken;
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          if (Platform.OS === "ios") {
            Alert.alert("Authentication Error", "Invalid Authentication Details");
          } else if (Platform.OS === "android") {
            ToastAndroid.show("Invalid Authentication Details", 200);
          }
        }
  
        // ToastAndroid.
        throw new Error(error.message);
      });
    return result;
  };
  
  export const signInWithGoogle = async () => {
    try {
      const hasPlay = await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { accessToken, idToken } = await GoogleSignin.getTokens();
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        await signInWithCredential(auth, credential);
      }
    } catch (error: any) {
      console.log("Message:", error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("In Progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play Services Not Available");
            break;
          default:
        }
      } else {
      }
    }
  };
  