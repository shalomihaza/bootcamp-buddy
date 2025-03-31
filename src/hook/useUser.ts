import { useMutation } from "@tanstack/react-query";
import { User } from "../types/User";
import UserService from "../services/UserService";
import AuthStorage from "../services/AuthStorage";
import { auth } from "../services/firebase";
import { router } from "expo-router";

export const useUpdateUser = () => {
  const userService = UserService.getInstance();
  const authStorage = AuthStorage.getInstance();

  const userId = auth.currentUser?.uid! || authStorage.getUser()?.uid || "";
  const mutate = useMutation<unknown, Error, Partial<User>>({
    mutationFn: async (body: Partial<User>) =>
      await userService.updateUser(userId, body),
    onSuccess: () => {
        router.replace("/(main)/(tabs)");
    },
  });
  return mutate;
};
