import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { POSTS } from "@/lib/posts";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog: consejos de mantenimiento | Multidiagnósticos AS",
  description:
    "Consejos prácticos de mantenimiento automotriz: aceite, diagnóstico computarizado, frenos y más. Del taller Multidiagnósticos AS en Sabanalarga.",
  alternates: { canonical: "https://www.multidiagnosticosas.com/blog" },
};

export default function BlogPage() {
  return (
    <div className="ind">
      <IndHeader />

      <section className="ind-blog"><div className="wrap">
        <div className="head">
          <h1>Consejos de <span className="blue">mantenimiento.</span></h1>
          <p>Tips honestos para cuidar tu carro y gastar menos en reparaciones, escritos por el equipo del taller.</p>
        </div>

        <div className="ind-bloglist">
          {POSTS.map((p) => (
            <a className="item" href={`/blog/${p.slug}`} key={p.slug}>
              <div className="meta mono">{p.category} · {p.date} · {p.readMins} min</div>
              <div className="t">{p.title}</div>
              <div className="d">{p.description}</div>
              <span className="more">Leer artículo <ArrowRight size={14} /></span>
            </a>
          ))}
        </div>
      </div></section>

      <IndFooter />
    </div>
  );
}
