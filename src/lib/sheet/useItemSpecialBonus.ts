import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type ItemSpecialBonus = {
  id: number;
  name: string;
};

function createItemSpecialBonus(rows: Row[]): ItemSpecialBonus[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
  }));
}

export default async function useItemSpecialBonus() {
  const rows = await getRowsFromCSV('./csv/ItemSpecialBonus.csv');
  return createItemSpecialBonus(rows);
}
