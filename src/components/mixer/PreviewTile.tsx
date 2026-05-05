import React from 'react';
import { SceneId } from '@/data/mixer';
import { Athlete } from '@/data/mixer';
import Icon from '@/components/ui/icon';

interface PreviewTileProps {
  scene: SceneId | null;
  focusedAthlete: Athlete | null;
  showHeatName: boolean;
  showTime: boolean;
  heatName: string;
  viewMode: 'schematic' | 'live';
  onViewModeChange: (mode: 'schematic' | 'live') => void;
}

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

const PreviewSchematic: React.FC<{ scene: SceneId | null; athlete: Athlete | null; showHeatName: boolean; showTime: boolean; heatName: string }> = ({
  scene, athlete, showHeatName, showTime, heatName
}) => {
  const isEmpty = !scene || scene === 'black';

  return (
    <div className="absolute inset-0 flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top heat strip */}
      {(showHeatName || showTime) && !isEmpty && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 text-white text-[10px] font-medium z-10 shrink-0">
          {showHeatName && (
            <span className="flex items-center gap-1 opacity-90">
              <Icon name="Flag" size={10} />
              {heatName}
            </span>
          )}
          {showTime && (
            <span className="flex items-center gap-1 opacity-70 ml-auto">
              <Icon name="Clock" size={10} />
              02:14
            </span>
          )}
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Scene: athletes table — Block A */}
        {(scene === 'athletes-table' || scene === 'all-athletes') && (
          <div className="absolute left-2 top-2 bottom-2 w-[58%] bg-white/8 border border-white/10 rounded-md overflow-hidden">
            <div className="px-2 py-1.5 bg-white/5 text-white/50 text-[8px] font-medium uppercase tracking-wider border-b border-white/10">
              Таблица спортсменов
            </div>
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center gap-1.5 px-2 py-1 border-b border-white/5">
                <div className="w-4 h-4 rounded bg-white/10 text-[7px] text-white/40 flex items-center justify-center font-oswald">{i}</div>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full" />
                {scene === 'athletes-table' && (
                  <div className="w-6 h-1.5 bg-[#2F6BFF]/40 rounded-full" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Scene: athlete focus — Block B */}
        {scene === 'athlete-focus' && athlete && (
          <div className="absolute right-2 top-2 bottom-8 w-[44%] bg-white/8 border border-white/10 rounded-md overflow-hidden flex flex-col items-center justify-center gap-2 p-3">
            <div className="w-10 h-10 rounded-full bg-[#2F6BFF]/60 flex items-center justify-center">
              <span className="font-oswald text-white text-sm font-semibold">{getInitials(athlete.name)}</span>
            </div>
            <div className="text-center">
              <div className="text-white/80 text-[8px] font-medium leading-tight">{athlete.name}</div>
              <div className="font-oswald text-[#2F6BFF] text-lg font-bold mt-0.5">{athlete.score.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Black screen */}
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/15 text-xs font-inter font-medium tracking-widest uppercase">Нет вывода</div>
          </div>
        )}
      </div>

      {/* ADW sponsor strip — always */}
      <div className="shrink-0 h-5 bg-[#2F6BFF]/30 border-t border-[#2F6BFF]/40 flex items-center px-3 gap-2">
        <div className="text-[#2F6BFF] text-[8px] font-oswald font-bold tracking-wider opacity-80">ADW SPONSOR</div>
        <div className="flex-1 h-0.5 bg-[#2F6BFF]/20 rounded" />
        <div className="text-[8px] text-white/20">▶ AD</div>
      </div>
    </div>
  );
};

const PreviewTile: React.FC<PreviewTileProps> = ({
  scene, focusedAthlete, showHeatName, showTime, heatName, viewMode, onViewModeChange
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* View mode toggle */}
      <div className="flex items-center justify-end">
        <div className="flex items-center bg-[#F1F5F9] rounded-lg p-0.5 border border-[#E2E8F0]">
          {(['schematic', 'live'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-3 py-1 text-xs font-inter font-medium rounded-md transition-all duration-150
                ${viewMode === mode
                  ? 'bg-white text-[#0F172A] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'}`}
              aria-label={mode === 'schematic' ? 'Схема' : 'Прямой эфир'}
            >
              {mode === 'schematic' ? 'Schematic' : 'Live'}
            </button>
          ))}
        </div>
      </div>

      {/* Preview surface */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: '16/9', background: 'var(--clr-preview-bg)' }}
        aria-label="Предпросмотр трансляции"
      >
        {/* Vignette */}
        <div className="preview-vignette absolute inset-0 z-20 pointer-events-none" />

        {viewMode === 'schematic' ? (
          <PreviewSchematic
            scene={scene}
            athlete={focusedAthlete}
            showHeatName={showHeatName}
            showTime={showTime}
            heatName={heatName}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-xs font-inter text-center tracking-wider">
              <Icon name="Monitor" size={28} className="mx-auto mb-2 opacity-30" />
              LIVE FEED PLACEHOLDER
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <p className="text-xs text-[#64748B] font-inter text-center">
        Хит: Men's Slopestyle Final • Дивизион: Pro
      </p>
    </div>
  );
};

export default PreviewTile;
