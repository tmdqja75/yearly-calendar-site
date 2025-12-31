'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCalendar } from '@/contexts/CalendarContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PDFConfig } from '@/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface PDFConfigPanelProps {
  onExport: (config: PDFConfig) => void;
  isGenerating: boolean;
}

export function PDFConfigPanel({ onExport, isGenerating }: PDFConfigPanelProps) {
  const { state } = useCalendar();
  const [config, setConfig] = useState<PDFConfig>({
    paperSize: 'A4',
    layout: 'single',
    orientation: 'landscape',
    year: state.selectedYear,
  });

  const handleExport = () => {
    // Auto-determine page orientation based on calendar orientation
    // Horizontal calendar (months as rows) -> landscape is better
    // Vertical calendar (days as rows) -> portrait is better
    const pageOrientation = state.orientation === 'horizontal' ? 'landscape' : 'portrait';

    onExport({
      ...config,
      year: state.selectedYear,
      orientation: pageOrientation,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{TRANSLATIONS[state.language].ui.exportPDF}</CardTitle>
        <CardDescription>
          {state.language === 'ko'
            ? '원하는 설정을 선택하고 PDF로 내보내세요'
            : 'Configure your preferences and export to PDF'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Paper Size */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            {TRANSLATIONS[state.language].ui.paperSize}
          </Label>
          <Select
            value={config.paperSize}
            onValueChange={(value) =>
              setConfig({ ...config, paperSize: value as PDFConfig['paperSize'] })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
              <SelectItem value="A3">A3 (297 × 420 mm)</SelectItem>
              <SelectItem value="B4">B4 (250 × 353 mm)</SelectItem>
              <SelectItem value="Letter">Letter (8.5 × 11 in)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Layout */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            {TRANSLATIONS[state.language].ui.pageLayout}
          </Label>
          <RadioGroup
            value={config.layout}
            onValueChange={(value) =>
              setConfig({ ...config, layout: value as PDFConfig['layout'] })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="layout-single" />
              <Label htmlFor="layout-single" className="font-normal cursor-pointer">
                {state.language === 'ko' ? '단일 페이지 (전체 12개월)' : 'Single Page (All 12 months)'}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="two-page" id="layout-two" />
              <Label htmlFor="layout-two" className="font-normal cursor-pointer">
                {state.language === 'ko'
                  ? '2페이지 (1-6월 / 7-12월)'
                  : 'Two Pages (Jan-Jun / Jul-Dec)'}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Info about auto page orientation */}
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
          {state.language === 'ko' ? (
            <>
              <strong>페이지 방향:</strong> 캘린더 방향에 따라 자동 설정됩니다.
              <br />
              현재: {state.orientation === 'horizontal' ? '가로 (Landscape)' : '세로 (Portrait)'}
            </>
          ) : (
            <>
              <strong>Page Orientation:</strong> Auto-determined by calendar orientation.
              <br />
              Current: {state.orientation === 'horizontal' ? 'Landscape' : 'Portrait'}
            </>
          )}
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating
            ? state.language === 'ko'
              ? 'PDF 생성 중...'
              : 'Generating PDF...'
            : TRANSLATIONS[state.language].ui.exportPDF}
        </Button>
      </CardContent>
    </Card>
  );
}
