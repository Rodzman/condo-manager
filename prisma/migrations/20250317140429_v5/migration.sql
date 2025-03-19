/*
  Warnings:

  - You are about to drop the column `uploadedDocuments` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `unit_id` on the `vehicles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_unit_id_fkey";

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uploadedDocuments";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "unit_id",
ADD COLUMN     "unitId" TEXT;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
