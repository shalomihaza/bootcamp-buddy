import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/AuthService";
import { AuthType, GoogleResponse } from "../types/auth";
import { toast } from "sonner-native";
import { router } from "expo-router";

export const useSignUp = () => {
  const authService = new AuthService();
  const mutate = useMutation<unknown, Error, AuthType>({
    mutationFn: async (body: AuthType) =>
      await authService.signUpWithEmailPassword(body),
    onSuccess: () => {
      router.replace("/auth/account-setup");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
  return mutate;
};

export const useSignIn = () => {
  const authService = new AuthService();
  const mutate = useMutation<unknown, Error, AuthType>({
    mutationFn: async (body: AuthType) =>
      await authService.signInWithEmailPassword(body),
    onSuccess: () => {
      router.replace("/(main)/(tabs)");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
  return mutate;
};

export const useGoogleSignIn = () => {
  const authService = new AuthService();
  const mutate = useMutation<GoogleResponse | null, Error>({
    mutationFn: async () => await authService.signInWithGoogle(),
    onSuccess: (data:any) => {
      if (data.isNew) {
        router.replace("/auth/account-setup");
      } else {
        router.replace("/(main)/(tabs)");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
  return mutate;
};
