// 3D Point cloud definitions for 12 hospital departments
// Normalized coordinates in [-0.85, 0.85] with depth z in [-0.6, 0.6]

export const NUM_PARTICLES = 1200;

export type Point3D = [number, number, number];

// Deterministic pseudo-random based on index to ensure exact repeatability
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// 1. CARDIOLOGY: 3D Anatomical Heart with dual chambers, aortic arch, and apical taper
function generateCardiology(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.1 + 1);
    const r2 = pseudoRandom(i * 2.3 + 2);
    const r3 = pseudoRandom(i * 3.7 + 3);

    // 15% aortic arch / great vessels at top
    if (i < NUM_PARTICLES * 0.15) {
      const t = (i / (NUM_PARTICLES * 0.15)) * Math.PI * 0.9;
      const archX = -0.1 + Math.cos(t) * 0.22 + (r1 - 0.5) * 0.08;
      const archY = -0.48 - Math.sin(t) * 0.24 + (r2 - 0.5) * 0.08;
      const archZ = (r3 - 0.5) * 0.18;
      points.push([archX, archY, archZ]);
      continue;
    }

    // 85% heart muscle volume
    const t = (i / (NUM_PARTICLES * 0.85)) * Math.PI * 2;
    const heartX = 16 * Math.pow(Math.sin(t), 3);
    const heartY = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    // Volume distribution with hollow cavity and outer shell
    const layer = 0.35 + 0.65 * Math.sqrt(r1);
    const scale = 0.042 * layer;
    const x = heartX * scale + (r2 - 0.5) * 0.04;
    const y = heartY * scale + 0.06 + (r3 - 0.5) * 0.04;
    const z = (1 - (heartY + 16) / 32) * Math.sin(t * 2) * 0.38 * layer;

    points.push([x, y, z]);
  }
  return points;
}

// 2. NEUROLOGY: 3D Cerebral Hemispheres with sulci folds and descending neural arbor
function generateNeurology(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.3 + 11);
    const r2 = pseudoRandom(i * 2.7 + 12);
    const r3 = pseudoRandom(i * 3.1 + 13);

    // 20% descending brainstem and spinal arborization
    if (i < NUM_PARTICLES * 0.2) {
      const prog = i / (NUM_PARTICLES * 0.2);
      const stemY = 0.15 + prog * 0.6;
      const spread = (prog * 0.22 + 0.04) * (r1 - 0.5) * 2;
      const stemX = spread + Math.sin(prog * 8) * 0.04;
      const stemZ = (r2 - 0.5) * 0.2;
      points.push([stemX, stemY, stemZ]);
      continue;
    }

    // 80% left & right cerebral hemispheres
    const isLeft = i % 2 === 0;
    const sign = isLeft ? -1 : 1;
    const theta = r1 * Math.PI * 2;
    const phi = (r2 - 0.5) * Math.PI;

    // Convolutions (gyri and sulci)
    const fold = 1 + 0.12 * Math.sin(theta * 6) * Math.cos(phi * 5);
    const rad = (0.42 + 0.18 * r3) * fold;

    const x = sign * (0.12 + Math.abs(Math.cos(phi) * Math.sin(theta) * rad * 0.75));
    const y = -0.15 + Math.sin(phi) * rad * 0.68;
    const z = Math.cos(phi) * Math.cos(theta) * rad * 0.72;

    points.push([x, y, z]);
  }
  return points;
}

