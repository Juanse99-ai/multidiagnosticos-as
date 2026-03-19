import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export function ContactSection() {
  return (
    <section id="contacto" className="py-14 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-8">
          Contacto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-blue" />
              Visítanos
            </h3>
            <p>Cra. 27 #13-05, Sabanalarga – Atlántico</p>
            <p>
              <strong>Lunes a Viernes:</strong> 08:00 AM – 05:30 PM
            </p>
            <p>
              <strong>Sábado:</strong> 08:30 AM – 04:00 PM
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-brand-blue" />
              Escríbenos
            </h3>
            <p>
              <a
                href="tel:+573003651525"
                className="text-brand-blue hover:underline flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                (+57) 300 365 1525
              </a>
            </p>
            <p>
              <a
                href="mailto:contacto@multidiagnosticosas.com"
                className="text-brand-blue hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                contacto@multidiagnosticosas.com
              </a>
            </p>
            <a
              href="https://wa.me/573003651525?text=Hola,%20quisiera%20información"
              target="_blank"
              rel="noopener"
              className={cn(buttonVariants(), "mt-2")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
