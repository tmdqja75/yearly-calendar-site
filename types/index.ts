// Language types
export type Language = 'ko' | 'en';
export type CalendarOrientation = 'horizontal' | 'vertical';

// Holiday information
export interface HolidayInfo {
  name: string;
  isSubstitute?: boolean;
}

// Calendar day cell
export interface CalendarDay {
  isEmpty: boolean;
  date?: Date;
  dateKey?: string; // "2026-01-15"
  monthIndex?: number; // 0-11
  dayOfMonth: number; // 1-31
  dayOfWeek?: number; // 0-6 (Sunday=0)
  isWeekend?: boolean;
  holiday?: HolidayInfo;
  userInput?: string;
}

// Month data structure
export interface MonthData {
  monthIndex: number;
  monthName: string;
  dayCells: CalendarDay[];
}

// Year calendar data
export interface YearCalendarData {
  year: number;
  months: MonthData[];
}

// PDF configuration
export interface PDFConfig {
  paperSize: 'A4' | 'B4' | 'A3' | 'Letter';
  layout: 'single' | 'two-page'; // All 12 months OR Jan-Jun/Jul-Dec
  orientation: 'portrait' | 'landscape'; // Page orientation, not calendar orientation
  year: number;
}

// Translations structure
export interface Translations {
  monthNames: string[];
  dayNames: string[];
  holidays: Record<string, string>;
  ui: {
    yearSelector: string;
    languageToggle: string;
    orientationToggle: string;
    exportPDF: string;
    preview: string;
    download: string;
    cancel: string;
    paperSize: string;
    pageLayout: string;
    pageOrientation: string;
  };
}

// Calendar context state
export interface CalendarState {
  selectedYear: number;
  dayInputs: Map<string, string>; // dateKey -> user input
  holidays: Map<string, HolidayInfo>;
  language: Language;
  orientation: CalendarOrientation;
}

// Calendar context actions
export type CalendarAction =
  | { type: 'SET_YEAR'; payload: number }
  | { type: 'UPDATE_DAY_INPUT'; payload: { dateKey: string; value: string } }
  | { type: 'CLEAR_YEAR' }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_ORIENTATION'; payload: CalendarOrientation }
  | { type: 'SET_HOLIDAYS'; payload: Map<string, HolidayInfo> };

// Paper size dimensions (in points, 72 DPI)
export interface PaperDimensions {
  width: number;
  height: number;
}
