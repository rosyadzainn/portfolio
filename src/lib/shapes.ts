export type ShapeName = "sphere" | "fish" | "dragon" | "hamster";

function fillSphere(pos: Float32Array, count: number) {
  for (let i = 0; i < count; i++) {
    const rnd = Math.random();
    let x: number, y: number, z: number;
    if (rnd < 0.56) {
      const radius = 1.6 + Math.random() * 0.38;
      const phi    = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta  = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5) + Math.random() * 0.6;
      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);
    } else if (rnd < 0.72) {
      const radius = 0.4 + Math.random() * 0.8;
      const phi    = Math.acos(2 * Math.random() - 1);
      const theta  = Math.random() * Math.PI * 2;
      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);
    } else if (rnd < 0.86) {
      const radius = 2.2 + Math.random() * 0.65;
      const phi    = Math.acos(2 * Math.random() - 1);
      const theta  = Math.random() * Math.PI * 2;
      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);
    } else {
      const theta  = Math.random() * Math.PI * 2;
      const radius = 1.0 + Math.random() * 1.55;
      x = Math.cos(theta) * radius;
      y = (Math.random() - 0.5) * 0.14;
      z = Math.sin(theta) * radius;
    }
    pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
  }
}

function fillFish(pos: Float32Array, count: number) {
  const BODY  = Math.floor(count * 0.58);
  const TAIL  = Math.floor(count * 0.22);
  const FIN_D = Math.floor(count * 0.12);
  const FIN_P = count - BODY - TAIL - FIN_D;

  // Body — ellipsoid stretched along X, tapered at both ends
  for (let i = 0; i < BODY; i++) {
    const x = (Math.random() * 2 - 1) * 1.4;
    const t = 1 - Math.pow(x / 1.5, 2);
    if (t <= 0) { pos[i*3]=x; pos[i*3+1]=0; pos[i*3+2]=0; continue; }
    const maxR = 0.70 * Math.pow(t, 0.52);
    const r = maxR * Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    pos[i*3]   = x;
    pos[i*3+1] = r * Math.sin(a) * 0.80;
    pos[i*3+2] = r * Math.cos(a);
  }

  // Tail — two lobes fanning out from back
  for (let i = 0; i < TAIL; i++) {
    const ii = BODY + i;
    const t  = Math.random();
    const x  = -1.35 - t * 1.0;
    const lobe = Math.random() < 0.5 ? 1 : -1;
    const spreadY = 0.18 + t * 0.90;
    pos[ii*3]   = x;
    pos[ii*3+1] = lobe * spreadY * (0.5 + Math.random() * 0.5);
    pos[ii*3+2] = (Math.random() - 0.5) * 0.10;
  }

  // Dorsal fin — triangle on top
  for (let i = 0; i < FIN_D; i++) {
    const ii = BODY + TAIL + i;
    const x  = -0.55 + Math.random() * 1.10;
    const bodyTop = 0.70 * Math.pow(Math.max(0, 1 - Math.pow(x/1.5, 2)), 0.52) * 0.80;
    const height  = 0.52 * Math.max(0, 1 - Math.abs(x - 0.05) / 0.65);
    pos[ii*3]   = x;
    pos[ii*3+1] = bodyTop + Math.random() * height;
    pos[ii*3+2] = (Math.random() - 0.5) * 0.06;
  }

  // Pectoral fins — one each side near front
  for (let i = 0; i < FIN_P; i++) {
    const ii = BODY + TAIL + FIN_D + i;
    const side = i < FIN_P / 2 ? 1 : -1;
    const t = Math.random();
    pos[ii*3]   = 0.05 + Math.random() * 0.55;
    pos[ii*3+1] = (Math.random() - 0.5) * 0.26 - 0.08;
    pos[ii*3+2] = side * (0.58 + t * 0.44);
  }
}

