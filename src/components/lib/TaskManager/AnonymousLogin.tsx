import { useAuth } from "@realm/react";

export const AnonymousLogin = () => {
  const { logInWithAnonymous } = useAuth();

  logInWithAnonymous();

  return null;
};
