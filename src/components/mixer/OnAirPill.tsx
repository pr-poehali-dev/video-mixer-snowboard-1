import React from 'react';

interface OnAirPillProps {
  isOnAir: boolean;
  large?: boolean;
}

const OnAirPill: React.FC<OnAirPillProps> = ({ isOnAir, large = false }) => {
  if (isOnAir) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full font-inter font-semibold tracking-wide
          bg-[#E5263C] text-white
          ${large ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs'}`}
        aria-label="В эфире"
      >
        <span className="w-2 h-2 rounded-full bg-white blink-dot inline-block" />
        В ЭФИРЕ
      </div>
    );
  }
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-inter font-medium tracking-wide
        bg-[#F1F5F9] text-[#64748B]
        ${large ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs'}`}
      aria-label="Вне эфира"
    >
      <span className="w-2 h-2 rounded-full bg-[#94A3B8] inline-block" />
      ВНЕ ЭФИРА
    </div>
  );
};

export default OnAirPill;
