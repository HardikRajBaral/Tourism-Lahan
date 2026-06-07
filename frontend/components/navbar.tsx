import Image from "next/image";

const links = ["Home", "Places", "About Us", "Contact"];

export const Navbar = () => {
  return (
    <nav className="w-full shadow-md">
      <div className="relative h-32 w-full">
        <Image
          src="/images/mountain-banner-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex items-center justify-around px-6">
          <Image
            src="/images/logo-removebg-preview.png"
            alt="Tourism Nepal Logo"
            width={64}
            height={64}
            className="h-30 w-auto m-2 object-contain"
          />

          <span className="text-white text-2xl m-2 font-bold tracking-wide">
            Tourism Nepal
          </span>

          <Image
            src="/images/nepal-flag.gif"
            alt="Nepal animation"
            width={64}
            height={64}
            className="h-30 w-auto m-2 object-contain"
          />
        </div>
      </div>

      <div className="bg-white flex justify-center items-center m-2 gap-1 px-6 py-2">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-gray-700 px-8 py-2 font-medium rounded  mx-4 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
};