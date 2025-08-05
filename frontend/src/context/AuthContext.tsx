import LoadingPage from "@/pages/LoadingPage";
import api from "@/utils/api";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  createdAt?: string;
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  jobTitle?: string;
  organization?: string;
  profileImage?: string;
  website?: string;
  address?: string;
  address2?: string;
  city?: string;
  zip?: string;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  following: User[];
  setFollowing: React.Dispatch<React.SetStateAction<User[]>>;
  followers: User[];
  setFollowers: React.Dispatch<React.SetStateAction<User[]>>;
  followersIds: string[];
  setFollowersIds: React.Dispatch<React.SetStateAction<string[]>>;
  followingIds: string[];
  setFollowingIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [followersIds, setFollowersIds] = useState<string[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  const fetchFollowing = async () => {
    try {
      const res = await api.get("/api/users/me/following");
      setFollowing(res.data);
    } catch (error) {
      console.log("Error occur while fetcing following accounts", error);
    }
  }

  const fetchFollowers = async () => {
    try {
      const res = await api.get("/api/users/me/followers");
      setFollowers(res.data);
    } catch (error) {
      console.log("Error occur while fetching followers", error);
    }
  }

  const fetchFollowersIds = async () => {
    try {
      const res = await api.get("/api/users/me/followers-ids");
      setFollowersIds(res.data);
    } catch (error) {
      console.log("Error occur while fetching followers ids", error);
    }
  }

  const fetchFollowingIds = async () => {
    try {
      const res = await api.get("/api/users/me/following-ids");
      setFollowingIds(res.data);
    } catch (error) {
      console.log("Error occur while fetching followers ids", error);
    }
  }

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/api/auth/check-auth");
      setIsAuthenticated(res.data.isAuthenticated);
      if (res.data.userId) {
        const res2 = await api.get(`/api/users/${res.data.userId}`);
        setUser(res2.data);
      }
      setIsLoading(false);
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
  useEffect(() => {
    checkAuth();
    fetchFollowing();
    fetchFollowers();
    fetchFollowersIds();
    fetchFollowingIds();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    following,
    setFollowing,
    followers,
    setFollowers,
    followersIds,
    setFollowersIds,
    followingIds,
    setFollowingIds
  };

  if (isLoading) return <LoadingPage />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
