import { Row } from '../types/common';
import { writeObjectToFile, getRowsFromCSV } from './file';

type ItemSummary = [number, string, string, number, number, number, number];

function createItemSummaries(itemRows: Row[]): ItemSummary[] {
  // 검색 색인 생성에 필요한 데이터만 추출
  return itemRows.map((row) => [
    parseInt(row[0], 10), // key
    row[10], // name
    row[11], // icon
    parseInt(row[12], 10), // item level
    parseInt(row[13], 10), // rarity
    parseInt(row[16], 10), // item ui category
    parseInt(row[40], 10), // equip level
  ]);
}

function validateKey(itemSummary: ItemSummary): boolean {
  const [key] = itemSummary;
  return key !== 0 && (key < 40 || key > 1600);
}

export async function buildItemSummaries() {
  const rows = await getRowsFromCSV('./csv/Item.csv');
  const itemSummaries: ItemSummary[] = createItemSummaries(rows).filter(
    validateKey,
  );
  await writeObjectToFile('itemSummaries.json', itemSummaries);
}
