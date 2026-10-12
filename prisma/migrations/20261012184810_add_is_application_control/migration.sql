-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isApplicationControl" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Job_isApplicationControl_idx" ON "Job"("isApplicationControl");
