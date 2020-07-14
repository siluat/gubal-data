import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type ClassJob = {
  id: number;
  name: string;
};

function createClassJob(rows: Row[]): ClassJob[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
  }));
}

export default async function useClassJob() {
  const rows = await getRowsFromCSV('./csv/ClassJob.csv');
  return createClassJob(rows);
}
