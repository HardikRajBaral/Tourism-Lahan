export type dashboardContextProps={
    active:string
    setActive:(page:string)=>void
    setPostId:(postId:string)=>void
    pages:Record<string, React.ReactNode>
}