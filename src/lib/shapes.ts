export type ShapeName = "sphere" | "fish" | "dragon" | "hamster";

type P2 = [number, number];

function bzPt(t: number, a: P2, b: P2, c: P2, d: P2): P2 {
  const m = 1 - t;
  return [
    m*m*m*a[0] + 3*m*m*t*b[0] + 3*m*t*t*c[0] + t*t*t*d[0],
    m*m*m*a[1] + 3*m*m*t*b[1] + 3*m*t*t*c[1] + t*t*t*d[1],
  ];
}

function bzTan(t: number, a: P2, b: P2, c: P2, d: P2): P2 {
  const m = 1 - t;
  const rx = 3*(m*m*(b[0]-a[0]) + 2*m*t*(c[0]-b[0]) + t*t*(d[0]-c[0]));
  const ry = 3*(m*m*(b[1]-a[1]) + 2*m*t*(c[1]-b[1]) + t*t*(d[1]-c[1]));
  const l  = Math.hypot(rx, ry);
  return l > 1e-9 ? [rx/l, ry/l] : [1, 0];
}

function rndSphere(cx: number, cy: number, cz: number, r: number): [number, number, number] {
  const phi   = Math.acos(2 * Math.random() - 1);
  const theta = Math.random() * Math.PI * 2;
  const rad   = r * Math.cbrt(Math.random());
  return [
    cx + rad * Math.sin(phi) * Math.cos(theta),
    cy + rad * Math.sin(phi) * Math.sin(theta),
    cz + rad * Math.cos(phi),
  ];
}

function set3(pos: Float32Array, i: number, x: number, y: number, z: number) {
  pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
}

// ── SPHERE ──────────────────────────────────────────────────────────────────

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

// ── FISH (Koi) ───────────────────────────────────────────────────────────────
// Koi reference: C-curved body, head lower-right, large split fan-tail upper-left,
// tall dorsal fin along the convex (outside) edge of the curve.

function fillFish(pos: Float32Array, count: number) {
  const BODY = Math.floor(count * 0.48);
  const TAIL = Math.floor(count * 0.28);
  const DFIN = Math.floor(count * 0.14); // dorsal fin
  const PFIN = Math.floor(count * 0.05); // pectoral fins
  const HEAD = count - BODY - TAIL - DFIN - PFIN;

  // Cubic bezier spine: head (lower-right) → tail attachment (upper-left)
  const S0: P2 = [ 1.05, -1.22];
  const S1: P2 = [ 1.52, -0.05];
  const S2: P2 = [ 0.08,  0.92];
  const S3: P2 = [-0.88,  1.12];

  // Body — disc perpendicular to spine, tapers from head to tail
  for (let i = 0; i < BODY; i++) {
    const t           = Math.random();
    const [sx, sy]    = bzPt(t, S0, S1, S2, S3);
    const [tang, tany]= bzTan(t, S0, S1, S2, S3);
    const nx = -tany, ny = tang; // left-hand normal
    const maxR = 0.52 * Math.pow(1 - t, 0.42) + 0.08;
    const r    = maxR * Math.sqrt(Math.random());
    const a    = Math.random() * Math.PI * 2;
    set3(pos, i,
      sx + nx * r * Math.cos(a),
      sy + ny * r * Math.cos(a),
      r * Math.sin(a) * 0.50
    );
  }

  // Tail — V-shaped fan from S3, two lobes fanning upward
  // Right lobe: 22°→88°, Left lobe: 98°→162° (from +X axis)
  for (let i = 0; i < TAIL; i++) {
    const ii      = BODY + i;
    const isRight = i < TAIL * 0.54;
    const angle   = isRight
      ? (22 + Math.random() * 66) * (Math.PI / 180)
      : (98 + Math.random() * 64) * (Math.PI / 180);
    const r    = Math.pow(Math.random(), 0.50) * 1.30;
    const perp = (Math.random() - 0.5) * (0.05 + (r / 1.30) * 0.14);
    set3(pos, ii,
      S3[0] + Math.cos(angle) * r - Math.sin(angle) * perp,
      S3[1] + Math.sin(angle) * r + Math.cos(angle) * perp,
      (Math.random() - 0.5) * 0.16
    );
  }

  // Dorsal fin — right-hand normal (outside/convex of C-curve), tallest at mid-body
  for (let i = 0; i < DFIN; i++) {
    const ii           = BODY + TAIL + i;
    const t            = 0.04 + Math.random() * 0.72;
    const [sx, sy]     = bzPt(t, S0, S1, S2, S3);
    const [tangX, tangY] = bzTan(t, S0, S1, S2, S3);
    const nx = tangY, ny = -tangX; // right-hand normal = convex side
    const bodyR  = 0.52 * Math.pow(1 - t, 0.42) + 0.08;
    const finH   = 0.68 * Math.sin((t - 0.04) / 0.72 * Math.PI);
    const offset = bodyR + finH * (0.08 + Math.random() * 0.92);
    set3(pos, ii,
      sx + nx * offset,
      sy + ny * offset,
      (Math.random() - 0.5) * 0.07
    );
  }

  // Pectoral fins — small side fins near head
  for (let i = 0; i < PFIN; i++) {
    const ii   = BODY + TAIL + DFIN + i;
    const side = i < PFIN / 2 ? 1 : -1;
    const t    = 0.05 + Math.random() * 0.20;
    const [sx, sy] = bzPt(t, S0, S1, S2, S3);
    const finR = 0.18 + Math.random() * 0.40;
    set3(pos, ii,
      sx + (Math.random() - 0.5) * 0.18,
      sy + (Math.random() - 0.5) * 0.20,
      side * (0.45 + finR * 0.55)
    );
  }

  // Extra head density — rounder head at t≈0
  for (let i = 0; i < HEAD; i++) {
    const ii       = BODY + TAIL + DFIN + PFIN + i;
    const t        = Math.random() * 0.08;
    const [sx, sy] = bzPt(t, S0, S1, S2, S3);
    const [x, y, z] = rndSphere(sx, sy, 0, 0.52);
    set3(pos, ii, x, y, z * 0.58);
  }
}

