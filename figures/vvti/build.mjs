// Banco de lubricación del Toyota 2TR-FE (Dual VVT-i).
// Genera el dibujo estático con el kit isométrico y lo escribe en:
//   src/components/figures/vvti/art.generated.ts   (lo usa la página del blog)
//   figures/vvti/out/vvti-light.html               (página suelta para auditar y capturar)
// Uso: node figures/vvti/build.mjs [--audit]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../kit/iso-kit.mjs";
import * as G from "../kit/lathe.mjs";
import { tubePieces, tubeSvg } from "../kit/tube.mjs";
import * as A from "../kit/audit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT_TS = join(ROOT, "src", "components", "figures", "vvti", "art.generated.ts");
const OUT_HTML = join(HERE, "out", "vvti-light.html");

const W = 600;
const H = 740;
const AZIMUTH = 42;
const ELEVATION = 26;

// ---------------------------------------------------------------- mundo
const PLATE = { x: -100, y: -62, w: 200, d: 124, r: 8 };
const PLATE_H = 10;
const FOOT_H = 5;
const PAN = { x: -66, y: -36, w: 116, d: 72, r: 6 };
const PAN_Z = [6, 44];
const LIP = k.insetPlan(PAN, -2.5);
const LIP_Z = [44, 48];
const DECK = { x: -68, y: -38, w: 120, d: 76, r: 6 };
const DECK_Z = [48, 54];

const PUMP_C = [-34, 70]; // x, z (eje del rotor a lo largo de y)
const PUMP_R = 15;
const PUMP_Y = [-2, 12];
const MOTOR_R = 13;
const MOTOR_Y = [-34, -8];
const MOUNT = { x: -10, y: -8, w: 26, d: 24, r: 2 };
const MOUNT_Z = [54, 76];
const FILTER = { x: 3, y: 4, r: 11, z0: 77.2, z1: 112 };
const SIGHT = { x: 40.5, y: -2, w: 12, d: 12, r: 1.2 };
const SIGHT_Z = [112, 128];
const RISER_X = 46.5;
const RISER_Y = 4;
const RISER_R = 3;

const HEAD = { x: -60, y: -30, w: 100, d: 58, r: 4 };
const HEAD_Z = [168, 194];
const CAM_Z = 202;
const CAMS = { ex: -16, in: 14 };
const CAM_X = [-58, 46];
const CAPS_X = [-56, -32, -8, 16, 36];
const CYL_X = [26, 4, -20, -44]; // cilindro 1 al frente (lado de la distribución)
const FIRING = [1, 3, 4, 2];
const ACT = { s0: 46, cover: 55, face: 57, bezel: 58.2, r: 11, win: 6.6 };
const MANI = { x: 40, y: -24, w: 12, d: 46, r: 1 };
const MANI_Z = [170, 188];
const OCV_Z = 179;

const GAUGE = { x: 72, y: 22, r: 15, z0: 44, z1: 52 };
const RAIL_X = [-86, 86];
const KM_X = [-80, 80];
const KM_MAX = 5000;
const STRIP = { x: KM_X[0] - 6, y: 54, w: KM_X[1] - KM_X[0] + 12, d: 5, r: 1 };
const LABEL = { x: 60, y: -56, w: 30, d: 13, r: 1.2 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [-60, -30, 216], [60, 28, 216], [60, -30, 216], [-60, 28, 216]],
  W,
  H,
  { pad: 26, azimuth: AZIMUTH, elevation: ELEVATION },
);
const V = G.viewOf(P);
const KS = G.scaleOf(P);
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const Ln = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const Faded = (list, style) => k.fadedSvg(list, style);
const path3 = (points, closed = false) => k.pathOf(points.map(at), closed);
const f2 = (v) => Math.round(v * 100) / 100;
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

const R = A.recorder(P);
const record = R.solid;
function put(name, ref, svg, shapes = [], { bias = 0, ...rest } = {}) {
  return R.put({ name, at: ref, bias, svg, shapes, piece: "rig", ...rest });
}
function box(name, plan, z0, z1, style = {}, { steps = 3, bevel = 0, extra = "", inner = "", bias = 0, owner, ground } = {}) {
  const shape = record(A.slab(plan, z0, z1 - z0, { name, owner, ground }, steps));
  put(name, [plan.x + plan.w / 2, plan.y + plan.d / 2, (z0 + z1) / 2], S(k.slabOf(plan, z0, z1 - z0, P, steps, bevel), { tone: "mid", ...style, inner }) + extra, [shape], { bias });
  return shape;
}
function post(name, x, y, r, z0, z1, style = {}, { steps = 28, extra = "", inner = "", bias = 0, owner } = {}) {
  const shape = record(A.cylinder(x, y, r, z0, z1 - z0, { name, owner }));
  put(name, [x, y, (z0 + z1) / 2], S(k.cylinder(x, y, r, z0, z1 - z0, P, steps), { tone: "mid", ...style, inner }) + extra, [shape], { bias });
  return shape;
}
function turned(name, F, profile, style = {}, { extra = "", inner = "", bias = 0, owner, steps, bevel = 0, ref } = {}) {
  const paths = G.solidOf(profile, F, P, { bevel, ...(steps ? { steps } : {}) });
  const mid = (profile[0][0] + profile[profile.length - 1][0]) / 2;
  const shape = record(A.solid(F, profile, { name, owner }));
  put(name, ref ?? G.add3(F.o, G.mul3(F.a, mid)), S(paths, { tone: "mid", ...style, inner }) + extra, [shape], { bias });
  return shape;
}
const disc = (name, F, s0, s1, r, style = {}, options = {}) => turned(name, F, [[s0, r], [s1, r]], style, options);
function prism(name, F, poly, s0, s1, style = {}, { extra = "", bias = 0, owner } = {}) {
  const shape = record(A.prism(F, poly, s0, s1, { name, owner }));
  const cu = poly.reduce((a, p) => a + p[0], 0) / poly.length;
  const cv = poly.reduce((a, p) => a + p[1], 0) / poly.length;
  const centre = G.add3(G.add3(G.add3(F.o, G.mul3(F.a, (s0 + s1) / 2)), G.mul3(F.u, cu)), G.mul3(F.v, cv));
  put(name, centre, S(G.prismOf(F, poly, s0, s1, P), { tone: "mid", ...style }) + extra, [shape], { bias });
  return shape;
}
function planeMatrix(o, ex, ey) {
  const p0 = at(o);
  const px = at(G.add3(o, ex));
  const py = at(G.add3(o, ey));
  const v = (x) => x.toFixed(4);
  return `matrix(${v(px[0] - p0[0])} ${v(px[1] - p0[1])} ${v(py[0] - p0[0])} ${v(py[1] - p0[1])} ${p0[0].toFixed(2)} ${p0[1].toFixed(2)})`;
}
const circ = (r, cx = 0, cy = 0) => `M${f2(cx + r)} ${f2(cy)}A${f2(r)} ${f2(r)} 0 1 1 ${f2(cx - r)} ${f2(cy)}A${f2(r)} ${f2(r)} 0 1 1 ${f2(cx + r)} ${f2(cy)}Z`;
const polar = (fn, n = 72) => "M" + Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2;
  const r = fn(a);
  return `${f2(r * Math.cos(a))} ${f2(r * Math.sin(a))}`;
}).join("L") + "Z";
const sector = (r0, r1, a0, a1, steps = 10) => {
  const pts = [];
  for (let i = 0; i <= steps; i++) { const a = a0 + ((a1 - a0) * i) / steps; pts.push([r1 * Math.cos(a), r1 * Math.sin(a)]); }
  for (let i = steps; i >= 0; i--) { const a = a0 + ((a1 - a0) * i) / steps; pts.push([r0 * Math.cos(a), r0 * Math.sin(a)]); }
  return "M" + pts.map(([x, y]) => `${f2(x)} ${f2(y)}`).join("L") + "Z";
};
const DEG = Math.PI / 180;

