/*
  Warnings:

  - You are about to drop the column `address` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `adoptedStatus` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `city` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "address",
DROP COLUMN "adoptedStatus",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
