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
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b-4 border-slate-700 sticky top-0 z-10 shadow-md">
      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-900 tracking-wide">
        {state.language === 'ko' ? '연간 캘린더' : 'Yearly Calendar'} {state.selectedYear}
      </h1>

      <div className="flex-1" />

      {/* Year selector */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-medium text-gray-700">
          {TRANSLATIONS[state.language].ui.yearSelector}:
        </span>
        <Select
          value={state.selectedYear.toString()}
          onValueChange={(val) => setYear(parseInt(val))}
        >
          <SelectTrigger className="w-[140px] text-lg h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 25 }, (_, i) => 2026 + i).map((year) => (
              <SelectItem key={year} value={year.toString()} className="text-lg">
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
        className="text-lg h-12 px-6"
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
        className="text-lg h-12 px-6"
      >
        {TRANSLATIONS[state.language].ui.languageToggle}
      </Button>
    </div>
  );
}
