import { createBuildDirectory, cleanBuildDirectory } from './lib/file';
import { buildItemSummaries } from './lib/buildItemSummaries';
import { buildItemUICategory } from './lib/buildItemUICategory';

async function main() {
  try {
    await cleanBuildDirectory();
    await createBuildDirectory();

    await buildItemSummaries();
    await buildItemUICategory();
  } catch (error) {
    console.error(error);
  }
}

main();
