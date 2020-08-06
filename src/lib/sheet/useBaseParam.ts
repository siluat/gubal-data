import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';

type BaseParam = {
  id: number;
  name: string;
  description: string;
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
  baseParamColumn: string,
): string | undefined {
  if (baseParamColumn === '0') {
    return undefined;
  }
  return baseParams[parseInt(baseParamColumn, 10)].name;
}

export function parseBaseParamValue(
  baseParamColumn: string,
  baseParamValueColumn: string,
): number | undefined {
  if (baseParamColumn === '0') {
    return undefined;
  }
  return parseInt(baseParamValueColumn, 10);
}
