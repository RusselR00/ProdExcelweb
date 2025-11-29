import Layout from "@/components/layout";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/side_profile_of_the_aht_vessel.png";

export default function About() {
  return (
    <Layout>
      {/* Hero Section - Modernized */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Excelessel AHT Vessel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent mix-blend-multiply" />
        </div>
        <div className="relative container z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-2xl leading-tight">
              About <span className="text-secondary">Excelessel</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium drop-shadow-lg leading-relaxed">
              Setting the standard in marine chartering reliability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Background</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                Excelessel was founded with a singular vision: to provide uncompromised marine support services in the bustling maritime hub of Singapore. As a specialized operator, we focus on the nuances of Anchor Handling Tug (AHT) operations, ensuring that every charter is executed with precision engineering and maritime expertise.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Our strategic location in Singapore allows us to effectively serve the Southeast Asian offshore sector, providing rapid deployment and reliable support for shipping, construction, and energy projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
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

            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-8">Why Choose Excelessel?</h2>
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
