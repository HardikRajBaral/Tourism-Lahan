"use client";

import { Post } from "@/app/types/type";
import { Eye, Pencil, Trash2, Ellipsis } from "lucide-react";
import Image from "next/image";
import React from "react";

export const dummyPosts: Post[] = [
  {
    id: "1",
    title: "The Whispering Sands of Siwa",
    excerpt: "A journey through the golden dunes of Egypt's most remote oasis.",
    content:
      "Siwa is one of Egypt's most isolated settlements, located near the Libyan border.",
    image: "https://images.unsplash.com/photo-1539768942893-daf639082543?w=400",
    published: true,
    authorId: "user_1",
    createdAt: new Date("2023-10-24"),
    updatedAt: new Date("2023-10-25"),
  },
  {
    id: "2",
    title: "Finding Solitude in the High Alps",
    excerpt:
      "Switzerland's breathtaking peaks offer more than just scenic views.",
    content:
      "The Swiss Alps are a world unto themselves. Beyond the ski resorts and tourist trails lies a network of ancient paths.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    published: false,
    authorId: "user_1",
    createdAt: new Date("2023-11-12"),
    updatedAt: new Date("2023-11-13"),
  },
  {
    id: "3",
    title: "The Geometry of Jaipur",
    excerpt:
      "India's Pink City is a masterclass in Mughal architecture and color.",
    content: "Jaipur was built in 1727 by Maharaja Jai Singh II.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400",
    published: true,
    authorId: "user_2",
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2023-09-06"),
  },
  {
    id: "4",
    title: "A Rainy Tuesday in Montmartre",
    excerpt: "Paris reveals its true soul on grey, quiet weekday mornings.",
    content:
      "Most tourists see Paris in the summer. But the city transforms in the rain.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
    published: false,
    authorId: "user_2",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-02"),
  },
  {
    id: "5",
    title: "Crossing the Sahara by Night",
    excerpt: "When the sun sets, the world's largest desert comes alive.",
    content:
      "Traveling the Sahara by night is a completely different experience.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400",
    published: true,
    authorId: "user_3",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
  },
];

export default function Table() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  return (
    <div className="overflow-x-auto mt-16">
      <table className="min-w-full  block md:table">
        <thead className="block  md:table-header-group ">
          <tr className="border-b  p-2 border-gray-200 bg-blue-50">
            <th className="p-2 border-x-2  border-gray-200 w-full ">Posts</th>
            <th className="p-2 border-x-2 border-gray-200 min-w-64">Status</th>
            <th className="p-2 border-x-2 border-gray-200 min-w-64">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyPosts.map((post) => (
            <tr
              key={post.id}
              className=" p-2 border-b border-gray-200 block md:table-row"
            >
              <td className="p-2  block md:table-cell">
                <div className="flex items-center justify-start gap-4 mx-4 my-4">
                  <div className="w-16 h-16  rounded overflow-hidden">
                    <Image
                    className="object-cover w-full h-full"
                      src={post.image}
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
                <span className={`inline-flex px-4 py-2 font-semibold  ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded-full border border-gray-300 text-xs`}>
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
                    <div
                      className="z-50 absolute right-0 top-full mt-1 w-48 -translate-x-1/7 rounded-2xl bg-white shadow-lg border border-gray-200"
                    >
                      <div className="flex flex-col p-2">
                        <button className="flex w-full items-center justify-start gap-2 border-b border-gray-300 bg-blue-50 px-4 py-2 text-left hover:bg-blue-100">
                          <Eye size={16} />
                          <span>view</span>
                        </button>
                        <button className="flex w-full items-center justify-start gap-2 border-b border-gray-300 bg-blue-50 px-4 py-2 text-left hover:bg-blue-100">
                          <Pencil size={16} />
                          <span>edit</span>
                        </button>
                        <button className="flex w-full items-center justify-start gap-2 border-b border-gray-300 bg-blue-50 px-4 py-2 text-left hover:bg-blue-100">
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
