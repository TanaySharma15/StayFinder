/*
  Warnings:

  - You are about to drop the column `approved` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "approved",
ADD COLUMN     "status" "ListingStatus" NOT NULL DEFAULT 'PENDING';
