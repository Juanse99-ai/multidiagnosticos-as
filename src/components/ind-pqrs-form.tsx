"use client";

import { useState } from "react";
import { Send, Check, Copy, Mail } from "lucide-react";

const WA_NUM = "573003651525";
const EMAIL = "contacto@multidiagnosticosas.com";
const TIPOS = ["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"];

function radicado() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = "";
  for (let i = 0; i < 4; i++) r += abc[Math.floor(Math.random() * abc.length)];
  return `PQRS-${ymd}-${r}`;
}

type Sent = { id: string; text: string };

export function IndPqrsForm() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState<Sent | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const tel = v("telefono").replace(/\D/g, "");
    if (tel.length < 7) return setError("Escribe un teléfono válido para poder responderte.");
    if (v("detalle").length < 10) return setError("Cuéntanos un poco más en la descripción.");
    setError("");

    const id = radicado();
    const lines = [
      `*PQRS ${id}*`,
      `Tipo: ${v("tipo")}`,
      `Nombre: ${v("nombre")}`,
      v("documento") && `Documento: ${v("documento")}`,
      `Teléfono: ${v("telefono")}`,
      v("correo") && `Correo: ${v("correo")}`,
      v("placa") && `Placa: ${v("placa").toUpperCase()}`,
      `Descripción: ${v("detalle")}`,
      "Acepto la Política de Tratamiento de Datos Personales.",
    ].filter(Boolean);
    const text = lines.join("\n");
    setSent({ id, text });
    window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  if (sent) {
    const wa = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(sent.text)}`;
    const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(sent.id)}&body=${encodeURIComponent(sent.text.replace(/\*/g, ""))}`;
    return (
      <div className="ind-pqrs-ok" role="status">
        <span className="ok-ic"><Check size={22} strokeWidth={3} /></span>
        <h2>Tu número de radicado</h2>
        <div className="rad mono">{sent.id}</div>
        <p>Guárdalo para hacerle seguimiento. Para terminar, envía el mensaje que se abrió en WhatsApp. Si no se abrió, usa uno de estos botones.</p>
        <div className="acts">
          <a className="ind-btn" href={wa} target="_blank" rel="noopener"><Send size={17} /> Abrir WhatsApp</a>
          <a className="ind-pqrs-alt" href={mail}><Mail size={17} /> Enviar por correo</a>
          <button
            type="button"
            className="ind-pqrs-alt"
            onClick={() => navigator.clipboard?.writeText(sent.id).then(() => setCopied(true)).catch(() => {})}
          >
            {copied ? <Check size={17} /> : <Copy size={17} />} {copied ? "Copiado" : "Copiar radicado"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="ind-pqrs-form" onSubmit={onSubmit}>
      <fieldset className="tipos">
        <legend>Tipo de solicitud</legend>
        {TIPOS.map((t, i) => (
          <label key={t} className="tipo">
            <input type="radio" name="tipo" value={t} defaultChecked={i === 0} required />
            <span>{t}</span>
          </label>
        ))}
      </fieldset>

      <div className="f"><label htmlFor="pq-nombre">Nombre completo</label><input id="pq-nombre" name="nombre" required autoComplete="name" /></div>
      <div className="f"><label htmlFor="pq-doc">Cédula o NIT <em>(opcional)</em></label><input id="pq-doc" name="documento" inputMode="numeric" /></div>
      <div className="f"><label htmlFor="pq-tel">Teléfono o WhatsApp</label><input id="pq-tel" name="telefono" type="tel" required autoComplete="tel" placeholder="300 000 0000" /></div>
      <div className="f"><label htmlFor="pq-mail">Correo <em>(opcional)</em></label><input id="pq-mail" name="correo" type="email" autoComplete="email" /></div>
      <div className="f"><label htmlFor="pq-placa">Placa del vehículo <em>(opcional)</em></label><input id="pq-placa" name="placa" placeholder="ABC123" /></div>
      <div className="f full"><label htmlFor="pq-det">Descripción</label><textarea id="pq-det" name="detalle" required rows={5} placeholder="Cuéntanos qué pasó o qué necesitas. Si tienes número de orden o factura, inclúyelo." /></div>

      <label className="acepto">
        <input type="checkbox" name="acepto" required />
        <span>Autorizo el tratamiento de mis datos personales según la <a href="/legal/tratamiento-de-datos" target="_blank" rel="noopener">Política de Tratamiento de Datos Personales</a> para atender esta solicitud.</span>
      </label>

      {error && <p className="err" role="alert">{error}</p>}

      <button type="submit" className="ind-btn send"><Send size={18} /> Enviar por WhatsApp</button>
    </form>
  );
}
