import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type ClassJobCategory = {
  id: number;
  name: string;
};

function createClassJobCategory(rows: Row[]): ClassJobCategory[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
  }));
}

export default async function useClassJobCategory(): Promise<
  ClassJobCategory[]
> {
  const rows = await getRowsFromCSV('./csv/ClassJobCategory.csv');
  return createClassJobCategory(rows);
}
