import { GoogleAuthWrapper } from "@/App";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <GoogleAuthWrapper />;
  return <>{children}</>;
};