// 3. ORTHOPAEDICS: Articulated Knee Joint (Femoral condyles, joint gap, tibial plateau)
function generateOrthopaedics(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.7 + 21);
    const r2 = pseudoRandom(i * 2.9 + 22);
    const r3 = pseudoRandom(i * 3.5 + 23);

    if (i < NUM_PARTICLES * 0.45) {
      // Upper bone (Femur & twin condyles)
      const u = i / (NUM_PARTICLES * 0.45);
      if (u < 0.3) {
        // Shaft
        const y = -0.68 + u * 1.3;
        const radius = 0.12 + (r1 - 0.5) * 0.05;
        const ang = r2 * Math.PI * 2;
        points.push([Math.cos(ang) * radius, y, Math.sin(ang) * radius]);
      } else {
        // Twin bulbous condyles
        const condyleSign = i % 2 === 0 ? -1 : 1;
        const ang = r1 * Math.PI * 2;
        const cRad = 0.16 * Math.sqrt(r2);
        const x = condyleSign * 0.22 + Math.cos(ang) * cRad;
        const y = -0.12 + Math.sin(ang) * cRad * 0.75;
        const z = (r3 - 0.5) * 0.32;
        points.push([x, y, z]);
      }
    } else if (i < NUM_PARTICLES * 0.55) {
      // Articulation meniscus & cruciate ligaments (center gap)
      const ang = r1 * Math.PI * 2;
      const rad = 0.32 * Math.sqrt(r2);
      const x = Math.cos(ang) * rad;
      const y = -0.01 + (r3 - 0.5) * 0.08;
      const z = Math.sin(ang) * rad * 0.6;
      points.push([x, y, z]);
    } else {
      // Lower bone (Tibial plateau & shaft)
      const u = (i - NUM_PARTICLES * 0.55) / (NUM_PARTICLES * 0.45);
      if (u < 0.4) {
        // Plateau platform
        const ang = r1 * Math.PI * 2;
        const platRad = 0.36 * Math.sqrt(r2);
        const x = Math.cos(ang) * platRad * 0.95;
        const y = 0.08 + u * 0.2;
        const z = Math.sin(ang) * platRad * 0.55;
        points.push([x, y, z]);
      } else {
        // Tibia shaft
        const y = 0.18 + u * 0.55;
        const radius = 0.13 + (r1 - 0.5) * 0.04;
        const ang = r2 * Math.PI * 2;
        points.push([Math.cos(ang) * radius, y, Math.sin(ang) * radius]);
      }
    }
  }
  return points;
}

// 4. PAEDIATRICS: Tender Nurturing Cradle & Child Silhouette
function generatePaediatrics(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.5 + 31);
    const r2 = pseudoRandom(i * 2.1 + 32);
    const r3 = pseudoRandom(i * 3.9 + 33);

    if (i < NUM_PARTICLES * 0.25) {
      // Child head (sphere)
      const theta = r1 * Math.PI * 2;
      const phi = (r2 - 0.5) * Math.PI;
      const rad = 0.18 * Math.cbrt(r3);
      const x = 0.08 + Math.cos(phi) * Math.sin(theta) * rad;
      const y = -0.28 + Math.sin(phi) * rad;
      const z = Math.cos(phi) * Math.cos(theta) * rad;
      points.push([x, y, z]);
    } else if (i < NUM_PARTICLES * 0.6) {
      // Curled child/embryo body
      const t = (i / (NUM_PARTICLES * 0.35)) * Math.PI * 1.2;
      const bodyRad = 0.14 * Math.sqrt(r1);
      const ang = r2 * Math.PI * 2;
      const arcX = 0.08 - Math.sin(t) * 0.32;
      const arcY = -0.15 + (1 - Math.cos(t)) * 0.38;
      const x = arcX + Math.cos(ang) * bodyRad;
      const y = arcY + Math.sin(ang) * bodyRad * 0.7;
      const z = (r3 - 0.5) * 0.25;
      points.push([x, y, z]);
    } else {
      // Protective outer cradling crescent
      const t = (i / (NUM_PARTICLES * 0.4)) * Math.PI * 1.5;
      const cradleRad = 0.58 + (r1 - 0.5) * 0.12;
      const x = -0.05 + Math.cos(t + 0.6) * cradleRad * 0.9;
      const y = 0.05 + Math.sin(t + 0.6) * cradleRad;
      const z = (r2 - 0.5) * 0.35;
      points.push([x, y, z]);
    }
  }
  return points;
}

