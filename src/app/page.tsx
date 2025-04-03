import {
  Amenities,
  Contact,
  Features,
  Gallery,
  Hero,
} from "@/components/features/home";
import { Footer, Navbar } from "@/components/features/layout";

export default async function LandingPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar />

      <Hero />
      <Features />
      <Gallery />
      <Amenities />
      <Contact />

      <Footer />
    </div>
  );
}
