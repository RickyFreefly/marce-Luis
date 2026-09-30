import { motion } from "motion/react";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[2.6rem] sm:text-5xl lg:text-6xl font-script text-[#3A4A3A] leading-none"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#5A6A5A] max-w-2xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}