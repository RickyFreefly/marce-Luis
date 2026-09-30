import { CalendarPlus, Download } from "lucide-react";
import { buildGoogleCalendarUrl, downloadICSFile, type CalendarEventData } from "../../utils/calendar";

type CalendarActionsProps = {
  eventData: CalendarEventData;
};

export function CalendarActions({ eventData }: CalendarActionsProps) {
  const googleCalendarUrl = buildGoogleCalendarUrl(eventData);

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-black text-white hover:opacity-90 transition"
      >
        <CalendarPlus size={18} />
        Agregar a Google Calendar
      </a>

      <button
        type="button"
        onClick={() => downloadICSFile(eventData)}
        className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 border border-black text-black hover:bg-black hover:text-white transition"
      >
        <Download size={18} />
        Descargar invitación (.ics)
      </button>
    </div>
  );
}