type FooterTexts = {
  events: string;
  gallery: string;
  instagram: string;
};

type FooterSectionProps = {
  couple: string;
  dateText: string;
  texts?: FooterTexts;
};

const defaultTexts: FooterTexts = {
  events: "Eventos",
  gallery: "Galería",
  instagram: "Instagram",
};

export function FooterSection({
  couple,
  dateText,
  texts,
}: FooterSectionProps) {
  const resolvedTexts = texts ?? defaultTexts;

  return (
    <footer className="py-12 px-4 border-t border-[#8B9A8B]/30">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <p className="text-2xl font-script text-[#3A4A3A]">{couple}</p>

        <p className="text-sm text-[#8B9A8B]">{dateText}</p>

        <div className="flex gap-6 justify-center text-sm text-[#5A6A5A] flex-wrap">
          <a
            href="#events"
            className="hover:text-[#3A4A3A] transition-colors"
          >
            {resolvedTexts.events}
          </a>

          <a
            href="#gallery"
            className="hover:text-[#3A4A3A] transition-colors"
          >
            {resolvedTexts.gallery}
          </a>

          <a
            href="#instagram"
            className="hover:text-[#3A4A3A] transition-colors"
          >
            {resolvedTexts.instagram}
          </a>
        </div>
      </div>
    </footer>
  );
}