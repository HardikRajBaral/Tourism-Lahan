"use client";

import { Post } from "@/types/Post";
import api from "@/utils/axios";
import { Eye, Pencil, Trash2, Ellipsis } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect ,useState} from "react";
import { toast } from "sonner";

export default function Table() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [posts,setPosts]= useState<Post[]>([]);
  const navigate = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get("/posts/mine");
        setPosts(res.data)
        console.log(res);
      } catch {
        setError("error while fetching data.");
        toast.error("error while fetching data");
      }
    };
    fetchPost();
  }, []);


  const handlePreview = (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: string,
  ) => {
    e.stopPropagation();
    navigate.push(`/posts/${postId}`);
  };


  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div className="overflow-x-auto mt-16">
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-4 mb-10 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-2"
        >
          {error}
        </div>
      )}
      <table className="min-w-full  block md:table">
        <thead className="block  md:table-header-group ">
          <tr className="border-b  p-2 border-gray-200 bg-blue-50">
            <th className="p-2 border-x-2  border-gray-200 w-full ">Posts</th>
            <th className="p-2 border-x-2 border-gray-200 min-w-64">Status</th>
            <th className="p-2 border-x-2 border-gray-200 min-w-64">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className=" p-2 border-b border-gray-200 block md:table-row"
            >
              <td className="p-2  block md:table-cell">
                <div className="flex items-center justify-start gap-4 mx-4 my-4">
                  <div className="w-16 h-16  rounded overflow-hidden">
                    <Image
                      className="object-cover w-full h-full"
                      src={post.imageUrl}
                      alt={post.title}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-gray-500 text-sm">{post.excerpt}</p>
                  </div>
                </div>
              </td>
              <td className="p-2 block text-center md:table-cell md:text-center">
                <span
                  className={`inline-flex px-4 py-2 font-semibold  ${post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} rounded-full border border-gray-300 text-xs`}
                >
                  {post.published ? "published" : "draft"}
                </span>
              </td>
              <td className="p-2  block md:table-cell">
                <div className="relative group ">
                  <button
                    className="flex items-center w-full gap-1 text-gray-600 justify-center"
                    onClick={() =>
                      setActiveMenu(activeMenu === post.id ? null : post.id)
                    }
                  >
                    <Ellipsis size={20} />
                  </button>
                  {activeMenu === post.id && (
                    <div className="z-50 absolute right-0 top-full mt-1 w-48 -translate-x-1/7 rounded-2xl bg-white shadow-lg border border-gray-200">
                      <div className="flex flex-col p-2">
                        <button
                          onClick={(e) => handlePreview(e, post.id)}
                          className="flex w-full items-center justify-start gap-2 border-b border-gray-300 bg-blue-50 px-4 py-2 text-left hover:bg-blue-100"
                        >
                          <Eye size={16} />
                          <span>view</span>
                        </button>
                        <button
                          onClick={handleEdit}
                          className="flex w-full items-center justify-start gap-2 border-b border-gray-300 bg-blue-50 px-4 py-2 text-left hover:bg-blue-100"
                        >
                          <Pencil size={16} />
                          <span>edit</span>
                        </button>
                        <button
                          onClick={handleDelete}
                          className="flex w-full items-center justify-start gap-2 border-b border-gray-300 bg-blue-50 px-4 py-2 text-left hover:bg-blue-100"
                        >
                          <Trash2 size={16} />
                          <span>delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
