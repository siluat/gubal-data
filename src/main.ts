import { createBuildDirectory, cleanBuildDirectory } from './lib/file';
import { buildItemSummaries } from './lib/buildItemSummaries';
import { buildItemUICategory } from './lib/buildItemUICategory';
import { buildItem } from './lib/buildItem';

async function main() {
  try {
    await cleanBuildDirectory();
    await createBuildDirectory();

    await buildItemSummaries();
    await buildItemUICategory();
    await buildItem();
  } catch (error) {
    console.error(error);
  }
}

main();
