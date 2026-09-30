import { ReactNode } from "react";
import clsx from "clsx";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  narrow?: boolean;
};

export function SectionContainer({
  children,
  className = "",
  id,
  narrow = false,
}: SectionContainerProps) {
  return (
    <section id={id} className={clsx("py-20 px-4", className)}>
      <div className={clsx("mx-auto", narrow ? "max-w-3xl" : "max-w-6xl")}>
        {children}
      </div>
    </section>
  );
}