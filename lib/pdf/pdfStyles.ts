import { StyleSheet } from '@react-pdf/renderer';

export const createPDFStyles = (cellSize: number, fontSize: number, useKoreanFont: boolean = true) => {
  // Use NanumGothic for Korean support, Helvetica as fallback
  const fontFamily = useKoreanFont ? 'NanumGothic' : 'Helvetica';

  return StyleSheet.create({
    page: {
      padding: 10, // Minimal margins
      backgroundColor: '#ffffff',
      fontFamily,
    },
    title: {
      fontSize: fontSize * 1.8,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily,
    },
    table: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
    },
    headerCell: {
      width: cellSize,
      height: cellSize * 0.6,
      backgroundColor: '#f3f4f6',
      border: '1px solid #d1d5db',
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    monthLabelCell: {
      // width is set dynamically
      height: cellSize,
      backgroundColor: '#f9fafb',
      border: '1px solid #d1d5db',
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: fontSize * 0.9,
      fontWeight: 'bold',
      color: '#374151',
      fontFamily,
    },
    monthText: {
      fontSize: fontSize,
      fontWeight: 'bold',
      color: '#111827',
      fontFamily,
    },
    cell: {
      width: cellSize,
      height: cellSize,
      border: '1px solid #d1d5db',
      padding: 2,
      backgroundColor: '#ffffff',
    },
    cellWeekend: {
      backgroundColor: '#e0f2fe',
    },
    cellHoliday: {
      backgroundColor: '#fce7f3',
    },
    cellEmpty: {
      backgroundColor: '#f9fafb',
    },
    dayNumber: {
      fontSize: fontSize * 0.7,
      fontWeight: 'bold',
      color: '#6b7280',
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
      fontSize: fontSize * 0.5,
      color: '#ec4899',
      marginBottom: 2,
      fontFamily,
    },
  });
};
