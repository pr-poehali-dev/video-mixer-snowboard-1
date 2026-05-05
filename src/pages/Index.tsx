import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SCENES, HEATS, ATHLETES, SceneId, Heat } from '@/data/mixer';
import OnAirPill from '@/components/mixer/OnAirPill';
import PreviewTile from '@/components/mixer/PreviewTile';
import ScenePickerTile from '@/components/mixer/ScenePickerTile';
import OverlayChip from '@/components/mixer/OverlayChip';
import AthleteCard from '@/components/mixer/AthleteCard';
import HeatDropdown from '@/components/mixer/HeatDropdown';
import HotkeysPopover from '@/components/mixer/HotkeysPopover';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeScene, setActiveScene] = useState<SceneId>('athlete-focus');
  const [focusedAthleteId, setFocusedAthleteId] = useState<number>(2);
  const [showHeatName, setShowHeatName] = useState(true);
  const [showTime, setShowTime] = useState(false);
  const [viewMode, setViewMode] = useState<'schematic' | 'live'>('schematic');
  const [activeHeat, setActiveHeat] = useState<Heat>(HEATS[0]);
  const [hasActiveHeat, setHasActiveHeat] = useState(true);
  const [hotkeysOpen, setHotkeysOpen] = useState(false);
  const hotkeysRef = useRef<HTMLDivElement>(null);

  const isOnAir = activeScene !== 'black' && hasActiveHeat;
  const focusedAthlete = ATHLETES.find(a => a.id === focusedAthleteId) || null;
  const showScores = activeScene === 'athletes-table' || activeScene === 'athlete-focus';
  const focusedAthleteIndex = ATHLETES.findIndex(a => a.id === focusedAthleteId);

  const focusNext = useCallback(() => {
    const next = (focusedAthleteIndex + 1) % ATHLETES.length;
    setFocusedAthleteId(ATHLETES[next].id);
  }, [focusedAthleteIndex]);

  const focusPrev = useCallback(() => {
    const prev = (focusedAthleteIndex - 1 + ATHLETES.length) % ATHLETES.length;
    setFocusedAthleteId(ATHLETES[prev].id);
  }, [focusedAthleteIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key) {
        case '1': setActiveScene('black'); break;
        case '2': setActiveScene('athletes-table'); break;
        case '3': setActiveScene('athlete-focus'); break;
        case '4': setActiveScene('all-athletes'); break;
        case '0': setActiveScene('black'); break;
        case 'ArrowUp': e.preventDefault(); focusPrev(); break;
        case 'ArrowDown': e.preventDefault(); focusNext(); break;
        case 'h': case 'H': setShowHeatName(v => !v); break;
        case 't': case 'T': setShowTime(v => !v); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [focusNext, focusPrev]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (hotkeysRef.current && !hotkeysRef.current.contains(e.target as Node)) {
        setHotkeysOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const overlaysDisabled = !isOnAir;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-inter flex flex-col">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between px-5 py-3 max-w-[1600px] mx-auto">

          {/* Left */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[#2F6BFF] flex items-center justify-center shrink-0">
              <Icon name="Tv" size={14} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-inter font-bold text-[#0F172A] leading-tight tracking-tight">Видеомикшер</div>
              <div className="text-[10px] text-[#64748B] font-inter leading-tight">Бордспорт</div>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Icon name="ChevronRight" size={12} className="text-[#CBD5E1]" />
              <span className="text-xs text-[#94A3B8] font-inter">Snowboard Slopestyle 2026</span>
            </div>
          </div>

          {/* Center */}
          <div className="flex-1 flex justify-center px-4 min-w-0">
            {hasActiveHeat ? (
              <HeatDropdown heats={HEATS} activeHeat={activeHeat} onSelect={setActiveHeat} />
            ) : (
              <span className="text-sm font-inter font-medium text-[#94A3B8]">Нет активного хита</span>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0 relative" ref={hotkeysRef}>
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-inter font-semibold
              ${hasActiveHeat ? 'bg-[#ECFDF5] text-[#1FB371]' : 'bg-[#F1F5F9] text-[#94A3B8]'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${hasActiveHeat ? 'bg-[#1FB371] blink-dot' : 'bg-[#CBD5E1]'}`} />
              {hasActiveHeat ? 'Идёт трансляция' : 'Нет трансляции'}
            </div>

            <button
              onClick={() => setHotkeysOpen(o => !o)}
              aria-label="Горячие клавиши"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[11px] font-inter font-medium text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all"
            >
              <Icon name="Keyboard" size={13} />
              <span className="hidden md:inline">Горячие клавиши</span>
            </button>

            <button
              onClick={() => setHasActiveHeat(v => !v)}
              title={hasActiveHeat ? 'Остановить трансляцию (демо)' : 'Запустить трансляцию (демо)'}
              aria-label="Меню"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all"
            >
              <Icon name="MoreVertical" size={14} />
            </button>

            <HotkeysPopover open={hotkeysOpen} onClose={() => setHotkeysOpen(false)} />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-5 gap-4 flex flex-col">

        {/* ═══ PUBLISH ROW — full width ═══ */}
        <div className="flex items-center gap-3 pb-1 border-b border-[#E2E8F0]">
          <button
            onClick={() => setHasActiveHeat(v => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-inter font-semibold transition-all
              ${hasActiveHeat
                ? 'bg-[#E5263C] text-white hover:bg-[#cc1f32]'
                : 'bg-[#2F6BFF] text-white hover:bg-[#1a56e8]'
              }`}
          >
            {hasActiveHeat
              ? <><span className="w-2 h-2 rounded-full bg-white blink-dot shrink-0" />В эфире</>
              : <><Icon name="Radio" size={14} />Опубликовать</>
            }
          </button>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="w-4 h-4 rounded accent-[#2F6BFF] cursor-pointer" />
            <span className="text-xs font-inter text-[#64748B]">Автопубликация через 5 сек</span>
          </label>
        </div>

        {/* ═══ TWO COLUMNS ═══ */}
        <div className="flex-1 flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_42%] lg:gap-4">

        {/* ═══ SCENE PICKER ═══ */}
        <section className={`flex flex-col gap-4 transition-opacity duration-300 ${!hasActiveHeat ? 'opacity-40 pointer-events-none' : ''}`}>

          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-inter font-bold text-[#0F172A]">Сцена</h2>
            <button aria-label="Справка" className="text-[#CBD5E1] hover:text-[#94A3B8] transition-colors">
              <Icon name="HelpCircle" size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SCENES.map(scene => (
              <ScenePickerTile
                key={scene.id}
                scene={scene}
                isActive={activeScene === scene.id && isOnAir}
                onSelect={setActiveScene}
              />
            ))}
          </div>

          {/* Overlays */}
          <div className={`transition-opacity ${overlaysDisabled ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-[11px] font-inter font-semibold text-[#64748B] uppercase tracking-wider">Дополнительно</h3>
              <span className="text-[10px] text-[#CBD5E1]">· Поверх выбранной сцены</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Tile: Название хита */}
              <button
                onClick={() => setShowHeatName(v => !v)}
                aria-pressed={showHeatName}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-[14px] border-2 transition-all duration-150 tile-hover
                  ${showHeatName ? 'border-[#2F6BFF] bg-[#EEF3FF]' : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'}`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon name="Flag" size={14} className={showHeatName ? 'text-[#2F6BFF]' : 'text-[#94A3B8]'} />
                  <p className={`text-xs font-inter font-semibold leading-tight ${showHeatName ? 'text-[#2F6BFF]' : 'text-[#0F172A]'}`}>Название хита</p>
                </div>
                <div className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200
                  ${showHeatName ? 'bg-[#2F6BFF]' : 'bg-[#CBD5E1]'}`}>
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200
                    ${showHeatName ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </button>
              {/* Tile: Время */}
              <button
                onClick={() => setShowTime(v => !v)}
                aria-pressed={showTime}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-[14px] border-2 transition-all duration-150 tile-hover
                  ${showTime ? 'border-[#2F6BFF] bg-[#EEF3FF]' : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'}`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon name="Clock" size={14} className={showTime ? 'text-[#2F6BFF]' : 'text-[#94A3B8]'} />
                  <p className={`text-xs font-inter font-semibold leading-tight ${showTime ? 'text-[#2F6BFF]' : 'text-[#0F172A]'}`}>Время</p>
                </div>
                <div className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200
                  ${showTime ? 'bg-[#2F6BFF]' : 'bg-[#CBD5E1]'}`}>
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200
                    ${showTime ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </button>
              {/* Tile: Реклама */}
              <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-[14px] border-2 border-[#2F6BFF] bg-[#EEF3FF] opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-1.5">
                  <Icon name="Megaphone" size={14} className="text-[#2F6BFF]" />
                  <p className="text-xs font-inter font-semibold leading-tight text-[#2F6BFF]">Реклама</p>
                </div>
                <div className="relative inline-flex h-5 w-9 shrink-0 rounded-full bg-[#2F6BFF]">
                  <span className="inline-block h-4 w-4 rounded-full bg-white shadow-sm translate-x-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ ATHLETES + PREVIEW ═══ */}
        <section className={`flex flex-col gap-4 transition-opacity duration-300 ${!hasActiveHeat ? 'opacity-40 pointer-events-none' : ''}`}>

          {/* Preview block */}
          <div className="flex flex-col gap-3">
            <PreviewTile
              scene={isOnAir ? activeScene : null}
              focusedAthlete={focusedAthlete}
              showHeatName={showHeatName}
              showTime={showTime}
              heatName={activeHeat.name}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            {!hasActiveHeat && (
              <div className="flex flex-col items-center gap-2 py-4 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-1">
                  <Icon name="MonitorOff" size={20} className="text-[#94A3B8]" />
                </div>
                <p className="text-sm font-inter font-semibold text-[#64748B]">Нет активного хита</p>
                <p className="text-[11px] text-[#94A3B8] max-w-[200px] leading-relaxed text-center">
                  Запустите заезд, чтобы начать управление трансляцией
                </p>
                <button
                  onClick={() => setHasActiveHeat(true)}
                  className="mt-2 px-4 py-2 rounded-lg bg-[#2F6BFF] text-white text-xs font-inter font-semibold hover:bg-[#1a56e8] transition-colors"
                >
                  Запустить хит
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-inter font-bold text-[#0F172A]">Спортсмены</h2>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#F1F5F9] text-[10px] font-inter font-bold text-[#64748B]">
              {ATHLETES.length}
            </span>
            {hasActiveHeat && (
              <div className="flex items-center gap-1 ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FB371] blink-dot" />
                <span className="text-[10px] font-inter text-[#1FB371] font-medium">live</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-240px)] pr-0.5">
            {ATHLETES.map(athlete => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                isFocused={focusedAthleteId === athlete.id}
                isOnAirFocus={focusedAthleteId === athlete.id && activeScene === 'athlete-focus' && isOnAir}
                showScores={showScores}
                onClick={() => setFocusedAthleteId(athlete.id)}
              />
            ))}
          </div>

          <div className="flex gap-2 pt-1 shrink-0">
            <button
              onClick={() => setFocusedAthleteId(ATHLETES[0].id)}
              aria-label="Сбросить фокус"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-inter font-medium text-[#64748B] hover:border-[#CBD5E1] hover:text-[#0F172A] transition-all min-h-[44px]"
            >
              <Icon name="X" size={12} />
              Сбросить фокус
            </button>
            <button
              onClick={focusNext}
              aria-label="Следующий атлет"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-inter font-medium text-[#64748B] hover:border-[#CBD5E1] hover:text-[#0F172A] transition-all min-h-[44px]"
            >
              Следующий
              <Icon name="ArrowDown" size={12} />
            </button>
          </div>
        </section>
        </div>
      </main>

      {/* FAB — mobile only */}
      {hasActiveHeat && (
        <button
          onClick={() => setActiveScene('black')}
          aria-label="Убрать из эфира"
          className="fixed bottom-5 right-5 z-50 lg:hidden w-14 h-14 rounded-full bg-[#E5263C] text-white shadow-xl flex items-center justify-center hover:bg-[#cc1f32] active:scale-95 transition-all"
        >
          <Icon name="MonitorOff" size={20} />
        </button>
      )}
    </div>
  );
}