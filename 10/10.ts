import input from "../input";

const stdIn: string[] = input("10/input.txt");

let cycle: number = 1,
  X: number = 1; // Sprite position

let partA: number = 0;

let partB_CRT: string = "";
const cols = 40;

for (const line of stdIn) {
  // Part A
  if ((cycle - 20) % 40 === 0) partA += cycle * X;

  // Part B
  let pixel: number = (cycle % cols) - 1;
  partB_CRT += [X - 1, X, X + 1].includes(pixel) ? "#" : ".";

  if (line.startsWith("noop")) cycle++;
  // addx
  else {
    const [, cnt] = line.split(" ");
    cycle++;

    // Part A
    if ((cycle - 20) % 40 === 0) partA += cycle * X;

    // Part B
    let pixel: number = (cycle % cols) - 1;
    partB_CRT += [X - 1, X, X + 1].includes(pixel) ? "#" : ".";

    cycle++;
    X += +cnt;
  }
}
console.log(partA); // 11780

for (let i = 0; i < partB_CRT.length; i += cols) {
  console.log(partB_CRT.slice(i, i + cols));
}
// PZULBAUA
