import input from "../input";

const dataStream: string = input("6/input.txt")[0];

let markerEndIdx = -1,
  messageEndIdx = -1;
for (let i = 0; i < dataStream.length; i++) {
  // Part A
  if (
    markerEndIdx === -1 &&
    [...new Set(dataStream.slice(i, i + 4))].length === 4
  ) {
    markerEndIdx = i + 4;
  }

  // Part B
  if (
    messageEndIdx === -1 &&
    [...new Set(dataStream.slice(i, i + 14))].length === 14
  ) {
    messageEndIdx = i + 14;
  }
}

console.log(markerEndIdx); // 1912
console.log(messageEndIdx); // 2122
