import { useDashboard } from "@/context/dashboardContext";
import Image from "next/image";

export const DashboardSidebar = () => {
  const { active, setActive } = useDashboard();
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex w-full">
        <aside className="flex flex-col items-start w-64 justify-start bg-blue-50 border-r border-gray-300">
          <div className="flex items-center gap-3 p-6 mb-6 border-b border-gray-300 w-full">
            <div className="shrink-0">
              <Image
                src="/images/logo-removebg-preview.png"
                alt="logo"
                width={48}
                height={48}
              />
            </div>

            <div>
              <h1 className="text-xl font-bold">DashBoard</h1>
              <p className="text-xs text-gray-600">dashboard page.</p>
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
        </aside>
      </div>
    </div>
  );
};
