'use client'

import CreatePost from "@/components/Posts/CreatePost";
import Dashboard from "@/components/Dashboard/DashboardHomePage";
import Posts from "@/components/Posts/Posts";
import { dashboardContextProps } from "@/types/dashboard";
import { NavItems } from "@/types/Post";
import { createContext, useContext, useState } from "react";
import EditPost from "@/components/Posts/EditPost";



const DashboardContext= createContext<dashboardContextProps>({
    active :'dashboard',
    setActive:()=>{},
    pages:{},
    setPostId:()=>{}

})

export const DashboardContextProvider=({children}:{children:React.ReactNode
})=>{
    const [active,setActive]= useState('dashboard')
    const [postId, setPostId] = useState<string | null>(null);
    const pages: Record<NavItems, React.ReactNode> = {
    dashboard: <Dashboard />,
    posts: <Posts onNavigate={setActive} />,
    createPost: <CreatePost />,
    editPost: postId? <EditPost id={postId} />: null,
  };
    return(
        <DashboardContext.Provider value={{active,setActive,pages,setPostId}}>
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