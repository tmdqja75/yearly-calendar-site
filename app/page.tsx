import { CalendarProvider } from '@/contexts/CalendarContext';
import { CalendarHeader } from './components/calendar/CalendarHeader';
import { YearlyCalendar } from './components/calendar/YearlyCalendar';
import { PDFExportContainer } from './components/pdf/PDFExportContainer';

export default function Home() {
  return (
    <CalendarProvider>
      <div className="min-h-screen bg-gray-50">
        <CalendarHeader />
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Calendar - Main area */}
            <div className="lg:col-span-9">
              <YearlyCalendar />
            </div>

            {/* PDF Export - Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <PDFExportContainer />
              </div>
            </div>
          </div>
        </main>
      </div>
    </CalendarProvider>
  );
}
