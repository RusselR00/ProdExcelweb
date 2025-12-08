import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import contactHero from "@assets/generated_images/hero_image_of_an_anchor_handling_tug_at_sea.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [mapLoaded, setMapLoaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. Our team will get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      {/* Hero Section - Modern Style */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={contactHero}
            alt="Contact Excelessel"
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
              Contact <span className="text-[#ffa559]">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 font-medium mb-8 max-w-xl leading-relaxed drop-shadow-lg">
              Get in touch for chartering rates and availability - We're here to support your marine operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form - Modern Styled */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-slate-200">
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 rounded-full bg-[#ffa559]/10 border border-[#ffa559]/30 text-[#ffa559] text-sm font-bold mb-4">
                    Get In Touch
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">Send us a Message</h3>
                  <p className="text-slate-600">Fill out the form and our team will get back to you within 24 hours.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-700">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="h-12 border-2 border-slate-200 focus:border-[#ffa559] rounded-xl transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-700">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@company.com"
                              {...field}
                              className="h-12 border-2 border-slate-200 focus:border-[#ffa559] rounded-xl transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-700">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Charter Inquiry"
                              {...field}
                              className="h-12 border-2 border-slate-200 focus:border-[#ffa559] rounded-xl transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-700">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your requirements..."
                              className="min-h-[150px] border-2 border-slate-200 focus:border-[#ffa559] rounded-xl transition-colors resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full group relative px-8 py-6 font-bold text-base tracking-wide transition-all duration-300 overflow-hidden rounded-2xl bg-gradient-to-r from-[#fd8f43] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#fd8f43] text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Info - Modern Cards */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">Get in Touch</h2>
                <p className="text-slate-600 text-lg mb-8">
                  Our office is located in the heart of Singapore's maritime district. Reach out to us for any inquiries regarding our fleet or services.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    icon: <MapPin className="h-6 w-6" />,
                    title: "Office Address",
                    content: "1 Corporation Drive, Unit 03-02, Singapore 619775"
                  },
                  {
                    icon: <Mail className="h-6 w-6" />,
                    title: "Email",
                    content: "management@excelessel.com"
                  },
                  {
                    icon: <Phone className="h-6 w-6" />,
                    title: "Phone",
                    content: "+65 9825 6032\n+65 8533 2699"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-slate-200 hover:border-[#ffa559]/30 hover:shadow-lg transition-all duration-300">
                    <div className="p-3 rounded-xl bg-[#ffa559]/10 text-[#ffa559] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-primary mb-1">{item.title}</h3>
                      <p className="text-slate-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-2 border-slate-200">
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-slate-600">Loading map...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7388473937847!2d103.75136931475404!3d1.3285968990348766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da10750e8c3af5%3A0x8b8c3e8b8b8b8b8b!2s1%20Corporation%20Dr%2C%20Singapore%20619775!5e0!3m2!1sen!2ssg!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  className="grayscale-[30%] hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
