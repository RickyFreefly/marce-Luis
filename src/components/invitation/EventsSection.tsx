import { Church, MapPin, PartyPopper, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SectionContainer } from "../ui/SectionContainer";
import { SectionTitle } from "../ui/SectionTitle";

type EventItem = {
  title: string;
  label: string;
  time: string;
  description: string;
  icon: typeof Sparkles;
};

type EventsSectionTexts = {
  sectionTitle: string;
  venueLabel: string;
  venueName: string;
  venueAddress: string;
  venueDescription: string;
  mapButton: string;
  schedule: EventItem[];
};

type EventsSectionProps = {
  texts?: EventsSectionTexts;
};

const defaultTexts: EventsSectionTexts = {
  sectionTitle: "La celebración",
  venueLabel: "Lugar del evento",
  venueName: "Lugar por confirmar",
  venueAddress: "Dirección por confirmar",
  venueDescription:
    "Compartiremos en un mismo lugar cada momento de esta celebración.",
  mapButton: "Ver ubicación",
  schedule: [
    {
      title: "Bienvenida",
      label: "Inicio del día",
      time: "3:00 PM",
      description: "Te recibiremos para comenzar juntos este día tan especial.",
      icon: Sparkles,
    },
    {
      title: "Ceremonia",
      label: "Nuestro sí",
      time: "4:00 PM",
      description:
        "El momento donde diremos “sí” rodeados de quienes más queremos.",
      icon: Church,
    },
    {
      title: "Celebración",
      label: "Recepción",
      time: "6:00 PM",
      description: "Cena • DJ • Banda en vivo. Una noche para no olvidar.",
      icon: PartyPopper,
    },
  ],
};

export function EventsSection({ texts }: EventsSectionProps) {
  const resolvedTexts = texts ?? defaultTexts;

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${resolvedTexts.venueName} ${resolvedTexts.venueAddress}`
  )}`;

  return (
    <SectionContainer className="bg-white/50" id="events">
      <SectionTitle title={resolvedTexts.sectionTitle} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-[32px] shadow-[0_12px_40px_rgba(80,80,60,0.08)] border border-white/60 overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="flex items-start gap-4 md:gap-5">
              <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E7E4DA] flex items-center justify-center shadow-sm">
                <MapPin className="w-7 h-7 md:w-8 md:h-8 text-[#7E866F]" />
              </div>

              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.22em] text-[#9AA08C]">
                  {resolvedTexts.venueLabel}
                </p>

                <h3 className="mt-1 text-3xl md:text-4xl text-[#5D6651] font-serif leading-tight">
                  {resolvedTexts.venueName}
                </h3>

                <p className="mt-3 text-lg md:text-xl text-[#6F7468] leading-relaxed">
                  {resolvedTexts.venueAddress}
                </p>

                <p className="mt-2 text-base md:text-lg text-[#7B8075] leading-relaxed">
                  {resolvedTexts.venueDescription}
                </p>

                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
               className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-full bg-[#8B9A8B] text-white text-base md:text-lg shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#3A4A3A] hover:shadow-md" >
                  <MapPin className="w-4 h-4" />
                  {resolvedTexts.mapButton}
                </a>
              </div>
            </div>

            <div className="mt-8 md:mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
              {resolvedTexts.schedule.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="rounded-[24px] bg-[#FAF9F5] border border-[#ECE9DF] p-5 md:p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-full bg-[#EEF0E7] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#7E866F]" />
                      </div>

                      <div>
                        <h4 className="text-xl md:text-2xl text-[#5D6651] font-serif">
                          {item.title}
                        </h4>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#9AA08C]">
                          {item.label}
                        </p>
                      </div>
                    </div>

                    <p className="text-3xl md:text-4xl text-[#6A725D] font-serif">
                      {item.time}
                    </p>

                    <p className="mt-3 text-base md:text-lg text-[#70756A] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}