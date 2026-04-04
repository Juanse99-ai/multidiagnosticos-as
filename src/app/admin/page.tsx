"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PROMOS = [
  { title: "Diagnóstico Computarizado", icon: "🔍", color: "#60a5fa" },
  { title: "Cambio de Aceite + Filtro",  icon: "🛢️", color: "#34d399" },
  { title: "Check-Up Completo",          icon: "✅", color: "#a78bfa" },
  { title: "Revisión Freno ABS",         icon: "🛑", color: "#fb7185" },
  { title: "Kit de Distribución",        icon: "⚙️", color: "#fbbf24" },
];

const ADMIN_PASS = "multidiag2024";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass]     = useState("");
  const [error, setError]   = useState("");
  const [images, setImages] = useState<Record<number, string>>({});
  const [uploading, setUploading] = useState<number | null>(null);
  const [msg, setMsg]       = useState<Record<number, string>>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Load current images from manifest
  useEffect(() => {
    if (!authed) return;
    fetch("/promotions/manifest.json")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        const parsed: Record<number, string> = {};
        for (const [k, v] of Object.entries(data)) {
          parsed[parseInt(k)] = v;
        }
        setImages(parsed);
      })
      .catch(() => {});
  }, [authed]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      setAuthed(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  }

  async function handleUpload(file: File, index: number) {
    setUploading(index);
    setMsg((prev) => ({ ...prev, [index]: "" }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("index", String(index));

    try {
      const res = await fetch("/api/upload-promo", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setMsg((prev) => ({ ...prev, [index]: `Error: ${data.error}` }));
      } else {
        // Add cache-busting param so the browser reloads the image
        setImages((prev) => ({ ...prev, [index]: data.path + "?t=" + Date.now() }));
        setMsg((prev) => ({ ...prev, [index]: "✓ Imagen subida correctamente" }));
      }
    } catch {
      setMsg((prev) => ({ ...prev, [index]: "Error al subir la imagen" }));
    } finally {
      setUploading(null);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold font-display text-white mb-1">Admin</h1>
          <p className="text-white/50 text-sm mb-6">Imágenes de promociones</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-brand-blue-light"
            />
            {error && <p className="text-rose-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-display text-white mb-1">
            Imágenes de Promociones
          </h1>
          <p className="text-white/50 text-sm">
            Sube una imagen para cada tarjeta. Después de subir, haz commit y push a
            GitHub para publicar los cambios en el sitio web.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROMOS.map((promo, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Image preview */}
              <div className="relative h-44 bg-white/5 flex items-center justify-center">
                {images[i] ? (
                  <Image
                    src={images[i]}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-5xl">{promo.icon}</span>
                )}
              </div>

              {/* Info & upload */}
              <div className="p-4">
                <p className="text-white font-semibold text-sm mb-3">{promo.title}</p>

                <button
                  onClick={() => inputRefs.current[i]?.click()}
                  disabled={uploading === i}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all border"
                  style={{
                    borderColor: promo.color + "55",
                    color: promo.color,
                    backgroundColor: promo.color + "18",
                  }}
                >
                  {uploading === i ? "Subiendo…" : images[i] ? "Cambiar imagen" : "Subir imagen"}
                </button>

                <input
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file, i);
                    e.target.value = "";
                  }}
                />

                {msg[i] && (
                  <p
                    className={`text-xs mt-2 ${
                      msg[i].startsWith("✓") ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {msg[i]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 border border-brand-blue/30 bg-brand-blue/10 rounded-xl">
          <p className="text-brand-blue-light text-sm font-semibold mb-1">Recuerda publicar los cambios</p>
          <p className="text-white/50 text-xs">
            Después de subir las imágenes, abre la terminal y ejecuta: <br />
            <code className="text-white/80">git add . &amp;&amp; git commit -m &quot;Actualizar imágenes promociones&quot; &amp;&amp; git push</code>
          </p>
        </div>
      </div>
    </div>
  );
}
