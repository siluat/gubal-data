import { createBuildDirectory, cleanBuildDirectory } from './lib/file';
import { buildItemSummaries } from './lib/buildItemSummaries';

async function main() {
  try {
    await cleanBuildDirectory();
    await createBuildDirectory();

    await buildItemSummaries();
  } catch (error) {
    console.error(error);
  }
}

main();
