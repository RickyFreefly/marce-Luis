import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { SectionContainer } from "../ui/SectionContainer";

type InstagramSectionTexts = {
  title: string;
  description: string;
};

type InstagramSectionProps = {
  texts?: InstagramSectionTexts;
  hashtag?: string;
};

const defaultTexts: InstagramSectionTexts = {
  title: "Comparte este momento",
  description:
    "Comparte tus fotos y videos del gran día usando nuestro hashtag y etiquétanos para revivir juntos cada momento.",
};

export function InstagramSection({
  texts,
  hashtag = "#MarceYLuis",
}: InstagramSectionProps) {
  const marceLink = "https://www.instagram.com/judymoreno615";
  const luisLink = "https://www.instagram.com/luis.gonar";

  const resolvedTexts = texts ?? defaultTexts;

  return (
    <SectionContainer className="bg-white/50" narrow id="instagram">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6 text-center"
      >
        <Instagram className="w-16 h-16 text-[#8B9A8B] mx-auto" />

        <h2 className="text-4xl lg:text-5xl font-script text-[#3A4A3A]">
          {resolvedTexts.title}
        </h2>

        <p className="text-2xl font-serif text-[#3A4A3A]">{hashtag}</p>

        <p className="text-lg text-[#5A6A5A] max-w-md mx-auto leading-relaxed">
          {resolvedTexts.description}
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={marceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#8B9A8B] text-white hover:bg-[#3A4A3A] transition-all duration-300"
          >
            @judymoreno615
          </a>

          <a
            href={luisLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#8B9A8B] text-white hover:bg-[#3A4A3A] transition-all duration-300"
          >
            @luis.gonar
          </a>
        </div>
      </motion.div>
    </SectionContainer>
  );
}