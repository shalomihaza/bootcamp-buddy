import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "../types/User";
import UserService from "../services/UserService";
import AuthStorage from "../services/AuthStorage";
import { auth } from "../services/firebase";
import { router } from "expo-router";

export const useUpdateUser = () => {
  const userService = new UserService();
  const authStorage = new AuthStorage();

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

export const useGetUser = () => {
  const userService = new UserService();
  const authStorage = new AuthStorage();

  const query = useQuery<User, Error>({
    queryKey: ["user", authStorage.getUser()?.uid],
    enabled: !!authStorage.getUser()?.uid,
    staleTime: 1000 * 60 * 10, // 5 minutes
    queryFn: async () => await userService.getUserByEmail(authStorage.getUser()?.email!),
    refetchOnWindowFocus: false,
  });
  return query;
};
