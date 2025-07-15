import fs from 'fs';
import path from 'path';

function findDynamicRouteDirs(dir: string): string[] {
  let dynamicDirs: string[] = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);

      if (/\[.+\]/.test(entry.name)) {
        dynamicDirs.push(fullPath);
      }

      // Recursive call
      dynamicDirs = dynamicDirs.concat(findDynamicRouteDirs(fullPath));
    }
  }

  return dynamicDirs;
}
