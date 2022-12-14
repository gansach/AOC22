import { readFileSync } from "fs";

const stdIn: number[][][] = readFileSync("14/input.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => line.split("->").map((pair) => pair.split(",").map(Number)));

type Point = [x: number, y: number];
class PointSet extends Set {
  add = (x: Point) => super.add(JSON.stringify(x));
  has = (x: Point) => super.has(JSON.stringify(x));
}
const blocked = new PointSet();

let floor = 0;
for (const line of stdIn) {
  for (let i = 0; i < line.length - 1; i++) {
    let [x1, y1] = line[i],
      [x2, y2] = line[i + 1];

    if (x1 > x2) [x1, x2] = [x2, x1];
    if (y1 > y2) [y1, y2] = [y2, y1];

    for (let x = x1; x <= x2; x++) blocked.add([x, y1]);
    for (let y = y1; y <= y2; y++) blocked.add([x1, y]);

    floor = Math.max(floor, y1, y2);
  }
}
floor += 2;

let partA = undefined;
const intitalBlocked = blocked.size;

while (!blocked.has([500, 0])) {
  // Origin of sand
  let sand: Point = [500, 0];

  // While sand can descend
  while (true) {
    const [sandX, sandY] = sand;

    // If floor is reached
    if (sandY === floor - 1) {
      // Part A: First sand particle to reach floor
      if (partA === undefined) partA = blocked.size - intitalBlocked;

      // Place on top of floor
      blocked.add(sand);
      break;
    }

    // Try all next points
    const nexts: Point[] = [
      [sandX, sandY + 1],
      [sandX - 1, sandY + 1],
      [sandX + 1, sandY + 1],
    ];

    let allBlocked: boolean = true;
    for (const next of nexts) {
      // If next is unblocked
      if (!blocked.has(next)) {
        sand = next;
        allBlocked = false;
        break;
      }
    }

    if (allBlocked) {
      // Place
      blocked.add(sand);
      break;
    }
  }
}

console.log(partA, blocked.size - intitalBlocked);
