"use client"
import { AuthContextProps } from "@/types/Auth";
import api from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextPorvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data=await api.get("/auth/me");
        console.log("me sucess",data)
        setIsAuthenticated(true);
      } catch (error)  {
        console.log("me error",error)
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth()
  }, []);

  return(
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,loading}}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth=()=>{
  const context= useContext(AuthContext)
  if(!context){
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}