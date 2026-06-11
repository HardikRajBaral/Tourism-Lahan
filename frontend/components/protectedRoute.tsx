"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authcontext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
 
  const {isAuthenticated,loading}  = useAuth()
  const router = useRouter()

  useEffect(() => {
    

      if (!isAuthenticated && !loading) {
          router.replace("/login")
      }
  }, [loading,isAuthenticated,router]);

  if (loading) return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-6xl font-bold">Loading...</h1>
    <p className="text-xl">Please wait a moment.</p>
  </div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;