// ---------------------------------------------------------------- tubos
const ROUTES = [];
function pipe(name, points, r, { tone = "hi", bend = 3, flange = [true, true], fr = r * 1.8, ft = 1.4, maxLength = 14 } = {}) {
  const route = G.fillet(points, Math.max(bend, r * 2.6), 10, { P, tube: r });
  const total = G.pathLength(route);
  const gaps = [...(flange[0] ? [[0, ft]] : []), ...(flange[1] ? [[total - ft, total]] : [])];
  R.route(name, route, r, { gaps, rims: flange.map((on) => (on ? fr : r)), piece: "rig" });
  ROUTES.push(name);
  tubePieces(route, r, P, { maxLength, gaps }).forEach((piece, index) =>
    put(`${name}:${index}`, piece.mid, tubeSvg(piece, { tone }), [A.tube(piece.points, piece.radii)], { bias: 0.05, route: name, chunk: index }),
  );
  [0, 1].forEach((index) => {
    if (!flange[index]) return;
    const end = index ? route[route.length - 1] : route[0];
    const tangent = G.tangentAlong(route, index ? total : 0);
    const F = G.frameAlong(end, tangent);
    const [s0, s1] = index ? [-ft, 0] : [0, ft];
    const face = index ? s0 : s1;
    const dots = G.dotsOf(F, face, fr * 0.72, 4, P, { phase: Math.PI / 4, fade: [0.04, 0.42] });
    put(`${name}.flange${index}`, G.add3(end, G.mul3(tangent, (s0 + s1) / 2)), S(G.disc(s0, s1, fr, F, P, { bevel: 0.2 }), { tone: "mid" }) + D(dots, { size: 0.42 }), [record(A.disc(F, s0, s1, fr, { name: `${name}.flange${index}`, owner: name }))], { bias: 0.1 });
  });
  return route;
}

