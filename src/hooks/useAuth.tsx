import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
