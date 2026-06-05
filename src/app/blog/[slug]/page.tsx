import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { POSTS, getPost } from "@/lib/posts";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";

const BASE = "https://www.multidiagnosticosas.com";
const WA = "https://wa.me/573003651525?text=Hola,%20quisiera%20informaci%C3%B3n";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo no encontrado | Multidiagnósticos AS" };
  const url = `${BASE}/blog/${post.slug}`;
  return {
    title: `${post.title} | Multidiagnósticos AS`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.description, url, type: "article" },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    inLanguage: "es-CO",
    mainEntityOfPage: `${BASE}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Multidiagnósticos AS" },
    publisher: {
      "@type": "Organization",
      name: "Multidiagnósticos AS",
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
  };

  return (
    <div className="ind">
      <IndHeader />

      <article className="ind-article"><div className="wrap"><div className="col">
        <a className="back" href="/blog"><ArrowLeft size={15} /> Volver al blog</a>
        <div className="meta mono">{post.category} · {post.date} · {post.readMins} min de lectura</div>
        <h1>{post.title}</h1>
        <p className="lede">{post.description}</p>

        <div className="body">
          {post.body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
            return <p key={i}>{b.text}</p>;
          })}
        </div>

        <div className="acta">
          <h2>¿Tu carro tiene alguno de estos síntomas?</h2>
          <p>Agenda una revisión en Sabanalarga o escríbenos. Te respondemos por WhatsApp en minutos.</p>
          <div className="row">
            <a className="ind-btn" href="/agendar">Agendar servicio <ArrowUpRight size={18} /></a>
            <a className="ind-btn-ghost" style={{ color: "var(--ink)" }} href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        </div>
      </div></div></article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <IndFooter />
    </div>
  );
}
