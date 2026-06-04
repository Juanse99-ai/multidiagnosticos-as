import { CalendarCheck } from "lucide-react";

export function IndHeader() {
  return (
    <div className="ind-header">
      <div className="bar">
        <a href="/" aria-label="Multidiagnósticos AS — inicio">
          <img src="/logo.png" alt="Multidiagnósticos AS" className="ind-logo" />
        </a>
        <nav className="ind-nav">
          <a href="/taller">Taller</a>
          <a href="/autopartes">Autopartes</a>
          <a href="/agendar">Agendar</a>
          <a href="/#contacto">Contacto</a>
        </nav>
        <a className="ind-cta" href="/agendar"><CalendarCheck size={16} /> Agendar</a>
      </div>
    </div>
  );
}
