import { readFileSync } from "fs";

const parseInput = (filename: string): any => {
  return readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .map((i) => [+i.match(/\d+/)!, i.match(/[A-Z][A-Z]/g)]);
};

const stdIn = parseInput("16/example.txt");

const graph: Record<string, { flow: number; connected: string[] }> = {};
const idx_map: { [valve: string]: number } = {};

let idx = 0;
for (const [flow, connected] of stdIn) {
  const curr = connected?.shift();
  graph[curr] = { flow, connected };
  idx_map[curr] = idx++;
}

function partA(
  currA: string,
  time_leftA: number,
  // Bitmap
  opened: number[] = Array(idx).fill(0)
) {
  let memo: { [key: string]: number } = {};
  function maxPressure(curr: string, time_left: number) {
    if (time_left === 0) return 0;
    if (time_left <= 0) return -Infinity;

    const key = JSON.stringify([curr, time_left, opened]);
    if (memo.hasOwnProperty(key)) return memo[key];
    // memo = Object.fromEntries(Object.entries(memo).slice(0, 3000));

    let max = 0;
    // For every valve you can either open it or keep it closed

    const curr_idx = idx_map[curr];

    // Can open && should open
    if (opened[curr_idx] === 0 && graph[curr].flow !== 0) {
      for (const neighbor of graph[curr].connected) {
        // Open
        opened[curr_idx] = 1;
        max = Math.max(
          max,
          graph[curr].flow * (time_left - 1) +
            maxPressure(neighbor, time_left - 2)
        );
        // Backtrack
        opened[curr_idx] = 0;

        // Don't Open
        max = Math.max(max, maxPressure(neighbor, time_left - 1));
      }
      memo[key] = max;
      return max;
    }

    // Already open
    for (const neighbor of graph[curr].connected) {
      max = Math.max(max, maxPressure(neighbor, time_left - 1));
    }

    memo[key] = max;
    return max;
  }
  return maxPressure(currA, time_leftA);
}

function partB(currB: string, time_leftB: number) {
  // Bitmap: Will be shared between both me and elephant
  const opened: number[] = Array(idx).fill(0);

  const memo: { [key: string]: number } = {};
  function maxPressure(curr: string, time_left: number): number {
    if (time_left === 0) return partA(currB, time_leftB, opened);
    if (time_left <= 0) return -Infinity;

    const key = JSON.stringify([curr, time_left, opened]);
    if (memo.hasOwnProperty(key)) return memo[key];

    let max = 0;
    // For every valve you can either open it or keep it closed

    const curr_idx = idx_map[curr];

    // Can open && should open
    if (opened[curr_idx] === 0 && graph[curr].flow !== 0) {
      for (const neighbor of graph[curr].connected) {
        // Open
        opened[curr_idx] = 1;
        max = Math.max(
          max,
          graph[curr].flow * (time_left - 1) +
            maxPressure(neighbor, time_left - 2)
        );
        // Backtrack
        opened[curr_idx] = 0;

        // Don't Open
        max = Math.max(max, maxPressure(neighbor, time_left - 1));
      }
      memo[key] = max;
      return max;
    }

    // Already open
    for (const neighbor of graph[curr].connected) {
      max = Math.max(max, maxPressure(neighbor, time_left - 1));
    }

    memo[key] = max;
    return max;
  }
  return maxPressure(currB, time_leftB);
}

let t1 = performance.now();
let ans = partA("AA", 30);
let t2 = performance.now();

console.log(ans); // 1896
console.log((t2 - t1) / 1000);

t1 = performance.now();
ans = partB("AA", 26);
t2 = performance.now();

console.log(ans); // 2576
console.log((t2 - t1) / 1000);