// 5. OPHTHALMOLOGY: Almond Palpebral Eye Contour + Stippled 3D Iris & Pupil Core
function generateOphthalmology(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.9 + 41);
    const r2 = pseudoRandom(i * 2.5 + 42);
    const r3 = pseudoRandom(i * 3.3 + 43);

    if (i < NUM_PARTICLES * 0.4) {
      // Outer eye almond boundary (upper and lower arcs)
      const t = (i / (NUM_PARTICLES * 0.4)) * 2 - 1; // [-1, 1]
      const sign = i % 2 === 0 ? 1 : -1;
      const yCurve = sign * 0.42 * Math.sqrt(Math.max(0, 1 - t * t));
      const x = t * 0.68 + (r1 - 0.5) * 0.05;
      const y = yCurve + (r2 - 0.5) * 0.05;
      const z = (r3 - 0.5) * 0.15;
      points.push([x, y, z]);
    } else if (i < NUM_PARTICLES * 0.8) {
      // Circular 3D Iris with radial ciliary rays
      const ang = r1 * Math.PI * 2;
      const rad = 0.08 + 0.22 * Math.sqrt(r2);
      const x = Math.cos(ang) * rad;
      const y = Math.sin(ang) * rad;
      const z = Math.sqrt(Math.max(0, 0.08 - rad * rad * 0.8)) * (r3 > 0.5 ? 1 : -1);
      points.push([x, y, z]);
    } else {
      // Central deep pupil focus
      const ang = r1 * Math.PI * 2;
      const rad = 0.08 * Math.sqrt(r2);
      const x = Math.cos(ang) * rad;
      const y = Math.sin(ang) * rad;
      const z = 0.05 + (r3 - 0.5) * 0.04;
      points.push([x, y, z]);
    }
  }
  return points;
}

// 6. UROLOGY: 3D Renal Kidney Bean & Volumetric Fluid Droplet (Matching Reference 2)
function generateUrology(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.6 + 51);
    const r2 = pseudoRandom(i * 2.8 + 52);
    const r3 = pseudoRandom(i * 3.4 + 53);

    // Tear-drop & curved kidney composite shape exactly mirroring reference screenshot
    const prog = i / NUM_PARTICLES;
    const y = -0.58 + prog * 1.16; // Top apex to rounded bulbous bottom
    const t = (y + 0.58) / 1.16; // 0 to 1

    // Droplet profile width: zero at top, wide bulb at bottom
    const profile = Math.sin(t * Math.PI * 0.75) * (0.2 + 0.45 * t);

    // Stippled cross-section with renal hilum inward notch
    const ang = r1 * Math.PI * 2;
    const rad = profile * Math.sqrt(r2);

    // Inward renal notch on the right side
    const notch = (Math.cos(ang) > 0.3 && t > 0.3 && t < 0.75) ? 0.72 : 1.0;

    const x = Math.cos(ang) * rad * notch;
    const z = Math.sin(ang) * rad * 0.7;

    points.push([x, y, z]);
  }
  return points;
}

// 7. GYNAECOLOGY: Botanical Life Bloom / Womb Flower with 5 layered petals
function generateGynaecology(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.8 + 61);
    const r2 = pseudoRandom(i * 2.2 + 62);
    const r3 = pseudoRandom(i * 3.6 + 63);

    if (i < NUM_PARTICLES * 0.2) {
      // Central seed of life
      const theta = r1 * Math.PI * 2;
      const phi = (r2 - 0.5) * Math.PI;
      const rad = 0.14 * Math.cbrt(r3);
      points.push([
        Math.cos(phi) * Math.sin(theta) * rad,
        Math.sin(phi) * rad,
        Math.cos(phi) * Math.cos(theta) * rad,
      ]);
    } else {
      // 5-petaled floral / embryonic maternal geometry
      const theta = r1 * Math.PI * 2;
      const petalMod = Math.abs(Math.cos(2.5 * theta)); // 5 petals
      const rad = (0.2 + 0.45 * petalMod) * Math.sqrt(r2);
      const x = Math.cos(theta) * rad;
      const y = Math.sin(theta) * rad;
      // Curled dome
      const z = (1 - rad) * 0.25 * (r3 - 0.5) * 2;
      points.push([x, y, z]);
    }
  }
  return points;
}

