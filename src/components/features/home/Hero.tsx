import Image from "next/image";
import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Reserva Sapetinga"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
          Bem-vindo à Reserva Sapetinga
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90 drop-shadow-md md:text-2xl">
          Um refúgio exclusivo onde luxo e natureza se encontram para
          proporcionar uma experiência de vida incomparável.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            className="bg-gold text-dark-green hover:bg-gold/90 font-semibold"
          >
            Agende uma Visita
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border border-white/50 bg-white/20 font-semibold text-white backdrop-blur-sm hover:bg-white/30"
          >
            Conheça Mais
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform animate-bounce">
        <div className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-white/70">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/70"></div>
        </div>
      </div>
    </section>
  );
}
