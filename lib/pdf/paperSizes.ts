import { PaperDimensions } from '@/types';

/**
 * Paper sizes in points (72 DPI)
 * 1 inch = 72 points
 */
export const PAPER_SIZES: Record<'A4' | 'B4' | 'A3' | 'A1' | 'Letter', PaperDimensions> = {
  A4: {
    width: 595, // 210mm
    height: 842, // 297mm
  },
  B4: {
    width: 709, // 250mm
    height: 1001, // 353mm
  },
  A3: {
    width: 842, // 297mm
    height: 1191, // 420mm
  },
  A1: {
    width: 1684, // 594mm
    height: 2384, // 841mm
  },
  Letter: {
    width: 612, // 8.5 inches
    height: 792, // 11 inches
  },
};

/**
 * Get paper dimensions based on size and orientation
 * @param size - Paper size
 * @param orientation - Portrait or landscape
 * @returns Dimensions with width and height
 */
export function getPaperDimensions(
  size: keyof typeof PAPER_SIZES,
  orientation: 'portrait' | 'landscape'
): PaperDimensions {
  const baseDimensions = PAPER_SIZES[size];

  if (orientation === 'landscape') {
    return {
      width: baseDimensions.height,
      height: baseDimensions.width,
    };
  }

  return baseDimensions;
}
