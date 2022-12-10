/*
  Warnings:

  - You are about to drop the column `long` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `_SportToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lng` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SportToUser" DROP CONSTRAINT "_SportToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SportToUser" DROP CONSTRAINT "_SportToUser_B_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "long",
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sports" TEXT[];

-- DropTable
DROP TABLE "_SportToUser";
