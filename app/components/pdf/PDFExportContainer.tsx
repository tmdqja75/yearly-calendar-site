'use client';

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { pdf } from '@react-pdf/renderer';
import { useCalendar } from '@/contexts/CalendarContext';
import { generateYearCalendar } from '@/lib/calendar/generateCalendarData';
import { PDFConfigPanel } from '../controls/PDFConfigPanel';
import { PDFPreviewDialog } from './PDFPreviewDialog';
import { PDFCalendarDocument } from './PDFCalendarDocument';
import { PDFConfig } from '@/types';

// Import fonts (side effect)
import '@/lib/pdf/fonts';

export function PDFExportContainer() {
  const { state } = useCalendar();
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Generate calendar data
  const calendarData = useMemo(() => {
    return generateYearCalendar(state.selectedYear, state.holidays, state.language);
  }, [state.selectedYear, state.holidays, state.language]);

  const handleExport = async (config: PDFConfig) => {
    setIsGenerating(true);

    try {
      // Generate PDF blob
      const blob = await pdf(
        <PDFCalendarDocument
          calendarData={calendarData}
          config={config}
          language={state.language}
          calendarOrientation={state.orientation}
          dayInputs={state.dayInputs}
        />
      ).toBlob();

      setPdfBlob(blob);
      setShowPreview(true);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(
        state.language === 'ko'
          ? `PDF 생성에 실패했습니다.\n오류: ${errorMessage}`
          : `Failed to generate PDF.\nError: ${errorMessage}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `calendar-${state.selectedYear}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setShowPreview(false);
    }
  };

  return (
    <>
      <PDFConfigPanel onExport={handleExport} isGenerating={isGenerating} />
      <PDFPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        pdfBlob={pdfBlob}
        onConfirmDownload={handleConfirmDownload}
        language={state.language}
      />
    </>
  );
}
