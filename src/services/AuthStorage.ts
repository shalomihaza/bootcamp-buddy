import { User } from "@firebase/auth";
import { MMKV } from "react-native-mmkv";

class AuthStorage {
  private user: User | null;
  private storage: MMKV;
  private static instance: AuthStorage;

  constructor() {
    this.user = null;
    this.storage = new MMKV();
  }

  public static getInstance(): AuthStorage {
    if (!AuthStorage.instance) {
      AuthStorage.instance = new AuthStorage();
    }
    return AuthStorage.instance;
  }

  public getUser(): User | null {
    const user = this.storage.getString("user");
    if (!user) return null;
    this.user = JSON.parse(user) as User;
    return this.user;
  }
  public setUser(user: User): void {
    this.user = user;
    this.storage.set("user", JSON.stringify(user));
  }

  public deleteUser(): void {
    this.user = null;
    this.storage.delete("user");
  }
}

export default AuthStorage;
