import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Clock3, MapPin } from "lucide-react";

type EventCardProps = {
  icon: LucideIcon;
  title: string;
  time: string;
  location: string;
  description: string;
  delay?: number;
};

export function EventCard({
  icon: Icon,
  title,
  time,
  location,
  description,
  delay = 0,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/80 border border-[#8B9A8B]/30 rounded-2xl p-8 shadow-sm text-center"
    >
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-[#8B9A8B]/15 flex items-center justify-center">
          <Icon className="w-8 h-8 text-[#8B9A8B]" />
        </div>
      </div>

      <h3 className="text-3xl font-script text-[#3A4A3A] mb-6">{title}</h3>

      <div className="space-y-4 text-[#5A6A5A]">
        <div className="flex items-center justify-center gap-2">
          <Clock3 className="w-4 h-4 text-[#8B9A8B]" />
          <span className="text-lg">{time}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 text-[#8B9A8B]" />
          <span className="text-lg">{location}</span>
        </div>

        <p className="pt-2 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}