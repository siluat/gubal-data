import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type BaseParam = {
  id: number;
  name: string;
  description: string;
};

export type BaseParamProps = {
  name: string;
  value: number;
};

function createBaseParam(rows: Row[]): BaseParam[] {
  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[2],
    description: row[3],
  }));
}

export default async function useBaseParam() {
  const rows = await getRowsFromCSV('./csv/BaseParam.csv');
  return createBaseParam(rows);
}

export function parseBaseParam(
  baseParams: BaseParam[],
  keyColumn: string,
  valueColumn: string,
): BaseParamProps | undefined {
  if (keyColumn === '0') {
    return undefined;
  }
  const name = baseParams[parseInt(keyColumn, 10)].name;
  const value = parseInt(valueColumn, 10);
  return { name, value };
}
