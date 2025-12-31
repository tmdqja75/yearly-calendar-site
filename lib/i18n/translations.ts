import { Translations } from '@/types';

export const TRANSLATIONS: Record<'ko' | 'en', Translations> = {
  ko: {
    monthNames: [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    holidays: {
      '신정': '신정',
      '설날': '설날',
      '삼일절': '삼일절',
      '어린이날': '어린이날',
      '부처님 오신 날': '부처님 오신 날',
      '현충일': '현충일',
      '광복절': '광복절',
      '개천절': '개천절',
      '한글날': '한글날',
      '크리스마스': '크리스마스',
      '대체공휴일': '대체공휴일',
      '추석': '추석',
      '국회의원 선거일': '국회의원 선거일',
      '대통령 선거일': '대통령 선거일',
    },
    ui: {
      yearSelector: '연도 선택',
      languageToggle: 'English',
      orientationToggle: '세로 보기',
      exportPDF: 'PDF 내보내기',
      preview: '미리보기',
      download: '다운로드',
      cancel: '취소',
      paperSize: '용지 크기',
      pageLayout: '페이지 레이아웃',
      pageOrientation: '페이지 방향',
    }
  },
  en: {
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    holidays: {
      '신정': 'New Year\'s Day',
      '설날': 'Lunar New Year',
      '삼일절': 'Independence Movement Day',
      '어린이날': 'Children\'s Day',
      '부처님 오신 날': 'Buddha\'s Birthday',
      '현충일': 'Memorial Day',
      '광복절': 'Liberation Day',
      '개천절': 'National Foundation Day',
      '한글날': 'Hangeul Day',
      '크리스마스': 'Christmas',
      '대체공휴일': 'Substitute Holiday',
      '추석': 'Chuseok (Harvest Festival)',
      '국회의원 선거일': 'National Assembly Election Day',
      '대통령 선거일': 'Presidential Election Day',
    },
    ui: {
      yearSelector: 'Select Year',
      languageToggle: '한국어',
      orientationToggle: 'Vertical View',
      exportPDF: 'Export PDF',
      preview: 'Preview',
      download: 'Download',
      cancel: 'Cancel',
      paperSize: 'Paper Size',
      pageLayout: 'Page Layout',
      pageOrientation: 'Page Orientation',
    }
  }
};
