import { readFileSync } from "fs";

const parseInput = (filename: string) => {
  const contents = readFileSync(filename, "utf-8");
  let stdIn: string[] = contents.split(/\r?\n\r?\n/);

  let monkeys = stdIn.map((i) => i.split(/\r?\n/));

  return monkeys.map((lines) => {
    let [, startLine, opLine, testLine, passLine, failLine] = lines;
    const startingItems = startLine.match(/\d+/g)?.map(Number) ?? [];

    const opNum = opLine.match(/\d+/g)?.map(Number).at(0);
    const op = (num: number) => {
      return opLine.indexOf("*") !== -1
        ? num * (opNum ?? num)
        : num + (opNum ?? num);
    };

    const divisibilityCheck = testLine.match(/\d+/g)?.map(Number).at(0) ?? 1;

    const trueMonkey = passLine.match(/\d+/g)?.map(Number).at(0);
    const falseMonkey = failLine.match(/\d+/g)?.map(Number).at(0);

    return {
      startingItems,
      op,
      reciever: (num: number) =>
        num % divisibilityCheck === 0 ? trueMonkey : falseMonkey,
      divisibilityCheck,
    };
  });
};

export default parseInput;
