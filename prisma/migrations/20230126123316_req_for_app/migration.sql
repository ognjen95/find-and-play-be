-- DropForeignKey
ALTER TABLE "_admin" DROP CONSTRAINT "_admin_A_fkey";

-- CreateTable
CREATE TABLE "_reqForApproval" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_reqForApproval_AB_unique" ON "_reqForApproval"("A", "B");

-- CreateIndex
CREATE INDEX "_reqForApproval_B_index" ON "_reqForApproval"("B");

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reqForApproval" ADD CONSTRAINT "_reqForApproval_A_fkey" FOREIGN KEY ("A") REFERENCES "EventRequests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reqForApproval" ADD CONSTRAINT "_reqForApproval_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
