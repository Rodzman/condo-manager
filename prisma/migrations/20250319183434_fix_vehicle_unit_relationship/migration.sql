/*
  Warnings:

  - You are about to drop the column `unitId` on the `vehicles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_unitId_fkey";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "unitId",
ADD COLUMN     "unit_id" TEXT;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
