'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDay } from '@/types';
import { useCalendar } from '@/contexts/CalendarContext';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface DayCellProps {
  cell: CalendarDay;
}

export function DayCell({ cell }: DayCellProps) {
  const { state, updateDayInput } = useCalendar();
  const [localValue, setLocalValue] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Initialize local value from context
  useEffect(() => {
    if (!cell.isEmpty && cell.dateKey) {
      const savedValue = state.dayInputs.get(cell.dateKey) || '';
      setLocalValue(savedValue);
    }
  }, [cell.isEmpty, cell.dateKey, state.dayInputs]);

  // Debounced update function
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set new timer
      if (cell.dateKey) {
        const timer = setTimeout(() => {
          updateDayInput(cell.dateKey!, newValue);
        }, 300);
        setDebounceTimer(timer);
      }
    },
    [cell.dateKey, updateDayInput, debounceTimer]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Empty cell (for days that don't exist in the month)
  if (cell.isEmpty) {
    return (
      <div className="border border-gray-200 bg-gray-50 min-h-[60px] min-w-[60px]">
        {/* Empty cell */}
      </div>
    );
  }

  // Determine background color based on weekend and holiday
  const bgColor = cell.holiday
    ? 'bg-pink-50' // Holiday (soft pink pastel)
    : cell.isWeekend
    ? 'bg-blue-50' // Weekend (soft blue pastel)
    : 'bg-white'; // Regular day

  const borderColor = cell.holiday
    ? 'border-gray-300'
    : cell.isWeekend
    ? 'border-gray-300'
    : 'border-gray-200';

  // Left border accent
  const leftBorderAccent = cell.holiday
    ? 'border-l-4 border-l-red-500'
    : cell.isWeekend
    ? 'border-l-4 border-l-blue-500'
    : '';

  // Get holiday name in current language
  const holidayName = cell.holiday
    ? TRANSLATIONS[state.language].holidays[cell.holiday.name] || cell.holiday.name
    : null;

  return (
    <div
      className={`border ${borderColor} ${bgColor} ${leftBorderAccent} min-h-[60px] min-w-[60px] p-1.5 flex flex-col relative group hover:shadow-md transition-shadow`}
    >
      {/* Day number */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-lg font-bold text-gray-800">{cell.dayOfMonth}</span>
        {cell.holiday && (
          <span
            className="text-xs text-red-600 font-bold truncate max-w-[40px]"
            title={holidayName || ''}
          >
            {holidayName}
          </span>
        )}
      </div>

      {/* Editable textarea */}
      <textarea
        value={localValue}
        onChange={handleChange}
        placeholder=""
        className={`flex-1 text-sm resize-none border-none outline-none ${bgColor} focus:ring-2 focus:ring-blue-500 rounded p-0.5 w-full`}
        rows={2}
        maxLength={100}
      />
    </div>
  );
}
