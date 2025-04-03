"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const galleryImages = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Vista aérea da Reserva Sapetinga",
    caption: "Vista aérea da Reserva Sapetinga",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Área de lazer com piscina",
    caption: "Área de lazer com piscina",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Interior de apartamento modelo",
    caption: "Interior de apartamento modelo",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Jardins paisagísticos",
    caption: "Jardins paisagísticos",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Área de convivência",
    caption: "Área de convivência",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Vista para o mar",
    caption: "Vista para o mar",
  },
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <section id="gallery" className="bg-light-cream py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-dark-green mb-4 text-3xl font-bold md:text-4xl">
            Conheça Nossa Estrutura
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Explore os espaços e ambientes que fazem da Reserva Sapetinga um
            lugar único para viver.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="p-4 font-medium text-white">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 z-10 text-white hover:text-gray-300"
            onClick={goToPrevious}
          >
            <ChevronLeft size={48} />
          </button>
          <div className="relative max-h-[80vh] w-full max-w-4xl">
            <Image
              src={galleryImages[currentImageIndex]?.src || "/placeholder.svg"}
              alt={galleryImages[currentImageIndex]?.alt || ""}
              width={1200}
              height={800}
              className="mx-auto max-h-[80vh] object-contain"
            />
            <p className="mt-4 text-center text-lg text-white">
              {galleryImages[currentImageIndex]?.caption || ""}
            </p>
          </div>
          <button
            className="absolute right-4 z-10 text-white hover:text-gray-300"
            onClick={goToNext}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
}
