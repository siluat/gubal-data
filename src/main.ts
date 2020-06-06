import { parseFile } from 'fast-csv';
import {
  createBuildDirectory,
  cleanBuildDirectory,
  writeObjectToFile,
} from './lib/file';
import { Row } from './types/common';

async function parseSheet(filepath: string): Promise<Row[]> {
  const rows: Row[] = [];
  return new Promise<Row[]>((resolve, reject) => {
    parseFile(filepath)
      .on('error', (error) => reject(error))
      .on('data', (row: []) => Array.isArray(row) && rows.push(row))
      .on('end', () => resolve(rows));
  });
}

async function createItemIndex(itemRows: Row[]) {
  // 검색 색인 생성에 필요한 데이터만 추출
  const leanedRows: Row[] = itemRows.map((row) => [
    row[0], // key
    row[10], // name
    row[11], // icon
    row[12], // item level
    row[13], // rarity
    row[16], // item ui category
  ]);
  return leanedRows;
}

async function main() {
  try {
    await cleanBuildDirectory();
    await createBuildDirectory();

    const [, , , ...rows] = await parseSheet('./csv/Item.csv');
    const searchIndex: Row[] = await createItemIndex(rows);
    writeObjectToFile('itemIndex.json', searchIndex);
  } catch (error) {
    console.error(error);
  }
}

main();