// 8. GENERAL SURGERY: Surgical Caduceus / Faceted Cross & Precision Scalpel Nexus
function generateSurgery(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.4 + 71);
    const r2 = pseudoRandom(i * 2.6 + 72);
    const r3 = pseudoRandom(i * 3.8 + 73);

    // 3D Beveled Medical Cross with central diamond
    const isVertical = i % 2 === 0;
    const length = (r1 - 0.5) * 1.1; // [-0.55, 0.55]
    const thickness = (r2 - 0.5) * 0.24;

    let x = isVertical ? thickness : length;
    let y = isVertical ? length : thickness;
    let z = (r3 - 0.5) * 0.22;

    // Tapered bevel
    const distFromCenter = Math.sqrt(x * x + y * y);
    if (distFromCenter < 0.18) {
      z *= 1.8; // Raised central pyramid
    }

    points.push([x, y, z]);
  }
  return points;
}

// 9. ONCOLOGY: Protective Shield & Hexagonal Cellular Barrier Lattice
function generateOncology(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.2 + 81);
    const r2 = pseudoRandom(i * 2.4 + 82);
    const r3 = pseudoRandom(i * 3.2 + 83);

    // Shield contour (flat curved top, straight sides, curved V bottom)
    const u = r1 * 2 - 1; // [-1, 1]
    const v = r2 * 2 - 1; // [-1, 1]

    // Shield boundary equation
    const topCurve = -0.55 - 0.08 * (1 - u * u);
    const botApex = 0.65;
    const y = topCurve + (botApex - topCurve) * (v * 0.5 + 0.5);

    // Width decreases towards bottom apex
    const progY = (y - topCurve) / (botApex - topCurve);
    const widthFactor = progY < 0.4 ? 0.5 : 0.5 * (1 - Math.pow((progY - 0.4) / 0.6, 1.6));
    const x = u * widthFactor;

    // Slight curved dome forward
    const z = Math.sqrt(Math.max(0, 0.15 - x * x * 0.3 - (y + 0.1) * (y + 0.1) * 0.2)) * (r3 > 0.4 ? 1 : -0.5);

    points.push([x, y, z]);
  }
  return points;
}

// 10. PSYCHIATRY / MENTAL HEALTH: Synaptic Neural Network & Cognitive Radiance
function generatePsychiatry(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.35 + 91);
    const r2 = pseudoRandom(i * 2.85 + 92);
    const r3 = pseudoRandom(i * 3.45 + 93);

    if (i < NUM_PARTICLES * 0.3) {
      // Central cognitive nucleus
      const ang = r1 * Math.PI * 2;
      const rad = 0.22 * Math.cbrt(r2);
      const theta = (r3 - 0.5) * Math.PI;
      points.push([
        Math.cos(theta) * Math.sin(ang) * rad,
        Math.sin(theta) * rad,
        Math.cos(theta) * Math.cos(ang) * rad,
      ]);
    } else {
      // 8 radiating synaptic branches with terminal clusters
      const branchIdx = i % 8;
      const branchAng = (branchIdx / 8) * Math.PI * 2 + (r1 - 0.5) * 0.15;
      const dist = 0.22 + 0.42 * r2;

      const x = Math.cos(branchAng) * dist + (r1 - 0.5) * 0.05;
      const y = Math.sin(branchAng) * dist + (r3 - 0.5) * 0.05;
      const z = Math.sin(dist * 6) * 0.18;
      points.push([x, y, z]);
    }
  }
  return points;
}

// 11. RADIOLOGY: 3D MRI Gantry Torus & Axial Cross-Section Wave
function generateRadiology(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.75 + 101);
    const r2 = pseudoRandom(i * 2.15 + 102);
    const r3 = pseudoRandom(i * 3.65 + 103);

    if (i < NUM_PARTICLES * 0.65) {
      // 3D Tilted Toroidal Imaging Gantry
      const theta = r1 * Math.PI * 2;
      const phi = r2 * Math.PI * 2;
      const R = 0.44; // Major radius
      const r = 0.12; // Tube radius

      let x = (R + r * Math.cos(phi)) * Math.cos(theta);
      let y = (R + r * Math.cos(phi)) * Math.sin(theta);
      let z = r * Math.sin(phi);

      // Tilt 25 degrees
      const cosA = Math.cos(0.45);
      const sinA = Math.sin(0.45);
      const yTilted = y * cosA - z * sinA;
      const zTilted = y * sinA + z * cosA;

      points.push([x, yTilted, zTilted]);
    } else {
      // Central resonance scan waveform
      const u = (i - NUM_PARTICLES * 0.65) / (NUM_PARTICLES * 0.35);
      const x = (u - 0.5) * 0.72;
      const y = Math.sin(u * Math.PI * 6) * 0.14 + (r1 - 0.5) * 0.04;
      const z = (r2 - 0.5) * 0.12;
      points.push([x, y, z]);
    }
  }
  return points;
}

