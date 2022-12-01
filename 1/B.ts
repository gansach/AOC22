import input from "../input";

const stdIn: string[] = input("1/input.txt");

let nums: number[] = [0];
for (const line of stdIn) {
    if (line.length === 0) nums.push(0);
    else {
        const num = +line;
        nums[nums.length - 1] += num;
    }
}
nums.sort((a, b) => a - b).reverse();
console.log(nums[0] + nums[1] + nums[2]); // 199628