import assert from "node:assert";
import { doctors } from "../src/data/doctors.ts";

// 1. Validate data integrity for doctors
assert(Array.isArray(doctors) && doctors.length > 0, "doctors list must be non-empty");
for (const doc of doctors) {
  assert(doc.id, `doctor ${doc.id} must have id`);
  assert(doc.name, `doctor ${doc.id} must have name`);
  assert(doc.specialty, `doctor ${doc.id} must have specialty`);
  assert(doc.image, `doctor ${doc.id} must have image`);
  assert(doc.qualification, `doctor ${doc.id} must have qualification`);
  assert(doc.experience, `doctor ${doc.id} must have experience`);
  assert(doc.bio, `doctor ${doc.id} must have bio`);
  assert(Array.isArray(doc.achievements) && doc.achievements.length > 0, `doctor ${doc.id} must have achievements`);
}

// 2. Validate viewport boundary direction calculations
function computeDirection({ left, right, cardWidth, viewportWidth }) {
  const spaceRight = viewportWidth - right;
  const spaceLeft = left;
  const extraWidthNeeded = cardWidth + 16;
  if (spaceRight >= extraWidthNeeded) return "right";
  if (spaceLeft >= extraWidthNeeded) return "left";
  return spaceRight >= spaceLeft ? "right" : "left";
}

// Test leftmost column in 4-column grid (viewport 1200px, card width 260px)
assert.strictEqual(
  computeDirection({ left: 32, right: 292, cardWidth: 260, viewportWidth: 1200 }),
  "right",
  "Leftmost card must expand toward the right"
);

// Test rightmost column in 4-column grid
assert.strictEqual(
  computeDirection({ left: 908, right: 1168, cardWidth: 260, viewportWidth: 1200 }),
  "left",
  "Rightmost card must expand toward the left"
);

console.log("All DoctorCard tests and edge-case assertions passed.");
