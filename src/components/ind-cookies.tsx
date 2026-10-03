"use client";

import { useEffect, useRef, useState } from "react";
import { Cookie } from "lucide-react";

/**
 * Aviso y preferencias de cookies.
 * Hoy el sitio no carga nada analítico ni de marketing: la elección se guarda en la
 * cookie propia "mdas_consent" (6 meses) y se publica en window.__mdasConsent y en el
 * evento "mdas:consent", para que un script futuro (p. ej. un píxel) solo cargue si
 * el visitante lo aceptó. "Configurar cookies" del footer lo reabre con "mdas:open-cookies".
 */

export type Consent = { v: number; analytics: boolean; marketing: boolean; date: string };

const NAME = "mdas_consent";
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 180;
const OPEN_EVENT = "mdas:open-cookies";

declare global {
  interface Window { __mdasConsent?: Consent }
}

function readConsent(): Consent | null {
  try {
    const raw = document.cookie.split("; ").find((c) => c.startsWith(NAME + "="));
    if (!raw) return null;
    const c = JSON.parse(decodeURIComponent(raw.slice(NAME.length + 1))) as Consent;
    return c && c.v === VERSION ? c : null;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean): Consent {
  const c: Consent = { v: VERSION, analytics, marketing, date: new Date().toISOString() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${NAME}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.__mdasConsent = c;
  window.dispatchEvent(new CustomEvent("mdas:consent", { detail: c }));
  return c;
}

export function IndCookies() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const firstBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const c = readConsent();
    if (c) {
      window.__mdasConsent = c;
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
      setHasChoice(true);
    } else {
      setOpen(true);
    }
    const reopen = () => {
      const cur = readConsent();
      setAnalytics(cur?.analytics ?? false);
      setMarketing(cur?.marketing ?? false);
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (open && hasChoice) firstBtn.current?.focus();
  }, [open, hasChoice]);

  useEffect(() => {
    if (!open || !hasChoice) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hasChoice]);

  if (!open) return null;

  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setAnalytics(a);
    setMarketing(m);
    setHasChoice(true);
    setCustom(false);
    setOpen(false);
  };

  return (
    <div className="ind-cookies" role="dialog" aria-modal="false" aria-labelledby="ind-cookies-t">
      <div className="ck-head">
        <Cookie className="ck-ic" size={26} strokeWidth={2} aria-hidden />
        <div>
          <h2 id="ind-cookies-t">Usamos cookies</h2>
          <p>
            Usamos cookies necesarias para que el sitio funcione y para recordar esta elección. Con tu permiso,
            usaríamos cookies analíticas y de marketing para mejorar el sitio. Más información en la{" "}
            <a href="/legal/cookies">Política de cookies</a>.
          </p>
        </div>
      </div>

      {custom && (
        <div className="ck-cats">
          <label className="ck-cat is-locked">
            <span><b>Necesarias</b><small>Seguridad del sitio y tu elección de cookies. Siempre activas.</small></span>
            <input type="checkbox" checked disabled aria-label="Cookies necesarias, siempre activas" />
            <i aria-hidden />
          </label>
          <label className="ck-cat">
            <span><b>Analíticas</b><small>Medir visitas de forma agregada para mejorar el sitio.</small></span>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <i aria-hidden />
          </label>
          <label className="ck-cat">
            <span><b>Marketing</b><small>Medir y mostrar publicidad de nuestros servicios.</small></span>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <i aria-hidden />
          </label>
        </div>
      )}

      <div className="ck-acts">
        {custom ? (
          <button ref={firstBtn} type="button" className="ck-btn ck-primary" onClick={() => decide(analytics, marketing)}>Guardar preferencias</button>
        ) : (
          <button ref={firstBtn} type="button" className="ck-btn ck-ghost" onClick={() => setCustom(true)}>Configurar</button>
        )}
        <button type="button" className="ck-btn ck-ghost" onClick={() => decide(false, false)}>Rechazar</button>
        <button type="button" className={`ck-btn ${custom ? "ck-ghost" : "ck-primary"}`} onClick={() => decide(true, true)}>Aceptar todas</button>
      </div>
    </div>
  );
}

/** Enlace del footer que vuelve a abrir las preferencias. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Configurar cookies
    </button>
  );
}
