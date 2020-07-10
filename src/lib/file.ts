import fs from 'fs';
import fsPromises from 'fs/promises';
import { Row } from '../types/common';
import { parseFile } from 'fast-csv';

const buildDirectory = 'build';

export async function createBuildDirectory() {
  if (!fs.existsSync(buildDirectory)) {
    await fsPromises.mkdir(buildDirectory);
  }
}

export async function cleanBuildDirectory() {
  if (fs.existsSync(buildDirectory)) {
    await fsPromises.rmdir(buildDirectory, {
      recursive: true,
    });
  }
}

export async function writeObjectToFile(filename: string, fromObject: Object) {
  fsPromises.writeFile(
    `${buildDirectory}/${filename}`,
    JSON.stringify(fromObject),
  );
}

async function parseFFSheet(filepath: string): Promise<Row[]> {
  const rows: Row[] = [];
  return new Promise<Row[]>((resolve, reject) => {
    parseFile(filepath)
      .on('error', (error) => reject(error))
      .on('data', (row: []) => Array.isArray(row) && rows.push(row))
      .on('end', () => resolve(rows));
  });
}

export async function getRowsFromCSV(filepath: string): Promise<Row[]> {
  const [, , , ...rows] = await parseFFSheet(filepath);
  return Promise.resolve(rows);
}
