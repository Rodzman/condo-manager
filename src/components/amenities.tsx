import {
  PocketIcon as Pool,
  Dumbbell,
  Trees,
  UtensilsCrossed,
  Shield,
  Car,
  Wifi,
  Bike,
} from "lucide-react";

export default function Amenities() {
  return (
    <section id="amenities" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-dark-green mb-4 text-3xl font-bold md:text-4xl">
            Comodidades Exclusivas
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Desfrute de uma infraestrutura completa pensada para proporcionar
            conforto, bem-estar e lazer para você e sua família.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          <AmenityCard icon={<Pool />} title="Piscinas" />
          <AmenityCard icon={<Dumbbell />} title="Academia" />
          <AmenityCard icon={<Trees />} title="Áreas Verdes" />
          <AmenityCard icon={<UtensilsCrossed />} title="Espaço Gourmet" />
          <AmenityCard icon={<Shield />} title="Segurança 24h" />
          <AmenityCard icon={<Car />} title="Estacionamento" />
          <AmenityCard icon={<Wifi />} title="Wi-Fi nas áreas comuns" />
          <AmenityCard icon={<Bike />} title="Ciclovia" />
        </div>
      </div>
    </section>
  );
}

function AmenityCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-light-cream rounded-lg border border-gray-100 p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-gold/20 text-dark-green mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
        {icon}
      </div>
      <h3 className="text-dark-green text-lg font-semibold">{title}</h3>
    </div>
  );
}
