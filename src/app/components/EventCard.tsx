import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface EventCardProps {
  icon: LucideIcon;
  title: string;
  time: string;
  location: string;
  description: string;
  delay?: number;
}

export function EventCard({ icon: Icon, title, time, location, description, delay = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="border-2 border-[#8B9A8B]/30 rounded-xl p-8 bg-white/50 backdrop-blur-sm hover:border-[#8B9A8B] transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#E8EDE8] flex items-center justify-center">
          <Icon className="w-8 h-8 text-[#3A4A3A]" />
        </div>
        <h3 className="text-2xl font-serif text-[#3A4A3A]">{title}</h3>
        <div className="space-y-2 text-[#5A6A5A]">
          <p className="font-medium">{time}</p>
          <p>{location}</p>
          <p className="text-sm italic">{description}</p>
        </div>
        <button className="mt-4 px-8 py-3 rounded-full border-2 border-[#8B9A8B] text-[#3A4A3A] hover:bg-[#8B9A8B] hover:text-white transition-all duration-300">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
