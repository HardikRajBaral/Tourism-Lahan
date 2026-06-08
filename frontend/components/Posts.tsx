import { PostProps } from "@/types/type";
import { CirclePlus, Search, ChevronDown } from "lucide-react";
import Table from "./table";

export default function Posts({ onNavigate }: PostProps) {
  return (
    <main className="p-6 w-full">
      <div className="flex justify-between items-center m-4">
        <div className="space-y-1 w-full">
          <h1 className="text-4xl font-bold font-serif">Post Management</h1>
          <p className="text-gray-500">
            Curate Your Stories about Lahan.write post and edit posts.share you
            tourism area with the world.
          </p>
        </div>
        <div className="flex flex-row max-w-xs w-full gap-2 justify-center">
          <button
            className="inline-flex w-3/5 items-center-end justify-center gap-2 px-4 py-2 bg-blue-500 font-medium text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => onNavigate("createPost")}
          >
            <CirclePlus size={20} />
            Create Post
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4 mt-16">
        <div className="flex items-center gap-4 w-full">
          {/*search bar*/}
          <div className="flex items-center gap-2 flex-1">
            <div className="border border-gray-300 rounded-xl flex items-center px-2 w-full">
              <input
                className="w-full py-2 px-3 outline-none"
                type="text"
                placeholder="Search posts..."
              />
              <button className="p-2 text-gray-600">
                <Search
                  size={20}
                  className="text-gray-600 border-l border-gray-300 w-full pl-4"
                />
              </button>
            </div>
          </div>

          {/*filter options*/}
          <div className="group relative shrink-0">
            <button className="flex items-center w-36 bg-blue-600 text-white px-4 py-2 rounded">
              <span className="flex-1">Filter</span>
              <ChevronDown size={20} />
            </button>
            <div className="absolute left-0 top-full mt-2 w-36 bg-white text-black rounded shadow-lg border border-gray-200 opacity-0 pointer-events-none transform scale-95 origin-top-right transition-all duration-150 z-50 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                All Posts
              </button>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Published
              </button>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Drafts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*post table*/}
      <section>
        <Table />
      </section>
    </main>
  );
}
