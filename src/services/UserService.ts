import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import AuthStorage from "./AuthStorage";
import { app } from "./firebase";
import { User } from "../types/User";

class UserService {
  private db!: Firestore;
  private static instance: UserService;
  private auth: AuthStorage;

  constructor() {
    this.auth = new AuthStorage();
    this.db = getFirestore(app);
  }

  public async getUser(): Promise<User> {
    try {
      const userRef = collection(this.db, "users");
      const q = query(
        userRef,
        where("user_id", "==", this.auth.getUser()?.uid)
      );
      const userSnapshot = await getDocs(q);
      const user = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))[0] as User;
      console.log("User data: ", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const userRef = collection(this.db, "users");
      const q = query(userRef, where("email", "==", email));
      const userSnapshot = await getDocs(q);
      const user = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))[0] as User;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: User): Promise<string> {
    try {
      const userDocRef = doc(this.db, "users", user.id);
      await setDoc(userDocRef, user);
      return user.id!;
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
      throw error;
    }
  }

  async updateUser(userId: string, user: Partial<User>): Promise<boolean> {
    try {
      const projectRef = doc(this.db, "users", userId);
      await updateDoc(projectRef, {
        ...user,
      });
      return true;
    } catch (error) {
      console.error("Error updating user in Firestore:", error);
      return false;
    }
  }
}

export default UserService;
