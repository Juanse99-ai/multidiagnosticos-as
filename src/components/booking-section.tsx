"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download } from "lucide-react";

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
    const end = fmtICSDate(
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

  const inputClass =
    "w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50";

  return (
    <section id="agenda" className="py-14 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-6">
          Agendar Servicio
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Servicio</label>
            <select
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Selecciona...</option>
              <option>Cambio de aceite</option>
              <option>Revisión de frenos</option>
              <option>Diagnóstico OBD-II</option>
              <option>Suspensión</option>
              <option>Mantenimiento preventivo</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Placa</label>
              <input
                value={form.plate}
                onChange={(e) => update("plate", e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Modelo</label>
              <input
                value={form.model}
                onChange={(e) => update("model", e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg">
              <CalendarDays className="w-4 h-4 mr-2" />
              Confirmar por WhatsApp
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleICS}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar .ics
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
