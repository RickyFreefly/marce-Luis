import { motion } from "motion/react";
import { Calendar, Heart } from "lucide-react";

type HeroSectionTexts = {
  topLabel: string;
  invitationLine: string;
  marriageLine?: string;
  rootTitle: string;
  rootSubtitle: string;
  phonePlaceholder: string;
  submitLabel: string;
  imageAlt: string;
  reservedMessageTitle: string;
  reservedMessageBody: string;
  reservedMessageNote: string;
};

type HeroSectionProps = {
  heroImage: string;
  couple: string;
  dateText: string;
  quote: string;
  quoteAuthor: string;
  isRootAccess?: boolean;
  guestName?: string;
  phoneInput?: string;
  accessError?: string;
  texts?: HeroSectionTexts;
  onPhoneChange?: (value: string) => void;
  onAccessSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const defaultTexts: HeroSectionTexts = {
  topLabel: " ",
  invitationLine: "te invitan a ser parte",
  marriageLine: "de la celebración de su matrimonio",
  rootTitle: "Eres parte de los nuestros",
  rootSubtitle: "Gracias por estar aquí hoy.",
  phonePlaceholder: "Ingresa tu número de teléfono sin indicativo",
  submitLabel: "Ver mi invitación",
  imageAlt: "Wedding couple",
  reservedMessageTitle: "Esta invitación es para ti",
  reservedMessageBody:
    "Con mucho cariño, esta invitación ha sido pensada especialmente para ti, porque haces parte de este momento único. ",
  reservedMessageNote:
    "Es personal y válida únicamente para las personas aquí mencionadas.",
};

export function HeroSection({
  heroImage,
  couple,
  dateText,
  quote,
  quoteAuthor,
  isRootAccess = false,
  guestName = "",
  phoneInput = "",
  accessError = "",
  texts,
  onPhoneChange,
  onAccessSubmit,
}: HeroSectionProps) {
  const resolvedTexts = texts ?? defaultTexts;

  return (
    <section
      className={`flex flex-col lg:flex-row ${
        isRootAccess ? "min-h-screen" : "min-h-[auto]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`lg:w-1/2 ${
          isRootAccess
            ? "h-[34vh] sm:h-[38vh] md:h-[42vh] lg:h-screen"
            : "h-[30vh] sm:h-[34vh] md:h-[38vh] lg:h-screen"
        }`}
      >
        <img
          src={heroImage}
          alt={resolvedTexts.imageAlt}
          className="w-full h-full object-cover object-[center_15%]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className={`
          lg:w-1/2
          flex justify-center
          px-4 sm:px-6 lg:p-16
          ${
            isRootAccess
              ? "flex-1 items-start pt-3 pb-6 sm:pt-5 sm:pb-8"
              : "items-start py-4 sm:py-6"
          }
        `}
      >
        <div className="max-w-xl w-full">
          <div
            className="
              border border-[#8B9A8B]/30
              rounded-[22px] sm:rounded-[24px]
              p-4 sm:p-6 lg:p-12
              bg-white/72
              backdrop-blur-sm
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            "
          >
            <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex items-center justify-center mb-1 sm:mb-2 lg:mb-6">
                <div className="h-px w-10 sm:w-14 lg:w-16 bg-[#8B9A8B]" />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B9A8B] mx-3 sm:mx-4" />
                <div className="h-px w-10 sm:w-14 lg:w-16 bg-[#8B9A8B]" />
              </div>

              <p className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.18em] sm:tracking-widest text-[#8B9A8B]">
                {resolvedTexts.topLabel}
              </p>

              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-[2.7rem] leading-none sm:text-6xl lg:text-7xl font-script text-[#3A4A3A]">
                  {couple}
                </h1>
                <p className="text-sm sm:text-base lg:text-xl text-[#5A6A5A]">
                  {resolvedTexts.invitationLine}
                </p>
              </div>

              <div className="py-1 sm:py-2 lg:py-5">
                <p className="text-sm sm:text-base lg:text-lg text-[#5A6A5A]">
                  {resolvedTexts.marriageLine}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#3A4A3A]">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-base sm:text-lg lg:text-xl font-serif">
                  {dateText}
                </p>
              </div>

              {isRootAccess ? (
                <div className="pt-3 sm:pt-4 border-t border-[#8B9A8B]/25 mt-2 sm:mt-3">
                  <div className="space-y-3">
                    <div>
                      <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-serif text-[#4C5844] leading-tight">
                        {resolvedTexts.rootTitle}
                      </p>
                      <p className="text-[14px] sm:text-[15px] lg:text-[18px] text-[#6A7462] mt-1">
                        {resolvedTexts.rootSubtitle}
                      </p>
                    </div>

                    <form
                      onSubmit={onAccessSubmit}
                      className="flex flex-col gap-2.5 sm:gap-3"
                    >
                      <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder={resolvedTexts.phonePlaceholder}
                        value={phoneInput}
                        onChange={(e) => onPhoneChange?.(e.target.value)}
                        className="
                          w-full rounded-[14px]
                          border border-[#8B9A8B]/30
                          bg-white/85
                          px-4 py-3
                          text-[15px] sm:text-[16px]
                          text-[#3A4A3A]
                          outline-none
                          placeholder:text-[#8A9183]
                          focus:border-[#8B9A8B]
                          focus:ring-4 focus:ring-[#8B9A8B]/10
                        "
                      />

                      <button
                        type="submit"
                        className="
                          w-full rounded-[14px]
                          bg-[#7E866F]
                          px-4 py-3
                          text-[15px] sm:text-[16px]
                          text-white
                          shadow-[0_10px_20px_rgba(126,134,111,0.22)]
                          transition-all duration-300
                          hover:bg-[#707965]
                          active:scale-[0.99]
                        "
                      >
                        {resolvedTexts.submitLabel}
                      </button>

                      {accessError ? (
                        <p className="text-[13px] sm:text-[14px] text-[#A25555] leading-snug">
                          {accessError}
                        </p>
                      ) : null}
                    </form>
                  </div>
                </div>
              ) : (
                <div className="pt-3 sm:pt-4 lg:pt-6 border-t border-[#8B9A8B]/25 mt-2 sm:mt-4 lg:mt-8">
                  <p className="text-[13px] sm:text-sm italic leading-relaxed text-[#5A6A5A] px-2 sm:px-4">
                    "{quote}"
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#8B9A8B] mt-2">
                    — {quoteAuthor}
                  </p>
                </div>
              )}
            </div>
          </div>

          {!isRootAccess && guestName && (
            <div className="flex justify-center pt-3 sm:pt-4">
                <div
                  className="
                    w-full
                    max-w-xl
                    text-center
                    px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10
                    rounded-[22px] sm:rounded-[24px]
                    bg-white/80
                    backdrop-blur-md
                    border border-white/60
                    shadow-[0_12px_30px_rgba(80,80,60,0.08)]
                  "
                >
                <p className="font-serif text-[24px] sm:text-[30px] text-[#4C5844] leading-none mb-3">
                  {guestName}
                </p>

                <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#4C5844] leading-relaxed">
                  {resolvedTexts.reservedMessageBody}
                </p>

                <p className="text-[15px] sm:text-[16px] text-[#4C5844] mt-3 leading-relaxed">
                  {resolvedTexts.reservedMessageNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}