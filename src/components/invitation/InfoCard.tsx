import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
};

export function InfoCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/80 border border-[#8B9A8B]/30 rounded-2xl p-8 text-center shadow-sm"
    >
      <div className="flex justify-center mb-5">
        <div className="w-14 h-14 rounded-full bg-[#8B9A8B]/15 flex items-center justify-center">
          <Icon className="w-7 h-7 text-[#8B9A8B]" />
        </div>
      </div>

      <h3 className="text-2xl font-serif text-[#3A4A3A] mb-4">{title}</h3>

      <p className="text-[#5A6A5A] leading-relaxed">{description}</p>
    </motion.div>
  );
}