// ── DRAGON (Chinese coiling) ──────────────────────────────────────────────────
// Reference: oval-ish coil ~1.3 loops, large head upper-right with horns/antlers,
// body spirals counterclockwise, tapering tail at center.

function fillDragon(pos: Float32Array, count: number) {
  const LOOPS  = 1.28;
  const TMAX   = LOOPS * Math.PI * 2;
  const OFFSET = 0.76; // rotates spiral so head lands upper-right

  const BODY  = Math.floor(count * 0.58);
  const HEAD  = Math.floor(count * 0.22);
  const HORNS = Math.floor(count * 0.12);
  const TAIL  = count - BODY - HEAD - HORNS;

  const headX = 1.30 * Math.cos(OFFSET);
  const headY = 1.30 * Math.sin(OFFSET) * 0.80;

  // Coiling serpentine body — shrinking Archimedean spiral, oval-compressed
  for (let i = 0; i < BODY; i++) {
    const t   = (i / BODY) * TMAX;
    const r   = 1.30 - (t / TMAX) * 0.88;
    const sx  = r * Math.cos(t + OFFSET);
    const sy  = r * Math.sin(t + OFFSET) * 0.80;
    const br  = (0.30 - (t / TMAX) * 0.22) * Math.sqrt(Math.random());
    const a   = Math.random() * Math.PI * 2;
    set3(pos, i,
      sx + br * Math.cos(a) * 0.72,
      sy + br * Math.sin(a),
      br * Math.cos(a) * 0.68
    );
  }

  // Head — large elongated sphere with snout bias
  const snoutDX = Math.cos(OFFSET) * 0.28;
  const snoutDY = Math.sin(OFFSET) * 0.28 * 0.80;
  for (let i = 0; i < HEAD; i++) {
    const ii = BODY + i;
    const [x, y, z] = rndSphere(headX, headY, 0, 0.50);
    const snout = i < HEAD * 0.28 ? Math.random() : 0;
    set3(pos, ii,
      x + snoutDX * snout,
      y + snoutDY * snout,
      z * 0.72
    );
  }

  // Horns / antlers — two branching projections from top of head
  // Each horn: a short stem that splits into two branches
  for (let i = 0; i < HORNS; i++) {
    const ii   = BODY + HEAD + i;
    const side = i < HORNS / 2 ? -1 : 1;
    const half = i < HORNS / 2 ? i : i - Math.floor(HORNS / 2);
    const q    = half / (HORNS / 2);

    // Base stem (lower 40%)
    if (q < 0.40) {
      const t = q / 0.40;
      set3(pos, ii,
        headX + side * 0.13 + (Math.random() - 0.5) * 0.06,
        headY + 0.44 + t * 0.30,
        (Math.random() - 0.5) * 0.08
      );
    } else {
      // Two branches from stem tip
      const branch = q < 0.70 ? 0 : 1;
      const bt     = branch === 0 ? (q - 0.40) / 0.30 : (q - 0.70) / 0.30;
      const branchAngle = branch === 0
        ? Math.PI / 2 + side * 0.5   // outer branch
        : Math.PI / 2 - side * 0.3;  // inner branch
      set3(pos, ii,
        headX + side * 0.13 + Math.cos(branchAngle) * bt * 0.30 + (Math.random()-0.5)*0.05,
        headY + 0.74 + Math.sin(branchAngle) * bt * 0.30 + (Math.random()-0.5)*0.05,
        (Math.random() - 0.5) * 0.07
      );
    }
  }

  // Tail — small curling cluster at end of spiral
  const tailAngle = TMAX + OFFSET;
  const tailR     = 1.30 - 0.88;
  const tailX     = tailR * Math.cos(tailAngle);
  const tailY     = tailR * Math.sin(tailAngle) * 0.80;
  for (let i = 0; i < TAIL; i++) {
    const ii   = BODY + HEAD + HORNS + i;
    const t    = i / TAIL;
    const curl = tailAngle + t * Math.PI * 0.70;
    set3(pos, ii,
      tailX + Math.cos(curl) * t * 0.28 + (Math.random()-0.5)*0.06,
      tailY + Math.sin(curl) * t * 0.22 + (Math.random()-0.5)*0.06,
      (Math.random() - 0.5) * 0.09
    );
  }
}

