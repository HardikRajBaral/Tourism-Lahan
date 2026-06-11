"use client";

import { DashboardSidebar } from "@/components/Dashboard/dashboardSidebar";
import { useDashboard } from "@/context/dashboardContext";

export default function DashboardPage() {
  const {pages,active}= useDashboard()
return(

    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6 overflow-auto">
        {pages[active]}  {/* ← renders the active page */}
      </main>
    </div>

)
}
 


