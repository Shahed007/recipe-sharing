import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { User, UserCredential } from "firebase/auth";

interface useHookProps  {
  loginAndRegistration: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  user: User | null;
  loading: boolean;
  authLoading: boolean;
}
export const useAuth = (): useHookProps => {
  const context = useContext(AuthContext);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useEffect(()=> {
    if(!context.loading){
      setAuthLoading(true)
    }
  },[context.loading])

  return {authLoading, user: context.user, logOut: context.logOut, loginAndRegistration: context.loginAndRegistration, loading: context.loading};

};
