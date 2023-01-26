/*
  Warnings:

  - A unique constraint covering the columns `[userId,eventId]` on the table `EventRequests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventRequests_userId_eventId_key" ON "EventRequests"("userId", "eventId");
