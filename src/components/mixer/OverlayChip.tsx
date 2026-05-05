import React from 'react';
import Icon from '@/components/ui/icon';

interface OverlayChipProps {
  label: string;
  icon: string;
  active: boolean;
  locked?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

const OverlayChip: React.FC<OverlayChipProps> = ({
  label, icon, active, locked = false, disabled = false, onToggle
}) => {
  const handleClick = () => {
    if (!disabled && !locked && onToggle) onToggle();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      title={disabled ? 'Сначала выберите сцену' : undefined}
      aria-label={label}
      aria-pressed={active}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-inter font-medium
        transition-all duration-150 select-none min-h-[36px]
        ${disabled
          ? 'opacity-40 cursor-not-allowed border-[#E2E8F0] bg-white text-[#64748B]'
          : locked
          ? 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] cursor-default'
          : active
          ? 'border-[#2F6BFF] bg-[#EEF3FF] text-[#2F6BFF] shadow-sm'
          : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1] hover:text-[#0F172A] cursor-pointer'
        }
      `}
    >
      <Icon name={icon} fallback="Circle" size={13} />
      <span>{label}</span>
      {locked && <Icon name="Lock" size={11} className="opacity-50 ml-0.5" />}
    </button>
  );
};

export default OverlayChip;
