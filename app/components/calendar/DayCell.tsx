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
    ? 'bg-pink-50' // Holiday (pink takes priority)
    : cell.isWeekend
    ? 'bg-blue-50' // Weekend
    : 'bg-white'; // Regular day

  const borderColor = cell.holiday
    ? 'border-pink-200'
    : cell.isWeekend
    ? 'border-blue-200'
    : 'border-gray-200';

  // Get holiday name in current language
  const holidayName = cell.holiday
    ? TRANSLATIONS[state.language].holidays[cell.holiday.name] || cell.holiday.name
    : null;

  return (
    <div
      className={`border ${borderColor} ${bgColor} min-h-[60px] min-w-[60px] p-1 flex flex-col relative group hover:shadow-sm transition-shadow`}
    >
      {/* Day number */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-700">{cell.dayOfMonth}</span>
        {cell.holiday && (
          <span
            className="text-[8px] text-pink-600 font-medium truncate max-w-[40px]"
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
        className={`flex-1 text-[10px] resize-none border-none outline-none ${bgColor} focus:ring-1 focus:ring-blue-400 rounded p-0.5 w-full`}
        rows={2}
        maxLength={100}
      />
    </div>
  );
}
