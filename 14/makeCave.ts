import input from "../input";

const stdIn: number[][][] = input("14/input.txt").map((line) =>
  line.split("->").map((pair) => pair.split(",").map(Number))
);

// Dimensions of cave
let abyssY = 0,
  maxX = 500,
  minX = Infinity;

for (const line of stdIn) {
  for (const [x, y] of line) {
    abyssY = Math.max(abyssY, y + 1);
    maxX = Math.max(maxX, x + 1);
    minX = Math.min(minX, x - 1);
  }
}
const start = [0, 500 - minX];

// Constructing cave
const makeCave = (depth: number, minX: number, maxX: number) => {
  const cave = Array.from(Array(depth), () =>
    Array.from(Array(maxX - minX + 1).fill("."))
  );

  // Adding blockages to cave
  for (const line of stdIn) {
    if (line.length === 1) {
      let [x, y] = line[0];
      cave[y][x - minX] = "#";
    }
    for (let i = 0; i < line.length - 1; i++) {
      let [x1, y1] = line[i],
        [x2, y2] = line[i + 1];

      if (x1 > x2) [x1, x2] = [x2, x1];
      if (y1 > y2) [y1, y2] = [y2, y1];

      if (y1 === y2) {
        for (let x = x1 - minX; x <= x2 - minX; x++) {
          cave[y1][x] = "#";
        }
      } else if (x1 === x2) {
        for (let y = y1; y <= y2; y++) {
          cave[y][x1 - minX] = "#";
        }
      }
    }
  }
  const [startX, startY] = start;
  cave[startX][startY] = "+";
  return cave;
};

export default makeCave;
export { minX, maxX, abyssY, start };
