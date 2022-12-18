import { readFileSync } from "fs";

function parseInput(filename: string) {
  return readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .map((i) => i.split(",").map(Number));
}

const exampleLava = parseInput("18/example.txt");
const lava = parseInput("18/input.txt");

// Set of cubes
class CubeSet extends Set {
  add = (cube: number[]) => super.add(cube.toString());
  has = (cube: number[]) => super.has(cube.toString());
}

const neighbors3D = ([x, y, z]: number[]) => [
  [x + 1, y, z],
  [x - 1, y, z],
  [x, y - 1, z],
  [x, y + 1, z],
  [x, y, z + 1],
  [x, y, z - 1],
];

function partA(lava: number[][]) {
  let lavaSet = new CubeSet();
  for (const lavaCube of lava) lavaSet.add(lavaCube);

  let totalSurfaceArea = 0;
  for (const cube of lava) {
    let surfaceArea = 6;

    // Adjacent lava
    for (const neighbor of neighbors3D(cube)) {
      if (lavaSet.has(neighbor)) surfaceArea--;
    }
    totalSurfaceArea += surfaceArea;
  }
  console.log(totalSurfaceArea);
}

function partB(lava: number[][]) {
  let lavaSet = new CubeSet();
  for (const lavaCube of lava) lavaSet.add(lavaCube);

  // BFS outside lava ball to get all air cubes adjacent to a lava cube
  const BFS = (cube: number[]) => {
    let airTouchingLava = new CubeSet();

    let q = [cube];
    let visited = new CubeSet();

    while (q.length !== 0) {
      let currAir = q.shift()!;

      const [x, y, z] = currAir;
      // No lava is outside these bounds
      if (!(x >= -1 && y >= -1 && z >= -1 && x <= 25 && y <= 25 && z <= 25))
        continue;

      // Don't BFS inside lava
      if (lavaSet.has(currAir)) {
        continue;
      }

      if (visited.has(currAir)) continue;
      visited.add(currAir);

      for (const neighbor of neighbors3D(currAir)) {
        q.push(neighbor);

        // If neighbor is lava
        if (lavaSet.has(neighbor)) airTouchingLava.add(currAir);
      }
    }
    return [...airTouchingLava].map((i) => i.split(",").map(Number));
  };

  const airTouchingLava = BFS([-1, -1, -1]);

  let totalExternalSurfaceArea = 0;
  for (const air of airTouchingLava) {
    let surfaceArea = 0;
    for (const airNeighbor of neighbors3D(air)) {
      // Neighbor is lava
      if (lavaSet.has(airNeighbor)) surfaceArea++;
    }
    totalExternalSurfaceArea += surfaceArea;
  }

  console.log(totalExternalSurfaceArea);
}

partA(exampleLava);
partA(lava);

partB(exampleLava);
partB(lava);
