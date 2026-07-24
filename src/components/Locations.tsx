import { useState, useEffect } from "react";

interface LocationItem {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  openHour: number;
  closeHour: number;
  hoursText: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  amenities: string[];
}

const locations: LocationItem[] = [
  {
    id: "valletta",
    name: "Valletta Flagship Lab",
    city: "Valletta, Malta",
    address: "Republic Street 45, Valletta VLT 1115",
    phone: "+356 2122 8900",
    openHour: 6.5,
    closeHour: 20.0,
    hoursText: "Mon-Fri: 06:30 – 19:00 | Sat-Sun: 07:30 – 20:00",
    lat: 35.8989,
    lng: 14.5126,
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Republic+Street+45,+Valletta,+Malta",
    amenities: ["NITRO BAR", "OUTDOOR TERRACE", "ICE PACK BOX PICKUP", "HIGH-SPEED WIFI"],
  },
  {
    id: "sliema",
    name: "Sliema Promenade Kiosk",
    city: "Sliema, Malta",
    address: "Tower Road Promenade (Exiles), Sliema",
    phone: "+356 2133 4511",
    openHour: 6.0,
    closeHour: 18.5,
    hoursText: "Mon-Sun: 06:00 – 18:30",
    lat: 35.9122,
    lng: 14.5028,
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Tower+Road,+Sliema,+Malta",
    amenities: ["COASTAL PROMENADE", "EXPRESS DRAFT", "COLD BOX RETAIL", "DOG FRIENDLY"],
  },
  {
    id: "spinola",
    name: "Spinola Bay Roastery & Lab",
    city: "St. Julian's, Malta",
    address: "Spinola Road 12, St. Julian's STJ 1010",
    phone: "+356 2138 9012",
    openHour: 7.0,
    closeHour: 21.0,
    hoursText: "Mon-Fri: 07:00 – 20:00 | Sat-Sun: 08:00 – 21:00",
    lat: 35.9189,
    lng: 14.4883,
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Spinola+Road,+St.+Julian%27s,+Malta",
    amenities: ["HARBOR VIEW", "MICRO-ROASTER", "WORKSHOP", "NITRO BAR"],
  },
];

export function Locations() {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours() + new Date().getMinutes() / 60);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours() + now.getMinutes() / 60);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const isStoreOpen = (loc: LocationItem) => {
    return currentHour >= loc.openHour && currentHour < loc.closeHour;
  };

  return (
    <section id="locations" className="bg-[#F5F5F7] dark:bg-[#0A0A0C] py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-2">
              REPUBLIC OF MALTA
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[#1D1D1F] dark:text-[#F5F5F7] uppercase">
              Café Ö Locations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed font-medium">
            Visit our flagship extraction labs, coastal promenade kiosks, and harbor view roasteries in Malta.
          </p>
        </div>

        {/* Wide Horizontal Rounded Map Banner Cards (Matching Mockup with Details) */}
        <div className="flex flex-col gap-8">
          {locations.map((loc) => {
            const open = isStoreOpen(loc);

            return (
              <div
                key={loc.id}
                className="group relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-black/10 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between p-6 sm:p-8 md:p-10"
              >
                {/* Embedded Google Map Background Layer (Cropped to hide Google UI/Copyright elements) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <iframe
                    title={`Map for ${loc.name}`}
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`}
                    className="w-[125%] h-[135%] -top-[10%] -left-[10%] relative pointer-events-none transition-all duration-700 ease-out opacity-85 group-hover:opacity-100 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Backdrop Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/75 to-transparent dark:from-black/92 dark:via-black/75 dark:to-transparent pointer-events-none" />
                </div>

                {/* Content Overlay Directly on Top of Map */}
                <div className="relative z-10 max-w-xl space-y-4 pointer-events-auto">
                  
                  {/* City & Open Status */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                      {loc.city}
                    </span>
                    <span className="text-black/30 dark:text-white/30">•</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${
                        open ? "bg-[#00C881] text-white" : "bg-rose-500 text-white"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${open ? "bg-white animate-pulse" : "bg-neutral-200"}`} />
                      {open ? "OPEN NOW" : "CLOSED"}
                    </span>
                  </div>

                  {/* Location Title */}
                  <h3 className="text-2xl sm:text-4xl font-black text-black dark:text-white uppercase tracking-tight leading-tight">
                    {loc.name}
                  </h3>

                  {/* Address, Hours & Phone Details */}
                  <div className="space-y-2 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 pt-1">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-amber-600 dark:text-amber-400">📍</span>
                      <span>{loc.address}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      <span className="text-amber-600 dark:text-amber-400">🕒</span>
                      <span>{loc.hoursText}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      <span className="text-amber-600 dark:text-amber-400">📞</span>
                      <span>{loc.phone}</span>
                    </div>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {loc.amenities.map((am) => (
                      <span
                        key={am}
                        className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-white/80 dark:bg-black/80 backdrop-blur-md text-black dark:text-white px-3 py-1 rounded-full border border-black/10 dark:border-white/10 shadow-sm"
                      >
                        {am}
                      </span>
                    ))}
                  </div>

                  {/* Directions Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => window.open(loc.googleMapsUrl, "_blank")}
                      className="px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-black transition-all rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>GET DIRECTIONS</span>
                      <span className="text-sm">↗</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}





