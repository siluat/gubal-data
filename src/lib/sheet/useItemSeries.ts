import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type ItemSeries = {
  id: number;
  name: string;
};

function createItemSeries(rows: Row[]): ItemSeries[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
  }));
}

export default async function useItemSeries() {
  const rows = await getRowsFromCSV('./csv/ItemSeries.csv');
  return createItemSeries(rows);
}
