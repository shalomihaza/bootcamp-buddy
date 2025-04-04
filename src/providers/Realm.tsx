import { PropsWithChildren } from "react";
import { RealmProvider, AppProvider, UserProvider } from "@realm/react";
import { Task } from "../models/Task";

export default function RealmCustomProvider({ children }: PropsWithChildren) {
  return <RealmProvider schema={[Task]}>{children}</RealmProvider>;
  // return (
  //   <AppProvider id={appId}>
  //     <UserProvider fallback={AnonymousLogin}>
  //       <RealmProvider
  //         schema={[Task]}

  //       >
  //         {children}
  //       </RealmProvider>
  //     </UserProvider>
  //   </AppProvider>
  // );
}
