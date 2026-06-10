import Image from "next/image";
import { dummyPosts } from "@/utils/static";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Attempting to use the dummy data so it matches exactly the ID clicked on the home page.
  // (You can replace this with your fetch logic once your API is fully ready)
  const post = dummyPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50 pb-20">
   
      
      <div className="relative h-[75vh] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="w-full flex flex-col items-center justify-center -mt-16 relative z-10 px-4">
        <div className="bg-white p-8 md:p-12 min-h-[25vh] w-full md:w-3/4 lg:w-3/5 rounded-xl shadow-xl">
          <h1 className="text-4xl md:text-5xl m-2 font-serif font-bold text-center hover:underline-offset-4 hover:decoration-1 hover:underline text-gray-800 block mb-4">
            {post.title}
          </h1>
          <span className="text-lg text-gray-600 text-center block font-medium mb-8">
            {post.excerpt}
          </span>
          
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-gray-700 mt-4 text-justify text-lg leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          <div className="mt-12 text-sm text-gray-400 text-center border-t pt-4">
            Published on: {post.updatedAt.toDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}
