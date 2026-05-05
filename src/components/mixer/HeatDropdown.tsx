import React, { useState, useRef, useEffect } from 'react';
import { Heat } from '@/data/mixer';
import Icon from '@/components/ui/icon';

interface HeatDropdownProps {
  heats: Heat[];
  activeHeat: Heat;
  onSelect: (heat: Heat) => void;
}

const HeatDropdown: React.FC<HeatDropdownProps> = ({ heats, activeHeat, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const multipleHeats = heats.length > 1;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => multipleHeats && setOpen(o => !o)}
        aria-label="Выбор хита"
        aria-haspopup={multipleHeats}
        aria-expanded={open}
        className={`flex items-center gap-1.5 text-sm font-inter font-semibold text-[#0F172A]
          ${multipleHeats ? 'cursor-pointer hover:text-[#2F6BFF] transition-colors' : 'cursor-default'}`}
      >
        <span>Хит: {activeHeat.name}</span>
        {multipleHeats && (
          <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-[#64748B]" />
        )}
      </button>

      {open && multipleHeats && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[280px] bg-white rounded-xl border border-[#E2E8F0] shadow-lg z-50 animate-scale-in overflow-hidden">
          {heats.map(h => (
            <button
              key={h.id}
              onClick={() => { onSelect(h); setOpen(false); }}
              aria-label={h.name}
              className={`w-full text-left flex items-center justify-between px-4 py-3 text-sm font-inter transition-colors
                ${h.id === activeHeat.id
                  ? 'bg-[#EEF3FF] text-[#2F6BFF] font-semibold'
                  : 'text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
            >
              <span>{h.name}</span>
              <span className="text-xs text-[#64748B] ml-3">{h.division}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeatDropdown;
