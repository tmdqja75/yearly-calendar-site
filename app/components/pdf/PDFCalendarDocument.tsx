import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import type { PageProps } from '@react-pdf/renderer';
import { PDFConfig, YearCalendarData, Language, CalendarOrientation } from '@/types';
import { getPaperDimensions } from '@/lib/pdf/paperSizes';
import { createPDFStyles } from '@/lib/pdf/pdfStyles';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface PDFCalendarDocumentProps {
  calendarData: YearCalendarData;
  config: PDFConfig;
  language: Language;
  calendarOrientation: CalendarOrientation;
  dayInputs: Map<string, string>;
}

// Map our paper size names to @react-pdf/renderer's expected format
const mapPaperSize = (size: PDFConfig['paperSize']): PageProps['size'] => {
  if (size === 'Letter') return 'LETTER';
  return size; // A4, B4, A3 are already uppercase
};

export function PDFCalendarDocument({
  calendarData,
  config,
  language,
  calendarOrientation,
  dayInputs,
}: PDFCalendarDocumentProps) {
  const dimensions = getPaperDimensions(config.paperSize, config.orientation);
  const margin = 10; // Minimal margins
  const titleHeight = 25; // Reserved space for title
  const contentWidth = dimensions.width - (margin * 2);
  const contentHeight = dimensions.height - (margin * 2) - titleHeight;

  // Calculate cell size based on orientation and layout
  const isHorizontal = calendarOrientation === 'horizontal';
  const monthsPerPage = config.layout === 'single' ? 12 : 6;

  // Fixed label widths instead of proportional multiplier
  // This maximizes space for calendar cells and minimizes whitespace
  const monthLabelWidth = language === 'ko' ? 45 : 55; // Width for month names (wider for English)
  const dayLabelWidth = 25; // Width for day numbers (1-31)

  let cellWidth: number;
  let cellHeight: number;
  let labelCellWidth: number;

  if (isHorizontal) {
    // Horizontal: 31 day columns + 1 month label column
    const dayCols = 31;
    const headerHeight = 0.75; // Header size multiplier (increased to prevent overflow)

    // Use independent width and height to fill entire page (rectangular cells)
    cellWidth = (contentWidth - monthLabelWidth) / dayCols;
    cellHeight = contentHeight / (monthsPerPage + headerHeight);
    labelCellWidth = monthLabelWidth;
  } else {
    // Vertical: month columns + 1 day label column
    const monthCols = monthsPerPage;
    const headerHeight = 0.5; // Header size multiplier

    // Use independent width and height to fill entire page (rectangular cells)
    cellWidth = (contentWidth - dayLabelWidth) / monthCols;
    cellHeight = contentHeight / (31 + headerHeight);
    labelCellWidth = dayLabelWidth;
  }

  // Font size based on the smaller dimension to ensure readability
  const minDimension = Math.min(cellWidth, cellHeight);
  const fontSize = Math.max(5, Math.min(minDimension / 6, 9));
  const styles = createPDFStyles(cellWidth, cellHeight, fontSize, language === 'ko');

  // Split months for two-page layout
  const monthGroups =
    config.layout === 'two-page'
      ? [calendarData.months.slice(0, 6), calendarData.months.slice(6, 12)]
      : [calendarData.months];

  return (
    <Document>
      {monthGroups.map((months, pageIndex) => (
        <Page key={pageIndex} size={mapPaperSize(config.paperSize)} orientation={config.orientation} style={styles.page}>
          {/* Title */}
          <Text style={styles.title}>
            {calendarData.year} {language === 'ko' ? '연간 캘린더' : 'Yearly Calendar'}
            {config.layout === 'two-page' &&
              ` - ${pageIndex === 0 ? (language === 'ko' ? '1-6월' : 'Jan-Jun') : (language === 'ko' ? '7-12월' : 'Jul-Dec')}`}
          </Text>

          {/* Calendar Grid */}
          {isHorizontal ? (
            <HorizontalCalendar
              months={months}
              styles={styles}
              labelCellWidth={labelCellWidth}
              dayInputs={dayInputs}
              language={language}
            />
          ) : (
            <VerticalCalendar
              months={months}
              styles={styles}
              labelCellWidth={labelCellWidth}
              dayInputs={dayInputs}
              language={language}
            />
          )}
        </Page>
      ))}
    </Document>
  );
}

