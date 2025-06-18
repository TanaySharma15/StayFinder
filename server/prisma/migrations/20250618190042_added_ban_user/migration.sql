-- AlterTable
ALTER TABLE "User" ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "banUntil" TIMESTAMP(3),
ADD COLUMN     "isBan" BOOLEAN NOT NULL DEFAULT false;
