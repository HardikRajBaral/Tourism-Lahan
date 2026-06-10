"use client";

import { DashboardSidebar } from "@/components/Dashboard/dashboardSidebar";
import { useDashboard } from "@/context/dashboardContext";

export default function DashboardPage() {
  const {pages,active}= useDashboard()
return(

    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        {pages[active]}  {/* ← renders the active page */}
      </main>
    </div>

)
}
 


