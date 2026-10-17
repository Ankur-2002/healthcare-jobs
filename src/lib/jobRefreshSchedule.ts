import { createHash } from 'crypto';

const SLOTS_PER_DAY = 96; // one call every 15 minutes
const MIN_RUNS_PER_DAY = 7;
const MAX_RUNS_PER_DAY = 15;

function seededUnitRandom(seed: string): () => number {
  let state = createHash('sha256').update(seed).digest();
  let offset = 0;

  return () => {
    if (offset + 4 > state.length) {
      state = createHash('sha256').update(state).digest();
      offset = 0;
    }
    const value = state.readUInt32BE(offset);
    offset += 4;
    return value / 0xffffffff;
  };
}

function slotIndexUtc(date: Date): number {
  return date.getUTCHours() * 4 + Math.floor(date.getUTCMinutes() / 15);
}

function dailyRunSlots(dayKey: string): { target: number; slots: Set<number> } {
  const next = seededUnitRandom(`job-refresh-slots:${dayKey}`);
  const target =
    MIN_RUNS_PER_DAY +
    Math.floor(next() * (MAX_RUNS_PER_DAY - MIN_RUNS_PER_DAY + 1));

  const slots = new Set<number>();
  while (slots.size < target) {
    slots.add(Math.floor(next() * SLOTS_PER_DAY));
  }

  return { target, slots };
}

export type JobRefreshScheduleDecision = {
  run: boolean;
  dayKey: string;
  slot: number;
  dailyTarget: number;
};

/**
 * When the refresh endpoint is hit every 15 minutes, only allow the real
 * refresh on 7–15 pseudo-random slots per UTC day (stable for that day).
 */
export function getJobRefreshScheduleDecision(
  now = new Date()
): JobRefreshScheduleDecision {
  const dayKey = now.toISOString().slice(0, 10);
  const slot = slotIndexUtc(now);
  const { target, slots } = dailyRunSlots(dayKey);

  return {
    run: slots.has(slot),
    dayKey,
    slot,
    dailyTarget: target,
  };
}
