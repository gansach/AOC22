import input from "../input";

const stdIn: string[] = input("2/input.txt");

// A, X Rock
// B, Y Paper
// C, Z Scissors

let score: number = 0;
for (const line of stdIn) {
    const [opponent, me] = line.split(' ');

    const opCode: number = opponent.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    const meCode: number = me.charCodeAt(0) - 'X'.charCodeAt(0) + 1;

    if (opCode === meCode)
        score += 3;
    else if (meCode === opCode + 1 || (meCode === 1 && opCode === 3))
        score += 6;
    score += meCode;
}
console.log(score); // 12772