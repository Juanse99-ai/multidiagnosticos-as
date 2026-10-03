"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { StatefulButton } from "@/components/ui/stateful-button";

const WA = "573023191749";

export function IndBookForm() {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    const form = formRef.current;
    // Sin la autorización de datos no se envía: el navegador marca la casilla y el
    // botón vuelve a su estado normal (StatefulButton atrapa el error).
    if (form && !form.reportValidity()) throw new Error("invalid");

    const data = form ? new FormData(form) : new FormData();
    const g = (k: string) => (String(data.get(k) ?? "")).trim() || "-";

    const text = [
      "Hola, quiero agendar un servicio en Multidiagnósticos AS.",
      "",
      `Servicio: ${g("servicio")}`,
      `Fecha: ${g("fecha")}   Hora: ${g("hora")}`,
      `Placa: ${g("placa")}   Modelo: ${g("modelo")}`,
      `Nombre: ${g("nombre")}`,
      `Teléfono: ${g("telefono")}`,
      "",
      "Acepto la Política de Tratamiento de Datos Personales.",
    ].join("\n");

    const url = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

    // Se abre dentro del mismo clic para que el navegador no lo bloquee. Sin
    // "noopener" en window.open (con él siempre devuelve null) para poder detectar
    // un bloqueo; se corta el opener a mano.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;

    // Pausa corta para que se vea el estado de carga antes del "Abriendo WhatsApp".
    await new Promise((r) => setTimeout(r, 600));
  };

  return (
    <form ref={formRef} className="ind-form" onSubmit={(e) => e.preventDefault()}>
      <div className="f full">
        <label htmlFor="af-servicio">Servicio</label>
        <select id="af-servicio" name="servicio" defaultValue="">
          <option value="" disabled>Selecciona…</option>
          <option>Diagnóstico computarizado</option>
          <option>Sincronización de motor</option>
          <option>Cambio de aceite</option>
          <option>Frenos</option>
          <option>Suspensión</option>
          <option>Limpieza de inyectores</option>
          <option>Otro</option>
        </select>
      </div>
      <div className="f"><label htmlFor="af-fecha">Fecha</label><input id="af-fecha" name="fecha" type="date" /></div>
      <div className="f"><label htmlFor="af-hora">Hora</label><input id="af-hora" name="hora" type="time" /></div>
      <div className="f"><label htmlFor="af-placa">Placa</label><input id="af-placa" name="placa" placeholder="ABC123" /></div>
      <div className="f"><label htmlFor="af-modelo">Modelo</label><input id="af-modelo" name="modelo" placeholder="Ej. Mazda 3" /></div>
      <div className="f"><label htmlFor="af-nombre">Nombre</label><input id="af-nombre" name="nombre" placeholder="Tu nombre" /></div>
      <div className="f"><label htmlFor="af-telefono">Teléfono</label><input id="af-telefono" name="telefono" placeholder="300 000 0000" /></div>
      <label className="acepto">
        <input type="checkbox" name="acepto" required />
        <span>Autorizo el tratamiento de mis datos personales según la <a href="/legal/tratamiento-de-datos" target="_blank" rel="noopener">Política de Tratamiento de Datos Personales</a> para agendar mi cita.</span>
      </label>
      <StatefulButton
        onClick={handleSubmit}
        loadingLabel="Preparando…"
        successLabel="Abriendo WhatsApp"
      >
        <MessageCircle size={16} /> Confirmar por WhatsApp
      </StatefulButton>
    </form>
  );
}
