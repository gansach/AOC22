import input from "../input";

const stdIn: string[] = input("9/input.txt");

const numKnots = 9;
const knots: number[][] = Array.from(Array(numKnots), () => [0, 0]);

let headPos = [0, 0];

const moveHead = (direction: string) => {
  let [hX, hY] = headPos;
  if (direction === "L") hX--;
  else if (direction === "R") hX++;
  else if (direction === "U") hY++;
  else if (direction === "D") hY--;
  headPos = [hX, hY];
};

const moveKnot = (knot: number) => {
  const [localHeadX, localHeadY] = knot == 0 ? headPos : knots[knot - 1];
  let [kX, kY] = knots[knot];

  let deltaX = localHeadX - kX;
  let deltaY = localHeadY - kY;

  if (Math.abs(deltaX) === 2 || Math.abs(deltaY) === 2) {
    let stepX = deltaX < 0 ? -1 : +1;
    if (deltaX) kX += stepX;

    let stepY = deltaY < 0 ? -1 : +1;
    if (deltaY) kY += stepY;
  }

  knots[knot] = [kX, kY];
};

let partA: Set<string> = new Set(),
  partB: Set<string> = new Set();

for (const line of stdIn) {
  let [direction, cnt] = line.split(" ");

  for (let i = 0; i < +cnt; i++) {
    moveHead(direction);

    for (let i = 0; i < numKnots; i++) moveKnot(i);

    partA.add(knots[0].toString());
    partB.add(knots[knots.length - 1].toString());
  }
}

console.log(partA.size, partB.size);
