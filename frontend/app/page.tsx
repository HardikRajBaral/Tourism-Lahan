import PlanYourTrip from "@/components/planYourTrip";
import { dummyTourismPosts } from "@/utils/static";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
     
      <div className="relative h-[75vh]  overflow-hidden ">
        <Image
          src="/images/images.jpeg"
          alt="Next.js logo"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="bg-white p-6 min-h-[25vh] w-full  md:w-3/4 lg:w-1/2 rounded-lg shadow-md mt-6">
          <h1 className="text-5xl m-2 font-serif font-bold text-center hover:underline-offset-4 hover:decoration-1 hover:underline text-gray-800 block">
            Discover Lahan
          </h1>
          <span className="text-md text-gray-600 text-center block">
            The Gateway to Mithila Culture & Natural Wonders
          </span>
          <p className="text-gray-700 mt-4 text-justify text-lg">
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

        <div className="w-full flex flex-col items-center justify-center mt-6">
          <div className="bg-white p-6 min-h-[25vh] w-full  md:w-3/4 lg:w-1/2 rounded-lg shadow-md">
            <h1 className="text-4xl m-2 font-serif font-bold text-center text-gray-800 block">
              Why Visit Lahan?
            </h1>
            <span className="text-md text-gray-600 text-center block">
              Experience the rich cultural heritage and natural beauty of Lahan
            </span>

            <div className="mt-6 space-y-6 w-full ">
              {dummyTourismPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col md:flex-row rounded-2xl gap-4 border-b pb-4"
                >
                  <div className="  min-w-2/5 shrink-0 h-48 relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={100}
                      height={100}
                      className="object-cover rounded-2xl w-full h-full"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between">
                    <div className="my-4">
                      <h2 className="text-xl font-bold text-gray-800">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mt-2 text-md">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-gray-700 p-1 rounded-lg text-sm italic bg-gray-100 ">
                        {post.updatedAt.toDateString()}
                      </p>
                      <Link
                        href={`/posts/${post.id}`}
                        className="text-blue-500 transition-transform duration-200 flex items-center gap-1 hover:-translate-y-1"
                      >
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PlanYourTrip />
    </main>
  );
}
