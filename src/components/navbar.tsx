"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 py-2 shadow-md backdrop-blur-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo_reserva_sapetinga-1024x487.png"
            alt="Reserva Sapetinga"
            width={180}
            height={85}
            className="h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="#features"
            className="text-dark-green hover:text-gold font-medium transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="#gallery"
            className="text-dark-green hover:text-gold font-medium transition-colors"
          >
            Galeria
          </Link>
          <Link
            href="#amenities"
            className="text-dark-green hover:text-gold font-medium transition-colors"
          >
            Comodidades
          </Link>
          <Link
            href="#contact"
            className="text-dark-green hover:text-gold font-medium transition-colors"
          >
            Contato
          </Link>
          <Button
            className="bg-dark-green hover:bg-dark-green/90 text-white"
            size="sm"
            asChild
          >
            <Link href="/dashboard">Área do Morador</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-dark-green md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 bg-white shadow-lg md:hidden">
          <div className="container mx-auto flex flex-col space-y-4 px-4 py-4">
            <Link
              href="#features"
              className="text-dark-green hover:text-gold py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="#gallery"
              className="text-dark-green hover:text-gold py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Galeria
            </Link>
            <Link
              href="#amenities"
              className="text-dark-green hover:text-gold py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Comodidades
            </Link>
            <Link
              href="#contact"
              className="text-dark-green hover:text-gold py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <Button
              className="bg-dark-green hover:bg-dark-green/90 w-full text-white"
              size="sm"
            >
              Área do Morador
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
