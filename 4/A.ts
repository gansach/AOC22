import input from "../input";

const stdIn: string[] = input("4/input.txt");
const completelyOverlappingIntervals = stdIn.filter(line => {
    const [interval1, interval2] = line.split(',');
    const [a, b] = interval1.split('-').map(Number);
    const [c, d] = interval2.split('-').map(Number);
    return (a >= c && b <= d) || (c >= a && d <= b);
});
console.log(completelyOverlappingIntervals.length) // 576