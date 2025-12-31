'use client';

import React from 'react';
import { useCalendar } from '@/contexts/CalendarContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TRANSLATIONS } from '@/lib/i18n/translations';

export function CalendarHeader() {
  const { state, setYear, setLanguage, setOrientation } = useCalendar();

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">
        {state.language === 'ko' ? '연간 캘린더' : 'Yearly Calendar'} {state.selectedYear}
      </h1>

      <div className="flex-1" />

      {/* Year selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          {TRANSLATIONS[state.language].ui.yearSelector}:
        </span>
        <Select
          value={state.selectedYear.toString()}
          onValueChange={(val) => setYear(parseInt(val))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 25 }, (_, i) => 2026 + i).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orientation toggle */}
      <Button
        variant="outline"
        onClick={() =>
          setOrientation(state.orientation === 'horizontal' ? 'vertical' : 'horizontal')
        }
      >
        {state.orientation === 'horizontal' ? (
          <>
            <span className="mr-2">⬍</span>
            {state.language === 'ko' ? '세로 보기' : 'Vertical'}
          </>
        ) : (
          <>
            <span className="mr-2">⬌</span>
            {state.language === 'ko' ? '가로 보기' : 'Horizontal'}
          </>
        )}
      </Button>

      {/* Language toggle */}
      <Button
        variant="outline"
        onClick={() => setLanguage(state.language === 'ko' ? 'en' : 'ko')}
      >
        {TRANSLATIONS[state.language].ui.languageToggle}
      </Button>
    </div>
  );
}
