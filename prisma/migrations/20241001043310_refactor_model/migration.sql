/*
  Warnings:

  - You are about to drop the column `originalCycleId` on the `Cycle` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cycle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reflection" TEXT NOT NULL,
    "medium" TEXT,
    "eventDescription" TEXT,
    "eventDate" DATETIME,
    "eventStartTime" DATETIME,
    "eventEndTime" DATETIME,
    "imgUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "recycledFromId" INTEGER,
    "recycledByUserId" INTEGER,
    "upcycledFromId" INTEGER,
    "upcycledByUserId" INTEGER,
    CONSTRAINT "Cycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cycle_recycledFromId_fkey" FOREIGN KEY ("recycledFromId") REFERENCES "Cycle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cycle_recycledByUserId_fkey" FOREIGN KEY ("recycledByUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cycle_upcycledFromId_fkey" FOREIGN KEY ("upcycledFromId") REFERENCES "Cycle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cycle_upcycledByUserId_fkey" FOREIGN KEY ("upcycledByUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cycle" ("createdAt", "eventDate", "eventDescription", "eventEndTime", "eventStartTime", "id", "imgUrl", "medium", "recycledByUserId", "recycledFromId", "reflection", "upcycledByUserId", "updatedAt", "userId") SELECT "createdAt", "eventDate", "eventDescription", "eventEndTime", "eventStartTime", "id", "imgUrl", "medium", "recycledByUserId", "recycledFromId", "reflection", "upcycledByUserId", "updatedAt", "userId" FROM "Cycle";
DROP TABLE "Cycle";
ALTER TABLE "new_Cycle" RENAME TO "Cycle";
CREATE UNIQUE INDEX "Cycle_upcycledFromId_key" ON "Cycle"("upcycledFromId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
