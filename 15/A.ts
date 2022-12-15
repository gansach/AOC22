import { readFileSync } from "fs";

const parseInput = (filename: string): number[][] => {
  return readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .map((line) => line.match(/-?\d+/g)?.map(Number) ?? []);
};

const sb = parseInput("15/input.txt");
const partA = new Set<string>();

// All points (fixed y) observable by a sensor
const generatePointsY = (
  sx: number,
  sy: number,
  bx: number,
  by: number,
  y: number
) => {
  const bd = Math.abs(sx - bx) + Math.abs(sy - by);
  const d = Math.abs(y - sy);
  if (d <= bd) {
    const x1 = sx - (bd - d);
    const x2 = sx + (bd - d);
    for (let x = x1; x <= x2; x++) {
      partA.add([x, y].toString());
    }
  }
};

const y = 2000000;
for (const [sx, sy, bx, by] of sb) {
  generatePointsY(sx, sy, bx, by, y);
}

// Delete all sensors and beacons
for (const [sx, sy, bx, by] of sb) {
  partA.delete([sx, sy].toString());
  partA.delete([bx, by].toString());
}

console.log(partA.size);
// 4985193
