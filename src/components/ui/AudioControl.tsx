import { useEffect, useRef, useState } from "react";

type AudioControlProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export function AudioControl({ isPlaying, onToggle }: AudioControlProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const scheduleCollapse = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsExpanded(false);
    }, 3000);
  };

  useEffect(() => {
    scheduleCollapse();

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    onToggle();
    setIsExpanded(true);
    scheduleCollapse();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed top-6 right-4 z-50
        flex items-center rounded-full
        py-2
        bg-white/60
        backdrop-blur-lg
        border border-white/50
        text-[#2f2f2f]
        shadow-[0_8px_20px_rgba(0,0,0,0.18)]
        transition-all duration-500 ease-in-out
        hover:bg-white/70
        active:scale-95
        ${isExpanded ? "px-4" : "px-3"}
      `}
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      <span className="text-lg shrink-0">🎧</span>

      <span
        className={`
          overflow-hidden whitespace-nowrap text-sm font-medium
          transition-all duration-500 ease-in-out
          ${isExpanded ? "max-w-[170px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}
        `}
      >
        {isPlaying ? "Pausar música" : "Reproducir música"}
      </span>
    </button>
  );
}