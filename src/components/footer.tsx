import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/assets/images/logo_reserva_sapetinga-1024x487.png"
              alt="Reserva Sapetinga"
              width={160}
              height={76}
              className="mb-4 rounded-md bg-white/90 p-2"
            />
            <p className="mt-4 text-gray-300">
              Um lugar exclusivo onde luxo e natureza se encontram para
              proporcionar uma experiência de vida incomparável.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
            </div>
          </div>

          <div>
            <h3 className="text-gold mb-4 text-lg font-semibold">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Sobre</FooterLink>
              <FooterLink href="#gallery">Galeria</FooterLink>
              <FooterLink href="#amenities">Comodidades</FooterLink>
              <FooterLink href="#contact">Contato</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-gold mb-4 text-lg font-semibold">
              Informações
            </h3>
            <ul className="space-y-2">
              <FooterLink href="#">Política de Privacidade</FooterLink>
              <FooterLink href="#">Termos de Uso</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Trabalhe Conosco</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-gold mb-4 text-lg font-semibold">Contato</h3>
            <address className="space-y-2 text-gray-300 not-italic">
              <p>Av. Principal, 1000</p>
              <p>Sapetinga, SP</p>
              <p>CEP: 00000-000</p>
              <p className="mt-4">contato@reservasapetinga.com.br</p>
              <p>(11) 9999-9999</p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Reserva Sapetinga. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="hover:bg-gold hover:text-dark-green flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors"
    >
      {icon}
    </Link>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-gold text-gray-300 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
