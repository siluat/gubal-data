#!/usr/bin/env ts-node-script
import { parseFile } from 'fast-csv';
import chalk from 'chalk';

type Row = string[];

type Header = {
  index: number;
  key: string;
  type: string;
};

async function parseFirstThreeRows(filepath: string): Promise<Row[]> {
  const rows: Row[] = [];
  return new Promise<Row[]>((resolve, reject) => {
    parseFile(filepath, { maxRows: 3 })
      .on('error', (error) => reject(error))
      .on('data', (row: []) => Array.isArray(row) && rows.push(row))
      .on('end', () => resolve(rows));
  });
}

function createHeaders(indexes: Row, keys: Row, types: Row): Header[] {
  const headers: Header[] = [];
  keys.map((key, i) => {
    headers.push({
      index: +indexes[i],
      key,
      type: types[i],
    });
  });
  return headers;
}

function printHeader(headers: Header[]) {
  headers.map((header) => {
    console.info(
      `${chalk.gray(header.index)} ${chalk.white(header.key)} ${chalk.gray(
        header.type,
      )}`,
    );
  });
}

async function main() {
  const filepath: string = process.argv[2];

  if (!filepath) {
    console.log('파일을 찾을 수 없습니다.');
    process.exit();
  }

  try {
    const [indexes, keys, types]: Row[] = await parseFirstThreeRows(filepath);
    const headers: Header[] = createHeaders(indexes, keys, types);
    printHeader(headers);
  } catch (error) {
    console.log(error);
  }
}

main();
