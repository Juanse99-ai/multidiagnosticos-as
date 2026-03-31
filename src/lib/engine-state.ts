// Shared mutable state between GSAP (engine-section) and Three.js (engine-canvas)
// Both are client-only, so this module-level object is the same instance on the client
export const engineState = { progress: 0 };
