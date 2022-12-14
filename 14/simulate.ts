import makeCave, { minX, maxX, abyssY, start } from "./makeCave";

const [startX, startY] = start;
const caveA = makeCave(abyssY, minX, maxX);

const dfsA = (i: number, j: number): "abyss" | "placed" => {
  const isBlocked = (i: number, j: number): boolean =>
    caveA[i][j] === "#" || caveA[i][j] === "o";

  if (i === abyssY - 1) return "abyss";

  if (!isBlocked(i + 1, j)) return dfsA(i + 1, j);
  else if (!isBlocked(i + 1, j - 1)) return dfsA(i + 1, j - 1);
  else if (!isBlocked(i + 1, j + 1)) return dfsA(i + 1, j + 1);
  else {
    caveA[i][j] = "o";
    return "placed";
  }
};

for (let i = 0; ; i++) {
  if (dfsA(startX, startY) === "abyss") {
    console.log(i);
    break;
  }
}
// 828

// ========= Part B ===========
// Out of bounds access of 2D array
let floor = abyssY + 2;
const caveB = makeCave(floor, minX, maxX);

const dfsB = (i: number, j: number): void => {
  const isBlocked = (i: number, j: number): boolean =>
    i === floor - 1 || caveB[i][j] === "#" || caveB[i][j] === "o";

  if (!isBlocked(i + 1, j)) dfsB(i + 1, j);
  else if (!isBlocked(i + 1, j - 1)) dfsB(i + 1, j - 1);
  else if (!isBlocked(i + 1, j + 1)) dfsB(i + 1, j + 1);
  else caveB[i][j] = "o";
};

for (let i = 0; ; i++) {
  if (caveB[startX][startY] === "o") {
    console.log(i);
    break;
  }
  dfsB(startX, startY);
}
// 25500
