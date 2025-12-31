'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CalendarState, CalendarAction, Language, CalendarOrientation, HolidayInfo } from '@/types';
import { getKoreanHolidays } from '@/lib/holidays/koreanHolidays';

// Initial state
const initialState: CalendarState = {
  selectedYear: 2026,
  dayInputs: new Map(),
  holidays: new Map(),
  language: 'ko',
  orientation: 'horizontal',
};

// Reducer function
function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'SET_YEAR':
      return {
        ...state,
        selectedYear: action.payload,
        // Clear day inputs when year changes (optional - remove if you want to keep them)
        // dayInputs: new Map(),
      };

    case 'UPDATE_DAY_INPUT':
      const newDayInputs = new Map(state.dayInputs);
      if (action.payload.value.trim() === '') {
        newDayInputs.delete(action.payload.dateKey);
      } else {
        newDayInputs.set(action.payload.dateKey, action.payload.value);
      }
      return {
        ...state,
        dayInputs: newDayInputs,
      };

    case 'CLEAR_YEAR':
      return {
        ...state,
        dayInputs: new Map(),
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };

    case 'SET_ORIENTATION':
      return {
        ...state,
        orientation: action.payload,
      };

    case 'SET_HOLIDAYS':
      return {
        ...state,
        holidays: action.payload,
      };

    default:
      return state;
  }
}

// Context type
interface CalendarContextType {
  state: CalendarState;
  setYear: (year: number) => void;
  updateDayInput: (dateKey: string, value: string) => void;
  clearYear: () => void;
  setLanguage: (language: Language) => void;
  setOrientation: (orientation: CalendarOrientation) => void;
}

// Create context
const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Provider props
interface CalendarProviderProps {
  children: ReactNode;
}

// Provider component
export function CalendarProvider({ children }: CalendarProviderProps) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Load from localStorage after hydration (client-side only)
  useEffect(() => {
    if (isHydrated) return; // Only run once

    try {
      const savedYear = localStorage.getItem('calendar-year');
      const savedLanguage = localStorage.getItem('calendar-language');
      const savedOrientation = localStorage.getItem('calendar-orientation');

      if (savedYear) {
        dispatch({ type: 'SET_YEAR', payload: parseInt(savedYear) });
      }
      if (savedLanguage) {
        dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage as Language });
      }
      if (savedOrientation) {
        dispatch({ type: 'SET_ORIENTATION', payload: savedOrientation as CalendarOrientation });
      }

      // Load day inputs for the saved year
      const yearToLoad = savedYear ? parseInt(savedYear) : initialState.selectedYear;
      const savedInputsJson = localStorage.getItem(`calendar-inputs-${yearToLoad}`);
      if (savedInputsJson) {
        const savedInputsArray = JSON.parse(savedInputsJson);
        savedInputsArray.forEach(([dateKey, value]: [string, string]) => {
          dispatch({ type: 'UPDATE_DAY_INPUT', payload: { dateKey, value } });
        });
      }

      setIsHydrated(true);
    } catch (error) {
      console.error('Failed to load calendar data from localStorage:', error);
      setIsHydrated(true);
    }
  }, [isHydrated]);

  // Load holidays when year changes
  useEffect(() => {
    const holidays = getKoreanHolidays(state.selectedYear);
    dispatch({ type: 'SET_HOLIDAYS', payload: holidays });
  }, [state.selectedYear]);

  // Save to localStorage when state changes (only after hydration)
  useEffect(() => {
    if (typeof window === 'undefined' || !isHydrated) return;

    try {
      localStorage.setItem('calendar-year', state.selectedYear.toString());
      localStorage.setItem('calendar-language', state.language);
      localStorage.setItem('calendar-orientation', state.orientation);

      // Save day inputs for the current year
      const inputsArray = Array.from(state.dayInputs.entries());
      localStorage.setItem(`calendar-inputs-${state.selectedYear}`, JSON.stringify(inputsArray));
    } catch (error) {
      console.error('Failed to save calendar data to localStorage:', error);
    }
  }, [state.selectedYear, state.language, state.orientation, state.dayInputs, isHydrated]);

  // Context value
  const value: CalendarContextType = {
    state,
    setYear: (year: number) => dispatch({ type: 'SET_YEAR', payload: year }),
    updateDayInput: (dateKey: string, value: string) =>
      dispatch({ type: 'UPDATE_DAY_INPUT', payload: { dateKey, value } }),
    clearYear: () => dispatch({ type: 'CLEAR_YEAR' }),
    setLanguage: (language: Language) => dispatch({ type: 'SET_LANGUAGE', payload: language }),
    setOrientation: (orientation: CalendarOrientation) =>
      dispatch({ type: 'SET_ORIENTATION', payload: orientation }),
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

// Custom hook to use the calendar context
export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
