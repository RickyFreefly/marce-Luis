import { DecorativeDivider } from "../ui/DecorativeDivider";
import { SectionContainer } from "../ui/SectionContainer";
import { SectionTitle } from "../ui/SectionTitle";
import { CountdownTimer } from "./CountdownTimer";

type CountdownTexts = {
  title: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CountdownSectionProps = {
  targetDate: Date;
  texts?: CountdownTexts;
};

const defaultTexts: CountdownTexts = {
  title: "Contando los días",
  days: "días",
  hours: "horas",
  minutes: "minutos",
  seconds: "segundos",
};

export function CountdownSection({
  targetDate,
  texts,
}: CountdownSectionProps) {
  const resolvedTexts = texts ?? defaultTexts;

  return (
    <SectionContainer className="bg-white/50" id="countdown">
      <DecorativeDivider />
      <SectionTitle title={resolvedTexts.title} />
      <CountdownTimer
        targetDate={targetDate}
        texts={{
          days: resolvedTexts.days,
          hours: resolvedTexts.hours,
          minutes: resolvedTexts.minutes,
          seconds: resolvedTexts.seconds,
        }}
      />
      <DecorativeDivider />
    </SectionContainer>
  );
}