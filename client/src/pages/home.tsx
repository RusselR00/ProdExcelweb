import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Anchor, ShieldCheck, Globe } from "lucide-react";
import heroImage from "@assets/generated_images/hero_image_of_an_anchor_handling_tug_at_sea.png";
import tugImage from "@assets/generated_images/tugboat_towing_a_barge.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Excelessel AHT Vessel at Sea" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent mix-blend-multiply" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 text-center md:text-left pt-20">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Precision. Power. <br/>
              <span className="text-secondary">Reliability.</span>
            </h1>
            <p className="text-lg md:text-xl text-white font-medium mb-8 max-w-xl leading-relaxed drop-shadow-md">
              Specialized Anchor Handling Tug chartering and marine support operations. We deliver maritime excellence across Singapore and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="text-base px-8 h-12 bg-secondary hover:bg-secondary/90 text-white border-none shadow-lg shadow-secondary/20">
                  Request Charter
                </Button>
              </Link>
              <Link href="/vessel">
                <Button size="lg" variant="outline" className="text-base px-8 h-12 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm bg-white/10">
                  Fleet Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features Strip */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Safety First</h3>
                <p className="text-sm text-white/70">Adhering to highest maritime safety standards</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                <Anchor className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Specialized Fleet</h3>
                <p className="text-sm text-white/70">Dedicated Anchor Handling Tug capabilities</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Regional Reach</h3>
                <p className="text-sm text-white/70">Operating throughout SE Asia waters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Teaser */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={tugImage} alt="Tug Operation" className="w-full h-auto object-cover aspect-[4/3]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h4 className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">Who We Are</h4>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Marine Logistics Experts You Can Trust</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Excelessel is a premier marine chartering service based in Singapore. We specialize in providing high-reliability tug support for complex offshore operations. With a focus on operational excellence and safety, our team ensures your maritime logistics needs are met with precision.
              </p>
              <ul className="space-y-3 mb-8">
                {["Experienced Crew & Management", "Modern AHT Vessel Fleet", "24/7 Operational Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="ghost" className="group text-primary p-0 hover:bg-transparent hover:text-secondary">
                  Read More About Us <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Our Core Services</h2>
            <p className="text-slate-600">Comprehensive marine solutions tailored for the offshore and shipping industry.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Tug Chartering", desc: "Reliable towage and barge handling services for regional logistics." },
              { title: "Anchor Handling", desc: "Expert assistance in anchor deployment and retrieval for offshore rigs." },
              { title: "Offshore Support", desc: "Supply and standby duties ensuring operational continuity." }
            ].map((service, i) => (
              <div key={i} className="group p-8 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Anchor className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.desc}</p>
                <Link href="/services">
                  <span className="text-sm font-semibold text-secondary cursor-pointer">Learn Details &rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
