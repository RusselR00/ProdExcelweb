import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import contactHero from "@assets/generated_images/hero_image_of_an_anchor_handling_tug_at_sea.png";

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
      <div className="relative py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={contactHero}
            alt="Contact Excelessel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
          <div className="absolute inset-0 bg-primary/50 mix-blend-multiply" />
        </div>
        <div className="relative container z-10 mx-auto px-4 flex flex-col items-center justify-center h-full min-h-[300px]">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 drop-shadow-lg">Contact Us</h1>
          <p className="text-xl text-white font-medium drop-shadow-md leading-relaxed">Get in touch for chartering rates and availability.</p>
        </div>
      </div>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Headquarters</h2>
                <p className="text-slate-600 mb-8">
                  Our office is located in the heart of Singapore's maritime district. Reach out to us for any inquiries regarding our fleet or services.
                </p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Office Address</h3>
                      <p className="text-slate-600">10 Anson Road, International Plaza, #35-10 Singapore 079903</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Email</h3>
                      <p className="text-slate-600">management@excelessel.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Phone</h3>
                      <p className="text-slate-600">+65 6123 4567</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" {...field} />
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
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Charter Inquiry: Excelessel One" {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your charter requirements..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-slate-900 font-semibold h-12 text-lg">
                    Send Request
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy-Loading Map */}
      <div className="w-full" style={{ aspectRatio: "16 / 9", maxWidth: "100%" }}>
        {!mapLoaded ? (
          <div
            className="w-full h-full flex items-center justify-between p-6 gap-4 rounded-lg shadow-md"
            style={{
              background: "linear-gradient(180deg, #eef2f7, #dfe7ef)",
              aspectRatio: "16 / 9"
            }}
          >
            <div className="flex-1">
              <div className="font-bold text-lg text-slate-800">Map: 10 Anson Road</div>
              <div className="text-sm text-slate-600 mt-1">
                International Plaza, #35-10, Singapore 079903
              </div>
            </div>
            <Button
              onClick={() => setMapLoaded(true)}
              className="bg-[#0b63d6] hover:bg-[#0b63d6]/90 text-white font-semibold px-6"
            >
              Load Map
            </Button>
          </div>
        ) : (
          <iframe
            src="https://www.google.com/maps?q=10%20Anson%20Road%2C%20International%20Plaza%2C%20%2335-10%2C%20Singapore%20079903&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "8px", aspectRatio: "16 / 9" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          />
        )}
      </div>
    </Layout>
  );
}
