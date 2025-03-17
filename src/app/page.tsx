import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Gallery from "@/components/gallery";
import Amenities from "@/components/amenities";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Amenities />
      <Contact />
      <Footer />
    </main>
  );
}
