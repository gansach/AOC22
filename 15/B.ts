import { readFileSync } from "fs";

const parseInput = (filename: string): number[][] => {
  return readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .map((line) => line.match(/-?\d+/g)?.map(Number) ?? []);
};

const sb = parseInput("15/input.txt");

const dPlus1: [x: number, y: number][] = [];

// All points at manhattan distance D from given point
// Improvent: only taking points that can be valid answers
const generatePointsAtD = (sx: number, sy: number, d: number) => {
  for (let x = sx + d, y = sy; x > sx; x--, y++)
    if (x >= 0 && x <= 4e6 && y >= 0 && y <= 4e6) dPlus1.push([x, y]);
  for (let x = sx, y = sy + d; y > sy; x--, y--)
    if (x >= 0 && x <= 4e6 && y >= 0 && y <= 4e6) dPlus1.push([x, y]);
  for (let x = sx - d, y = sy; x < sx; x++, y--)
    if (x >= 0 && x <= 4e6 && y >= 0 && y <= 4e6) dPlus1.push([x, y]);
  for (let x = sx, y = sy - d; y < sy; x++, y++)
    if (x >= 0 && x <= 4e6 && y >= 0 && y <= 4e6) dPlus1.push([x, y]);
};

const manhattanD = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

// All points at distance d + 1 from any sensor
// Answer is unique (in given range) so it has to be 1 distance away from 4 sensors (won't be unique else)
for (const [sx, sy, bx, by] of sb) {
  console.log(sx, sy);
  generatePointsAtD(sx, sy, manhattanD(sx, sy, bx, by) + 1);
}
console.log(dPlus1.length);
// 56055695 Yikes!

let ans = 0;
// Find the point that is invisible to every sensor
for (const [x, y] of dPlus1) {
  let found = true;
  for (const [sx, sy, bx, by] of sb) {
    let d = manhattanD(sx, sy, bx, by);
    let pd = manhattanD(x, y, sx, sy);
    if (pd <= d) {
      ans++;
      found = false;
      break;
    }
  }
  if (found) {
    console.log(x, y, 4e6 * x + y);
    break;
  }
}
// 11583882601918
// node --max-old-space-size=4096 15/B
