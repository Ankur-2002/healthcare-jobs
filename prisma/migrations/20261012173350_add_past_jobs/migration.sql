-- CreateTable
CREATE TABLE "past_jobs" (
    "id" TEXT NOT NULL,
    "originalJobId" TEXT NOT NULL,
    "replacementJobId" TEXT,
    "title" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "profession" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "applyLink" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "postedDate" TIMESTAMP(3) NOT NULL,
    "originalCreatedAt" TIMESTAMP(3) NOT NULL,
    "originalUpdatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshRunId" TEXT NOT NULL,

    CONSTRAINT "past_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "past_jobs_originalJobId_idx" ON "past_jobs"("originalJobId");

-- CreateIndex
CREATE INDEX "past_jobs_archivedAt_idx" ON "past_jobs"("archivedAt");

-- CreateIndex
CREATE INDEX "past_jobs_refreshRunId_idx" ON "past_jobs"("refreshRunId");
