import input from "../input";
import { char2Priority } from "./A";

const stdIn: string[] = input("3/input.txt");

let prioritySum: number = 0;
const numRucksacs = stdIn.length;
for (let i = 0; i < numRucksacs - 2; i += 3) {
    const ruckSack1 = new Set(stdIn[i]);
    const ruckSack2 = new Set(stdIn[i + 1]);
    const ruckSack3 = new Set(stdIn[i + 2]);

    const intersection = [...ruckSack1]
        .filter(i => ruckSack2.has(i) && ruckSack3.has(i))

    prioritySum += char2Priority(intersection[0]);
}

console.log(prioritySum); // 2616