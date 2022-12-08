import input from "../input";

const stdIn: string[] = input("8/input.txt");
const rows: number = stdIn.length,
  cols: number = stdIn[0].length;

const viewingDistance = (ti: number, tj: number, direction: string): number => {
  const treeHeight: number = +stdIn[ti][tj];

  let distance: number = 0;

  if (direction === "down") {
    const [start, end] = [ti + 1, rows - 1];
    const delta = start > end ? -1 : 1;

    for (let i = start; i <= end; i += delta) {
      distance++;
      if (+stdIn[i][tj] >= treeHeight) break;
    }
  } else if (direction === "up") {
    const [start, end] = [ti - 1, 0];
    const delta = start > end ? -1 : 1;

    for (let i = start; i >= end; i += delta) {
      distance++;
      if (+stdIn[i][tj] >= treeHeight) break;
    }
  } else if (direction === "left") {
    const [start, end] = [tj - 1, 0];
    const delta = start > end ? -1 : 1;

    for (let j = start; j >= end; j += delta) {
      distance++;
      if (+stdIn[ti][j] >= treeHeight) break;
    }
  } else if (direction === "right") {
    const [start, end] = [tj + 1, cols - 1];
    const delta = start > end ? -1 : 1;
    for (let j = start; j <= end; j += delta) {
      distance++;
      if (+stdIn[ti][j] >= treeHeight) break;
    }
  }
  return distance;
};

let partB: number = 0;
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    partB = Math.max(
      partB,
      viewingDistance(i, j, "left") *
        viewingDistance(i, j, "right") *
        viewingDistance(i, j, "down") *
        viewingDistance(i, j, "up")
    );
  }
}
console.log(partB); // 315495
