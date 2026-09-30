import { motion } from "motion/react";
import { Mail, Heart } from "lucide-react";
import { SectionContainer } from "../ui/SectionContainer";

type GiftSectionTexts = {
  title: string;
  detail: string;
};

type GiftSectionProps = {
  texts?: GiftSectionTexts;
};

const defaultTexts: GiftSectionTexts = {
  title: "Lluvia de sobres",
  detail: "… ¡y mucho amor!",
};

export function GiftSection({ texts }: GiftSectionProps) {
  const resolvedTexts = texts ?? defaultTexts;

  return (
    <SectionContainer narrow id="gifts">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative mx-auto overflow-hidden rounded-[2.5rem] border border-[#D8C7A3]/45 bg-[#FBF8F1] px-6 py-12 text-center shadow-[0_18px_60px_rgba(70,60,40,0.10)] md:px-12 md:py-16"
      >
        {/* Fondo suave */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,215,183,0.18),transparent_35%)]" />

        {/* Apariencia de sobre */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem]">
          {/* Tapa superior del sobre */}
          <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-[#F5F0E6] to-transparent" />

          {/* Líneas del sobre */}
          <div className="absolute left-0 top-0 h-px w-[50%] origin-left rotate-[28deg] bg-[#D8C7A3]/45 translate-y-[190px] md:translate-y-[210px]" />
          <div className="absolute right-0 top-0 h-px w-[50%] origin-right -rotate-[28deg] bg-[#D8C7A3]/45 translate-y-[190px] md:translate-y-[210px]" />
          <div className="absolute bottom-0 left-0 h-px w-[50%] origin-left -rotate-[28deg] bg-[#D8C7A3]/35 -translate-y-[150px] md:-translate-y-[165px]" />
          <div className="absolute bottom-0 right-0 h-px w-[50%] origin-right rotate-[28deg] bg-[#D8C7A3]/35 -translate-y-[150px] md:-translate-y-[165px]" />
        </div>

        {/* Círculos decorativos suaves */}
        <div className="pointer-events-none absolute left-8 top-8 h-20 w-20 rounded-full border border-[#D8C7A3]/25" />
        <div className="pointer-events-none absolute bottom-8 right-10 h-24 w-24 rounded-full border border-[#D8C7A3]/25" />

        {/* Icono */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#EFE7D8] shadow-inner"
        >
          <div className="absolute inset-2 rounded-full border border-[#CDB78C]/50" />
          <Mail className="relative z-10 h-8 w-8 text-[#7E866F]" />
        </motion.div>

        {/* Título más grande */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mb-5 font-serif text-2xl md:text-3xl lg:text-4xl text-[#A58A5F] tracking-[0.08em]"
        >
          {resolvedTexts.title}
        </motion.h3>

        {/* Texto principal */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mx-auto max-w-3xl font-serif text-xl leading-tight text-[#3A4A3A] md:text-3xl"
        >
          {resolvedTexts.detail}
        </motion.h2>

        {/* Separador */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-3"
        >
          <span className="h-px flex-1 bg-[#CDB78C]/70" />
          <Heart className="h-4 w-4 fill-[#CDB78C] text-[#CDB78C]" />
          <span className="h-px flex-1 bg-[#CDB78C]/70" />
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}