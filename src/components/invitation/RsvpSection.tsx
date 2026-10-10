import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  CircleX,
  MessageSquareHeart,
  CalendarPlus,
  Download,
} from "lucide-react";
import { SectionContainer } from "../ui/SectionContainer";
import { SectionTitle } from "../ui/SectionTitle";

type AttendanceValue = "yes" | "no" | "";

type RsvpTexts = {
  sectionTitle: string;
  intro: string;
  deadlineText: string;
  guestLabel: string;
  phoneLabel: string;
  confirmationLabel: string;
  attendingTitle: string;
  attendingSubtitle: string;
  notAttendingTitle: string;
  notAttendingSubtitle: string;
  messageTitle: string;
  optionalLabel: string;
  messagePlaceholder: string;
  validationAttendance: string;
  submitError: string;
  submitButton: string;
  submittingButton: string;
  successTitle: string;
  successMessage: string;
};

type RsvpSectionProps = {
  guestName: string;
  guestPhone: string;
  texts?: RsvpTexts;
};

const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwFD8RGJr5llLJsdRxcboS03Rif5B_Tws9vP_1e8hijx6p5mSI4SwLRSpWTfvowf2-nzA/exec";

const defaultTexts: RsvpTexts = {
  sectionTitle: "Confirmación de asistencia",
  intro:
    "Nos haría muy feliz contar contigo en este día tan especial. Por favor confirma tu asistencia antes del",
  deadlineText: "20 de octubre",
  guestLabel: "Invitado",
  phoneLabel: "Teléfono",
  confirmationLabel: "Confirmación",
  attendingTitle: "Sí, allí estaré",
  attendingSubtitle: "Confirmo mi asistencia",
  notAttendingTitle: "No podré acompañarlos",
  notAttendingSubtitle: "Enviaré mis mejores deseos",
  messageTitle: "Deja un mensaje",
  optionalLabel: "En nuestros corazones",
  messagePlaceholder: "Déjanos un mensaje si lo deseas...",
  validationAttendance:
    "Por favor selecciona una opción para confirmar tu asistencia.",
  submitError:
    "No fue posible registrar tu confirmación. Inténtalo nuevamente.",
  submitButton: "Confirmar asistencia",
  submittingButton: "Enviando...",
  successTitle: "¡Gracias",
  successMessage:
    "Hemos recibido tu confirmación. Nos alegra mucho contar con tu respuesta y compartir contigo este momento tan especial.",
};

