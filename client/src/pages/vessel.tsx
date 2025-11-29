import Layout from "@/components/layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import vesselImage from "@assets/242310_1764415566934.webp";
import detailImage from "@assets/242308_1764415566933.webp";

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
              <img src={vesselImage} alt="BOURBON LIBERTY 200 AHTS" className="rounded-2xl shadow-2xl w-full object-cover ml-[0px] mr-[0px] pl-[0px] pr-[0px] pt-[0px] pb-[0px] mt-[11px] mb-[11px]" />
              <div className="grid grid-cols-2 gap-4">
                <img src={detailImage} alt="Winch Detail" className="rounded-xl shadow-lg w-full h-48 object-cover" />
                <div className="rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-medium text-center">Deck Layout View
                (Coming Soon)</div>
              </div>
            </div>
            
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                Flagship Vessel
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">BOURBON LIBERTY 206</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">The BOURBON LIBERTY 206 is a high-performance DP 2 diesel-electric anchor handling tug supply vessel. Designed for versatility, it offers environmentally friendly propulsion, exceptional maneuverability with fully redundant dynamic positioning (Class II), and capabilities typically found in much larger vessels. It is equally at home serving shallow water ports or deepwater installations.</p>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-primary">
                  Technical Specifications
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Vessel Type</TableCell>
                      <TableCell className="font-bold text-slate-900">AHTS (Anchor Handling Tug Supply)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Dynamic Positioning</TableCell>
                      <TableCell className="font-bold text-slate-900">Class II (DP 2)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Bollard Pull</TableCell>
                      <TableCell className="font-bold text-slate-900">80 Metric Tons (82.5 t Max)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Main Engines</TableCell>
                      <TableCell className="font-bold text-slate-900">3 x 1,825 kW (Diesel Electric)</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium text-slate-500">Propulsion</TableCell>
                      <TableCell className="font-bold text-slate-900">3 x 1,685 kW Z-Drive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Dimensions</TableCell>
                      <TableCell className="font-bold text-slate-900">59.78m (L) x 15.00m (B) x 5.50m (D)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Deck Area</TableCell>
                      <TableCell className="font-bold text-slate-900">331 m² (5 mt/m²)</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium text-slate-500">Deadweight</TableCell>
                      <TableCell className="font-bold text-slate-900">1,460 t (at max draft)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Accommodations</TableCell>
                      <TableCell className="font-bold text-slate-900">20 Persons (Fully Air Conditioned)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Fire Fighting</TableCell>
                      <TableCell className="font-bold text-slate-900">Fi-Fi I (2 x 1,500 m³/h pumps)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="w-full md:w-auto bg-secondary text-slate-900 hover:bg-secondary/80 font-semibold">
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
