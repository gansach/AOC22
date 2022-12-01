import input from "../input";

const stdIn: string[] = input("1/input.txt");
let cnt: number = 0, maxCnt: number = 0;

for (const line of stdIn) {
    if (line.length === 0) cnt = 0;
    else {
        const num: number = +line;
        cnt += num;
        maxCnt = Math.max(maxCnt, cnt);
    }
}
maxCnt = Math.max(maxCnt, cnt);
console.log(maxCnt); // 67633
