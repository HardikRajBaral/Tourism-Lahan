import ProtectedRoute from "@/components/Dashboard/protectedRoute";
import { DashboardContextProvider } from "@/context/dashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardContextProvider>
        {children}
        </DashboardContextProvider>
    </ProtectedRoute>
  );
}
