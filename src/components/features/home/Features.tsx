import { Shield, Home, Leaf, Waves } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-dark-green mb-4 text-3xl font-bold md:text-4xl">
            Viva em Harmonia com a Natureza
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            A Reserva Sapetinga oferece uma experiência de vida única,
            combinando conforto, segurança e contato com a natureza em um
            ambiente exclusivo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Shield className="text-dark-green h-12 w-12" />}
            title="Segurança 24h"
            description="Sistema de segurança avançado com monitoramento 24 horas e controle de acesso para sua tranquilidade."
          />
          <FeatureCard
            icon={<Home className="text-dark-green h-12 w-12" />}
            title="Arquitetura Premium"
            description="Residências projetadas com os mais altos padrões de qualidade, conforto e sofisticação."
          />
          <FeatureCard
            icon={<Leaf className="text-dark-green h-12 w-12" />}
            title="Áreas Verdes"
            description="Amplas áreas verdes preservadas, trilhas ecológicas e jardins paisagísticos para seu bem-estar."
          />
          <FeatureCard
            icon={<Waves className="text-dark-green h-12 w-12" />}
            title="Lazer Completo"
            description="Infraestrutura completa de lazer com piscinas, quadras esportivas, academia e espaços gourmet."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-light-cream group rounded-lg border border-gray-100 p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-dark-green mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
