export type ShapeName = "sphere" | "torus" | "helix" | "galaxy";

function set3(pos: Float32Array, i: number, x: number, y: number, z: number) {
  pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
}

// ── SPHERE ───────────────────────────────────────────────────────────────────

function fillSphere(pos: Float32Array, count: number) {
  for (let i = 0; i < count; i++) {
    const rnd = Math.random();
    let x: number, y: number, z: number;
    if (rnd < 0.56) {
      const r   = 1.6 + Math.random() * 0.38;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const th  = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5) + Math.random() * 0.6;
      x = r * Math.sin(phi) * Math.cos(th);
      y = r * Math.sin(phi) * Math.sin(th);
      z = r * Math.cos(phi);
    } else if (rnd < 0.72) {
      const r   = 0.4 + Math.random() * 0.8;
      const phi = Math.acos(2 * Math.random() - 1);
      const th  = Math.random() * Math.PI * 2;
      x = r * Math.sin(phi) * Math.cos(th);
      y = r * Math.sin(phi) * Math.sin(th);
      z = r * Math.cos(phi);
    } else if (rnd < 0.86) {
      const r   = 2.2 + Math.random() * 0.65;
      const phi = Math.acos(2 * Math.random() - 1);
      const th  = Math.random() * Math.PI * 2;
      x = r * Math.sin(phi) * Math.cos(th);
      y = r * Math.sin(phi) * Math.sin(th);
      z = r * Math.cos(phi);
    } else {
      const th = Math.random() * Math.PI * 2;
      const r  = 1.0 + Math.random() * 1.55;
      x = Math.cos(th) * r;
      y = (Math.random() - 0.5) * 0.14;
      z = Math.sin(th) * r;
    }
    set3(pos, i, x, y, z);
  }
}

// ── TORUS ────────────────────────────────────────────────────────────────────
// Classic donut ring, tilted 55° toward viewer so depth is visible.

function fillTorus(pos: Float32Array, count: number) {
  const R    = 1.55; // major radius
  const r    = 0.42; // minor (tube) radius
  const TILT = 55 * (Math.PI / 180); // tilt around X axis
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);

  for (let i = 0; i < count; i++) {
    const u  = Math.random() * Math.PI * 2;
    const v  = Math.random() * Math.PI * 2;
    // Surface biased: 80% on shell, 20% slight inner fill
    const rr = r * (Math.random() < 0.80 ? (0.88 + Math.random() * 0.12) : Math.random() * 0.88);

    const tx = (R + rr * Math.cos(v)) * Math.cos(u);
    const ty = (R + rr * Math.cos(v)) * Math.sin(u);
    const tz = rr * Math.sin(v);

    // Apply tilt around X
    set3(pos, i, tx, ty * cosT - tz * sinT, ty * sinT + tz * cosT);
  }
}

// ── HELIX (Double) ────────────────────────────────────────────────────────────
// DNA-style double helix with two intertwined strands and connecting rungs.
// Looks spectacular rotating around Y.

function fillHelix(pos: Float32Array, count: number) {
  const TURNS  = 5.5;
  const HEIGHT = 4.0;
  const RADIUS = 0.88;
  const TUBE   = 0.09;
  const RUNG_N = Math.floor(TURNS * 2); // rungs per strand pair

  const STRAND = Math.floor(count * 0.38);
  const RUNGS  = Math.floor(count * 0.24);
  const EXTRA  = count - STRAND * 2 - RUNGS; // spare → add to strand1

  // Strand builder
  function strand(startIdx: number, n: number, phaseOffset: number) {
    for (let i = 0; i < n; i++) {
      const t     = i / n;
      const angle = t * TURNS * Math.PI * 2 + phaseOffset;
      const y     = (t - 0.5) * HEIGHT;
      const cx    = RADIUS * Math.cos(angle);
      const cz    = RADIUS * Math.sin(angle);
      // Small tube scatter
      const tr    = TUBE * Math.sqrt(Math.random());
      const ta    = Math.random() * Math.PI * 2;
      set3(pos, startIdx + i,
        cx + tr * Math.cos(ta),
        y  + tr * Math.sin(ta) * 0.4,
        cz + tr * Math.sin(ta + 1.5)
      );
    }
  }

  strand(0,              STRAND + EXTRA, 0);
  strand(STRAND + EXTRA, STRAND,         Math.PI);

  // Connecting rungs — sampled evenly along height
  const rungStep = 1 / RUNG_N;
  for (let i = 0; i < RUNGS; i++) {
    const ii      = STRAND * 2 + EXTRA + i;
    const rungIdx = Math.floor(i / (RUNGS / RUNG_N));
    const t       = rungIdx * rungStep;
    const angle   = t * TURNS * Math.PI * 2;
    const y       = (t - 0.5) * HEIGHT;
    const along   = Math.random(); // 0=strand1 side, 1=strand2 side
    const a1      = angle;
    const a2      = angle + Math.PI;
    set3(pos, ii,
      RADIUS * (Math.cos(a1) * (1-along) + Math.cos(a2) * along) + (Math.random()-0.5) * TUBE,
      y + (Math.random()-0.5) * TUBE * 0.5,
      RADIUS * (Math.sin(a1) * (1-along) + Math.sin(a2) * along) + (Math.random()-0.5) * TUBE
    );
  }
}

