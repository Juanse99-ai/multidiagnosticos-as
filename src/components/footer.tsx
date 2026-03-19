import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-9">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Multidiagnósticos AS"
              width={180}
              height={44}
              className="h-11 w-auto drop-shadow-md mb-3"
            />
            <p className="text-white/90 text-sm leading-relaxed max-w-sm">
              Somos expertos en diagnóstico computarizado, mantenimiento
              automotriz y autopartes originales.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-bold text-base mb-3">Categorías</h4>
            <ul className="space-y-2 text-sm">
              {["Baterías", "Filtros", "Aceites", "Bujías", "Bobinas"].map(
                (cat) => (
                  <li key={cat}>
                    <Link href="/#catalogo" className="text-white/90 hover:underline">
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Acerca de */}
          <div>
            <h4 className="font-bold text-base mb-3">Acerca de</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/taller" className="text-white/90 hover:underline">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/#agenda" className="text-white/90 hover:underline">
                  Agendar cita
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-white/90 hover:underline">
                  Contáctenos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-base mb-3">Servicio y contacto</h4>
            <div className="text-sm text-white/90 space-y-2">
              <p>Cra. 27 #13-05, Sabanalarga – Atlántico</p>
              <p>
                <a href="tel:+573003651525" className="hover:underline">
                  (+57) 300 365 1525
                </a>
              </p>
              <p>
                <a
                  href="mailto:contacto@multidiagnosticosas.com"
                  className="hover:underline"
                >
                  contacto@multidiagnosticosas.com
                </a>
              </p>
              <p>Lunes a Viernes: 08:00 AM – 05:30 PM</p>
              <p>Sábado: 08:30 AM – 04:00 PM</p>
            </div>

            <h4 className="font-bold text-base mt-4 mb-2">Síguenos</h4>
            <div className="flex gap-4">
              {[
                {
                  href: "https://www.tiktok.com/@multidiagnosticosas",
                  label: "TikTok",
                  icon: (
                    <path
                      fill="currentColor"
                      d="M15.75 2c.2 2.04 1.48 3.77 3.25 4.62A7.1 7.1 0 0 0 19 3.5a6.5 6.5 0 0 1-3.25-1.5V2h0v10.3a5 5 0 1 1-4.2-4.95v2.3a2.7 2.7 0 1 0 1.5 2.42V2h2.7z"
                    />
                  ),
                },
                {
                  href: "https://www.facebook.com/multidiagnosticosas",
                  label: "Facebook",
                  icon: (
                    <path
                      fill="currentColor"
                      d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.6V12h2.6V9.7c0-2.6 1.5-4 3.8-4c1.1 0 2.2.2 2.2.2V8h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.46 2.9h-2.4v7A10 10 0 0 0 22 12z"
                    />
                  ),
                },
                {
                  href: "https://www.instagram.com/multidiagnosticosas",
                  label: "Instagram",
                  icon: (
                    <>
                      <path
                        fill="currentColor"
                        d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Z"
                      />
                      <path
                        fill="currentColor"
                        d="M16.9 2H7.1A5.1 5.1 0 0 0 2 7.1v9.8A5.1 5.1 0 0 0 7.1 22h9.8A5.1 5.1 0 0 0 22 16.9V7.1A5.1 5.1 0 0 0 16.9 2Zm3.3 14.9a3.3 3.3 0 0 1-3.3 3.3H7.1a3.3 3.3 0 0 1-3.3-3.3V7.1a3.3 3.3 0 0 1 3.3-3.3h9.8a3.3 3.3 0 0 1 3.3 3.3v9.8Z"
                      />
                      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
                    </>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-white/25" />
      <div className="text-center py-4 text-white/90 text-sm">
        <p>
          © {year} <strong>Multidiagnósticos AS</strong>. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