// 12. DENTAL: Sculpted 3D Molar Crown (4 occlusal cusps) & Bifurcated Roots
function generateDental(): Point3D[] {
  const points: Point3D[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 1.55 + 111);
    const r2 = pseudoRandom(i * 2.35 + 112);
    const r3 = pseudoRandom(i * 3.75 + 113);

    if (i < NUM_PARTICLES * 0.5) {
      // Crown with 4 cusps
      const theta = r1 * Math.PI * 2;
      const cuspMod = 0.08 * (Math.cos(2 * theta) * Math.cos(2 * theta));
      const rad = (0.34 + cuspMod) * Math.sqrt(r2);
      const x = Math.cos(theta) * rad;
      const y = -0.42 + (r3 * 0.3) - cuspMod;
      const z = Math.sin(theta) * rad * 0.8;
      points.push([x, y, z]);
    } else {
      // Bifurcated roots (twin roots curving inward/tapering)
      const isLeftRoot = i % 2 === 0;
      const rootSign = isLeftRoot ? -1 : 1;
      const prog = (i - NUM_PARTICLES * 0.5) / (NUM_PARTICLES * 0.5); // 0 to 1

      const y = -0.15 + prog * 0.72;
      const curveX = rootSign * (0.16 + Math.sin(prog * Math.PI * 0.8) * 0.12);
      const rootThickness = (1 - prog * 0.7) * 0.12 * Math.sqrt(r1);
      const ang = r2 * Math.PI * 2;

      const x = curveX + Math.cos(ang) * rootThickness;
      const z = Math.sin(ang) * rootThickness * 0.7 + (r3 - 0.5) * 0.05;

      points.push([x, y, z]);
    }
  }
  return points;
}

// Particle metadata: color flags, noise speeds, and arc trajectories
export interface ParticleMeta {
  isCoral: boolean;
  baseRadius: number;
  driftVector: Point3D;
  phaseOffset: number;
}

export function generateParticleMetas(): ParticleMeta[] {
  const metas: ParticleMeta[] = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const r1 = pseudoRandom(i * 7.1 + 99);
    const r2 = pseudoRandom(i * 8.3 + 109);
    const r3 = pseudoRandom(i * 9.7 + 119);

    // ~8% subtle coral accent particles, rest hospital teal
    const isCoral = (i * 37) % 13 === 0;

    // Small refined radius
    const baseRadius = 1.2 + r1 * 1.1; // 1.2px - 2.3px

    // 3D drift trajectory for morph destabilization
    const ang = r2 * Math.PI * 2;
    const elevate = (r3 - 0.5) * Math.PI;
    const mag = 0.25 + r1 * 0.45; // Drift magnitude
    const driftVector: Point3D = [
      Math.cos(elevate) * Math.cos(ang) * mag,
      Math.sin(elevate) * mag,
      Math.cos(elevate) * Math.sin(ang) * mag,
    ];

    metas.push({
      isCoral,
      baseRadius,
      driftVector,
      phaseOffset: r1 * Math.PI * 2,
    });
  }
  return metas;
}

// Shape registry mapping department IDs to their 3D point arrays
export const DEPARTMENT_SHAPE_MAP: Record<string, () => Point3D[]> = {
  cardiology: generateCardiology,
  neurology: generateNeurology,
  orthopedics: generateOrthopaedics,
  paediatrics: generatePaediatrics,
  ophthalmology: generateOphthalmology,
  urology: generateUrology,
  gynaecology: generateGynaecology,
  generalsurgery: generateSurgery,
  oncology: generateOncology,
  psychiatry: generatePsychiatry,
  radiology: generateRadiology,
  dental: generateDental,
};
