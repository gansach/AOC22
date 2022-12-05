import input from "../input";

const stdIn: string[] = input("5/input.txt");

const sep: number = stdIn.indexOf('');
const initialConfig: string[] = stdIn.slice(0, sep);
const steps: string[] = stdIn.slice(sep + 1);

// Parsing intital state of stacks
const numStacks: number = Math.ceil(initialConfig[0].length / 4);
const initialStacks: string[][] = Array.from(Array(numStacks), () => []);
for (const line of initialConfig) {
    for (let i = 0; i < line.length; i += 4) {
        const crate = line.slice(i, i + 3).replace(/[\[\]\s]/g, '');
        if (crate.length > 0) initialStacks[i / 4].push(crate);
    }
}
initialStacks.map(i => { i.pop(); i.reverse(); });

// Different stacks for part A and B
const stacksA: string[][] = JSON.parse(JSON.stringify(initialStacks));
const stacksB: string[][] = JSON.parse(JSON.stringify(initialStacks));

for (const step of steps) {
    const nums = step.match(/\d+/g)?.map(Number);
    if (nums) {
        const [cnt, src, dest] = nums;
        // Part A
        for (let i = 0; i < cnt; i++) {
            const top = stacksA[src - 1].pop();
            if (top) stacksA[dest - 1].push(top);
        }

        // Part B
        const crates: string[] = stacksB[src - 1].splice(-cnt);
        stacksB[dest - 1] = stacksB[dest - 1].concat(crates);
    }
}

console.log(stacksA.reduce((prev, i) => prev + i.slice(-1), "")); // QGTHFZBHV
console.log(stacksB.reduce((prev, i) => prev + i.slice(-1), "")); // MGDMPSZTM