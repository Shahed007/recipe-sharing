import {
  UserCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
  createContext,
  ReactNode,
  FC,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from "react";
import { auth } from "../firebase/firebase.config";

// set type auth context type
interface AuthContextType {
  loginAndRegistration: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// set type auth provider
interface AuthProviderProps {
  children: ReactNode;
}

// firebase google auth provider
const provider = new GoogleAuthProvider();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // memories login and registration function
  const loginAndRegistration =
    useCallback(async (): Promise<UserCredential> => {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result;
    }, []);

  // memories logout function
  const logOut = useCallback(async (): Promise<void> => {
    await signOut(auth);
    // If user not found loading will be true or set user null
    setLoading(true);
    setUser(null);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // get current user
      setUser(currentUser);
      //  If current user found loading state will be false
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // memories user
  const authState = useMemo(
    () => ({ loginAndRegistration, logOut, user, loading }),
    [user, loginAndRegistration, logOut, loading]
  );

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
