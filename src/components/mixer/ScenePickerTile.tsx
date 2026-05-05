import React from 'react';
import { Scene, SceneId } from '@/data/mixer';
import OnAirPill from './OnAirPill';

interface ScenePickerTileProps {
  scene: Scene;
  isActive: boolean;
  onSelect: (id: SceneId) => void;
}

const MiniPreview: React.FC<{ id: SceneId }> = ({ id }) => {
  const base = "w-full rounded overflow-hidden bg-[#0D1117] relative";
  return (
    <div className={base} style={{ aspectRatio: '16/9' }}>
      {id === 'black' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/8" />
        </div>
      )}
      {id === 'athletes-table' && (
        <div className="absolute inset-0 p-1.5 flex flex-col gap-0.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-1 h-2.5">
              <div className="w-2.5 h-2.5 rounded bg-white/10" />
              <div className="flex-1 h-1 bg-white/10 rounded-full" />
              <div className="w-4 h-1 bg-[#2F6BFF]/40 rounded-full" />
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#2F6BFF]/25" />
        </div>
      )}
      {id === 'athlete-focus' && (
        <div className="absolute inset-0 flex items-stretch">
          <div className="flex-1 p-1 flex flex-col gap-0.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-0.5 items-center h-2">
                <div className="w-2 h-2 rounded-sm bg-white/8" />
                <div className="flex-1 h-1 bg-white/8 rounded-full" />
              </div>
            ))}
          </div>
          <div className="w-[40%] m-1 bg-white/8 rounded flex flex-col items-center justify-center gap-0.5">
            <div className="w-4 h-4 rounded-full bg-[#2F6BFF]/50" />
            <div className="w-6 h-0.5 bg-white/20 rounded" />
            <div className="w-4 h-1 bg-[#2F6BFF]/40 rounded" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#2F6BFF]/25" />
        </div>
      )}
      {id === 'all-athletes' && (
        <div className="absolute inset-0 p-1.5 flex flex-col gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-1 h-2">
              <div className="w-2 h-2 rounded-sm bg-white/10" />
              <div className="flex-1 h-1 bg-white/10 rounded-full" />
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#2F6BFF]/25" />
        </div>
      )}
    </div>
  );
};

const ScenePickerTile: React.FC<ScenePickerTileProps> = ({ scene, isActive, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(scene.id)}
      aria-label={`Сцена: ${scene.title}`}
      aria-pressed={isActive}
      className={`
        relative w-full text-left p-3 rounded-[14px] border-2 transition-all duration-150 tile-hover
        ${isActive
          ? 'border-[#2F6BFF] bg-[#EEF3FF] shadow-sm'
          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
        }
      `}
    >
      {/* On Air tag */}
      {isActive && (
        <div className="absolute top-2 left-2 z-10">
          <OnAirPill isOnAir={true} />
        </div>
      )}

      {/* Kbd chip */}
      <div className={`absolute top-2 right-2 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-inter font-semibold
        ${isActive ? 'bg-[#2F6BFF] text-white' : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'}`}>
        {scene.kbd}
      </div>

      {/* Mini preview */}
      <div className="mt-5 mb-2.5">
        <MiniPreview id={scene.id} />
      </div>

      {/* Text */}
      <div className="mt-2">
        <p className={`text-sm font-inter font-semibold leading-tight
          ${isActive ? 'text-[#2F6BFF]' : 'text-[#0F172A]'}`}>
          {scene.title}
        </p>
        <p className="text-xs text-[#64748B] mt-0.5 leading-tight">{scene.description}</p>
      </div>
    </button>
  );
};

export default ScenePickerTile;
