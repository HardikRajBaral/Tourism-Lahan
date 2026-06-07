"use client";

import { PostSchema, postSchema } from "@/utils/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
export default function CreatePost() {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // create a preview URL from the file
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handlePost = async (data: PostSchema, published: boolean) => {
    setError(null);
   try{
     const formData = new FormData();
    formData.append("title", data.title);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("published", String(published));

    const imageFile = (document.getElementById("image") as HTMLInputElement)
      .files?.[0];
    if (imageFile) formData.append("image", imageFile);
    
    const res= await fetch("/api/v1/posts",{
      method:"POST",
      body:formData,
      credentials:"include"
    })
    const responseData = await res.json();
    if(!res.ok) {
      const message =responseData.message || "Failed to create post";
      setError(message);
      toast.error(message);
      return;
    }
    toast.success(published ? "Post published!" : "Draft saved!");
    reset();

   }catch{
    setError("Failed to create post. Please try again.");
    toast.error("Failed to create post. Please try again.")
   }
  };

  return (
    <main className="p-6 w-full  min-h-screen">
      <div className="flex flex-col  mb-6 m-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-semibold font-serif">New Post</h1>
            <p className="text-gray-500">
              Share your stories about Lahan with the world.
            </p>
          </div>
          <div className="flex gap-8">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              onClick={handleSubmit((data) => handlePost(data, false))}
              className="inline-flex p-2 min-w-36 items-center justify-center bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded shadow-sm"
            >
              {isSubmitting ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              onClick={handleSubmit((data) => handlePost(data, true))}
              className="inline-flex p-2 min-w-36 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-sm"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-2"
          >
            {error}
          </div>
        )}
        <div>
          <form>
            <div className="mb-4 w-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                <h3 className="text-xl font-semibold p-2">Title</h3>
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 p-2 block w-full border shadow-sm bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500"
                placeholder="Enter post title"
                {...register("title")}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4 w-full flex flex-col items-start">
              <label
                htmlFor="coverImage"
                className="block   text-gray-700 w-full"
              >
                <h3 className="text-lg font-semibold p-2">Cover Image</h3>
              </label>
              <label htmlFor="image" className="cursor-pointer w-full h-64 border-2 border-dashed bg-gray-50 border-gray-300 rounded-md flex items-center justify-center">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Cover Image Preview"
                    width={600}
                    height={400}
                    className="mt-1 block w-full object-cover rounded-md shadow-sm"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <ImagePlus size={32} />
                    <p className="text-sm">Click to upload cover image</p>
                    <p className="text-xs">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700"
              >
                <h3 className="text-lg font-semibold p-2">Excerpt</h3>
              </label>
              <input
                type="text"
                id="excerpt"
                className="mt-1 p-2 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-500"
                placeholder="Enter post excerpt"
                {...register("excerpt")}
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.excerpt.message}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label>
                <h3 className="text-lg font-semibold p-2">Content</h3>
                <textarea
                  className="mt-1 p-2 text-left text-md block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-500"
                  rows={20}
                  placeholder="Write your post content here..."
                  {...register("content")}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.content.message}
                  </p>
                )}
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
