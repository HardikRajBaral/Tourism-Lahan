import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Places", href: "/#places" },
  { label: "About Us", href: "/#about" },
  { label: "Plan Your Trip", href: "/#plan-your-trip" },
  { label: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  return (
    <nav className="w-full z-50 sticky -top-36 flex flex-col">
      <div className="relative h-36 w-full shrink-0">
        <Image
          src="/images/mountain-banner-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex items-center justify-between px-6">
          <Image
            src="/images/logo-removebg-preview.png"
            alt="Tourism Nepal Logo"
            width={64}
            height={64}
            className="h-32 w-auto p-2 ml-4 object-contain"
          />

          <span className="absolute left-1/2 -translate-x-1/2 text-white text-2xl font-bold tracking-wide">
            Tourism Nepal
          </span>

          <Image
            src="/images/nepal-flag.gif"
            alt="Nepal animation"
            width={64}
            height={64}
            className="h-32 w-auto p-2 mr-4 object-contain"
          />
        </div>
      </div>

      <div className="bg-white flex justify-center items-center gap-1 px-6 py-2 shadow-md">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-gray-700 px-4  mx-6  my-2 font-medium rounded border-transparent border-b-2 hover:border-blue-500 hover:text-gray-900 hover:scale-110 transition-transform duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};