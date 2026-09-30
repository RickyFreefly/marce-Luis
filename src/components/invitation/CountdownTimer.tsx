import { useEffect, useState } from "react";

type CountdownTexts = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CountdownTimerProps = {
  targetDate: Date;
  texts?: CountdownTexts;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const defaultTexts: CountdownTexts = {
  days: "Días",
  hours: "Horas",
  minutes: "Min",
  seconds: "Seg",
};

export function CountdownTimer({ targetDate, texts }: CountdownTimerProps) {
  const resolvedTexts = texts ?? defaultTexts;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: resolvedTexts.days, value: timeLeft.days },
    { label: resolvedTexts.hours, value: timeLeft.hours },
    { label: resolvedTexts.minutes, value: timeLeft.minutes },
    { label: resolvedTexts.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className="text-center bg-white/70 border border-[#8B9A8B]/25 rounded-2xl py-8 px-4 shadow-sm"
        >
          <div className="text-4xl lg:text-5xl font-serif text-[#3A4A3A]">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-2 uppercase tracking-widest text-sm text-[#8B9A8B]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}