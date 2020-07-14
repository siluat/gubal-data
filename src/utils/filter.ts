import { Item } from '../lib/sheet/useItem';

export function validateKey(item: Item): boolean {
  const id = item.id;
  return id !== 0 && (id < 40 || id > 1600);
}

export function validateName(item: Item): boolean {
  return item.name.length !== 0;
}
