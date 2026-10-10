import { motion } from "motion/react";
import {
  Shirt,
  Lightbulb,
  Sparkles,
  Clock,
  Car,
  Baby,
  CheckCircle2,
} from "lucide-react";
import { SectionContainer } from "../ui/SectionContainer";
import { SectionTitle } from "../ui/SectionTitle";

type InfoSectionTexts = {
  sectionTitle: string;
  dressCodeTitle: string;
  recommendationsTitle: string;
};

type InfoSectionProps = {
  texts?: InfoSectionTexts;
};

const defaultTexts: InfoSectionTexts = {
  sectionTitle: "Información importante",
  dressCodeTitle: "Dress Code",
  recommendationsTitle: "Recomendaciones",
};

const cardShellClass =
  "relative h-full overflow-hidden rounded-[24px] border border-[#ECE9DF] bg-white/80 p-5 shadow-sm transition-transform duration-300 hover:scale-[1.02] md:p-6";

const dressItemClass =
  "rounded-2xl border border-[#ECE2CF] bg-[#FBF8F1]/75 p-4";

function CardShell({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay }}
      className={cardShellClass}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8D7B7]/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-[#DDE3D3]/30 blur-2xl" />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-[178px] flex-col items-center text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE7D8] shadow-inner">
        <Icon className="h-6 w-6 text-[#7E866F]" />
      </div>

      <h3 className="mb-4 font-serif text-2xl leading-tight text-[#3A4A3A]">
        {title}
      </h3>

      {description ? (
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#6A7462]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DressCodeCard({
  title,
  delay = 0.1,
}: {
  title: string;
  delay?: number;
}) {
  return (
    <CardShell delay={delay}>
      <CardHeader
        icon={Shirt}
        title={title}
        description="Sorpréndenos con tu mejor pinta y sé parte de la estética de este día."
      />

      <div className="mt-4 space-y-3 text-left">
        <div className={dressItemClass}>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#A58A5F]" />
            <span className="font-serif text-lg text-[#3A4A3A]">Ellos</span>
          </div>

          <p className="text-sm leading-relaxed text-[#6A7462]">
            Traje formal, No tenis. Se reserva el color azul oscuro y verde
            oliva.
          </p>
        </div>

        <div className={dressItemClass}>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#A58A5F]" />
            <span className="font-serif text-lg text-[#3A4A3A]">Ellas</span>
          </div>

          <p className="text-sm leading-relaxed text-[#6A7462]">
            Vestido formal, No tenis. se reserva el color blanco, azul noche
            y verde oliva.
          </p>
        </div>
      </div>
    </CardShell>
  );
}

function RecommendationsCard({
  title,
  delay = 0.2,
}: {
  title: string;
  delay?: number;
}) {
  const items = [
    {
      icon: Clock,
      text: "La ceremonia inicia puntual a las 4:00 PM.",
    },
    {
      icon: Car,
      text: "Habrá parqueadero disponible.",
    },
    {
      icon: Baby,
      text: "En esta ocasión, los niños se quedan en casa.",
    },
    {
      icon: CheckCircle2,
      text: "No olvides confirmar tu asistencia.",
    },
  ];

  return (
    <CardShell delay={delay}>
      <CardHeader
        icon={Lightbulb}
        title={title}
        description="Ten presente estos detalles para disfrutar el día sin contratiempos."
      />

      <div className="mt-4 space-y-3 text-left">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: delay + 0.1 + index * 0.08,
                duration: 0.45,
              }}
              className="flex items-center gap-3 rounded-[18px] border border-[#E6E1D7] bg-white px-4 py-3"
            >
              <Icon className="h-4 w-4 shrink-0 text-[#8B9A8B]" />

              <p className="text-sm leading-relaxed text-[#6A7462]">
                {item.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </CardShell>
  );
}

export function InfoSection({ texts }: InfoSectionProps) {
  const resolvedTexts = texts ?? defaultTexts;

  return (
    <SectionContainer className="bg-white/50" id="info">
      <SectionTitle title={resolvedTexts.sectionTitle} />

      <div className="grid items-stretch gap-8 md:grid-cols-2">
        <DressCodeCard title={resolvedTexts.dressCodeTitle} delay={0} />

        <RecommendationsCard
          title={resolvedTexts.recommendationsTitle}
          delay={0.1}
        />
      </div>
    </SectionContainer>
  );
}
