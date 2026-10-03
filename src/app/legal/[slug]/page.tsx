import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { LEGAL_DOCS, getLegalDoc } from "@/lib/legal";
import { ArrowLeft, MessageSquareWarning } from "lucide-react";

const BASE = "https://www.multidiagnosticosas.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Documento no encontrado | Multidiagnósticos AS" };
  const url = `${BASE}/legal/${doc.slug}`;
  return {
    title: `${doc.title} | Multidiagnósticos AS`,
    description: doc.description,
    alternates: { canonical: url },
    openGraph: { title: doc.title, description: doc.description, url, type: "website" },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <div className="ind">
      <IndHeader />

      <article className="ind-article ind-legal"><div className="wrap"><div className="col">
        <a className="back" href="/"><ArrowLeft size={15} /> Volver al inicio</a>
        <div className="meta mono">Información legal · Actualizado el {doc.updated}</div>
        <h1>{doc.title}</h1>
        <p className="lede">{doc.description}</p>

        <div className="body">
          {doc.body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
            return <p key={i}>{b.text}</p>;
          })}
        </div>

        <nav className="ind-legal-nav" aria-label="Otros documentos legales">
          <h2>Otros documentos</h2>
          <ul>
            {LEGAL_DOCS.filter((d) => d.slug !== doc.slug).map((d) => (
              <li key={d.slug}><a href={`/legal/${d.slug}`}>{d.title}</a></li>
            ))}
          </ul>
          <a className="ind-btn" href="/pqrs"><MessageSquareWarning size={18} /> Radicar PQRS</a>
        </nav>
      </div></div></article>

      <IndFooter />
    </div>
  );
}
