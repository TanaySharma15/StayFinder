-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_listingId_fkey";

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
