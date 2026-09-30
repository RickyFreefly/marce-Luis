export function DecorativeDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8B9A8B] to-transparent" />
      <div className="w-2 h-2 rotate-45 border border-[#8B9A8B]" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8B9A8B] to-transparent" />
    </div>
  );
}
