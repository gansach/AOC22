import input from "../input";

const stdIn: string[] = input("2/input.txt");
let score: number = 0;
for (const line of stdIn) {
    const [opponent, outcome] = line.split(' ');
    const opCode: number = opponent.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    if (outcome === 'X') {
        score += opCode === 1 ? 3 : opCode - 1;
    }
    else if (outcome === 'Y') {
        score += opCode;
        score += 3;
    }
    else if (outcome === 'Z') {
        score += opCode === 3 ? 1 : opCode + 1;
        score += 6;
    }
}
console.log(score); // 11618