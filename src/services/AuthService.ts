import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebase";
import { AuthType, GoogleResponse } from "../types/auth";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Alert, Platform, ToastAndroid } from "react-native";
import UserService from "./UserService";
import AuthStorage from "./AuthStorage";

class AuthService {
  private userService: UserService;
  private authStorage: AuthStorage;
  private static instance: AuthService;

  constructor() {
    this.authStorage = AuthStorage.getInstance();
    this.userService = UserService.getInstance();
  }

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public signUpWithEmailPassword = async (
    body: AuthType
  ): Promise<UserCredential> => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );
      const { email, uid } = result.user;
      this.userService.createUser({ id: uid, email: email! });
      this.authStorage.setUser(result.user);
      return result;
    } catch (error: any) {
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
    }
  };

  public signInWithEmailPassword = async (body: AuthType): Promise<any> => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );
      this.authStorage.setUser(result.user);
      return result;
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        if (Platform.OS === "ios") {
          Alert.alert("Authentication Error", "Invalid Authentication Details");
        } else if (Platform.OS === "android") {
          ToastAndroid.show("Invalid Authentication Details", 200);
        }
      }
      throw new Error(error.message);
    }
  };

  public signInWithGoogle = async (): Promise<GoogleResponse | null> => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (!isSuccessResponse(response)) {
        return null;
      }

      const { accessToken, idToken } = await GoogleSignin.getTokens();
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      const user = await signInWithCredential(auth, credential);
      const existingUser = await this.userService.getUserByEmail(
        user.user.email!
      );
      this.authStorage.setUser(user.user);
      if (!existingUser) {
        await this.userService.createUser({
          id: user.user.uid,
          email: user.user.email!,
          fullName: user.user.displayName!,
          avatar: user.user.photoURL!,
        });
        return { isNew: true };
      }
      return { isNew: false };
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      } else {
      }
      throw error;
    }
  };
}

export default AuthService;
