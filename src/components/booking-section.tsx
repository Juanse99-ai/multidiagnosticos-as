"use client";

import { useState } from "react";
import { CalendarDays, Download, Clock, MapPin, Phone } from "lucide-react";

function fmtICSDate(dateStr: string, timeStr: string): string | null {
  if (!dateStr) return null;
  const dt = new Date(`${dateStr}T${timeStr || "08:00"}`);
  if (isNaN(dt.getTime())) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}${pad(dt.getSeconds())}`;
}

function icsEscape(str: string) {
  return str.replace(/[\\;,]/g, "\\$&").replace(/\n/g, "\\n");
}

export function BookingSection() {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    plate: "",
    model: "",
    name: "",
    phone: "",
    notes: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, quiero agendar: ${form.service}\nFecha: ${form.date}\nHora: ${form.time}\nPlaca: ${form.plate}\nModelo: ${form.model}\nNombre: ${form.name}\nTeléfono: ${form.phone}\nNotas: ${form.notes}`;
    window.open(
      `https://wa.me/573003651525?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener"
    );
  };

  const handleICS = () => {
    if (
      !form.service ||
      !form.date ||
      !form.time ||
      !form.plate ||
      !form.model ||
      !form.name
    ) {
      alert(
        "Completa servicio, fecha, hora, placa, modelo y nombre antes de descargar."
      );
      return;
    }

    const start = fmtICSDate(form.date, form.time);
    if (!start) {
      alert("Fecha u hora inválida");
      return;
    }

    const endDt = new Date(`${form.date}T${form.time}`);
    if (!isNaN(endDt.getTime())) endDt.setHours(endDt.getHours() + 1);
    const end =
      fmtICSDate(
        endDt.toISOString().split("T")[0],
        endDt.toTimeString().slice(0, 5)
      ) || start;

    const now = fmtICSDate(
      new Date().toISOString().split("T")[0],
      new Date().toTimeString().slice(0, 5)
    );

    const details = `Placa: ${form.plate}\\nModelo: ${form.model}\\nCliente: ${form.name}`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Multidiagnosticos AS//Agenda//ES",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@multidiagnosticosas.com`,
      `DTSTAMP:${now}`,
      `DTSTART;TZID=America/Bogota:${start}`,
      `DTEND;TZID=America/Bogota:${end}`,
      `SUMMARY:${icsEscape("Cita taller: " + form.service)}`,
      `DESCRIPTION:${icsEscape(details)}`,
      "LOCATION:Cra. 27 #13-05, Sabanalarga",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cita-${form.date}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  const labelClass =
    "block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-1.5";
  const inputClass =
    "w-full rounded-lg border border-black/[0.1] bg-white px-3.5 py-3 text-[15px] text-brand-dark placeholder:text-black/35 outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15";

  return (
    <section
      id="agenda"
      className="py-24 md:py-32 bg-[#fbfbfa] border-t border-black/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.82fr_1.1fr] gap-12 lg:gap-20 items-start">
        {/* Left — editorial */}
        <div className="reveal-up lg:pt-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Agenda en línea
          </span>
          <h2 className="mt-4 font-display text-[2.75rem] md:text-6xl font-extrabold tracking-tight text-brand-dark leading-[0.98]">
            Tu cita,
            <br />
            sin filas.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
            Reserva tu diagnóstico o mantenimiento. Te confirmamos por WhatsApp y,
            si quieres, te lo agendamos en el calendario.
          </p>

          <ul className="mt-10 space-y-5 text-[15px]">
            <li className="flex items-start gap-3.5">
              <Clock className="w-[18px] h-[18px] text-brand-blue mt-0.5 shrink-0" strokeWidth={1.75} />
              <span className="text-brand-dark">
                <strong className="font-semibold">Lun – Vie</strong> 8:00–17:30
                <span className="text-muted-foreground"> · </span>
                <strong className="font-semibold">Sáb</strong> 8:30–16:00
              </span>
            </li>
            <li className="flex items-start gap-3.5">
              <MapPin className="w-[18px] h-[18px] text-brand-blue mt-0.5 shrink-0" strokeWidth={1.75} />
              <span className="text-brand-dark">Cra. 27 #13-05 · Sabanalarga, Atlántico</span>
            </li>
            <li className="flex items-start gap-3.5">
              <Phone className="w-[18px] h-[18px] text-brand-blue mt-0.5 shrink-0" strokeWidth={1.75} />
              <a href="tel:+573003651525" className="text-brand-dark hover:text-brand-blue transition-colors">
                (+57) 300 365 1525
              </a>
            </li>
          </ul>
        </div>

        {/* Right — form */}
        <form
          onSubmit={handleSubmit}
          className="reveal-up reveal-up-2 rounded-2xl border border-black/[0.07] bg-white p-6 md:p-9 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_50px_-40px_rgba(0,32,96,0.35)]"
        >
          <div className="mb-5">
            <label className={labelClass}>Servicio</label>
            <select
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Selecciona…</option>
              <option>Diagnóstico computarizado</option>
              <option>Cambio de aceite y filtros</option>
              <option>Revisión de frenos</option>
              <option>Suspensión y dirección</option>
              <option>Mantenimiento preventivo</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>Fecha</label>
              <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Hora</label>
              <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>Placa</label>
              <input value={form.plate} onChange={(e) => update("plate", e.target.value)} placeholder="ABC123" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Modelo</label>
              <input value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Ej. Mazda 3" required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>Nombre</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Tu nombre" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="300 000 0000" required className={inputClass} />
            </div>
          </div>

          <div className="mb-7">
            <label className={labelClass}>Notas</label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} placeholder="Cuéntanos qué necesitas" className={`${inputClass} resize-y`} />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#0a2f86] active:scale-[0.98]"
            >
              <CalendarDays className="w-[18px] h-[18px]" strokeWidth={1.75} />
              Confirmar por WhatsApp
            </button>
            <button
              type="button"
              onClick={handleICS}
              className="inline-flex items-center gap-2 rounded-lg border border-black/[0.12] bg-white px-5 py-3 text-sm font-semibold text-brand-dark transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black/[0.03] active:scale-[0.98]"
            >
              <Download className="w-[18px] h-[18px]" strokeWidth={1.75} />
              Descargar .ics
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
