import { Wrench, Disc3, CarFront, Cpu } from "lucide-react";

const services = [
  {
    title: "Cambio de aceite",
    desc: "Incluye filtro y revisión.",
    icon: Wrench,
  },
  {
    title: "Frenos",
    desc: "Pastillas, discos y líquido.",
    icon: Disc3,
  },
  {
    title: "Suspensión",
    desc: "Amortiguadores y alineación.",
    icon: CarFront,
  },
  {
    title: "Diagnóstico OBD-II",
    desc: "Scanner y pruebas.",
    icon: Cpu,
  },
];

export function ServicesSection() {
  return (
    <section
      id="servicios"
      className="py-14 border-t border-border bg-gradient-to-br from-blue-50/50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-8">
          Servicios de taller
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc) => (
            <article
              key={svc.title}
              className="bg-card border border-border rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-3 group-hover:bg-brand-blue/20 transition-colors">
                <svc.icon className="w-5 h-5 text-brand-blue" />
              </div>
              <h3 className="font-bold text-lg mb-1">{svc.title}</h3>
              <p className="text-muted-foreground text-sm">{svc.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
