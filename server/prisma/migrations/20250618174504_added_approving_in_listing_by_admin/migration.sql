-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "approved" "ListingStatus" NOT NULL DEFAULT 'PENDING';
