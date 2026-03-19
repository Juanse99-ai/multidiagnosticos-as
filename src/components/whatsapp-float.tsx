"use client";

import Image from "next/image";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/573003651525?text=Hola,%20quisiera%20asesoría%20técnica"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-40 transition-transform duration-300 hover:scale-105 drop-shadow-lg"
    >
      <Image
        src="/asesor-whatsapp.webp"
        alt="Asesor Multidiagnósticos AS"
        width={160}
        height={160}
        className="w-40 h-auto max-md:w-28"
      />
    </a>
  );
}
