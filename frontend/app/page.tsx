import PlanYourTrip from "@/components/planYourTrip";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Contact } from "@/components/contact";
import api from "@/utils/axios";
import { Post } from "@/types/Post";

export default async function Home() {
  const res = await api.get("http://localhost:5000/api/v1/posts");
  const posts :Post[]= res.data;
  return (
    <main className="min-h-screen overflow-hidden">
     
      <div id="home" className="relative h-[75vh]  overflow-hidden ">
        <Image
          src="/images/images.jpeg"
          alt="Next.js logo"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div id="about" className="bg-white p-6 min-h-[25vh] w-full  md:w-3/4 lg:w-1/2 rounded-lg shadow-md mt-6">
          <h1 className="text-5xl m-2 font-serif font-bold text-center hover:underline-offset-4 hover:decoration-1 hover:underline text-gray-800 block">
            Discover Lahan
          </h1>
          <span className="text-md text-gray-600 text-center block mb-10">
            The Gateway to Mithila Culture & Natural Wonders
          </span>
          <p className="text-gray-700 text-justify text-lg">
            Welcome to Lahan, the vibrant heart of the Siraha district in
            Madhesh Province. Strategically located along the bustling East-West
            Mahendra Highway, Lahan is much more than a major commercial hub—it
            is a treasure trove of rich cultural heritage, sacred history, and
            untouched natural beauty. From the legendary folklore of King
            Salhesh to tranquil new eco-tourism escapes, Lahan offers travelers
            an authentic glimpse into the warm hospitality, colorful festivals,
            and deep-rooted traditions of the Terai plains.
          </p>
        </div>

        <div id="places" className="w-full flex flex-col items-center justify-center mt-6">
          <div className="bg-white p-6 min-h-[25vh] w-full  md:w-3/4 lg:w-1/2 rounded-lg shadow-md">
            <h1 className="text-4xl m-2 font-serif font-bold text-center text-gray-800 block">
              Why Visit Lahan?
            </h1>
            <span className="text-md text-gray-600 text-center block mb-12">
              Experience the rich cultural heritage and natural beauty of Lahan
            </span>

            <div className="space-y-6 w-full ">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="flex flex-col md:flex-row rounded-2xl gap-6 border-b pb-6 mb-2 group hover:bg-gray-50 transition-all p-4 -mx-4 cursor-pointer"
                >
                  <div className="md:w-2/5 shrink-0 h-48 relative overflow-hidden rounded-2xl">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between py-2">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mt-3 text-md leading-relaxed">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-gray-500 px-3 py-1 rounded-md text-sm font-medium bg-gray-100">
                        {new Date(post.updatedAt).toDateString()}
                      </p>
                      <span className="text-blue-600 font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                        Read More <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PlanYourTrip />
      <Contact />
    </main>
  );
}
