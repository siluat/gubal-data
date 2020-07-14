import { writeObjectToFile } from './file';
import useItem, { Item } from './sheet/useItem';

type ItemSummary = [number, string, string, number, number, number, number];

/**
 * 아이템 정렬
 * 1순위 아이템 카테고리 주요 순위 오름차순
 * 2순위 아이템 카테고리 부 순위 오름차순
 * 3순위 아이템 레벨 내림차순
 * 4순위 아이템 아이디 내림차순
 */
function compareItem(a: Item, b: Item): number {
  if (a.itemUICategory.majorOrder < b.itemUICategory.majorOrder) return -1;
  if (a.itemUICategory.majorOrder > b.itemUICategory.majorOrder) return 1;

  if (a.itemUICategory.minorOrder < b.itemUICategory.minorOrder) return -1;
  if (a.itemUICategory.minorOrder > b.itemUICategory.minorOrder) return 1;

  if (b.itemLevel < a.itemLevel) return -1;
  if (b.itemLevel > a.itemLevel) return 1;

  if (b.id < a.id) return -1;
  if (b.id > a.id) return 1;

  return 0;
}

export async function buildItemSummaries() {
  const items = (await useItem()).sort(compareItem);
  const itemSummaries: ItemSummary[] = items.map((item) => {
    return [
      item.id,
      item.name,
      item.icon,
      item.itemLevel,
      item.rarity,
      item.itemUICategory.id,
      item.equipLevel,
    ];
  });
  await writeObjectToFile('itemSummaries.json', itemSummaries);
}
