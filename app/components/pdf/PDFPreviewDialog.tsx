'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import { Language } from '@/types';

interface PDFPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfBlob: Blob | null;
  onConfirmDownload: () => void;
  language: Language;
}

export function PDFPreviewDialog({
  open,
  onOpenChange,
  pdfBlob,
  onConfirmDownload,
  language,
}: PDFPreviewDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pdfBlob && open) {
      const url = URL.createObjectURL(pdfBlob);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] w-[98vw] h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{TRANSLATIONS[language].ui.preview}</DialogTitle>
          <DialogDescription className="text-lg">
            {language === 'ko'
              ? 'PDF 미리보기입니다. 다운로드하시겠습니까?'
              : 'Preview your PDF. Would you like to download it?'}
          </DialogDescription>
        </DialogHeader>

        {/* PDF Preview */}
        <div className="flex-1 overflow-auto border rounded-lg bg-gray-50">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-full min-h-[700px]"
              title="PDF Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">
                {language === 'ko' ? '미리보기를 로드하는 중...' : 'Loading preview...'}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-lg h-12 px-6">
            {TRANSLATIONS[language].ui.cancel}
          </Button>
          <Button onClick={onConfirmDownload} className="text-lg h-12 px-6">
            {TRANSLATIONS[language].ui.download}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
