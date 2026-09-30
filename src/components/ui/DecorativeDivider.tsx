import { Heart } from "lucide-react";

export function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center my-10">
      <div className="h-px w-20 bg-[#8B9A8B]/40" />
      <Heart className="w-4 h-4 text-[#8B9A8B] mx-4 fill-[#8B9A8B]/20" />
      <div className="h-px w-20 bg-[#8B9A8B]/40" />
    </div>
  );
}