// ── GALAXY (Spiral) ───────────────────────────────────────────────────────────
// Tilted spiral galaxy: dense central bulge + 3 logarithmic spiral arms
// + scattered disc stars. Stunning with slow Y-axis rotation.

function fillGalaxy(pos: Float32Array, count: number) {
  const NUM_ARMS  = 3;
  const ARM_TURNS = 2.5;
  const TILT      = 40 * (Math.PI / 180); // tilt around X for 3D look
  const cosT      = Math.cos(TILT);
  const sinT      = Math.sin(TILT);

  const BULGE = Math.floor(count * 0.22);
  const ARMS  = Math.floor(count * 0.58);
  const DISC  = count - BULGE - ARMS;

  function applyTilt(x: number, y: number, z: number): [number, number, number] {
    return [x, y * cosT - z * sinT, y * sinT + z * cosT];
  }

  // Central bulge — dense sphere, slightly flattened
  for (let i = 0; i < BULGE; i++) {
    const r   = 0.32 * Math.cbrt(Math.random());
    const phi = Math.acos(2 * Math.random() - 1);
    const th  = Math.random() * Math.PI * 2;
    const [x, y, z] = applyTilt(
      r * Math.sin(phi) * Math.cos(th),
      r * Math.sin(phi) * Math.sin(th) * 0.35,
      r * Math.cos(phi)
    );
    set3(pos, i, x, y, z);
  }

  // Spiral arms — logarithmic-style, scatter widens with radius
  for (let i = 0; i < ARMS; i++) {
    const ii       = BULGE + i;
    const armPhase = (i % NUM_ARMS) / NUM_ARMS * Math.PI * 2;
    const t        = Math.pow(Math.random(), 0.65); // bias toward outer arms
    const angle    = armPhase + t * ARM_TURNS * Math.PI * 2;
    const r        = 0.18 + t * 1.88;

    // Perpendicular scatter (wider at edges)
    const scatter  = (0.04 + t * 0.22) * (Math.random() - 0.5) * 2;
    const px = Math.cos(angle + Math.PI/2) * scatter;
    const pz = Math.sin(angle + Math.PI/2) * scatter;

    const [x, y, z] = applyTilt(
      r * Math.cos(angle) + px,
      (Math.random() - 0.5) * (0.03 + t * 0.10),
      r * Math.sin(angle) + pz
    );
    set3(pos, ii, x, y, z);
  }

  // Disc field stars — thin, scattered across full disc
  for (let i = 0; i < DISC; i++) {
    const ii = BULGE + ARMS + i;
    const th = Math.random() * Math.PI * 2;
    const r  = Math.sqrt(Math.random()) * 2.15;
    const [x, y, z] = applyTilt(
      r * Math.cos(th),
      (Math.random() - 0.5) * 0.09,
      r * Math.sin(th)
    );
    set3(pos, ii, x, y, z);
  }
}

// ── export ───────────────────────────────────────────────────────────────────

export function generateShapePositions(shape: ShapeName, count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  if      (shape === "sphere") fillSphere(pos, count);
  else if (shape === "torus")  fillTorus(pos, count);
  else if (shape === "helix")  fillHelix(pos, count);
  else if (shape === "galaxy") fillGalaxy(pos, count);
  return pos;
}
