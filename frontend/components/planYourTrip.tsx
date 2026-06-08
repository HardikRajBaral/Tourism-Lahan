import {
  Calendar,
  Bus,
  Bike,
  Building2,
  UtensilsCrossed,
  Quote,
} from "lucide-react";

const matrixRows = [
  {
    icon: Calendar,
    label: "Best time to visit",
    detail: "Autumn — September to November",
    sub: "Perfect weather & major festivals. Or mid-April to catch the legendary blooming orchid.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Bus,
    label: "How to get there",
    detail: "By road — direct buses via Mahendra Highway",
    sub: "~6–7 hours from Kathmandu. Flights via Janakpur or Rajbiraj Airport also available.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Bike,
    label: "Getting around",
    detail: "Eco-friendly e-rickshaws & local cycles",
    sub: "Easily accessible across the city — low-cost and scenic.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Building2,
    label: "Accommodation",
    detail: "City hotels · budget guesthouses · eco-lodges",
    sub: "Hattidaha Vanstay offers a peaceful overnight forest stay.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const cuisines = [
  "Dhikri",
  "Thekuwa",
  "Maithili fish curry",
  "Chiura & curd",
  "Anarsa",
];
const handicrafts = [
  "Mithila paintings",
  "Tharu basketry",
  "Handloom fabric",
  "Clay pottery",
];
const festivals = ["Chhath Puja", "Dashain", "Siruwa", "Hatiyaa market"];

function Chip({ label }: { label: string }) {
  return (
    <span className="text-sm px-3 py-1 rounded-lg bg-gray-100 text-gray-700 italic">
      {label}
    </span>
  );
}

function ChipGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold text-gray-700 mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Chip key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

export default function PlanYourTrip() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-6 pb-10">
      <div className="bg-white p-6 w-full md:w-3/4 lg:w-1/2 rounded-lg shadow-md">
        {/* Section header — matches "Why Visit Lahan?" pattern */}
        <h1 className="text-4xl m-2 font-serif font-bold text-center text-gray-800 block">
          Plan Your Trip
        </h1>
        <span className="text-md text-gray-600 text-center block">
          Everything you need to know before you go
        </span>

        {/* Two-column grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left — Travel Matrix */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-700">At a glance</p>
            </div>
            <div className="divide-y divide-gray-100">
              {matrixRows.map(
                ({ icon: Icon, label, detail, sub, color, bg }) => (
                  <div key={label} className="flex items-start gap-3 px-4 py-4">
                    <div
                      className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      <Icon size={16} className={color} />
                    </div>
                    <div>
                      {/* matches updatedAt pill style — small italic muted */}
                      <p className="text-gray-500 p-0.5 rounded text-sm italic bg-gray-100 inline-block mb-1">
                        {label}
                      </p>
                      {/* matches post.title style */}
                      <p className="text-xl font-bold text-gray-800 leading-snug">
                        {detail}
                      </p>
                      {/* matches post.excerpt style */}
                      <p className="text-gray-600 text-md mt-1 leading-relaxed">
                        {sub}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right — Traveler's Tips */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <UtensilsCrossed size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800 leading-none">
                  Local culture & cuisine
                </p>
                <p className="text-gray-600 text-md mt-0.5">
                  Tharu · Maithili traditions
                </p>
              </div>
            </div>

            <div className="px-4 py-4">
              <ChipGroup title="Must-try foods" items={cuisines} />
              <ChipGroup
                title="Handicrafts to bring home"
                items={handicrafts}
              />
              <ChipGroup title="Festivals & markets" items={festivals} />

              {/* blockquote — matches the italic bg-gray-100 pill styling */}
            </div>
          </div>
        </div>
        <div className="mt-4 border-l-2 border-amber-400 pl-4 py-1">
          <Quote size={13} className="text-amber-400 mb-1" />
          <p className="text-gray-600 text-md italic leading-relaxed">
            &quot;Walk through Lahan&apos;s Hatiyaa bazaar on a festival day —
            the air smells of mango, marigold, and freshly woven cloth.
            It&apos;s the Terai at its most alive.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
