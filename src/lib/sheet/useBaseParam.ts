import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type BaseParam = {
  id: number;
  name: string;
};

function createBaseParam(rows: Row[]): BaseParam[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[1],
  }));
}

export default async function useBaseParam() {
  const rows = await getRowsFromCSV('./csv/BaseParam.csv');
  return createBaseParam(rows);
}
