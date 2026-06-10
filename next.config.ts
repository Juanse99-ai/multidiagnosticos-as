import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirecciones 301/308 desde las URLs del sitio HTML anterior (.html) hacia
  // las rutas nuevas, para no perder posicionamiento ni dejar errores 404 en Google.
  async redirects() {
    return [
      { source: "/taller.html", destination: "/taller", permanent: true },
      { source: "/catalogo.html", destination: "/autopartes", permanent: true },
    ];
  },
};

export default nextConfig;
