import fs from 'fs';
import fsPromises from 'fs/promises';

const buildDirectory = 'build';

export async function createBuildDirectory() {
  if (!fs.existsSync(buildDirectory)) {
    await fsPromises.mkdir(buildDirectory);
  }
}

export async function cleanBuildDirectory() {
  if (fs.existsSync(buildDirectory)) {
    await fsPromises.rmdir(buildDirectory, {
      recursive: true,
    });
  }
}

export async function writeObjectToFile(filename: string, fromObject: Object) {
  fsPromises.writeFile(
    `${buildDirectory}/${filename}`,
    JSON.stringify(fromObject),
  );
}
