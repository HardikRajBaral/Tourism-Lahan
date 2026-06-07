import { Navbar } from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <div className= "relative h-[60vh]  overflow-hidden ">
        <Image
          src="/images/images.jpeg"
          alt="Next.js logo"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
