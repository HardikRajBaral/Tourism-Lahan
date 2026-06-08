import Image from "next/image";
import Link from "next/link";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);



export const Footer = () => {
  return (
    <footer className="bg-[#09152b] text-gray-300 py-16 w-full mt-auto relative z-10 border-t-[6px] border-blue-600">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Social */}
        <div className="flex flex-col space-y-6">
          <div className="bg-white p-3 rounded-2xl w-max shadow-xl">
            <div className="relative w-28 h-28">
              <Image
                src="/images/logo-removebg-preview.png"
                alt="Tourism Nepal Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2 tracking-wide">
              Tourism Development Office
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Discover the natural beauty, culture, and <br className="hidden md:block"/>
              heritage of the Madhesh Province.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Link href="#" className="bg-white/5 hover:bg-[#3b5998] p-3 rounded-lg hover:-translate-y-1 transition-all duration-300 shadow-md">
              <FacebookIcon className="w-5 h-5 text-white" />
            </Link>
            <Link href="#" className="bg-white/5 hover:bg-[#E1306C] p-3 rounded-lg hover:-translate-y-1 transition-all duration-300 shadow-md">
              <InstagramIcon className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-blue-500 after:rounded-full">
            Explore
          </h3>
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">Home</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">Places to Visit</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">About Lahan</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">Photo Gallery</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">News & Notices</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-blue-500 after:rounded-full">
            Information
          </h3>
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">FAQ</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">Rules & Regulations</Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-blue-400 hover:translate-x-2 inline-block transition-all duration-200">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-blue-500 after:rounded-full">
            Contact Us
          </h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="leading-relaxed text-gray-400 hover:text-gray-200 transition-colors">
                Lahan Municipality<br />
                Siraha District, Nepal
              </span>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a href="mailto:info@tourism.gov.np" className="text-gray-400 hover:text-blue-400 transition-colors">
                info@tourism.gov.np
              </a>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a href="tel:+977033XXXXXX" className="text-gray-400 hover:text-blue-400 transition-colors">
                +977-033-XXXXXX
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Tourism Development Office, Lahan. All Rights Reserved.
        </p>
        <div className="mt-4 md:mt-0 flex items-center gap-1.5 bg-black/20 px-4 py-2 rounded-full">
          <span className="text-gray-500">Developed by</span>
          <a href="#" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Tecobit Technologies Pvt. Ltd
          </a>
        </div>
      </div>
    </footer>
  );
};
