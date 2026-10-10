export function formatDateUTC(date: string) {
  const d = new Date(date);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

export function buildGoogleCalendarUrl() {
  const start = formatDateUTC("2026-11-21T15:00:00-05:00");
  const end = formatDateUTC("2026-11-21T23:00:00-05:00");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Boda Marce & Luis"
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    "Ceremonia y recepción"
  )}&location=${encodeURIComponent("Eco Familiar Campestre, Calle 200 #67-65, Bogotá")}`;
}

export function downloadICS() {
  const start = formatDateUTC("2026-11-21T15:00:00-05:00");
  const end = formatDateUTC("2026-11-21T23:00:00-05:00");
  const now = formatDateUTC(new Date().toISOString());

  const content = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Marce y Luis//Boda//ES
BEGIN:VEVENT
UID:${Date.now()}@marceyluis.co
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:Boda Marce & Luis
DESCRIPTION:Ceremonia y recepción
LOCATION:Eco Familiar Campestre, Calle 200 #67-65, Bogotá
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([content], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "boda-marce-luis.ics";
  a.click();

  URL.revokeObjectURL(url);
}