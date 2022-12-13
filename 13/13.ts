import { readFileSync } from "fs";

const parseInput = (filename: string) => {
  const contents = readFileSync(filename, "utf-8");
  return contents
    .split(/\r\n\r\n/)
    .map((i) => i.split(/\r?\n/).map((arr) => JSON.parse(arr)));
};

// Comparator function
const cmp = (
  left: number | number[],
  right: number | number[]
): number | null => {
  // Both numbers
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return -1;
    else if (left > right) return 1;
    else return 0;
  }

  // Exactly one array
  if (Array.isArray(left) && !Array.isArray(right)) return cmp(left, [right]);
  if (!Array.isArray(left) && Array.isArray(right)) return cmp([left], right);

  // Both arrays
  if (Array.isArray(left) && Array.isArray(right)) {
    const n = left.length,
      m = right.length;

    let i = 0,
      j = 0;
    while (i < n && j < m) {
      const l = left[i++];
      const r = right[j++];

      const c = cmp(l, r);
      if (c) return c;
    }

    if (i === n && j === m) return 0;
    else if (i === n) return -1;
    else return 1;
  }
  return null;
};

// Wrapper
const isLower = (left: number[], right: number[]): boolean =>
  cmp(left, right) === -1;

const arrayPairs = parseInput("13/input.txt");

// Part A
const partA = arrayPairs.reduce(
  (sum, [arr1, arr2], idx) => (isLower(arr1, arr2) ? sum + idx + 1 : sum),
  0
);
console.log(partA);

// Part B
const divider1 = [[2]],
  divider2 = [[6]];

const arrays = arrayPairs
  .flat(1)
  .concat([divider1, divider2])
  .sort((a, b) => cmp(a, b)!)
  .map((arr) => JSON.stringify(arr));

console.log(
  (arrays.indexOf(JSON.stringify(divider1)) + 1) *
    (arrays.indexOf(JSON.stringify(divider2)) + 1)
);
