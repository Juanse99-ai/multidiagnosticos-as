import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";

const WA = "https://wa.me/573003651525?text=Hola,%20quisiera%20informaci%C3%B3n";

export function IndFooter() {
  return (
    <div className="ind-footer">
      <div className="ftop">
        <div>
          <div className="big">¿Tu carro<br />falla? <span className="blue">Hablemos.</span></div>
          <a className="fcta" href={WA} target="_blank" rel="noopener"><MessageCircle size={16} /> Escríbenos por WhatsApp</a>
        </div>
        <div>
          <h4>Servicio</h4>
          <div className="row">Sincronización · Escáner</div>
          <div className="row">Frenos · Suspensión</div>
          <div className="row">Motores · Inyectores</div>
          <div className="row">Autopartes</div>
        </div>
        <div>
          <h4>Contacto</h4>
          <div className="row"><MapPin size={15} color="#6E8BFF" /> Cra. 27 #13-05, Sabanalarga</div>
          <div className="row"><Phone size={15} color="#6E8BFF" /> (+57) 300 365 1525</div>
          <div className="row"><Mail size={15} color="#6E8BFF" /> contacto@multidiagnosticosas.com</div>
        </div>
      </div>
      <div className="fbot">
        <span>© 2026 Multidiagnósticos AS. Todos los derechos reservados.</span>
        <span className="veta">Diseño y desarrollo · <b>Veta Studio</b></span>
      </div>
    </div>
  );
}
