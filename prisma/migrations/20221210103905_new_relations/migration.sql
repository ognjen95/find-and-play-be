/*
  Warnings:

  - You are about to drop the column `userId` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `clubId` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Sport` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPlayers` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_userId_fkey";

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "maxPlayers" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sport" DROP COLUMN "clubId",
DROP COLUMN "eventId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_LocationToSport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SportToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToSport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubToSport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToSport_AB_unique" ON "_LocationToSport"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToSport_B_index" ON "_LocationToSport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SportToUser_AB_unique" ON "_SportToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SportToUser_B_index" ON "_SportToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSport_AB_unique" ON "_EventToSport"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSport_B_index" ON "_EventToSport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToSport_AB_unique" ON "_ClubToSport"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToSport_B_index" ON "_ClubToSport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToUser_AB_unique" ON "_ClubToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToUser_B_index" ON "_ClubToUser"("B");

-- AddForeignKey
ALTER TABLE "_LocationToSport" ADD CONSTRAINT "_LocationToSport_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToSport" ADD CONSTRAINT "_LocationToSport_B_fkey" FOREIGN KEY ("B") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SportToUser" ADD CONSTRAINT "_SportToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SportToUser" ADD CONSTRAINT "_SportToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSport" ADD CONSTRAINT "_EventToSport_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSport" ADD CONSTRAINT "_EventToSport_B_fkey" FOREIGN KEY ("B") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToSport" ADD CONSTRAINT "_ClubToSport_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToSport" ADD CONSTRAINT "_ClubToSport_B_fkey" FOREIGN KEY ("B") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToUser" ADD CONSTRAINT "_ClubToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToUser" ADD CONSTRAINT "_ClubToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
