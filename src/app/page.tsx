import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import { ROLES } from "@/constants/roles";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Gallery from "@/components/gallery";
import Amenities from "@/components/amenities";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default async function HomePage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === ROLES.ADMIN;

  return (
    <main className="min-h-screen bg-white">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <Hero />
      <Features />
      <Gallery />
      <Amenities />
      <Contact />
      <Footer />
    </main>
  );
}
