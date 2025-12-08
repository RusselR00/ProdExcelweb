import Layout from "@/components/layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import vesselImage from "@assets/242310_1764415566934.png";
import detailImage from "@assets/242308_1764415566933.png";
import additionalImage1 from "@assets/242308_17644155669335.jpg";
import additionalImage2 from "@assets/242310_1764415566936.jpg";
import additionalImage3 from "@assets/download_1764415566937.png";
import fleetHeroImage from "@assets/d0f8766d-5333-495d-a6e2-f11167107e9a.jpeg";

export default function Vessel() {
  return (
    <Layout>
      {/* Hero Section - Modern Style */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={fleetHeroImage}
            alt="Excelessel Fleet"
            className="w-full h-full object-cover"
          />
          {/* Darker overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/40" />
        </div>
        <div className="relative container z-10 mx-auto px-4 md:px-6 text-center md:text-left pt-8 md:pt-20">
          <div className="max-w-3xl mx-auto md:mx-0 bg-[#0a2540]/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 border-2 border-white/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Inline badge with line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-[#ffa559]/20 border border-[#ffa559]/40 rounded-lg">
                <span className="text-[#ffa559] font-bold text-xs tracking-[0.2em]">EXCELESSEL</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#ffa559]/50 to-transparent"></div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              Our <span className="text-[#ffa559]">Fleet</span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 font-medium mb-8 max-w-xl leading-relaxed drop-shadow-lg">
              Anchor Handling Tug (AHT) Specifications - Precision-engineered vessels for demanding marine operations.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
            {/* Modern Image Gallery */}
            <div className="space-y-6">
              {/* Main featured image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img src={vesselImage} alt="AQUA HERCULES AHTS" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: detailImage, alt: "Vessel Detail 1" },
                  { src: additionalImage1, alt: "Vessel Detail 2" },
                  { src: additionalImage2, alt: "Vessel Detail 3" },
                  { src: additionalImage3, alt: "Vessel Detail 4" }
                ].map((img, i) => (
                  <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg group">
                    <img src={img.src} alt={img.alt} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vessel Information */}
            <div className="lg:sticky lg:top-24">
              <div className="inline-block px-4 py-2 rounded-full bg-[#ffa559]/10 border border-[#ffa559]/30 text-[#ffa559] text-sm font-bold mb-4">
                Flagship Vessel
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">AQUA HERCULES</h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                The AQUA HERCULES is a high-performance DP 2 diesel-electric anchor handling tug supply vessel. Designed for versatility, it offers environmentally friendly propulsion, exceptional maneuverability with fully redundant dynamic positioning (Class II), and capabilities typically found in much larger vessels.
              </p>

              {/* Modern Specification Cards */}
              <div className="space-y-3 mb-8">
                {[
                  { label: "Vessel Type", value: "AHTS (Anchor Handling Tug Supply)" },
                  { label: "Dynamic Positioning", value: "Class II (DP 2)" },
                  { label: "Bollard Pull", value: "80 Metric Tons (82.5 t Max)" },
                  { label: "Main Engines", value: "3 x 1,825 kW (Diesel Electric)" },
                  { label: "Propulsion", value: "3 x 1,685 kW Z-Drive" },
                  { label: "Dimensions", value: "59.78m (L) x 15.00m (B) x 5.50m (D)" },
                  { label: "Deck Area", value: "331 m² (5 mt/m²)" },
                  { label: "Deadweight", value: "1,460 t (at max draft)" },
                  { label: "Accommodations", value: "20 Persons (Fully Air Conditioned)" },
                  { label: "Fire Fighting", value: "Fi-Fi I (2 x 1,500 m³/h pumps)" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-[#ffa559]/30 hover:shadow-md transition-all duration-300">
                    <span className="font-semibold text-slate-500 text-sm">{spec.label}</span>
                    <span className="font-bold text-primary text-sm text-right ml-4">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href="/contact">
                <Button size="lg" className="w-full group relative px-8 py-6 font-bold text-base tracking-wide transition-all duration-300 overflow-hidden rounded-2xl bg-gradient-to-r from-[#fd8f43] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#fd8f43] text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Inquire Availability
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
