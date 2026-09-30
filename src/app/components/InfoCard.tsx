import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function InfoCard({ icon: Icon, title, description, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="border border-[#8B9A8B]/30 rounded-lg p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg hover:border-[#8B9A8B] transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <Icon className="w-10 h-10 text-[#3A4A3A]" />
        <h4 className="text-lg font-serif text-[#3A4A3A]">{title}</h4>
        <p className="text-sm text-[#5A6A5A]">{description}</p>
      </div>
    </motion.div>
  );
}
