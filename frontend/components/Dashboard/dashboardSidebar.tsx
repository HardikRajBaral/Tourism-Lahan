import { useAuth } from "@/context/authcontext";
import { useDashboard } from "@/context/dashboardContext";
import api from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DashboardSidebar = () => {
  const { active, setActive } = useDashboard();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  function handleLogout(): void {
    try {
      api.post("/auth/logout");
      toast.success("logged out successfully");
      setIsAuthenticated(false);
      router.push("/");
    } catch {
      toast.error("error while logging out");
    }
  }

  return (

        <aside className="sticky -top-64 self-start flex flex-col justify-between h-full w-64  bg-blue-50 border-r border-gray-300 shrink-0">
          <div className="w-full ">
            <div className="p-6 mb-6 border-b border-gray-300 w-full h-32">
              <div className="flex flex-col items-center ">
                <h1 className="text-2xl font-bold">DashBoard</h1>
                <p className="text-xs text-gray-600">Welcom To Dashboard.</p>
              </div>
            </div>

            <nav className="w-full space-y-2">
              <button
                onClick={() => setActive("dashboard")}
                className={`w-full text-left px-4 py-2  transition
                ${
                  active === "dashboard"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActive("posts")}
                className={`w-full text-left px-4 py-2  transition
                      ${
                        active === "posts"
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActive("createPost")}
                className={`w-full text-left px-4 py-2  transition  
                ${
                  active === "createPost"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                Create Post
              </button>
            </nav>
          <div className="">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 mb-10 transition  hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link href="/" />
            )}
          </div>
          </div>
        </aside>
  );
};
