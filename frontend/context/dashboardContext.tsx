'use client'

import CreatePost from "@/components/Posts/CreatePost";
import Dashboard from "@/components/Dashboard/DashboardHomePage";
import Posts from "@/components/Posts/Posts";
import { dashboardContextProps } from "@/types/dashboard";
import { NavItems } from "@/types/Post";
import { createContext, useContext, useState } from "react";



const DashboardContext= createContext<dashboardContextProps>({
    active :'dashboard',
    setActive:()=>{},
    pages:{}
})

export const DashboardContextProvider=({children}:{children:React.ReactNode
})=>{
    const [active,setActive]= useState('dashboard')
      const pages: Record<NavItems, React.ReactNode> = {
    dashboard: <Dashboard />,
    posts: <Posts onNavigate={setActive} />,
    createPost: <CreatePost />,
  };
    return(
        <DashboardContext.Provider value={{active,setActive,pages}}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard=()=>{
    const context= useContext(DashboardContext)
    if(!context){
        throw new Error("useDashboardContext must be used within a DashboardContextProvider")
    }
    return context
}