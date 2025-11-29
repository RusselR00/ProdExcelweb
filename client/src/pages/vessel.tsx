import Layout from "@/components/layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import vesselImage from "@assets/generated_images/side_profile_of_the_aht_vessel.png";
import detailImage from "@assets/generated_images/anchor_handling_equipment_detail.png";

export default function Vessel() {
  return (
    <Layout>
      <div className="bg-slate-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1518106774371-a46c530a2271?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 drop-shadow-lg">Our Fleet</h1>
          <p className="text-xl text-white font-medium drop-shadow-md">Anchor Handling Tug (AHT) Specifications</p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-4">
              <img src={vesselImage} alt="Excelessel One AHT" className="rounded-2xl shadow-2xl w-full object-cover" />
              <div className="grid grid-cols-2 gap-4">
                <img src={detailImage} alt="Winch Detail" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                <div className="rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-medium">
                  Deck Layout View
                </div>
              </div>
            </div>
            
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                Flagship Vessel
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Excelessel One</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                The Excelessel One is a high-performance Anchor Handling Tug designed for versatile marine operations. With powerful bollard pull and advanced maneuvering capabilities, she is built to handle the most demanding towing and positioning tasks in the region.
              </p>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-primary">
                  Technical Specifications
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Vessel Type</TableCell>
                      <TableCell className="font-bold text-slate-900">Anchor Handling Tug (AHT)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Built / Year</TableCell>
                      <TableCell className="font-bold text-slate-900">Singapore / 2018</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Bollard Pull</TableCell>
                      <TableCell className="font-bold text-slate-900">65 Tonnes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Main Engines</TableCell>
                      <TableCell className="font-bold text-slate-900">2x 2500 BHP</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Length Overall</TableCell>
                      <TableCell className="font-bold text-slate-900">48.0 m</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Deck Space</TableCell>
                      <TableCell className="font-bold text-slate-900">220 m²</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Class</TableCell>
                      <TableCell className="font-bold text-slate-900">ABS + A1 Towing Vessel</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="w-full md:w-auto bg-primary text-white hover:bg-primary/90">
                    Inquire Availability
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
