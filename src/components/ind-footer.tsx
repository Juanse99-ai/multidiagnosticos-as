import { MessageCircle, MapPin, Phone, Mail, Instagram, MessageSquareWarning, ExternalLink } from "lucide-react";
import { IndWhatsApp } from "./ind-whatsapp";
import { IndCookies, CookieSettingsLink } from "./ind-cookies";
import { LEGAL_DOCS } from "@/lib/legal";
import "@/styles/ind-legal.css";

const WA = "https://wa.me/573003651525?text=Hola,%20quisiera%20informaci%C3%B3n";

export function IndFooter() {
  return (
    <>
    <div className="ind-footer">
      <div className="ftop">
        <div className="fbrand">
          <div className="big">¿Tu carro<br />falla? <span className="blue">Hablemos.</span></div>
          <div className="fbtns">
            <a className="fcta" href={WA} target="_blank" rel="noopener"><MessageCircle size={16} /> WhatsApp</a>
            <a className="fpqrs" href="/pqrs"><MessageSquareWarning size={16} /> Radicar PQRS</a>
          </div>
        </div>
        <div className="fsvc">
          <h4>Servicio</h4>
          <div className="row">Sincronización · Escáner</div>
          <div className="row">Frenos · Suspensión</div>
          <div className="row">Motores · Inyectores</div>
          <a className="row" href="/baterias">Baterías Tudor</a>
          <a className="row" href="/autopartes">Autopartes</a>
        </div>
        <div className="fcon">
          <h4>Contacto</h4>
          <div className="row"><MapPin size={15} color="#6E8BFF" /> Cra. 27 #13-05, Sabanalarga, Atlántico</div>
          <div className="row"><Phone size={15} color="#6E8BFF" /> (+57) 300 365 1525 · 302 319 1749</div>
          <div className="row"><Mail size={15} color="#6E8BFF" /> contacto@multidiagnosticosas.com</div>
          <a className="row" href="https://www.instagram.com/multidiagnosticosas" target="_blank" rel="noopener"><Instagram size={15} color="#6E8BFF" /> @multidiagnosticosas</a>
        </div>
        <div className="flegal">
          <h4>Legal</h4>
          {LEGAL_DOCS.map((d) => (
            <a className="row" href={`/legal/${d.slug}`} key={d.slug}>{d.short}</a>
          ))}
          <CookieSettingsLink className="row flink" />
        </div>
      </div>
      <div className="fbot">
        <span>© 2026 Multidiagnósticos AS. Todos los derechos reservados.</span>
        <a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio <ExternalLink size={12} /></a>
        <span className="veta">Diseño y desarrollo · <b>Veta Studio</b></span>
      </div>
    </div>

    <IndWhatsApp />
    <IndCookies />
    </>
  );
}
