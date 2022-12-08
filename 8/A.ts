import input from "../input";

const stdIn: string[] = input("8/input.txt");

let rows: number = stdIn.length,
  cols: number = stdIn[0].length;

let rMax1: number[] = Array(rows).fill(-1),
  rMax2: number[] = Array(rows).fill(-1),
  cMax1: number[] = Array(cols).fill(-1),
  cMax2: number[] = Array(cols).fill(-1);

let visibleTrees: Set<string> = new Set<string>();

let partA: number = 0;
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const tree1 = +stdIn[i][j];
    const tree2 = +stdIn[rows - i - 1][cols - j - 1];

    if (tree1 > rMax1[i] || tree1 > cMax1[j]) {
      visibleTrees.add([i, j].toString());
    }
    rMax1[i] = Math.max(rMax1[i], tree1);
    cMax1[j] = Math.max(cMax1[j], tree1);

    if (tree2 > rMax2[rows - i - 1] || tree2 > cMax2[cols - j - 1]) {
      visibleTrees.add([rows - i - 1, cols - j - 1].toString());
    }
    rMax2[rows - i - 1] = Math.max(rMax2[rows - i - 1], tree2);
    cMax2[cols - j - 1] = Math.max(cMax2[cols - j - 1], tree2);
  }
}
console.log(visibleTrees.size); // 1812