// ---------------------------------------------------------------- base
const back = [];
back.push(`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`);
for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
  back.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
  back.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
}
back.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid", inner: Ln(k.sideSeam(PLATE, -4, P, 8), { tone: "faint" }) }));
back.push(Ln(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
const plateScrews = k.corners(PLATE, 10);
back.push(Ln(plateScrews.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
back.push(D(plateScrews.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
record(A.slab(PLATE, -PLATE_H, PLATE_H, { name: "stand.plate", ground: true }, 8));

// regla de kilometraje (0 a 5.000 km, menor cada 250, mayor cada 1.000)
back.push(S(k.slabOf(STRIP, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
const KM_PER = (KM_X[1] - KM_X[0]) / KM_MAX;
const ticks = k.topTicks(KM_X[0], KM_X[1], 250 * KM_PER, 4, STRIP.y, 0.6, [1.8, 3.4], P);
back.push(Ln(ticks.minor, { tone: "lo" }), Ln(ticks.major, { tone: "mid" }));
back.push(Ln(k.lineOnTop([KM_X[0], STRIP.y], [KM_X[0], STRIP.y + 4.2], 0.6, P), { tone: "hi" }));
back.push(D([at([STRIP.x + 2.4, STRIP.y + 2.5, 0.6]), at([STRIP.x + STRIP.w - 2.4, STRIP.y + 2.5, 0.6])], { size: 0.45 }));
// placa de datos
back.push(S(k.slabOf(LABEL, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
back.push(Ln(k.planOutline(k.insetPlan(LABEL, 1.4), 0.8, P, 3), { tone: "faint" }));
back.push(Ln([20, 14, 17].map((w, i) => k.lineOnTop([LABEL.x + 4, LABEL.y + 3.4 + i * 3], [LABEL.x + 4 + w, LABEL.y + 3.4 + i * 3], 0.8, P)).join(""), { tone: "lo", free: true }));
back.push(D([at([LABEL.x + LABEL.w - 2.6, LABEL.y + 2.4, 0.8]), at([LABEL.x + LABEL.w - 2.6, LABEL.y + LABEL.d - 2.4, 0.8])], { size: 0.45 }));

// rieles del carro
for (const y of [42, 49]) {
  box("rail", { x: RAIL_X[0], y, w: RAIL_X[1] - RAIL_X[0], d: 3, r: 0.8 }, 0, 2.2, { tone: "mid" }, { bevel: 0.3, extra: D([RAIL_X[0] + 5, 0, RAIL_X[1] - 5].map((x) => at([x, y + 1.5, 2.2])), { size: 0.4 }) });
}
for (const x of [RAIL_X[0] - 4, RAIL_X[1]]) {
  box("rail.stop", { x, y: 40, w: 4, d: 14, r: 1 }, 0, 6, { tone: "mid" }, { bevel: 0.4, extra: D([at([x + 2, 43.5, 6]), at([x + 2, 50.5, 6])], { size: 0.45 }) });
}

// ---------------------------------------------------------------- cárter
for (const x of [-56, 30]) box("cradle", { x, y: -40, w: 14, d: 80, r: 2 }, 0, 6, { tone: "lo" }, { bevel: 0.4, extra: D([at([x + 7, -36, 6]), at([x + 7, 36, 6])], { size: 0.45 }) });
const panSeams = [16, 28].map((z) => k.sideSeam(PAN, z, P, 8)).join("");
box("pan", PAN, PAN_Z[0], PAN_Z[1], { tone: "mid" }, { steps: 8, inner: Ln(panSeams, { tone: "faint" }) });
const lipBolts = [];
for (const x of [-60, -40, -20, 0, 20, 40]) lipBolts.push([x, LIP.y + 2.2], [x, LIP.y + LIP.d - 2.2]);
for (const y of [-20, 0, 20]) lipBolts.push([LIP.x + 2.2, y], [LIP.x + LIP.w - 2.2, y]);
box("pan.lip", LIP, LIP_Z[0], LIP_Z[1], { tone: "mid" }, { steps: 8, bevel: 0.4, extra: D(lipBolts.map(([x, y]) => at([x, y, LIP_Z[1]])), { size: 0.45 }) });
box("deck", DECK, DECK_Z[0], DECK_Z[1], { tone: "mid" }, { steps: 8, bevel: 0.6, inner: Ln(k.sideSeam(DECK, 51, P, 8), { tone: "faint" }) });

// visor del cárter (+y) y tapón de drenaje
const PAN_FRONT = PAN.y + PAN.d;
const GLASS = { x: -40, z: 25, r: 6.4 };
const glassF = G.frameOf([GLASS.x, PAN_FRONT, GLASS.z], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
{
  const m = planeMatrix([GLASS.x, PAN_FRONT + 0.05, GLASS.z], [1, 0, 0], [0, 0, -1]);
  const content =
    `<g transform="${m}"><clipPath id="vv-clip-glass"><path d="${circ(GLASS.r)}"/></clipPath><g clip-path="url(#vv-clip-glass)">` +
    `<path class="vv-glass" d="${circ(GLASS.r + 0.2)}"/>` +
    `<path class="vv-oil" data-oil d="M-8 -0.8H8V8H-8Z"/>` +
    `<path class="vv-film" data-oil d="M-8 -0.8H8V0.2H-8Z"/>` +
    `<path class="iso-line" data-tone="mid" d="M-8 -0.8H8"/>` +
    `<path class="vv-glint" d="M-3.6 -4.4L-1.2 -5.4L1.6 3.6L-0.8 4.6Z"/></g></g>`;
  const bezel = S(G.ringBand(0, 1.6, GLASS.r, GLASS.r + 2.2, glassF, P, { hole: [1.6, GLASS.r], bevel: 0.2 }), { tone: "mid", className: "vv-bezel" });
  const screws = D(G.dotsOf(glassF, 1.6, GLASS.r + 1.1, 4, P, { phase: Math.PI / 4, all: true }), { size: 0.42 });
  put("pan.glass", [GLASS.x, PAN_FRONT + 0.8, GLASS.z], content + bezel + screws, [record(A.ring(glassF, 0, 1.6, GLASS.r, GLASS.r + 2.2, { name: "pan.glass" }))], { bias: 0.4 });
}
{
  const F = G.frameOf([34, PAN_FRONT, 13], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
  disc("pan.washer", F, 0, 0.6, 4.4, { tone: "lo" });
  disc("pan.drain", F, 0.6, 3, 3.4, { tone: "mid" }, { steps: 6 });
}

// ---------------------------------------------------------------- motor eléctrico, acople y bomba (eje y)
const yAxis = (x, z) => G.frameOf([x, 0, z], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
const PF = yAxis(PUMP_C[0], PUMP_C[1]);
box("motor.foot", { x: -47, y: -31, w: 26, d: 20, r: 1.4 }, DECK_Z[1], 57.2, { tone: "lo" }, { extra: D([at([-44, -28, 57.2]), at([-24, -28, 57.2]), at([-44, -14, 57.2]), at([-24, -14, 57.2])], { size: 0.45 }) });
disc("motor.cap", PF, MOTOR_Y[0] - 2.4, MOTOR_Y[0], MOTOR_R - 1.6, { tone: "mid" }, { bevel: 0.4, extra: D(G.dotsOf(PF, MOTOR_Y[0] - 2.4, MOTOR_R - 4, 4, P, { all: true, phase: Math.PI / 4 }), { size: 0.45 }) });
turned("motor", PF, [[MOTOR_Y[0], MOTOR_R], [MOTOR_Y[1], MOTOR_R]], { tone: "mid" }, {
  extra: Faded(G.ribsOf(PF, MOTOR_Y[0] + 2, MOTOR_Y[1] - 2, MOTOR_R, 30, P, { fade: [0.1, 0.55], seams: true }), { tone: "lo" }),
});
box("motor.box", { x: -41, y: -28, w: 14, d: 12, r: 1 }, PUMP_C[1] + MOTOR_R - 0.4, PUMP_C[1] + MOTOR_R + 6, { tone: "mid" }, { bevel: 0.4, extra: D([at([-38.6, -26, PUMP_C[1] + MOTOR_R + 6]), at([-29.4, -26, PUMP_C[1] + MOTOR_R + 6])], { size: 0.45 }) });
disc("motor.flange", PF, MOTOR_Y[1], MOTOR_Y[1] + 1.8, MOTOR_R + 1.6, { tone: "mid" }, { extra: D(G.dotsOf(PF, MOTOR_Y[1] + 1.8, MOTOR_R + 0.2, 6, P, { fade: [0.04, 0.42] }), { size: 0.42 }) });
disc("coupling", PF, MOTOR_Y[1] + 1.8, PUMP_Y[0], 6.2, { tone: "lo" }, {
  extra: Faded(G.ribsOf(PF, MOTOR_Y[1] + 1.8, PUMP_Y[0], 6.2, 18, P, { fade: [0.1, 0.55] }), { tone: "lo" }),
});
box("pump.foot", { x: -48, y: -2, w: 28, d: 14, r: 1.4 }, DECK_Z[1], PUMP_C[1] - PUMP_R + 0.3, { tone: "lo" }, { extra: D([at([-45, 1, PUMP_C[1] - PUMP_R + 0.3]), at([-23, 1, PUMP_C[1] - PUMP_R + 0.3])], { size: 0.45 }) });
turned("pump", PF, [[PUMP_Y[0], PUMP_R], [PUMP_Y[1], PUMP_R]], { tone: "hi" }, { inner: Ln(G.arcOf(PF, PUMP_Y[0] + 6, PUMP_R, P), { tone: "faint" }) });
const PUMP_FACE = PUMP_Y[1] + 2;
{
  const cover = S(G.disc(PUMP_Y[1], PUMP_FACE, PUMP_R - 0.6, PF, P, { bevel: 0.3 }), { tone: "hi" });
  const bolts = D(G.dotsOf(PF, PUMP_FACE, PUMP_R - 2.6, 8, P, { all: true, phase: Math.PI / 8 }), { size: 0.45 });
  const m = planeMatrix([PUMP_C[0], PUMP_FACE + 0.05, PUMP_C[1]], [1, 0, 0], [0, 0, -1]);
  const outerCavity = polar((a) => 6.9 + 0.95 * Math.cos(5 * a), 120);
  const innerRotor = polar((a) => 5.0 + 0.95 * Math.cos(4 * a), 120);
  const content =
    `<g transform="${m}"><clipPath id="vv-clip-pump"><path d="${circ(8.4)}"/></clipPath><g clip-path="url(#vv-clip-pump)">` +
    `<path class="vv-metal" d="${circ(8.6)}"/>` +
    `<g data-part="pump-outer"><path class="vv-oil" data-oil d="${outerCavity}"/></g>` +
    `<g transform="translate(0.95 0)"><g data-part="pump-inner"><path class="vv-metal vv-rotor" d="${innerRotor}"/><path class="vv-bore" d="${circ(1.4)}"/></g></g>` +
    `</g></g>`;
  const bezel = S(G.ringBand(PUMP_FACE, PUMP_FACE + 1.2, 8.4, 10.2, PF, P, { hole: [PUMP_FACE + 1.2, 8.4], bevel: 0.2 }), { tone: "mid", className: "vv-bezel" });
  const shapes = [record(A.disc(PF, PUMP_Y[1], PUMP_FACE, PUMP_R - 0.6, { name: "pump.cover" })), record(A.ring(PF, PUMP_FACE, PUMP_FACE + 1.2, 8.4, 10.2, { name: "pump.bezel" }))];
  put("pump.cover", G.add3(PF.o, G.mul3(PF.a, PUMP_FACE)), cover + bolts + content + bezel, shapes, { bias: 0.3 });
}
{
  const F = G.frameOf([PUMP_C[0], 5, PUMP_C[1] + PUMP_R - 0.35], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
  turned("pump.relief", F, [[0, 3.2], [2.2, 3.2], [2.2, 2.2], [6.4, 2.2], [6.4, 1.4], [7.2, 1.4]], { tone: "mid" });
}
{
  const F = G.frameOf([PUMP_C[0] + PUMP_R - 0.4, 5, PUMP_C[1]], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  disc("pump.duct", F, 0, MOUNT.x - (PUMP_C[0] + PUMP_R - 0.4), 4.6, { tone: "hi" }, { inner: Ln(G.arcOf(F, 6, 4.6, P), { tone: "faint" }) });
}

// ---------------------------------------------------------------- base del filtro y filtro (eje z)
box("mount", MOUNT, MOUNT_Z[0], MOUNT_Z[1], { tone: "mid" }, { bevel: 0.5, extra: D([at([MOUNT.x + 2.4, MOUNT.y + 2.4, MOUNT_Z[1]]), at([MOUNT.x + MOUNT.w - 2.4, MOUNT.y + 2.4, MOUNT_Z[1]])], { size: 0.45 }) });
const FF = G.frameOf([FILTER.x, FILTER.y, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
disc("filter.gasket", FF, MOUNT_Z[1], FILTER.z0, FILTER.r - 1.6, { tone: "lo" });
{
  const dome = (s) => FILTER.r * Math.sqrt(Math.max(0, 1 - Math.pow((s - (FILTER.z1 - 4.6)) / 5.2, 2)));
  const profile = [[FILTER.z0, FILTER.r - 0.8], [FILTER.z0 + 1.6, FILTER.r]];
  for (let i = 0; i <= 10; i++) { const s = FILTER.z1 - 4.6 + (i / 10) * 4.6; profile.push([f2(s), f2(Math.max(dome(s), i === 10 ? 4.2 : 0)), 1]); }
  profile[2] = [FILTER.z1 - 4.6, FILTER.r];
  const grip = Faded(G.ribsOf(FF, FILTER.z1 - 15, FILTER.z1 - 5.6, FILTER.r, 40, P, { fade: [0.1, 0.55], seams: true }), { tone: "lo" });
  const band = Ln(G.arcOf(FF, FILTER.z0 + 7, FILTER.r, P) + G.arcOf(FF, FILTER.z0 + 16, FILTER.r, P), { tone: "faint" });
  turned("filter", FF, profile, { tone: "hi" }, { inner: band, extra: grip });
}
disc("mount.boss", G.frameOf([MOUNT.x + MOUNT.w, RISER_Y, 64], [1, 0, 0], [0, 1, 0], [0, 0, 1]), 0, 2, 6, { tone: "mid" });

// ---------------------------------------------------------------- galería: base del filtro -> visor de flujo -> culata
const SIGHT_C = [SIGHT.x + SIGHT.w / 2, SIGHT.y + SIGHT.d / 2];
pipe("riser.low", [[MOUNT.x + MOUNT.w + 2, RISER_Y, 64], [RISER_X, RISER_Y, 64], [RISER_X, RISER_Y, SIGHT_Z[0] - 2]], RISER_R, { bend: 10 });
disc("sight.boss.low", G.frameOf([RISER_X, RISER_Y, SIGHT_Z[0] - 2], [0, 0, 1], [1, 0, 0], [0, 1, 0]), 0, 2, 6, { tone: "mid" });
{
  const SY = SIGHT.y + SIGHT.d;
  const m = planeMatrix([SIGHT_C[0], SY + 0.05, (SIGHT_Z[0] + SIGHT_Z[1]) / 2], [1, 0, 0], [0, 0, -1]);
  const blades = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    const p = (r, da) => `${f2(r * Math.cos(a + da))} ${f2(r * Math.sin(a + da))}`;
    return `M${p(1.1, -0.3)}L${p(4.1, -0.12)}L${p(4.1, 0.12)}L${p(1.1, 0.3)}Z`;
  }).join("");
  const content =
    `<g transform="${m}"><clipPath id="vv-clip-flow"><path d="${circ(4.6)}"/></clipPath><g clip-path="url(#vv-clip-flow)">` +
    `<path class="vv-oil" data-oil d="${circ(4.8)}"/>` +
    `<g data-part="paddle"><path class="vv-metal" d="${blades}"/><path class="vv-metal" d="${circ(1.3)}"/></g>` +
    `<path class="vv-glint" d="M-2.6 -3.4L-1 -4L1 2.8L-0.6 3.4Z"/></g></g>`;
  const F = G.frameOf([SIGHT_C[0], SY, (SIGHT_Z[0] + SIGHT_Z[1]) / 2], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
  const bezel = S(G.ringBand(0, 1.1, 4.6, 5.8, F, P, { hole: [1.1, 4.6], bevel: 0.2 }), { tone: "mid", className: "vv-bezel" });
  const body = S(k.slabOf(SIGHT, SIGHT_Z[0], SIGHT_Z[1] - SIGHT_Z[0], P, 3, 0.5), { tone: "hi", inner: Ln(k.sideSeam(SIGHT, SIGHT_Z[0] + 2.2, P, 3) + k.sideSeam(SIGHT, SIGHT_Z[1] - 2.2, P, 3), { tone: "faint" }) });
  const screws = D([[-4.2, -6], [4.2, -6], [-4.2, 6], [4.2, 6]].map(([u, w]) => at([SIGHT_C[0] + u, SY, (SIGHT_Z[0] + SIGHT_Z[1]) / 2 + w])), { size: 0.42 });
  put("sight", [SIGHT_C[0], SIGHT_C[1], (SIGHT_Z[0] + SIGHT_Z[1]) / 2], body + screws + content + bezel, [record(A.slab(SIGHT, SIGHT_Z[0], SIGHT_Z[1] - SIGHT_Z[0], { name: "sight" }, 3)), record(A.ring(F, 0, 1.1, 4.6, 5.8, { name: "sight.bezel" }))]);
}
disc("sight.boss.high", G.frameOf([RISER_X, RISER_Y, SIGHT_Z[1]], [0, 0, 1], [1, 0, 0], [0, 1, 0]), 0, 2, 6, { tone: "mid" });
pipe("riser.high", [[RISER_X, RISER_Y, SIGHT_Z[1] + 2], [RISER_X, RISER_Y, MANI_Z[0] - 1.6]], RISER_R);
disc("mani.boss", G.frameOf([RISER_X, RISER_Y, MANI_Z[0] - 1.6], [0, 0, 1], [1, 0, 0], [0, 1, 0]), 0, 1.6, 6, { tone: "mid" });

// ---------------------------------------------------------------- postes y culata
for (const [x, y] of [[-58, -30], [32, -30], [-58, 22]]) {
  post("post.collar", x, y, 6.6, DECK_Z[1], DECK_Z[1] + 3, { tone: "mid" });
  post("post", x, y, 4.2, DECK_Z[1] + 3, HEAD_Z[0] - 3, { tone: "mid" }, { inner: Ln([96, 128].map((z) => k.sideArc(x, y, 4.2, z, P, 16)).join(""), { tone: "faint" }) });
  post("post.collar", x, y, 6.6, HEAD_Z[0] - 3, HEAD_Z[0], { tone: "mid" });
}
const headSeam = k.sideSeam(HEAD, HEAD_Z[0] + 4, P, 4) + k.sideSeam(HEAD, HEAD_Z[1] - 3, P, 4);
box("head", HEAD, HEAD_Z[0], HEAD_Z[1], { tone: "mid" }, { steps: 4, bevel: 0.6, inner: Ln(headSeam, { tone: "faint" }), extra: k.faceTextSvg(k.sideMatrix([HEAD.x + 8, HEAD.y + HEAD.d], HEAD_Z[0] + 15.6, P, "left"), "2TR-FE", { size: 5, tone: "lo" }) });
box("mani", MANI, MANI_Z[0], MANI_Z[1], { tone: "mid" }, { bevel: 0.4, extra: D([[-20, 173], [18, 173], [-20, 185], [18, 185]].map(([y, z]) => at([MANI.x + MANI.w, y, z])), { size: 0.45 }) });

// árboles de levas, tapas, lóbulos y actuadores VVT-i (eje x)
const lobePoly = (phase, base = 4.8, lift = 3.0) => Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2;
  const r = base + lift * Math.pow(Math.max(0, Math.cos(a - phase)), 3);
  return [f2(r * Math.cos(a)), f2(r * Math.sin(a))];
});
const ACT_DATA = {};
for (const [cam, y] of Object.entries(CAMS)) {
  const F = G.frameOf([0, y, CAM_Z], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  const owner = `cam.${cam}`;
  const blocks = [...CAPS_X.map((x) => [x - 3.5, x + 3.5]), ...CYL_X.flatMap((cx) => [-4.5, 4.5].map((dx) => [cx + dx - 1.8, cx + dx + 1.8]))].sort((a, b) => a[0] - b[0]);
  let from = CAM_X[0];
  for (const [b0, b1] of [...blocks, [ACT.s0, ACT.s0]]) {
    if (b0 - from > 0.05) disc(`cam.${cam}`, F, from, b0, 3.8, { tone: "mid" }, { owner, inner: Ln(G.arcOf(F, (from + b0) / 2, 3.8, P), { tone: "faint" }) });
    from = b1;
  }
  for (const x of CAPS_X) {
    box(`cap.${cam}`, { x: x - 3.5, y: y - 8, w: 7, d: 16, r: 1 }, HEAD_Z[1], CAM_Z + 7, { tone: "mid" }, { bevel: 0.4, owner, extra: D([at([x, y - 5.6, CAM_Z + 7]), at([x, y + 5.6, CAM_Z + 7])], { size: 0.5, tone: "hi" }) });
  }
  CYL_X.forEach((cx, i) => {
    const order = FIRING.indexOf(i + 1);
    const base = (cam === "in" ? 0 : 0.5) * Math.PI;
    const phase = base + order * (Math.PI / 2);
    for (const dx of [-4.5, 4.5]) prism(`lobe.${cam}`, F, lobePoly(phase), cx + dx - 1.8, cx + dx + 1.8, { tone: "hi" }, { owner });
  });
  // actuador
  const lit = cam === "in";
  disc(`act.${cam}.hub`, F, ACT.s0, ACT.s0 + 3, ACT.r - 2.4, { tone: "mid" }, { owner });
  disc(`act.${cam}.sprocket`, F, ACT.s0 + 3, ACT.s0 + 6.4, ACT.r + 1.2, { tone: "mid" }, {
    owner,
    extra: Faded(G.ribsOf(F, ACT.s0 + 3, ACT.s0 + 6.4, ACT.r + 1.2, 42, P, { fade: [0.1, 0.55] }), { tone: "lo" }),
  });
  disc(`act.${cam}.body`, F, ACT.s0 + 6.4, ACT.cover, ACT.r, { tone: "hi" }, { owner, inner: Ln(G.arcOf(F, ACT.cover - 1.2, ACT.r, P), { tone: "faint" }) });
  const cover = S(G.disc(ACT.cover, ACT.face, ACT.r - 0.8, F, P, { bevel: 0.3 }), { tone: "hi" });
  const bolts = D(G.dotsOf(F, ACT.face, ACT.r - 2.4, 4, P, { all: true, phase: Math.PI / 4 }), { size: 0.5, tone: "hi" });
  const m = planeMatrix([ACT.face + 0.05, y, CAM_Z], [0, 1, 0], [0, 0, -1]);
  const mFront = planeMatrix([ACT.bezel + 0.05, y, CAM_Z], [0, 1, 0], [0, 0, -1]);
  const shoes = [0, 1, 2, 3].map((i) => sector(3.6, ACT.win + 0.3, (i * 90 - 17) * DEG, (i * 90 + 17) * DEG)).join("");
  const vanes = [0, 1, 2, 3].map((i) => sector(2.6, ACT.win - 0.35, (i * 90 + 45 - 7.5) * DEG, (i * 90 + 45 + 7.5) * DEG, 6)).join("");
  const rotorClass = lit ? "vv-rotor-lit" : "vv-metal";
  const content =
    `<g transform="${m}"><clipPath id="vv-clip-${cam}"><path d="${circ(ACT.win)}"/></clipPath><g clip-path="url(#vv-clip-${cam})">` +
    `<path class="vv-oil" data-oil d="${circ(ACT.win + 0.4)}"/>` +
    `<path class="vv-metal" d="${shoes}"/>` +
    `<g data-part="rotor-${cam}"><path class="${rotorClass}" d="${vanes}"/><path class="${rotorClass}" d="${circ(3.1)}"/><path class="vv-bore" d="${circ(1.1)}"/></g>` +
    `</g></g>`;
  const bezel = S(G.ringBand(ACT.face, ACT.bezel, ACT.win, ACT.win + 1.8, F, P, { hole: [ACT.bezel, ACT.win], bevel: 0.2 }), { tone: "mid", className: "vv-bezel" });
  const index = `<g transform="${mFront}"><g data-part="cmd-${cam}"><path class="iso-line" data-tone="${lit ? "lit" : "hi"}" d="M0 ${f2(-(ACT.win + 0.15))}V${f2(-(ACT.win + 1.65))}" style="stroke-width:1"/></g></g>`;
  const shapes = [record(A.disc(F, ACT.cover, ACT.face, ACT.r - 0.8, { name: `act.${cam}.cover`, owner })), record(A.ring(F, ACT.face, ACT.bezel, ACT.win, ACT.win + 1.8, { name: `act.${cam}.bezel`, owner }))];
  put(`act.${cam}.cover`, [ACT.face, y, CAM_Z], cover + bolts + content + bezel + index, shapes, { bias: 0.3 });
  ACT_DATA[cam] = { y };
}

// OCV (válvula de control de aceite) en el frente del bloque de galería
for (const [cam, y] of Object.entries(CAMS)) {
  const F = G.frameOf([MANI.x + MANI.w, y, OCV_Z], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  turned(`ocv.${cam}`, F, [[1.2, 3.0], [3.2, 3.0], [3.2, 4.2], [10.2, 4.2], [10.2, 3.2], [12.2, 3.2]], { tone: "hi" }, { inner: Ln(G.arcOf(F, 6.7, 4.2, P), { tone: "faint" }) });
  disc(`ocv.${cam}.flange`, F, 0, 1.2, 4.6, { tone: "mid" }, { extra: D(G.dotsOf(F, 1.2, 3.8, 2, P, { all: true, phase: Math.PI / 2 }), { size: 0.4 }) });
  const plug = { x: MANI.x + MANI.w + 4.2, y: y - 2.6, w: 5, d: 5.2, r: 0.6 };
  box(`ocv.${cam}.plug`, plug, OCV_Z + 3.9, OCV_Z + 8.4, { tone: "mid" }, { extra: D([at([plug.x + plug.w, y - 1.2, OCV_Z + 6.2]), at([plug.x + plug.w, y + 1.2, OCV_Z + 6.2])], { size: 0.42, tone: "hi" }) });
}

// ---------------------------------------------------------------- reloj de retraso
post("gauge.base", GAUGE.x, GAUGE.y, 11, 0, 2.4, { tone: "lo" }, { steps: 40 });
post("gauge.post", GAUGE.x, GAUGE.y, 2.8, 2.4, GAUGE.z0 - 3, { tone: "mid" }, { inner: Ln(k.sideArc(GAUGE.x, GAUGE.y, 2.8, 20, P, 16), { tone: "faint" }) });
post("gauge.neck", GAUGE.x, GAUGE.y, 4.6, GAUGE.z0 - 3, GAUGE.z0, { tone: "mid" });
const GAUGE_TOP = GAUGE.z1;
const GAUGE_SPAN = 270;
{
  const body = S(k.cylinder(GAUGE.x, GAUGE.y, GAUGE.r, GAUGE.z0, GAUGE.z1 - GAUGE.z0, P, 64, 0.8), { tone: "hi", crease: "lo" });
  const knurl = Ln(k.knurl(GAUGE.x, GAUGE.y, GAUGE.r, GAUGE_TOP - 3, GAUGE_TOP, 72, P, 0.3), { tone: "lo" });
  const band = Ln(k.sideArc(GAUGE.x, GAUGE.y, GAUGE.r, GAUGE_TOP - 3, P, 40), { tone: "faint" });
  const bezel = Ln(k.ring(GAUGE.x, GAUGE.y, GAUGE.r - 2, GAUGE_TOP, P, 64), { tone: "lo" });
  const t = k.radialTicks(GAUGE.x, GAUGE.y, GAUGE.r - 2.6, 20, 5, GAUGE_TOP, [1.2, 2.6], P, (-GAUGE_SPAN / 2) * DEG, GAUGE_SPAN * DEG);
  const hub = Ln(k.ring(GAUGE.x, GAUGE.y, 1.5, GAUGE_TOP, P, 16), { tone: "mid" });
  const m = planeMatrix([GAUGE.x, GAUGE.y, GAUGE_TOP + 0.2], [1, 0, 0], [0, 1, 0]);
  const needle = `<g transform="${m}"><g data-part="needle" transform="rotate(${-GAUGE_SPAN / 2})"><path class="iso-line" data-tone="hi" data-free="" d="M0 3.2V${f2(-(GAUGE.r - 3.6))}" style="stroke-width:1.1"/></g></g>`;
  const red = Ln(k.radialTicks(GAUGE.x, GAUGE.y, GAUGE.r - 2.6, 20, 1, GAUGE_TOP, [0, 0], P, (GAUGE_SPAN / 2 - 40.5) * DEG, 40.5 * DEG).minor, { tone: "lo" });
  put("gauge", [GAUGE.x, GAUGE.y, (GAUGE.z0 + GAUGE.z1) / 2], body + knurl + band + bezel + Ln(t.minor, { tone: "lo" }) + Ln(t.major, { tone: "mid" }) + hub + needle, [record(A.cylinder(GAUGE.x, GAUGE.y, GAUGE.r, GAUGE.z0, GAUGE.z1 - GAUGE.z0, { name: "gauge" }))]);
  void red;
}

// ---------------------------------------------------------------- ordenar y montar
A.settle(R, P);
R.items.sort((a, b) => a.key - b.key);
const groups = R.items.map((item) => `<g class="it" data-name="${item.name}">${item.svg}</g>`);

// carro de kilometraje (se mueve en x; va delante de todo lo que está sobre la placa)
const CARR = { x: -12, y: 40.6, w: 24, d: 11.6, r: 2 };
const carriage = [
  `<path class="iso-halo" d="${k.haloOf(k.insetPlan(CARR, 2), 2.2, 0.1, P)}" style="filter:blur(3px)"/>`,
  S(k.slabOf(CARR, 2.2, 3.4, P, 5, 0.5), { tone: "mid" }),
  D([-8, 8].map((x) => at([x, CARR.y + 1.6, 5.6])), { size: 0.42 }),
  S(k.slabOf({ x: -1.1, y: CARR.y + CARR.d - 0.4, w: 2.2, d: 6.4, r: 0.6 }, 2.6, 0.9, P, 2), { tone: "hi", lit: true }),
  S(k.cylinder(0, 46.4, 4, 5.6, 4.4, P, 32), { tone: "mid" }),
  Ln(k.knurl(0, 46.4, 4, 5.6, 10, 26, P), { tone: "lo" }),
  Ln(k.lineOnTop([0, 46.4], [0, 50.2], 10, P), { tone: "hi", free: "end" }),
].join("");
const CARR_SHIFT = KM_X[0];

const LABEL_TEXT =
  "Banco de prueba del circuito de lubricación de un motor Toyota 2TR-FE con Dual VVT-i. Abajo, el cárter con su visor de aceite; encima, un motor eléctrico mueve la bomba de aceite trocoidal y la bomba envía el aceite al filtro. Desde la base del filtro sube la galería, pasa por un visor de flujo con paletas y llega al bloque de galería de la culata, donde dos válvulas OCV reparten el aceite a los actuadores VVT-i de admisión y escape, en el frente de los dos árboles de levas. Un carro sobre una regla marca los kilómetros desde el último cambio de aceite y un reloj muestra cuánto más tarda en responder el VVT-i.";

const svg = k.figureSvg({
  width: W,
  height: H,
  label: LABEL_TEXT,
  body: [...back, `<g class="vv-rig">${groups.join("")}</g>`, `<g data-part="carriage" transform="${k.translateAlong(P, [CARR_SHIFT, 0, 0])}">${carriage}</g>`],
});

const DATA = {
  ax: k.axisVector(P, [1, 0, 0]).map((v) => Number(v.toFixed(5))),
  kmX: KM_X,
  kmMax: KM_MAX,
  gaugeSpan: GAUGE_SPAN,
};

const CAPTION =
  "Banco de prueba del circuito de lubricación del Toyota 2TR-FE (4 cilindros en línea, 2.694 cm³, 95,0 × 95,0 mm). La bomba trocoidal saca el aceite del cárter y lo manda al filtro; de ahí sube por la galería a la culata, donde cada OCV dirige la presión a la cámara de avance o de retraso de su actuador. Las paletas del rotor giran el árbol de levas respecto al piñón de la cadena, y así cambia el tiempo de las válvulas. Con los kilómetros el aceite se oxida, junta hollín y se espesa, y los filtros de malla de las OCV se tapan: llega menos caudal a las cámaras y el rotor llega tarde a donde la ECU lo manda. Los lóbulos de las levas están desfasados en el orden de encendido 1-3-4-2 (por verificar, igual que el Dual VVT-i desde 2015). El porcentaje de retraso es un modelo ilustrativo, no una medición de Toyota; aceite 5W-30 y cambio cada 5.000 km según el taller.";

const plate = k.plateHtml({
  fig: "Fig 1",
  title: "Aceite y VVT-i · 2TR-FE",
  hint: "Arrastra o usa ← →",
  readout: "0 km · aceite nuevo · respuesta normal",
  keys: [
    { mark: "lit", label: "Rotor del VVT-i de admisión y la marca de lo que pide la ECU" },
    { mark: "raised", label: "Bomba, filtro, galería, OCV y actuadores de admisión y escape" },
    { mark: "dim", label: "Color del aceite: nuevo (miel) a vencido (casi negro)" },
  ],
  caption: CAPTION,
  body: `<div class="iso-stage vv-stage" tabindex="0" role="slider" aria-label="Kilómetros desde el último cambio de aceite. Flechas izquierda y derecha suman o restan 250 km; Mayúsculas más flecha, 1.000 km; Inicio y Fin van a 0 y 5.000 km." aria-valuemin="0" aria-valuemax="${KM_MAX}" aria-valuenow="0" aria-valuetext="0 km desde el cambio, aceite nuevo">${svg}<span class="vv-sr" role="status" aria-live="polite" data-status></span></div>`,
});

mkdirSync(dirname(OUT_TS), { recursive: true });
mkdirSync(dirname(OUT_HTML), { recursive: true });
writeFileSync(
  OUT_TS,
  `// Generado por figures/vvti/build.mjs. No editar a mano.\n/* eslint-disable */\nexport const VVTI_PLATE = ${JSON.stringify(plate)};\nexport const VVTI_DATA = ${JSON.stringify(DATA)} as const;\n`,
);

// página suelta: kit css + css de la figura + modelo + live (sin "export")
const KIT_CSS = readFileSync(join(HERE, "..", "kit", "iso.css"), "utf8");
writeFileSync(join(ROOT, "src", "components", "figures", "iso.css"), "/* Copia de figures/kit/iso.css (la escribe figures/vvti/build.mjs). */\n" + KIT_CSS);
const FIG_CSS = readFileSync(join(ROOT, "src", "components", "figures", "vvti", "vvti.css"), "utf8");
const strip = (src) => src.replace(/^import .*$/gm, "").replace(/^export /gm, "");
const MODEL = strip(readFileSync(join(ROOT, "src", "components", "figures", "vvti", "model.js"), "utf8"));
const LIVE = strip(readFileSync(join(ROOT, "src", "components", "figures", "vvti", "live.js"), "utf8"));
const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aceite y VVT-i · 2TR-FE</title><style>${KIT_CSS}
body{margin:0;background:#FAFAF7;font-family:system-ui,sans-serif}.vv-page{max-width:650px;margin:0 auto;padding:16px}</style><style>${FIG_CSS}</style></head><body><div class="iso vvti vv-page" data-theme="light">${plate}</div><script type="module">${MODEL}\n${LIVE}\nmountVvti(document.querySelector(".vvti"), ${JSON.stringify(DATA)});</script></body></html>`;
writeFileSync(OUT_HTML, html);
console.log("wrote", OUT_TS.replace(ROOT + "/", ""), `${(plate.length / 1024).toFixed(0)} KB`, `· ${R.items.length} items · scale ${KS.toFixed(3)} · ${ROUTES.length} routes`);

A.auditOrExit(R, P, { allow: [["pump", "pump.duct"]] });
