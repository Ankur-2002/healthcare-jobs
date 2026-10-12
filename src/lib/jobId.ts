export function generateJobId(profession: string, location: string): string {
  const timestamp = Date.now();
  const profPart = profession.slice(0, 3).toUpperCase().replace(/\s+/g, '');
  const locPart = location.slice(0, 3).toUpperCase().replace(/\s+/g, '');
  return `HJP-${profPart}-${locPart}-${timestamp}`;
}