function fillDragon(pos: Float32Array, count: number) {
  const BODY  = Math.floor(count * 0.40);
  const WINGS = Math.floor(count * 0.34);
  const HEAD  = Math.floor(count * 0.16);
  const TAIL  = count - BODY - WINGS - HEAD;

  // Serpentine S-curve body
  for (let i = 0; i < BODY; i++) {
    const t = i / BODY;
    const x = (t - 0.5) * 3.2;
    const y = Math.sin(t * Math.PI * 1.5) * 0.50;
    const r = (0.32 - t * 0.16) * Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    pos[i*3]   = x + r * Math.cos(a) * 0.5;
    pos[i*3+1] = y + r * Math.sin(a);
    pos[i*3+2] = r * Math.cos(a);
  }

  // Wings — two swept planes from upper body
  const wT = 0.30;
  const wBaseX = (wT - 0.5) * 3.2;
  const wBaseY = Math.sin(wT * Math.PI * 1.5) * 0.50;
  for (let i = 0; i < WINGS; i++) {
    const ii   = BODY + i;
    const side = i < WINGS / 2 ? 1 : -1;
    const u = Math.random();
    const v = Math.random();
    pos[ii*3]   = wBaseX - u * 0.80 + v * 0.25 + (Math.random()-0.5)*0.07;
    pos[ii*3+1] = wBaseY + v * 0.38 + 0.08     + (Math.random()-0.5)*0.07;
    pos[ii*3+2] = side * (0.32 + u * 1.35);
  }

  // Head + snout
  for (let i = 0; i < HEAD; i++) {
    const ii    = BODY + WINGS + i;
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = 0.34 * Math.cbrt(Math.random());
    const snout = Math.random() < 0.25 ? Math.random() * 0.38 : 0;
    pos[ii*3]   = 1.45 + r * Math.sin(phi)*Math.cos(theta) * 1.35 + snout;
    pos[ii*3+1] = 0.20 + r * Math.sin(phi)*Math.sin(theta);
    pos[ii*3+2] = r * Math.cos(phi) * 0.75;
  }

  // Curling tail
  for (let i = 0; i < TAIL; i++) {
    const ii   = BODY + WINGS + HEAD + i;
    const t    = i / TAIL;
    const curl = t * Math.PI * 0.85;
    const x    = -1.55 - t * 0.50 - Math.sin(curl) * 0.28;
    const y    = Math.sin(t * Math.PI * 1.5) * 0.50 - t * 0.60;
    const r    = (0.13 - t * 0.09) * Math.sqrt(Math.random());
    const a    = Math.random() * Math.PI * 2;
    pos[ii*3]   = x + r * Math.cos(a);
    pos[ii*3+1] = y + r * Math.sin(a);
    pos[ii*3+2] = r * Math.cos(a) * 0.55;
  }
}

function fillHamster(pos: Float32Array, count: number) {
  const BODY   = Math.floor(count * 0.48);
  const HEAD   = Math.floor(count * 0.20);
  const CHEEKS = Math.floor(count * 0.22);
  const EARS   = count - BODY - HEAD - CHEEKS;

  // Body — large round, slightly squished
  for (let i = 0; i < BODY; i++) {
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = 1.02 * Math.cbrt(Math.random());
    pos[i*3]   = r * Math.sin(phi)*Math.cos(theta) * 1.06;
    pos[i*3+1] = r * Math.sin(phi)*Math.sin(theta) * 0.88 - 0.14;
    pos[i*3+2] = r * Math.cos(phi) * 0.96;
  }

  // Head
  for (let i = 0; i < HEAD; i++) {
    const ii    = BODY + i;
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = 0.52 * Math.cbrt(Math.random());
    pos[ii*3]   = 0.92 + r * Math.sin(phi)*Math.cos(theta);
    pos[ii*3+1] = 0.40 + r * Math.sin(phi)*Math.sin(theta);
    pos[ii*3+2] = r * Math.cos(phi);
  }

  // Cheeks — puffy side pouches
  for (let i = 0; i < CHEEKS; i++) {
    const ii    = BODY + HEAD + i;
    const side  = i < CHEEKS / 2 ? 1 : -1;
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = 0.35 * Math.cbrt(Math.random());
    pos[ii*3]   = 0.70 + r * Math.sin(phi)*Math.cos(theta);
    pos[ii*3+1] = 0.10 + r * Math.sin(phi)*Math.sin(theta);
    pos[ii*3+2] = side * 0.55 + r * Math.cos(phi);
  }

  // Ears — two small round discs
  for (let i = 0; i < EARS; i++) {
    const ii   = BODY + HEAD + CHEEKS + i;
    const side = i < EARS / 2 ? 1 : -1;
    const r    = 0.18 * Math.sqrt(Math.random());
    const a    = Math.random() * Math.PI * 2;
    pos[ii*3]   = 0.88 + r * Math.cos(a) * 0.55;
    pos[ii*3+1] = 0.96 + r * Math.sin(a) * 0.60;
    pos[ii*3+2] = side * 0.34 + r * Math.cos(a) * 0.18;
  }
}

export function generateShapePositions(shape: ShapeName, count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  if (shape === "sphere")  fillSphere(pos, count);
  else if (shape === "fish")    fillFish(pos, count);
  else if (shape === "dragon")  fillDragon(pos, count);
  else if (shape === "hamster") fillHamster(pos, count);
  return pos;
}
