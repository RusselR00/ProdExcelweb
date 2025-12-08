import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Anchor, Ship, LifeBuoy, Navigation, Zap, ShieldAlert } from "lucide-react";
import servicesHero from "@assets/generated_images/offshore_supply_vessel_near_rig.png";

export default function Services() {
  const services = [
    {
      icon: <Ship className="h-8 w-8 text-secondary" />,
      title: "Tug Chartering",
      desc: "Full-service chartering for barge towing, rig moves, and coastal towage operations. Available for spot and term charters."
    },
    {
      icon: <Anchor className="h-8 w-8 text-secondary" />,
      title: "Anchor Handling",
      desc: "Specialized assistance for offshore rigs, including anchor deployment, recovery, and positioning support."
    },
    {
      icon: <LifeBuoy className="h-8 w-8 text-secondary" />,
      title: "Offshore Support",
      desc: "Transportation of supplies, equipment, and personnel to offshore installations with reliability and safety."
    },
    {
      icon: <Navigation className="h-8 w-8 text-secondary" />,
      title: "Towage Operations",
      desc: "Harbor and ocean towage services provided by experienced crew familiar with regional currents and routes."
    },
    {
      icon: <ShieldAlert className="h-8 w-8 text-secondary" />,
      title: "Emergency Standby",
      desc: "Vessel readiness for emergency response, oil spill recovery support, and rescue operations."
    },
    {
      icon: <Zap className="h-8 w-8 text-secondary" />,
      title: "Marine Logistics",
      desc: "End-to-end project support for marine construction, dredging assistance, and heavy lift transport."
    }
  ];

  return (
    <Layout>
      {/* Hero Section - Modern Style */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={servicesHero}
            alt="Offshore Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center md:text-left pt-8 md:pt-20">
          <div className="max-w-3xl mx-auto md:mx-0 bg-[#0a2540]/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 border-2 border-white/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-[#ffa559]/20 border border-[#ffa559]/40 rounded-lg">
                <span className="text-[#ffa559] font-bold text-xs tracking-[0.2em]">EXCELESSEL</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#ffa559]/50 to-transparent"></div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              Our <span className="text-[#ffa559]">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 font-medium mb-8 max-w-xl leading-relaxed drop-shadow-lg">
              Comprehensive marine solutions for a demanding industry - precision, reliability, excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="mb-4 p-3 w-fit rounded-xl bg-slate-100">{service.icon}</div>
                  <CardTitle className="text-xl font-bold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Need a Customized Solution?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Every marine project is unique. Contact our operations team to discuss your specific vessel requirements and operational parameters.
          </p>
          <a href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-secondary px-8 text-sm font-semibold text-slate-900 shadow transition-colors hover:bg-secondary/80">
            Contact Operations Team
          </a>
        </div>
      </section>
    </Layout>
  );
}
