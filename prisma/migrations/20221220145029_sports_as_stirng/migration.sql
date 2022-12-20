/*
  Warnings:

  - You are about to drop the `_EventToSport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToSport" DROP CONSTRAINT "_EventToSport_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSport" DROP CONSTRAINT "_EventToSport_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "sports" TEXT[];

-- DropTable
DROP TABLE "_EventToSport";
