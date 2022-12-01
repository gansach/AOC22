import { readFileSync } from 'fs';
import { join } from 'path';

function syncReadFile(filename: string) {
    const contents = readFileSync(join(__dirname, filename), 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}

export default syncReadFile;
