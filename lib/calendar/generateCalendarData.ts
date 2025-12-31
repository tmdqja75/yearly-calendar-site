import { getDaysInMonth, getDay, format } from 'date-fns';
import { YearCalendarData, MonthData, CalendarDay, HolidayInfo, Language } from '@/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';

/**
 * Generate calendar data for a full year in linear grid format
 * Each month has 31 cells (some may be empty for months with <31 days)
 * @param year - The year to generate calendar for
 * @param holidays - Map of holidays for this year
 * @param locale - Language for month names
 * @returns Year calendar data with 12 months
 */
export function generateYearCalendar(
  year: number,
  holidays: Map<string, HolidayInfo>,
  locale: Language
): YearCalendarData {
  const months: MonthData[] = Array.from({ length: 12 }, (_, monthIndex) => {
    const daysInMonth = getDaysInMonth(new Date(year, monthIndex));

    // Create 31 cells (some may be empty for months with <31 days)
    const dayCells: CalendarDay[] = Array.from({ length: 31 }, (_, dayIndex) => {
      const dayOfMonth = dayIndex + 1;

      if (dayOfMonth > daysInMonth) {
        // Empty cell for non-existent days (e.g., Feb 30, Feb 31)
        return {
          isEmpty: true,
          dayOfMonth,
        };
      }

      const date = new Date(year, monthIndex, dayOfMonth);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayOfWeek = getDay(date); // 0 = Sunday, 6 = Saturday

      return {
        isEmpty: false,
        date,
        dateKey,
        monthIndex,
        dayOfMonth,
        dayOfWeek,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6, // Sunday or Saturday
        holiday: holidays.get(dateKey),
      };
    });

    return {
      monthIndex,
      monthName: TRANSLATIONS[locale].monthNames[monthIndex],
      dayCells,
    };
  });

  return {
    year,
    months,
  };
}

/**
 * Get the number of days in a specific month
 * @param year - The year
 * @param monthIndex - Month index (0-11)
 * @returns Number of days in the month
 */
export function getDaysInMonthForYear(year: number, monthIndex: number): number {
  return getDaysInMonth(new Date(year, monthIndex));
}

/**
 * Check if a year is a leap year
 * @param year - The year to check
 * @returns True if leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
