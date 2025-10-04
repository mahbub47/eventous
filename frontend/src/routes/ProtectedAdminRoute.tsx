import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import LoadingPage from "@/pages/LoadingPage";

interface Props {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/admin/check-auth-admin");
        if (res.data.isAuthenticated) {
          setAuthenticated(true);
          console.log("Admin authenticated ", res.data);
        } else {
          window.location.href = "/admin/login";
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = "/admin/login";
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  return <>{authenticated && children}</>;
};
