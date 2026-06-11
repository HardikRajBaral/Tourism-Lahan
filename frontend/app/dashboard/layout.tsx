import ProtectedRoute from "@/components/protectedRoute";
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
