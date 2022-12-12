import parseInput from "./parseInput";

// Function to find LCM
const lcm = (a: number, b: number): number => {
  const gcd = (a: number, b: number): number => {
    if (b == 0) return a;
    return gcd(b, a % b);
  };
  return Math.floor((a * b) / gcd(a, b));
};

let monkeys = parseInput("11/input.txt");
// LCM of all divisibility checks
let MOD = monkeys.reduce(
  (M, { divisibilityCheck }) => lcm(M, divisibilityCheck),
  1
);

let monkeyFrequency: number[] = Array(monkeys.length).fill(0);

const rounds = 1e4;
for (let round = 0; round < rounds; round++) {
  for (const turn in monkeys) {
    const monkey = monkeys[turn];
    monkeyFrequency[turn] += monkey.startingItems.length;

    const { startingItems, op, reciever } = monkey;

    // Part A
    const worryA = (num: number) => Math.floor(op(num) / 3);

    // Part B
    const worryB = (num: number) => op(num) % MOD;

    for (const startingItem of startingItems) {
      const item = worryB(startingItem);
      const recievingMonkey = monkeys[reciever(item) ?? -1];
      recievingMonkey.startingItems.push(item);
    }

    monkey.startingItems = [];
  }
}

// Function to return product of max 2 elements without mutation
const max2Product = ([...arr]: number[]) => {
  arr.sort((a, b) => b - a);
  return arr[0] * arr[1];
};

// Rounds = 20, WorryA => 58056
console.log(max2Product(monkeyFrequency)); // 15048718170
