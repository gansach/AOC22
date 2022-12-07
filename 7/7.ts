import input from "../input";

const stdIn: string[] = input("7/input.txt");

interface Directory {
  name: string;
  files: File[];
  children: string[];
  size: number;
}

interface File {
  name: string;
  size: number;
}

type FileSystem = Record<string, Directory>;

let fileSystem: FileSystem = {}; // Map<string, Directory>
let path: string[] = [];

// Find size of directory recursively
const directorySize = (dirName: string): number => {
  const directory = fileSystem[dirName];

  if (directory.size !== -1) return directory.size;

  let size: number = 0;
  for (const file of directory.files) {
    size += file.size;
  }

  for (const childDir of directory.children) {
    size += directorySize(childDir);
  }

  // Memoize
  directory.size = size;
  return size;
};

for (const line of stdIn) {
  // cd command
  if (line.startsWith("$ cd")) {
    let [, , dir] = line.split(" ");

    if (dir === "..") path.pop();
    else {
      path.push(dir);

      let currPath = path.join("/");
      if (currPath === "/") currPath = ".";

      // Add a new directory if not found
      if (!fileSystem.hasOwnProperty(currPath)) {
        fileSystem[currPath] = {
          name: currPath,
          files: [],
          children: [],
          size: -1,
        };
      }
      if (currPath === ".") path = ["."];
    }
  }
  // ls command
  else if (line.startsWith("$ ls")) {
    continue;
  }
  // ls command output
  else {
    // nested directory
    if (line.startsWith("dir")) {
      const [, nested] = line.split(" ");
      const currPath = path.join("/");
      fileSystem[currPath].children.push(currPath + "/" + nested);
    }
    // file
    else {
      const [fileSize, fileName] = line.split(" ");
      const currPath = path.join("/");
      const file: File = { name: fileName, size: +fileSize };
      fileSystem[currPath].files.push(file);
    }
  }
}

let partA: number = 0;
for (const dir in fileSystem) {
  const dirSize = directorySize(dir);
  if (dirSize <= 100000) partA += dirSize;
}
console.log(partA); // 1792222

// =================================================================

const freeSpace = 7e7 - fileSystem["."].size;
const requiredSpace = 3e7 - freeSpace;

let partB: number = 7e7;
for (const dir in fileSystem) {
  const dirSize = fileSystem[dir].size;
  if (dirSize >= requiredSpace) {
    partB = Math.min(partB, dirSize);
  }
}
console.log(partB); // 1112963
