-- CreateTable
CREATE TABLE "job_refresh_daily_plans" (
    "dayKey" TEXT NOT NULL,
    "targetRuns" INTEGER NOT NULL,
    "scheduledTimes" JSONB NOT NULL,
    "completedSlotIndexes" JSONB NOT NULL DEFAULT '[]',
    "completedRuns" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_refresh_daily_plans_pkey" PRIMARY KEY ("dayKey")
);