function formatDateUTC(date: string) {
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

function buildGoogleCalendarUrl() {
  const start = formatDateUTC("2026-11-21T15:00:00-05:00");
  const end = formatDateUTC("2026-11-21T23:00:00-05:00");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Boda Marce & Luis"
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    "Ceremonia y recepción"
  )}&location=${encodeURIComponent("Eco Familiar Campestre, Calle 200 #67-65, Bogotá")}`;
}

function downloadICS() {
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

export function RsvpSection({
  guestName,
  guestPhone,
  texts,
}: RsvpSectionProps) {
  const [attendance, setAttendance] = useState<AttendanceValue>("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const resolvedTexts = texts ?? defaultTexts;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!attendance) {
      setSubmitError(resolvedTexts.validationAttendance);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        guestName,
        guestPhone,
        attendance,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      };

      if (RSVP_ENDPOINT) {
        await fetch(RSVP_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload),
        });
      } else {
        console.warn(
          "RSVP_ENDPOINT no está configurado todavía; la confirmación no se envió a ninguna hoja de cálculo.",
          payload
        );
      }

      setSubmitted(true);
      setConfirmed(attendance === "yes");
    } catch (error) {
      console.error(error);
      setSubmitError(resolvedTexts.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer className="bg-white/50" id="rsvp">
      <SectionTitle title={resolvedTexts.sectionTitle} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-[32px] shadow-[0_12px_40px_rgba(80,80,60,0.08)] border border-white/60 overflow-hidden">
          <div className="p-6 md:p-10">
            {!submitted ? (
              <>
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-lg md:text-xl text-[#5A6A5A] leading-relaxed">
                    {resolvedTexts.intro}{" "}
                    <span className="font-semibold text-[#3A4A3A]">
                      {resolvedTexts.deadlineText}
                    </span>
                    .
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-[22px] bg-[#FAF9F5] border border-[#ECE9DF] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-[#9AA08C] mb-2">
                        {resolvedTexts.guestLabel}
                      </p>
                      <p className="text-xl md:text-2xl font-serif text-[#5D6651]">
                        {guestName}
                      </p>
                    </div>

                    <div className="rounded-[22px] bg-[#FAF9F5] border border-[#ECE9DF] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-[#9AA08C] mb-2">
                        {resolvedTexts.phoneLabel}
                      </p>
                      <p className="text-xl md:text-2xl font-serif text-[#5D6651]">
                        {guestPhone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#9AA08C] mb-3 text-center">
                      {resolvedTexts.confirmationLabel}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setAttendance("yes")}
                        className={`rounded-[24px] border p-5 text-left transition-all duration-300 ${
                          attendance === "yes"
                            ? "bg-[#EEF0E7] border-[#B7BCA6] shadow-sm"
                            : "bg-[#FAF9F5] border-[#ECE9DF] hover:border-[#B7BCA6]"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-[#7E866F]" />
                          </div>
                          <div>
                            <h4 className="text-xl font-serif text-[#5D6651]">
                              {resolvedTexts.attendingTitle}
                            </h4>
                            <p className="text-sm text-[#7A8074]">
                              {resolvedTexts.attendingSubtitle}
                            </p>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAttendance("no")}
                        className={`rounded-[24px] border p-5 text-left transition-all duration-300 ${
                          attendance === "no"
                            ? "bg-[#F7F1EF] border-[#D6C2BC] shadow-sm"
                            : "bg-[#FAF9F5] border-[#ECE9DF] hover:border-[#D6C2BC]"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <CircleX className="w-5 h-5 text-[#9B6B5E]" />
                          </div>
                          <div>
                            <h4 className="text-xl font-serif text-[#5D6651]">
                              {resolvedTexts.notAttendingTitle}
                            </h4>
                            <p className="text-sm text-[#7A8074]">
                              {resolvedTexts.notAttendingSubtitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[#FAF9F5] border border-[#ECE9DF] p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-[#EEF0E7] flex items-center justify-center">
                        <MessageSquareHeart className="w-5 h-5 text-[#7E866F]" />
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl text-[#5D6651] font-serif">
                          {resolvedTexts.messageTitle}
                        </h4>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#9AA08C]">
                          {resolvedTexts.optionalLabel}
                        </p>
                      </div>
                    </div>

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={resolvedTexts.messagePlaceholder}
                      rows={4}
                      className="w-full rounded-[18px] border border-[#E6E2D8] bg-white px-4 py-3 text-[#5A6A5A] outline-none focus:border-[#B7BCA6] focus:ring-4 focus:ring-[#B7BCA6]/10 resize-none"
                    />
                  </div>

                  {submitError ? (
                    <p className="text-center text-[#A25555] text-sm md:text-base">
                      {submitError}
                    </p>
                  ) : null}

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 md:px-10 py-4 rounded-full bg-[#8B9A8B] text-white hover:bg-[#3A4A3A] transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? resolvedTexts.submittingButton
                        : resolvedTexts.submitButton}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EEF0E7] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#7E866F]" />
                </div>

                <h3 className="text-3xl md:text-4xl font-serif text-[#5D6651]">
                  {resolvedTexts.successTitle}, {guestName}!
                </h3>

                <p className="text-lg text-[#5A6A5A] max-w-xl mx-auto leading-relaxed">
                  {resolvedTexts.successMessage}
                </p>

                {confirmed && (
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={buildGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-[#3A4A3A] text-white hover:opacity-90 transition"
                    >
                      <CalendarPlus size={18} />
                      Agregar a Google Calendar
                    </a>

                    <button
                      type="button"
                      onClick={downloadICS}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 border border-[#3A4A3A] text-[#3A4A3A] hover:bg-[#3A4A3A] hover:text-white transition"
                    >
                      <Download size={18} />
                      Descargar invitación
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}