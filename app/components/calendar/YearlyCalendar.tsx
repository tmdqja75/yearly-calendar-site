'use client';

import React, { useMemo } from 'react';
import { useCalendar } from '@/contexts/CalendarContext';
import { generateYearCalendar } from '@/lib/calendar/generateCalendarData';
import { DayCell } from './DayCell';

export function YearlyCalendar() {
  const { state } = useCalendar();

  // Generate calendar data
  const calendarData = useMemo(() => {
    return generateYearCalendar(state.selectedYear, state.holidays, state.language);
  }, [state.selectedYear, state.holidays, state.language]);

  // Horizontal layout: 12 rows (months) × 31 columns (days)
  if (state.orientation === 'horizontal') {
    return (
      <div className="w-full overflow-x-auto pb-4">
        <div className="inline-block min-w-max">
          {/* Header row with day numbers */}
          <div className="flex mb-1">
            <div className="w-24 flex-shrink-0 font-semibold text-sm p-2 bg-gray-100 border border-gray-300">
              {state.language === 'ko' ? '월' : 'Month'}
            </div>
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className="min-w-[60px] w-[60px] flex-shrink-0 font-semibold text-xs text-center p-1 bg-gray-100 border border-gray-300"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Each month as a row */}
          {calendarData.months.map((month) => (
            <div key={month.monthIndex} className="flex mb-0">
              {/* Month label */}
              <div className="w-24 flex-shrink-0 font-semibold text-sm flex items-center justify-center p-2 bg-gray-50 border border-gray-300">
                {month.monthName}
              </div>

              {/* Day cells for this month */}
              {month.dayCells.map((cell, cellIndex) => (
                <div key={cellIndex} className="min-w-[60px] w-[60px] flex-shrink-0">
                  <DayCell cell={cell} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vertical layout: 31 rows (days) × 12 columns (months)
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="inline-block min-w-max">
        {/* Header row with month names */}
        <div className="flex mb-1">
          <div className="w-16 flex-shrink-0 font-semibold text-sm p-2 bg-gray-100 border border-gray-300">
            {state.language === 'ko' ? '일' : 'Day'}
          </div>
          {calendarData.months.map((month) => (
            <div
              key={month.monthIndex}
              className="min-w-[80px] w-[80px] flex-shrink-0 font-semibold text-xs text-center p-2 bg-gray-100 border border-gray-300"
            >
              {month.monthName}
            </div>
          ))}
        </div>

        {/* Each day as a row */}
        {Array.from({ length: 31 }, (_, dayIndex) => (
          <div key={dayIndex} className="flex mb-0">
            {/* Day number label */}
            <div className="w-16 flex-shrink-0 font-semibold text-sm flex items-center justify-center p-2 bg-gray-50 border border-gray-300">
              {dayIndex + 1}
            </div>

            {/* Cells for each month on this day */}
            {calendarData.months.map((month) => {
              const cell = month.dayCells[dayIndex];
              return (
                <div key={month.monthIndex} className="min-w-[80px] w-[80px] flex-shrink-0">
                  <DayCell cell={cell} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
