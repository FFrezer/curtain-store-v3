-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HeroBanner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "buttonText" TEXT,
    "buttonUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_HeroBanner" ("buttonText", "buttonUrl", "createdAt", "id", "imageUrl", "subtitle", "title") SELECT "buttonText", "buttonUrl", "createdAt", "id", "imageUrl", "subtitle", "title" FROM "HeroBanner";
DROP TABLE "HeroBanner";
ALTER TABLE "new_HeroBanner" RENAME TO "HeroBanner";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
