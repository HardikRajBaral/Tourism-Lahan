export type dashboardContextProps={
    active:string
    setActive:(page:string)=>void
    pages:Record<string, React.ReactNode>
}