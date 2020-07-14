import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

export type ItemUICategory = {
  id: number;
  name: string;
  icon: string;
  majorOrder: number;
  minorOrder: number;
};

function createItemUICategory(rows: Row[]): ItemUICategory[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
    icon: row[2],
    majorOrder: parseInt(row[3], 10),
    minorOrder: parseInt(row[4], 10),
  }));
}

export default async function useItem(): Promise<ItemUICategory[]> {
  const rows = await getRowsFromCSV('./csv/ItemUICategory.csv');
  return createItemUICategory(rows);
}
