#!/usr/bin/env node
// Saca capturas PNG verticales (1080 × 1920, formato historia 9:16) de la figura
// "Aceite y VVT-i · 2TR-FE" en varios kilómetros, listas para Instagram o WhatsApp.
//
// Uso (desde la carpeta multidiagnosticos-as):
//   node scripts/historias-vvti.mjs              # usa la página publicada en el sitio
//   node scripts/historias-vvti.mjs --local      # usa figures/vvti/out/vvti-light.html
//   node scripts/historias-vvti.mjs --km 0,2500,5000 --out historias
//
// Necesita Google Chrome instalado. Las imágenes quedan en ./historias/ (o en --out).
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const LOCAL = args.includes("--local");
const PAGE = LOCAL
  ? pathToFileURL(resolve(HERE, "..", "figures", "vvti", "out", "vvti-light.html")).href
  : opt("--url", "https://www.multidiagnosticosas.com/blog/aceite-vencido-vvti-2tr-fe");
const KMS = opt("--km", "0,1250,2500,3750,5000").split(",").map(Number);
const OUT = resolve(opt("--out", "historias"));
const T = Number(opt("--t", "0.4")); // segundos desde que la ECU pide avance: muestra el retraso
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const W = 540; // px CSS; con escala 2 sale 1080 × 1920
const H = 960;

const TITLES = {
  0: ["Aceite nuevo", "El VVT-i llega a tiempo."],
  1250: ["1.250 km", "Todo normal."],
  2500: ["2.500 km", "El aceite empieza a oscurecerse."],
  3750: ["3.750 km", "Se espesa y tapa las mallas de las OCV."],
  5000: ["5.000 km · vencido", "El VVT-i llega tarde. Toca cambio."],
};

if (!existsSync(CHROME)) {
  console.error(`No encontré Chrome en ${CHROME}. Pon la ruta en la variable CHROME_PATH.`);
  process.exit(1);
}
if (LOCAL && !existsSync(fileURLToPath(PAGE))) {
  console.error("No existe la página local. Corre primero: node figures/vvti/build.mjs");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const profile = mkdtempSync(join(tmpdir(), "historias-vvti-"));
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "about:blank"], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function devtoolsPort() {
  for (let i = 0; i < 100; i++) {
    try {
      const [port] = readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n");
      if (port) return port;
    } catch {}
    await sleep(100);
  }
  throw new Error("Chrome no abrió el puerto de depuración.");
}

