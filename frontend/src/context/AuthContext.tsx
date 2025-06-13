import LoadingPage from "@/pages/LoadingPage";
import api from "@/utils/api";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/api/auth/check-auth");
        setIsAuthenticated(res.data.isAuthenticated);
        try {
          const res2 = await api.get(`/api/users/${res.data.userId}`);
          setUser(res2.data);
        } catch {
          setUser(null);
          setIsAuthenticated(false);
          console.log("user not logged in");
        }
        // setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setUser(null);
        setIsAuthenticated(false);
        if (error.response?.status === 401) {
          console.log("user not logged in");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  if (isLoading) return <LoadingPage />;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
