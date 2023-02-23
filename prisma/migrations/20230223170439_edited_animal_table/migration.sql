/*
  Warnings:

  - Added the required column `type` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Made the column `age` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Animal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_userId_fkey";

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "age" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
