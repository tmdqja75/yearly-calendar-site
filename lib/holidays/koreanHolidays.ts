import * as holidaysKr from '@hyunbinseo/holidays-kr';
import { HolidayInfo } from '@/types';

/**
 * Get Korean public holidays for a specific year
 * @param year - The year to get holidays for
 * @returns Map of dateKey -> HolidayInfo
 */
export function getKoreanHolidays(year: number): Map<string, HolidayInfo> {
  const holidaysMap = new Map<string, HolidayInfo>();

  try {
    // Get the holidays object for the specified year
    // The package exports y2024, y2025, y2026, etc.
    const yearDataKey = `y${year}` as keyof typeof holidaysKr;
    const yearHolidays = holidaysKr[yearDataKey];

    if (!yearHolidays || typeof yearHolidays !== 'object') {
      console.warn(`Holiday data not available for year ${year}`);
      return holidaysMap;
    }

    // yearHolidays is an object like: { "2026-01-01": ["신정"], "2026-01-28": ["설날"] }
    Object.entries(yearHolidays).forEach(([dateKey, names]) => {
      if (Array.isArray(names) && names.length > 0) {
        holidaysMap.set(dateKey, {
          name: names.join(', '), // Join multiple holiday names if they exist on same day
          isSubstitute: names.some((name) => name.includes('대체')),
        });
      }
    });
  } catch (error) {
    console.error(`Failed to load holidays for year ${year}:`, error);
    // Return empty map if holidays can't be loaded
  }

  return holidaysMap;
}

/**
 * Check if a specific date is a Korean public holiday
 * @param dateKey - Date in 'yyyy-MM-dd' format
 * @param holidays - Map of holidays
 * @returns The holiday info if it's a holiday, undefined otherwise
 */
export function getHolidayForDate(
  dateKey: string,
  holidays: Map<string, HolidayInfo>
): HolidayInfo | undefined {
  return holidays.get(dateKey);
}
