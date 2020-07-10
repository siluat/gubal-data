import { getRowsFromCSV, writeObjectToFile } from './file';
import { Row } from '../types/common';

type ItemUICategory = {
  name: string;
  icon: string;
};

function createItemUICategory(rows: Row[]): ItemUICategory[] {
  return rows.map((row) => ({
    name: row[1],
    icon: decodeIcon(row[2]),
  }));
}

function decodeIcon(code: string): string {
  const basePath = '/ui/icon';
  const filename = code.padStart(6, '0');
  const group = filename.slice(0, 3).padEnd(6, '0');
  return `${basePath}/${group}/${filename}${'.png'}`;
}

export async function buildItemUICategory() {
  const rows = await getRowsFromCSV('./csv/ItemUICategory.csv');
  const itemUICategory = createItemUICategory(rows);
  await writeObjectToFile('itemUICategory.json', itemUICategory);
}
