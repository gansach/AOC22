import input from "../input";

const stdIn: string[][] = input("12/input.txt").map((line) => line.split(""));

const n: number = stdIn.length,
  m: number = stdIn[0].length;

type coordinate = [x: number, y: number];

let partA: coordinate = [0, 0],
  partB: coordinate[] = [],
  end: coordinate = [0, 0];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (stdIn[i][j] === "S") {
      partA = [i, j];
      partB.push([i, j]);

      stdIn[i][j] = "a";
    } else if (stdIn[i][j] === "E") {
      end = [i, j];

      stdIn[i][j] = "z";
    } else if (stdIn[i][j] === "a") {
      partB.push([i, j]);
    }
  }
}

const BFS = (startingPoints: coordinate[]): number => {
  const isSafe = (i: number, j: number): boolean =>
    i >= 0 && i < n && j >= 0 && j < m;

  const visited = Array.from(Array(n), () => Array.from(Array(m)).fill(0));

  let q: [coordinate, number][] = startingPoints.map((point) => [point, 0]);

  while (q.length > 0) {
    let [[i, j], dist] = q.shift()!;
    if ([i, j].toString() === end.toString()) return dist;

    if (visited[i][j]) continue;
    visited[i][j] = true;

    const di = [-1, 1, 0, 0];
    const dj = [0, 0, -1, 1];
    for (let d = 0; d < 4; d++) {
      const ii = i + di[d];
      const jj = j + dj[d];

      if (
        isSafe(ii, jj) &&
        stdIn[ii][jj].charCodeAt(0) <= stdIn[i][j].charCodeAt(0) + 1
      )
        q.push([[ii, jj], dist + 1]);
    }
  }
  return -1;
};

console.log(BFS([partA])); // 504
console.log(BFS(partB)); // 500
