import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';
import useItemUICategory, { ItemUICategory } from './useItemUICategory';

export type Item = {
  id: number;
  name: string;
  icon: string;
  itemLevel: number;
  rarity: number;
  itemUICategory: ItemUICategory;
  equipLevel: number;
};

async function createItem(rows: Row[]): Promise<Item[]> {
  const itemUICategories = await useItemUICategory();

  return rows.map((row) => ({
    id: parseInt(row[0], 10),
    name: row[10],
    icon: row[11],
    itemLevel: parseInt(row[12], 10),
    rarity: parseInt(row[13], 10),
    itemUICategory: itemUICategories[parseInt(row[16], 10)],
    equipLevel: parseInt(row[40], 10),
  }));
}

export default async function useItem(): Promise<Item[]> {
  const rows = await getRowsFromCSV('./csv/Item.csv');
  return createItem(rows);
}