// ── HAMSTER ──────────────────────────────────────────────────────────────────
// Reference: extremely round body, very large protruding cheeks, round head,
// small round ears on top, tiny nose and eyes front-facing, small front paws.

function fillHamster(pos: Float32Array, count: number) {
  const BODY   = Math.floor(count * 0.38);
  const HEAD   = Math.floor(count * 0.16);
  const LCHEEK = Math.floor(count * 0.16);
  const RCHEEK = Math.floor(count * 0.16);
  const LEAR   = Math.floor(count * 0.06);
  const REAR   = Math.floor(count * 0.06);
  const DETAIL = count - BODY - HEAD - LCHEEK - RCHEEK - LEAR - REAR;

  let base = 0;

  // Large round body — slightly wider than tall
  for (let i = 0; i < BODY; i++) {
    const [x, y, z] = rndSphere(0, -0.30, -0.06, 1.06);
    set3(pos, base + i, x * 1.04, y * 0.90, z * 0.94);
  }
  base += BODY;

  // Round head — front-center, slightly elevated, merging with body
  for (let i = 0; i < HEAD; i++) {
    const [x, y, z] = rndSphere(0, 0.50, 0.10, 0.54);
    set3(pos, base + i, x, y, z * 0.88);
  }
  base += HEAD;

  // Left cheek — very prominent outward puff
  for (let i = 0; i < LCHEEK; i++) {
    const [x, y, z] = rndSphere(-0.72, 0.08, 0.15, 0.46);
    set3(pos, base + i, x, y, z * 0.82);
  }
  base += LCHEEK;

  // Right cheek — mirror
  for (let i = 0; i < RCHEEK; i++) {
    const [x, y, z] = rndSphere(0.72, 0.08, 0.15, 0.46);
    set3(pos, base + i, x, y, z * 0.82);
  }
  base += RCHEEK;

  // Left ear — small round disc
  for (let i = 0; i < LEAR; i++) {
    const [x, y, z] = rndSphere(-0.42, 1.08, 0.02, 0.20);
    set3(pos, base + i, x, y, z * 0.55);
  }
  base += LEAR;

  // Right ear
  for (let i = 0; i < REAR; i++) {
    const [x, y, z] = rndSphere(0.42, 1.08, 0.02, 0.20);
    set3(pos, base + i, x, y, z * 0.55);
  }
  base += REAR;

  // Facial details + front paws
  for (let i = 0; i < DETAIL; i++) {
    const r = Math.random();
    let pt: [number, number, number];
    if      (r < 0.18) pt = rndSphere(  0.00, 0.34, 0.50, 0.07); // nose
    else if (r < 0.38) pt = rndSphere( -0.22, 0.58, 0.44, 0.06); // left eye
    else if (r < 0.58) pt = rndSphere(  0.22, 0.58, 0.44, 0.06); // right eye
    else if (r < 0.79) pt = rndSphere( -0.36,-1.14, 0.34, 0.15); // left paw
    else               pt = rndSphere(  0.36,-1.14, 0.34, 0.15); // right paw
    set3(pos, base + i, pt[0], pt[1], pt[2]);
  }
}

// ── export ───────────────────────────────────────────────────────────────────

export function generateShapePositions(shape: ShapeName, count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  if      (shape === "sphere")  fillSphere(pos, count);
  else if (shape === "fish")    fillFish(pos, count);
  else if (shape === "dragon")  fillDragon(pos, count);
  else if (shape === "hamster") fillHamster(pos, count);
  return pos;
}
