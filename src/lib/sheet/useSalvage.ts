import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type Salvage = {
  id: number;
  optimalSkill: number;
};

function createSalvage(rows: Row[]): Salvage[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    optimalSkill: parseInt(row[1], 10),
  }));
}

export default async function useSalvage(): Promise<Salvage[]> {
  const rows = await getRowsFromCSV('./csv/Salvage.csv');
  return createSalvage(rows);
}
