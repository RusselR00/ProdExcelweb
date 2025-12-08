import Layout from "@/components/layout";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/side_profile_of_the_aht_vessel.png";
import backgroundImage from "@/../../attached_assets/generated_images/istockphoto-174838259-612x612.jpg";
import chooseUsImage from "@/../../attached_assets/generated_images/new2.jpg";

export default function About() {
  return (
    <Layout>
      {/* Hero Section - Modern with Better Contrast */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Excelessel AHT Vessel"
            className="w-full h-full object-cover"
          />
          {/* Darker overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/40" />
        </div>
        <div className="relative container z-10 mx-auto px-4 md:px-6 text-center md:text-left pt-8 md:pt-20">
          <div className="max-w-3xl mx-auto md:mx-0 bg-[#0a2540]/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 border-2 border-white/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Subtle difference: inline badge instead of separate section */}
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-[#ffa559]/20 border border-[#ffa559]/40 rounded-lg">
                <span className="text-[#ffa559] font-bold text-xs tracking-[0.2em]">EXCELESSEL</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#ffa559]/50 to-transparent"></div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              About <span className="text-[#ffa559]">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 font-medium mb-8 max-w-xl leading-relaxed drop-shadow-lg">
              Delivering maritime excellence through precision engineering, experienced crews, and unwavering commitment to safety.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Our Background - Split Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={backgroundImage} alt="Excelessel Operations" className="w-full h-auto object-cover aspect-[4/3]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Our Background</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                Excelessel was founded with a singular vision: to provide uncompromised marine support services in the bustling maritime hub of Singapore. As a specialized operator, we focus on the nuances of Anchor Handling Tug (AHT) operations, ensuring that every charter is executed with precision engineering and maritime expertise.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Our strategic location in Singapore allows us to effectively serve the Southeast Asian offshore sector, providing rapid deployment and reliable support for shipping, construction, and energy projects.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted partner for specialized tug chartering in the region, recognized for our safety record and operational readiness.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                Delivering power and precision through well-maintained assets and expert crew, ensuring client success in every marine operation.
              </p>
            </div>
          </div>

          {/* Why Choose Us - Split Layout (Reversed) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8">Why Choose Excelessel?</h2>
              <div className="grid gap-6">
                {[
                  { title: "Operational Excellence", desc: "A rigorous approach to maintenance and crew training ensures zero downtime." },
                  { title: "Safety First Culture", desc: "We adhere to international maritime safety standards without compromise." },
                  { title: "Regional Expertise", desc: "Deep understanding of Singapore and regional waters logistical challenges." },
                  { title: "Direct Owner Chartering", desc: "No middlemen – direct communication and accountability." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={chooseUsImage} alt="Our Fleet" className="w-full h-auto object-cover aspect-[4/3]" />
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