// Horizontal Layout Component (Months as rows)
interface CalendarLayoutProps {
  months: any[];
  styles: any;
  labelCellWidth: number;
  dayInputs: Map<string, string>;
  language: Language;
}

function HorizontalCalendar({
  months,
  styles,
  labelCellWidth,
  dayInputs,
  language,
}: CalendarLayoutProps) {
  return (
    <View style={styles.table}>
      {/* Header row with day numbers */}
      <View style={styles.row}>
        <View style={[styles.headerCell, { width: labelCellWidth }]}>
          <Text style={styles.headerText}>{language === 'ko' ? '월' : 'Month'}</Text>
        </View>
        {Array.from({ length: 31 }, (_, i) => (
          <View key={i} style={styles.headerCell}>
            <Text style={styles.headerText}>{i + 1}</Text>
          </View>
        ))}
      </View>

      {/* Month rows */}
      {months.map((month: any) => (
        <View key={month.monthIndex} style={styles.row}>
          {/* Month label */}
          <View style={[styles.monthLabelCell, { width: labelCellWidth }]}>
            <Text style={styles.monthText}>{month.monthName}</Text>
          </View>

          {/* Day cells */}
          {month.dayCells.map((cell: any, idx: number) => {
            const cellStyle = [
              styles.cell,
              cell.isEmpty && styles.cellEmpty,
              !cell.isEmpty && cell.holiday && styles.cellHoliday,
              !cell.isEmpty && !cell.holiday && cell.isWeekend && styles.cellWeekend,
            ];

            const userInput = cell.dateKey ? dayInputs.get(cell.dateKey) || '' : '';

            return (
              <View key={idx} style={cellStyle}>
                {!cell.isEmpty && (
                  <>
                    <Text style={styles.dayNumber}>{cell.dayOfMonth}</Text>
                    {cell.holiday && (
                      <Text style={styles.holidayName}>
                        {TRANSLATIONS[language].holidays[cell.holiday.name] || cell.holiday.name}
                      </Text>
                    )}
                    {userInput && <Text style={styles.cellText}>{userInput}</Text>}
                  </>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

// Vertical Layout Component (Months as columns)
function VerticalCalendar({
  months,
  styles,
  labelCellWidth,
  dayInputs,
  language,
}: CalendarLayoutProps) {
  return (
    <View style={styles.table}>
      {/* Header row with month names */}
      <View style={styles.row}>
        <View style={[styles.headerCell, { width: labelCellWidth }]}>
          <Text style={styles.headerText}>{language === 'ko' ? '일' : 'Day'}</Text>
        </View>
        {months.map((month: any) => (
          <View key={month.monthIndex} style={styles.headerCell}>
            <Text style={styles.headerText}>{month.monthName}</Text>
          </View>
        ))}
      </View>

      {/* Day rows */}
      {Array.from({ length: 31 }, (_, dayIndex) => (
        <View key={dayIndex} style={styles.row}>
          {/* Day number label */}
          <View style={[styles.monthLabelCell, { width: labelCellWidth }]}>
            <Text style={styles.monthText}>{dayIndex + 1}</Text>
          </View>

          {/* Cells for each month */}
          {months.map((month: any) => {
            const cell = month.dayCells[dayIndex];
            const cellStyle = [
              styles.cell,
              cell.isEmpty && styles.cellEmpty,
              !cell.isEmpty && cell.holiday && styles.cellHoliday,
              !cell.isEmpty && !cell.holiday && cell.isWeekend && styles.cellWeekend,
            ];

            const userInput = cell.dateKey ? dayInputs.get(cell.dateKey) || '' : '';

            return (
              <View key={month.monthIndex} style={cellStyle}>
                {!cell.isEmpty && (
                  <>
                    {cell.holiday && (
                      <Text style={styles.holidayName}>
                        {TRANSLATIONS[language].holidays[cell.holiday.name] || cell.holiday.name}
                      </Text>
                    )}
                    {userInput && <Text style={styles.cellText}>{userInput}</Text>}
                  </>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
