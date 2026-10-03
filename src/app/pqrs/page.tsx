import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { IndPqrsForm } from "@/components/ind-pqrs-form";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Radicar PQRS | Multidiagnósticos AS",
  description:
    "Radica peticiones, quejas, reclamos, sugerencias o solicitudes sobre tus datos personales. Te damos un número de radicado y respondemos en máximo 15 días hábiles.",
  alternates: { canonical: "/pqrs" },
};

export default function PqrsPage() {
  return (
    <div className="ind">
      <IndHeader />

      <article className="ind-article ind-legal"><div className="wrap"><div className="col">
        <a className="back" href="/"><ArrowLeft size={15} /> Volver al inicio</a>
        <div className="meta mono">Atención al cliente</div>
        <h1>Radicar PQRS</h1>
        <p className="lede">
          Peticiones, quejas, reclamos, sugerencias o felicitaciones sobre nuestros servicios, repuestos o el uso de tus datos personales.
          Te damos un número de radicado y te respondemos en máximo 15 días hábiles.
        </p>

        <IndPqrsForm />

        <div className="body">
          <h2>Otros canales</h2>
          <ul>
            <li>Correo: contacto@multidiagnosticosas.com</li>
            <li>WhatsApp: (+57) 300 365 1525</li>
            <li>En el taller: Cra. 27 #13-05, Sabanalarga, Atlántico</li>
          </ul>
          <p>
            Si no estás de acuerdo con nuestra respuesta, puedes acudir a la Superintendencia de Industria y Comercio:{" "}
            <a className="ind-legal-ext" href="https://www.sic.gov.co" target="_blank" rel="noopener">www.sic.gov.co <ExternalLink size={14} /></a>
          </p>
        </div>
      </div></div></article>

      <IndFooter />
    </div>
  );
}
