// Movimiento de la figura "Aceite y VVT-i · 2TR-FE". Sin React: lo monta el componente
// del blog y también la página suelta que arma figures/vvti/build.mjs.
//
// Parámetros de URL para capturas fijas (los usa scripts/historias-vvti.mjs):
//   ?vvti-km=2500   kilómetros fijos, sin recorrido automático
//   &vvti-t=0.4     muestra el rotor 0,4 s después de que la ECU pide avance
import { KM_MAX, TAU_FRESH, oilAt, oilColor, phaseOf, readoutOf, valueTextOf } from "./model.js";

export function mountVvti(root, DATA) {
  const stage = root.querySelector(".vv-stage");
  const svg = stage && stage.querySelector("svg");
  if (!stage || !svg) return () => {};
  const q = (name) => svg.querySelector(`[data-part="${name}"]`);
  const parts = {
    carriage: q("carriage"),
    needle: q("needle"),
    pumpIn: q("pump-inner"),
    pumpOut: q("pump-outer"),
    paddle: q("paddle"),
    rotorIn: q("rotor-in"),
    rotorEx: q("rotor-ex"),
    cmdIn: q("cmd-in"),
    cmdEx: q("cmd-ex"),
  };
  const readout = root.querySelector("[data-readout]");
  const status = stage.querySelector("[data-status]");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const params = new URLSearchParams(window.location.search);
  const pinnedKm = params.has("vvti-km") ? Number(params.get("vvti-km")) : null;
  const pinnedT = params.has("vvti-t") ? Number(params.get("vvti-t")) : null;

  const ADV = 14; // grados del rotor en la ventana (dibujo, no grados de leva)
  const CMD_PERIOD = 2.0;
  const TOUR = [
    { km: 0, hold: 4 },
    { km: 1250, hold: 4 },
    { km: 2500, hold: 4 },
    { km: 3750, hold: 4 },
    { km: KM_MAX, hold: 5 },
    { km: 0, hold: 1.4, change: true },
  ];
  const TOUR_LEN = TOUR.reduce((a, s) => a + s.hold, 0);
  const tourAt = (t) => {
    let left = t % TOUR_LEN;
    for (const step of TOUR) {
      if (left < step.hold) return step;
      left -= step.hold;
    }
    return TOUR[0];
  };

  const s = {
    km: pinnedKm ?? 0,
    target: pinnedKm ?? 0,
    clock: 0,
    cmdClock: 0,
    cmd: -1,
    cmdShown: -ADV,
    inAt: -ADV,
    exAt: ADV * 0.7,
    pump: 0,
    paddle: 0,
    needle: -DATA.gaugeSpan / 2,
    touring: pinnedKm === null && !still.matches,
    changing: false,
  };
  let frame = 0;
  let last = 0;
  let visible = false;
  let idle = 0;
  let lastText = "";
  let announceTimer = 0;
  let lastWord = phaseOf(s.km);

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const follow = (x, target, dt, tau, calm) => (calm ? target : x + (target - x) * (1 - Math.exp(-dt / tau)));
  const carriageAt = (km) => {
    const dx = DATA.kmX[0] + (km / DATA.kmMax) * (DATA.kmX[1] - DATA.kmX[0]);
    return `translate(${(dx * DATA.ax[0]).toFixed(2)} ${(dx * DATA.ax[1]).toFixed(2)})`;
  };
  const needleFor = (km) => {
    const lagPct = (oilAt(km).lag - 1) * 100;
    return -DATA.gaugeSpan / 2 + DATA.gaugeSpan * clamp(lagPct / 100, 0, 1);
  };

  function draw() {
    const o = oilAt(s.km);
    root.style.setProperty("--vvti-oil", oilColor(o.dirt));
    parts.carriage?.setAttribute("transform", carriageAt(s.km));
    parts.needle?.setAttribute("transform", `rotate(${s.needle.toFixed(2)})`);
    parts.pumpIn?.setAttribute("transform", `rotate(${(s.pump % 360).toFixed(1)})`);
    parts.pumpOut?.setAttribute("transform", `rotate(${((s.pump * 0.8) % 360).toFixed(1)})`);
    parts.paddle?.setAttribute("transform", `rotate(${(s.paddle % 360).toFixed(1)})`);
    parts.rotorIn?.setAttribute("transform", `rotate(${s.inAt.toFixed(2)})`);
    parts.rotorEx?.setAttribute("transform", `rotate(${s.exAt.toFixed(2)})`);
    parts.cmdIn?.setAttribute("transform", `rotate(${s.cmdShown.toFixed(2)})`);
    parts.cmdEx?.setAttribute("transform", `rotate(${(-s.cmdShown * 0.7).toFixed(2)})`);
    const text = s.changing ? "cambio de aceite · vuelve a 0 km" : readoutOf(Math.round(s.km / 10) * 10);
    if (readout && text !== lastText) {
      readout.textContent = text;
      lastText = text;
    }
  }

  function describe() {
    stage.setAttribute("aria-valuenow", String(Math.round(s.target)));
    stage.setAttribute("aria-valuetext", valueTextOf(s.target));
  }

  function announce() {
    clearTimeout(announceTimer);
    announceTimer = window.setTimeout(() => {
      const word = phaseOf(s.target);
      if (status && word !== lastWord) status.textContent = `${Math.round(s.target).toLocaleString("es-CO")} km: ${word}`;
      lastWord = word;
    }, 700);
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    const calm = still.matches;
    if (s.touring) {
      s.clock += dt;
      const step = tourAt(s.clock);
      s.target = step.km;
      s.changing = Boolean(step.change);
    }
    s.km = follow(s.km, s.target, dt, s.changing ? 0.45 : 0.4, calm);
    if (Math.abs(s.km - s.target) < 0.5) s.km = s.target;

    const o = oilAt(s.km);
    if (!calm) {
      s.cmdClock += dt;
      if (s.cmdClock >= CMD_PERIOD) {
        s.cmdClock -= CMD_PERIOD;
        s.cmd = -s.cmd;
      }
      s.pump += 300 * dt;
      s.paddle += 420 * o.flow * dt;
    }
    const want = s.cmd * ADV;
    s.cmdShown = follow(s.cmdShown, want, dt, 0.05, calm);
    const tau = TAU_FRESH * o.lag;
    s.inAt = follow(s.inAt, want, dt, tau, calm);
    s.exAt = follow(s.exAt, -want * 0.7, dt, tau, calm);
    s.needle = follow(s.needle, needleFor(s.km), dt, 0.3, calm);
    draw();
    frame = visible && !calm ? requestAnimationFrame(tick) : 0;
  }

  const run = () => {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };

  // Estado fijo para capturas: rotor `t` segundos después de que la ECU pide avance.
  function pin(km, t) {
    s.touring = false;
    s.target = s.km = clamp(km, 0, KM_MAX);
    s.changing = false;
    const o = oilAt(s.km);
    s.cmd = 1;
    s.cmdShown = ADV;
    const reach = t == null ? 1 : 1 - Math.exp(-t / (TAU_FRESH * o.lag));
    s.inAt = -ADV + 2 * ADV * reach;
    s.exAt = ADV * 0.7 - 2 * ADV * 0.7 * reach;
    s.needle = needleFor(s.km);
    s.pump = 40;
    s.paddle = 20;
    draw();
    describe();
  }

  function steer(km) {
    s.touring = false;
    s.changing = false;
    s.target = clamp(Math.round(km / 50) * 50, 0, KM_MAX);
    describe();
    announce();
    clearTimeout(idle);
    if (pinnedKm === null) {
      idle = window.setTimeout(() => {
        if (!still.matches) {
          s.touring = true;
          s.clock = 0;
        }
        run();
      }, 6000);
    }
    if (still.matches) {
      s.km = s.target;
      s.needle = needleFor(s.km);
      draw();
    }
    run();
  }

  // Arrastrar en cualquier parte del dibujo cambia los km (la página sigue haciendo scroll vertical).
  let dragging = false;
  const kmFromPointer = (event) => {
    const box = svg.getBoundingClientRect();
    const share = clamp(((event.clientX - box.left) / box.width - 0.12) / 0.76, 0, 1);
    return share * KM_MAX;
  };
  const onDown = (event) => {
    dragging = true;
    try { stage.setPointerCapture(event.pointerId); } catch {}
    steer(kmFromPointer(event));
  };
  const onMove = (event) => {
    if (dragging) steer(kmFromPointer(event));
  };
  const onUp = (event) => {
    dragging = false;
    try { stage.releasePointerCapture(event.pointerId); } catch {}
  };
  const onKey = (event) => {
    const step = event.shiftKey ? 1000 : 250;
    // Durante el recorrido se parte de lo que se ve, no del destino del recorrido.
    const base = s.touring ? Math.round(s.km / 250) * 250 : s.target;
    let to = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") to = base + step;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = base - step;
    if (event.key === "Home") to = 0;
    if (event.key === "End") to = KM_MAX;
    if (to === null) return;
    event.preventDefault();
    steer(to);
  };
  const onFocus = () => {
    if (status) status.textContent = `${Math.round(s.target).toLocaleString("es-CO")} km: ${phaseOf(s.target)}`;
  };

  stage.addEventListener("pointerdown", onDown);
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerup", onUp);
  stage.addEventListener("pointercancel", onUp);
  stage.addEventListener("keydown", onKey);
  stage.addEventListener("focus", onFocus);

  const io = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: "120px 0px" });
  io.observe(stage);
  const onMotion = () => {
    if (still.matches) s.touring = false;
    run();
  };
  still.addEventListener?.("change", onMotion);

  window.__vvti = { set: (km, t) => pin(km, t), steer };

  if (pinnedKm !== null) pin(pinnedKm, pinnedT);
  else {
    draw();
    describe();
  }

  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(idle);
    clearTimeout(announceTimer);
    io.disconnect();
    still.removeEventListener?.("change", onMotion);
    stage.removeEventListener("pointerdown", onDown);
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerup", onUp);
    stage.removeEventListener("pointercancel", onUp);
    stage.removeEventListener("keydown", onKey);
    stage.removeEventListener("focus", onFocus);
  };
}
