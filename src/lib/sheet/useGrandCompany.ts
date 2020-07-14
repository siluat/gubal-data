import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type GrandCompany = {
  id: number;
  name: string;
};

function createGrandCompany(rows: Row[]): GrandCompany[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
  }));
}

export default async function useGrandCompany() {
  const rows = await getRowsFromCSV('./csv/GrandCompany.csv');
  return createGrandCompany(rows);
}
