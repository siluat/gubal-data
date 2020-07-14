import useItem from './sheet/useItem';
import { writeObjectToFile } from './file';

export async function buildItem() {
  const items = await useItem();
  for (const item of items) {
    await writeObjectToFile(`item/${item.id}.json`, item);
  }
}
