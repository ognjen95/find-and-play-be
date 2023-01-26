/*
  Warnings:

  - You are about to drop the `_reqForApproval` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `EventRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_reqForApproval" DROP CONSTRAINT "_reqForApproval_A_fkey";

-- DropForeignKey
ALTER TABLE "_reqForApproval" DROP CONSTRAINT "_reqForApproval_B_fkey";

-- AlterTable
ALTER TABLE "EventRequests" ADD COLUMN     "adminId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_reqForApproval";

-- AddForeignKey
ALTER TABLE "EventRequests" ADD CONSTRAINT "EventRequests_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
