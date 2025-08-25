import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import {
  signInWithFallback,
  signUpWithFallback,
  signOutWithFallback,
  getSessionWithFallback,
} from "@/lib/auth-helpers";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ data: any; error: any }>;
  signUp: (
    email: string,
    password: string,
    userData: any,
  ) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  userType: "owner" | "seeker" | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthProvider, useAuth };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<"owner" | "seeker" | null>(null);

  useEffect(() => {
    // Get initial session with fallback to mock auth
    getSessionWithFallback().then(({ data }) => {
      const session = data.session;
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Get user type from user metadata
        setUserType(session.user.user_metadata.user_type || null);
        console.log(
          "User authenticated:",
          session.user.email,
          "Type:",
          session.user.user_metadata.user_type,
        );
      }

      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setUserType(session.user.user_metadata.user_type || null);
      } else {
        setUserType(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    return await signInWithFallback(email, password);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    return await signUpWithFallback(email, password, userData);
  };

  const signOut = async () => {
    return await signOutWithFallback();
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    userType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
