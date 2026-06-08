import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="w-full py-16 flex flex-col items-center justify-center border-t border-gray-100">
      <div className="w-full md:w-3/4 lg:w-1/2">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Contact & Enquiries
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              The Tourism Development Office of Lahan is dedicated to promoting and preserving the cultural and natural heritage of our region. We welcome your queries and feedback.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-900 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-gray-900 uppercase">Office Address</h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Tourism Development Office<br/>
                    Lahan Municipality, Siraha<br/>
                    Madhesh Province, Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-900 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-gray-900 uppercase">Telephone</h4>
                  <p className="text-gray-600 mt-2">+977-033-XXXXXX</p>
                  <p className="text-gray-600">+977-033-XXXXXY</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-900 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-gray-900 uppercase">Email</h4>
                  <a href="mailto:info@tourism.gov.np" className="text-blue-700 hover:text-blue-500 hover:underline mt-2 block transition-colors">
                    info@tourism.gov.np
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-900 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-gray-900 uppercase">Opening Hours</h4>
                  <p className="text-gray-600 mt-2">Sun - Thu: 10:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Fri: 10:00 AM - 3:00 PM</p>
                  <p className="text-red-600 text-sm mt-1 font-medium">Closed on Saturdays & Public Holidays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3 bg-[#f8fafc] border border-gray-200 p-8 md:p-12">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800 mb-2">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-0 focus:border-blue-900 outline-none transition-colors rounded-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800 mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-0 focus:border-blue-900 outline-none transition-colors rounded-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-0 focus:border-blue-900 outline-none transition-colors rounded-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-0 focus:border-blue-900 outline-none transition-colors rounded-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">Message *</label>
                <textarea 
                  id="message" 
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-0 focus:border-blue-900 outline-none transition-colors resize-y rounded-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="bg-[#0f2146] hover:bg-blue-800 text-white font-medium py-3.5 px-10 transition-colors rounded-none tracking-wider uppercase text-sm mt-4"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
