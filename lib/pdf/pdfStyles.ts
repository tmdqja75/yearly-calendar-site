import { StyleSheet } from '@react-pdf/renderer';

export const createPDFStyles = (cellWidth: number, cellHeight: number, fontSize: number, useKoreanFont: boolean = true) => {
  // Use Dongle font for all languages
  const fontFamily = 'Dongle';

  return StyleSheet.create({
    page: {
      padding: 10, // Minimal margins
      backgroundColor: '#ffffff',
      fontFamily,
    },
    title: {
      fontSize: fontSize * 2.5,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      fontFamily,
      color: '#0f172a',
      letterSpacing: 0.5,
    },
    table: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
    },
    headerCell: {
      width: cellWidth,
      height: cellHeight * 0.6,
      backgroundColor: '#334155',
      border: '1px solid #475569',
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    monthLabelCell: {
      // width is set dynamically
      height: cellHeight,
      backgroundColor: '#f9fafb',
      border: '1.5px solid #e5e7eb',
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: fontSize * 1.5,
      fontWeight: 'bold',
      color: '#ffffff',
      fontFamily,
    },
    monthText: {
      fontSize: fontSize * 1.5,
      fontWeight: 'bold',
      color: '#0f172a',
      fontFamily,
    },
    cell: {
      width: cellWidth,
      height: cellHeight,
      border: '1px solid #e5e7eb',
      padding: 3,
      backgroundColor: '#ffffff',
    },
    cellWeekend: {
      backgroundColor: '#e0f2fe',
      borderLeft: '3px solid #3b82f6',
    },
    cellHoliday: {
      backgroundColor: '#fce7f3',
      borderLeft: '3px solid #ef4444',
    },
    cellEmpty: {
      backgroundColor: '#f9fafb',
    },
    dayNumber: {
      fontSize: fontSize * 0.8,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 2,
      fontFamily,
    },
    cellText: {
      fontSize: fontSize * 0.6,
      color: '#111827',
      lineHeight: 1.2,
      fontFamily,
    },
    holidayName: {
      fontSize: fontSize * 0.55,
      color: '#dc2626',
      fontWeight: 'bold',
      marginBottom: 2,
      fontFamily,
    },
  });
};
