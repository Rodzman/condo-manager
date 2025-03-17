"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="bg-light-cream py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-dark-green mb-4 text-3xl font-bold md:text-4xl">
            Entre em Contato
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Estamos à disposição para esclarecer suas dúvidas e fornecer mais
            informações sobre a Reserva Sapetinga.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h3 className="text-dark-green mb-6 text-2xl font-semibold">
              Envie uma Mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Nome Completo
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[120px] w-full"
                />
              </div>
              <Button
                type="submit"
                className="bg-dark-green hover:bg-dark-green/90 w-full py-6 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
              {submitSuccess && (
                <p className="mt-4 text-center text-green-600">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </p>
              )}
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div className="mb-6 rounded-lg bg-white p-8 shadow-md">
              <h3 className="text-dark-green mb-6 text-2xl font-semibold">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                <ContactInfo
                  icon={<Phone className="text-gold" />}
                  title="Telefone"
                  content="(11) 9999-9999"
                />
                <ContactInfo
                  icon={<Mail className="text-gold" />}
                  title="E-mail"
                  content="contato@reservasapetinga.com.br"
                />
                <ContactInfo
                  icon={<MapPin className="text-gold" />}
                  title="Endereço"
                  content="Av. Principal, 1000 - Sapetinga, SP"
                />
              </div>
            </div>

            <div className="relative h-[300px] overflow-hidden rounded-lg bg-white p-8 shadow-md">
              <div className="absolute inset-0 bg-gray-200">
                {/* Placeholder for map - in a real implementation, you would integrate Google Maps or similar */}
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                  Mapa da Localização
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-4">{icon}</div>
      <div>
        <h4 className="text-dark-green font-medium">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}
