import input from "../input";

const stdIn: string[] = input("3/input.txt");

const accumulate = (partialSum: number, i: number): number => i + partialSum;

export const char2Priority = (i: string): number => {
    const iCharCode = i.charCodeAt(0);
    if (i.toLowerCase() === i)
        return iCharCode - 'a'.charCodeAt(0) + 1;
    return iCharCode - 'A'.charCodeAt(0) + 27;
}

console.log(
    stdIn
        .map(
            i => {
                const firstHalf: Set<string> = new Set(i.slice(0, i.length / 2));
                const secondHalf: Set<string> = new Set(i.slice(i.length / 2));
                const intersection: string[] = [...firstHalf].filter(i => secondHalf.has(i));

                return intersection.map(i => char2Priority(i)).reduce(accumulate, 0);

            }
        ).reduce(accumulate, 0)
); // 7848