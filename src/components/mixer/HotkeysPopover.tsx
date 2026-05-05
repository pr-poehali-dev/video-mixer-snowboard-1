import React from 'react';
import Icon from '@/components/ui/icon';

interface HotkeysPopoverProps {
  open: boolean;
  onClose: () => void;
}

const keys = [
  { kbd: '1', label: 'Чёрный экран' },
  { kbd: '2', label: 'Таблица атлетов' },
  { kbd: '3', label: 'Фокус на атлете' },
  { kbd: '4', label: 'Все атлеты' },
  { kbd: '↑ ↓', label: 'Переключить атлета' },
  { kbd: '0', label: 'Вне эфира' },
  { kbd: 'H', label: 'Название хита' },
  { kbd: 'T', label: 'Время' },
];

const HotkeysPopover: React.FC<HotkeysPopoverProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl border border-[#E2E8F0] shadow-lg z-50 animate-scale-in overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0]">
        <span className="text-sm font-inter font-semibold text-[#0F172A]">Горячие клавиши</span>
        <button onClick={onClose} aria-label="Закрыть" className="text-[#64748B] hover:text-[#0F172A] transition-colors">
          <Icon name="X" size={14} />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1">
        {keys.map(k => (
          <div key={k.kbd} className="flex items-center justify-between py-1 px-1">
            <span className="text-xs font-inter text-[#64748B]">{k.label}</span>
            <kbd className="px-2 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-inter font-semibold text-[#0F172A] font-mono">
              {k.kbd}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotkeysPopover;
