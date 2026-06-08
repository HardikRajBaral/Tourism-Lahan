import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { dummyTourismPosts } from "@/utils/static";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <div className= "relative h-[75vh]  overflow-hidden ">
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
        <h1 className="text-5xl m-2 font-serif font-bold text-center hover:underline-offset-4 hover:decoration-1 hover:underline text-gray-800 block">Discover Lahan</h1>
        <span className="text-md text-gray-600 text-center block">The Gateway to Mithila Culture & Natural Wonders</span>
        <p className="text-gray-700 mt-4 text-justify text-lg">
          Welcome to Lahan, the vibrant heart of the Siraha district in Madhesh Province. Strategically located along the bustling East-West Mahendra Highway, Lahan is much more than a major commercial hub—it is a treasure trove of rich cultural heritage, sacred history, and untouched natural beauty. From the legendary folklore of King Salhesh to tranquil new eco-tourism escapes, Lahan offers travelers an authentic glimpse into the warm hospitality, colorful festivals, and deep-rooted traditions of the Terai plains.
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-6">
        <div className="bg-white p-6 min-h-[25vh] w-full  md:w-3/4 lg:w-1/2 rounded-lg shadow-md">
          <h1 className="text-4xl m-2 font-serif font-bold text-center text-gray-800 block">Why Visit Lahan?</h1>
          <span className="text-md text-gray-600 text-center block">Experience the rich cultural heritage and natural beauty of Lahan</span>
        </div>
        <div>
          {dummyTourismPosts.map((data) => (
            <div key={data.id} className="bg-white p-6 min-h-[25vh] w-full md:w-3/4 lg:w-1/2 rounded-lg shadow-md mt-6">
              <h2 className="text-2xl font-serif font-bold text-center text-gray-800 block">{data.title}</h2>
              <p className="text-gray-700 mt-4 text-justify text-lg">{data.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

     </div>
    </main>
  );
}
