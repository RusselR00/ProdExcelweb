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
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img src={servicesHero} alt="Offshore Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="absolute inset-0 bg-primary/50 mix-blend-multiply" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 drop-shadow-lg">Our Services</h1>
          <p className="text-xl text-white font-medium max-w-2xl mx-auto drop-shadow-md leading-relaxed">Comprehensive marine solutions for a demanding industry.</p>
        </div>
      </div>

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
          <a href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90">
            Contact Operations Team
          </a>
        </div>
      </section>
    </Layout>
  );
}
