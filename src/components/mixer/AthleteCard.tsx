import React from 'react';
import { Athlete } from '@/data/mixer';

interface AthleteCardProps {
  athlete: Athlete;
  isFocused: boolean;
  isOnAirFocus: boolean;
  showScores: boolean;
  onClick: () => void;
}

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

const AthleteCard: React.FC<AthleteCardProps> = ({
  athlete, isFocused, isOnAirFocus, showScores, onClick
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={`Спортсмен ${athlete.name}${isFocused ? ', в фокусе' : ''}`}
      aria-pressed={isFocused}
      className={`
        relative w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all duration-150
        min-h-[44px] cursor-pointer
        ${isFocused
          ? 'border-[#2F6BFF] bg-[#EEF3FF]'
          : 'border-transparent bg-white hover:border-[#E2E8F0] hover:shadow-sm'
        }
      `}
    >
      {/* On-Air corner ribbon */}
      {isOnAirFocus && (
        <div className="absolute top-0 right-0 overflow-hidden rounded-tr-xl" style={{ width: 52, height: 52 }}>
          <div className="absolute bg-[#E5263C] text-white text-[7px] font-oswald font-bold tracking-wider"
            style={{
              top: 10, right: -14,
              transform: 'rotate(45deg)',
              padding: '2px 16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}>
            ЭФИР
          </div>
        </div>
      )}

      {/* Bib chip */}
      <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-oswald font-bold text-xs
        ${isFocused ? 'bg-[#2F6BFF] text-white' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
        {athlete.bib}
      </div>

      {/* Avatar */}
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-oswald font-semibold text-xs
        ${isOnAirFocus
          ? 'bg-[#E5263C] text-white ring-2 ring-[#E5263C] ring-offset-1'
          : isFocused
          ? 'bg-[#2F6BFF]/20 text-[#2F6BFF]'
          : 'bg-[#F1F5F9] text-[#64748B]'
        }`}>
        {getInitials(athlete.name)}
      </div>

      {/* Name & club */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-inter font-semibold leading-tight truncate
          ${isFocused ? 'text-[#2F6BFF]' : 'text-[#0F172A]'}`}>
          {athlete.name}
        </p>
        <p className="text-[11px] text-[#64748B] truncate">{athlete.country} · {athlete.club}</p>
      </div>

      {/* Score */}
      {showScores && (
        <div className="shrink-0 text-right">
          <div className={`font-oswald font-bold text-lg leading-none tabular-nums
            ${athlete.score > 0 ? 'text-[#0F172A]' : 'text-[#CBD5E1]'}`}>
            {athlete.score > 0 ? athlete.score.toFixed(2) : '—'}
          </div>
          {athlete.score > 0 && (
            <div className="flex items-center justify-end gap-0.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FB371] inline-block" />
              <span className="text-[9px] text-[#1FB371] font-inter font-medium">scored</span>
            </div>
          )}
        </div>
      )}
    </button>
  );
};

export default AthleteCard;
