import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Ship, CheckCircle2, ArrowRight } from "lucide-react";
import tugImage from "@assets/generated_images/tugboat_towing_a_barge.png";

export default function TugChartering() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={tugImage}
                        alt="Tug Chartering Services"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/40" />
                </div>
                <div className="relative container z-10 mx-auto px-4 md:px-6 text-center md:text-left pt-8 md:pt-20">
                    <div className="max-w-3xl mx-auto md:mx-0 bg-[#0a2540]/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 border-2 border-white/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-3 py-1 bg-[#ffa559]/20 border border-[#ffa559]/40 rounded-lg">
                                <span className="text-[#ffa559] font-bold text-xs tracking-[0.2em]">EXCELESSEL</span>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#ffa559]/50 to-transparent"></div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-2xl">
                            Tug <span className="text-[#ffa559]">Chartering</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/95 font-medium mb-8 max-w-xl leading-relaxed drop-shadow-lg">
                            Reliable towage and barge handling services for regional logistics and marine operations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Service Overview</h2>
                        <p className="text-slate-600 leading-relaxed text-lg mb-8">
                            Our tug chartering services provide comprehensive towage solutions for a wide range of marine operations. From barge handling to vessel assistance, our experienced crew and well-maintained fleet ensure safe and efficient operations across Southeast Asian waters.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {[
                                "Barge Towing & Transportation",
                                "Vessel Assist & Escort",
                                "Harbor & Port Operations",
                                "Coastal Towage Services",
                                "Project Cargo Support",
                                "Emergency Towing Response"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#ffa559]/30 hover:shadow-md transition-all">
                                    <CheckCircle2 className="h-6 w-6 text-[#ffa559] flex-shrink-0 mt-0.5" />
                                    <span className="font-semibold text-slate-700">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg mb-8">
                            <h3 className="text-2xl font-heading font-bold text-primary mb-4">Why Choose Our Tug Services?</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">Experienced Crew</h4>
                                    <p className="text-slate-600">Our certified maritime professionals have extensive experience in complex towing operations and regional waters navigation.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">Modern Fleet</h4>
                                    <p className="text-slate-600">Well-maintained vessels equipped with advanced navigation systems and powerful engines for reliable performance.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">24/7 Availability</h4>
                                    <p className="text-slate-600">Round-the-clock operations support ensuring your schedule stays on track, day or night.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto group relative px-8 py-6 font-bold text-base tracking-wide transition-all duration-300 overflow-hidden rounded-2xl bg-gradient-to-r from-[#fd8f43] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#fd8f43] text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Request Charter Quote
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white">
                                    View All Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
