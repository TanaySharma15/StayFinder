-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user';
