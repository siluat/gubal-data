import { parseFile } from 'fast-csv';
import {
  createBuildDirectory,
  cleanBuildDirectory,
  writeObjectToFile,
} from './lib/file';
import { Row } from './types/common';

type ItemSummary = [number, string, string, number, number, number];

async function parseSheet(filepath: string): Promise<Row[]> {
  const rows: Row[] = [];
  return new Promise<Row[]>((resolve, reject) => {
    parseFile(filepath)
      .on('error', (error) => reject(error))
      .on('data', (row: []) => Array.isArray(row) && rows.push(row))
      .on('end', () => resolve(rows));
  });
}

function createItemSummaries(itemRows: Row[]): ItemSummary[] {
  // 검색 색인 생성에 필요한 데이터만 추출
  return itemRows.map((row) => [
    parseInt(row[0], 10), // key
    row[10], // name
    row[11], // icon
    parseInt(row[12], 10), // item level
    parseInt(row[13], 10), // rarity
    parseInt(row[16], 10), // item ui category
  ]);
}

function validateKey(itemSummary: ItemSummary): boolean {
  const [key] = itemSummary;
  return key !== 0 && (key < 40 || key > 1600);
}

async function main() {
  try {
    await cleanBuildDirectory();
    await createBuildDirectory();

    const [, , , ...rows] = await parseSheet('./csv/Item.csv');
    const itemSummaries: ItemSummary[] = createItemSummaries(rows).filter(
      validateKey,
    );
    await writeObjectToFile('itemSummaries.json', itemSummaries);
  } catch (error) {
    console.error(error);
  }
}

main();