function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const waiters = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve: ok, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : ok(msg.result);
    } else if (msg.method) {
      for (const w of [...waiters]) if (w.method === msg.method) { waiters.splice(waiters.indexOf(w), 1); w.resolve(msg.params); }
    }
  };
  const send = (method, params = {}) => new Promise((ok, reject) => {
    const n = ++id;
    pending.set(n, { resolve: ok, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  const once = (method) => new Promise((ok) => waiters.push({ method, resolve: ok }));
  return new Promise((ok) => { ws.onopen = () => ok({ send, once, close: () => ws.close() }); });
}

// Deja en la página solo la figura, sobre un fondo de historia con título y marca.
const STORY = (title, line) => `(() => {
  const fig = document.querySelector(".vvti");
  if (!fig) return "sin figura";
  const page = document.createElement("div");
  page.id = "historia";
  page.innerHTML = '<div class="h-top"><div class="h-k">Multidiagnósticos AS · Sabanalarga</div><div class="h-t"></div><div class="h-l"></div></div><div class="h-fig"><div class="h-zoom"><div class="h-lens"></div><div class="h-cap">Rotores del VVT-i · la marca es lo que pide la ECU</div></div></div><div class="h-bot">Modelo ilustrativo · Motor Toyota 2TR-FE · Aceite 5W-30 cada 5.000 km</div>';
  // lupa: copia del dibujo encuadrada en los dos actuadores
  const svg = fig.querySelector("svg");
  const vb = svg.viewBox.baseVal;
  const box = svg.getBoundingClientRect();
  const k = vb.width / box.width;
  const rects = ["act.in.cover", "act.ex.cover"].map((n) => svg.querySelector('.it[data-name="' + n + '"]').getBoundingClientRect());
  const x0 = Math.min(...rects.map((r) => r.left)), x1 = Math.max(...rects.map((r) => r.right));
  const y0 = Math.min(...rects.map((r) => r.top)), y1 = Math.max(...rects.map((r) => r.bottom));
  const cx = vb.x + ((x0 + x1) / 2 - box.left) * k, cy = vb.y + ((y0 + y1) / 2 - box.top) * k;
  const half = Math.max(x1 - x0, y1 - y0) * k * 0.56;
  const lens = svg.cloneNode(true);
  lens.setAttribute("viewBox", (cx - half) + " " + (cy - half) + " " + 2 * half + " " + 2 * half);
  lens.removeAttribute("width"); lens.removeAttribute("height");
  const scope = document.createElement("div");
  scope.className = "iso vvti";
  scope.setAttribute("data-theme", "light");
  scope.style.cssText = "width:100%;height:100%;--vvti-oil:" + fig.style.getPropertyValue("--vvti-oil");
  scope.appendChild(lens);
  page.querySelector(".h-lens").appendChild(scope);
  page.querySelector(".h-t").textContent = ${JSON.stringify(title)};
  page.querySelector(".h-l").textContent = ${JSON.stringify(line)};
  page.querySelector(".h-fig").prepend(fig);
  document.body.innerHTML = "";
  document.body.appendChild(page);
  const css = document.createElement("style");
  css.textContent = \`
    html,body{margin:0;background:#FAFAF7;}
    #historia{width:${W}px;height:${H}px;box-sizing:border-box;padding:34px 22px 22px;display:flex;flex-direction:column;font-family:Archivo,system-ui,sans-serif;color:#141414;overflow:hidden}
    #historia .h-k{font:700 13px/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#2D5BFF}
    #historia .h-t{font-weight:900;font-size:40px;line-height:1;letter-spacing:-.01em;text-transform:uppercase;margin-top:12px}
    #historia .h-l{font-size:19px;line-height:1.3;color:#5C5C5A;margin-top:8px}
    #historia .h-fig{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;margin-top:10px}
    #historia .h-fig .vvti{width:100%}
    #historia .iso-plate-corner:not([data-readout]):not(:has([data-readout])){visibility:hidden}
    #historia .h-zoom{position:absolute;right:40px;top:22px;width:132px;display:flex;flex-direction:column;align-items:center;gap:7px}
    #historia .h-lens{width:132px;height:132px;border-radius:50%;overflow:hidden;background:#FAFAF7;border:2px solid #141414;box-shadow:0 10px 24px rgba(20,20,20,.16)}
    #historia .h-lens svg{width:100%;height:100%;display:block}
    #historia .h-cap{font:700 9.5px/1.25 ui-monospace,Menlo,monospace;letter-spacing:.04em;text-transform:uppercase;color:#141414;text-align:center;max-width:150px;background:#FAFAF7}
    #historia .iso-caption,#historia .iso-keys,#historia .iso-legend,#historia [class*="caption"],#historia [class*="keys"]{display:none!important}
    #historia .h-bot{font:600 11px/1.3 ui-monospace,Menlo,monospace;letter-spacing:.04em;text-transform:uppercase;color:#8C8C88;margin-top:10px}
  \`;
  document.head.appendChild(css);
  return "ok";
})()`;

try {
  const port = await devtoolsPort();
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const cdp = await connect(target.webSocketDebuggerUrl);
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
  for (const km of KMS) {
    const sep = PAGE.includes("?") ? "&" : "?";
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: `${PAGE}${sep}vvti-km=${km}&vvti-t=${T}` });
    await loaded;
    await sleep(1800);
    const [title, line] = TITLES[km] ?? [`${km.toLocaleString("es-CO")} km`, ""];
    await cdp.send("Runtime.evaluate", { expression: `window.__vvti && window.__vvti.set(${km}, ${T})` });
    await sleep(200);
    const res = await cdp.send("Runtime.evaluate", { expression: STORY(title, line), returnByValue: true });
    if (res.result.value !== "ok") throw new Error(`No encontré la figura en ${PAGE}: ${JSON.stringify(res.exceptionDetails?.exception?.description ?? res.result.value)}`);
    await sleep(500);
    const shot = await cdp.send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
    const file = join(OUT, `historia-vvti-${String(km).padStart(4, "0")}km.png`);
    writeFileSync(file, Buffer.from(shot.data, "base64"));
    console.log("guardé", file);
  }
  cdp.close();
} catch (error) {
  console.error("Error:", error.message);
  process.exitCode = 1;
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
