export type SceneId = 'black' | 'athletes-table' | 'athlete-focus' | 'all-athletes';

export interface Scene {
  id: SceneId;
  title: string;
  description: string;
  kbd: string;
}

export interface Athlete {
  id: number;
  bib: number;
  name: string;
  country: string;
  club: string;
  score: number;
}

export interface Heat {
  id: number;
  name: string;
  division: string;
  active: boolean;
}

export const SCENES: Scene[] = [
  { id: 'black',          title: 'Чёрный экран',    description: 'Никакая графика не выводится',   kbd: '1' },
  { id: 'athletes-table', title: 'Таблица атлетов', description: 'Список спортсменов с очками',    kbd: '2' },
  { id: 'athlete-focus',  title: 'Фокус на атлете', description: 'Карточка райдера + топ',         kbd: '3' },
  { id: 'all-athletes',   title: 'Все атлеты',      description: 'Список без оценок',              kbd: '4' },
];

export const HEATS: Heat[] = [
  { id: 1, name: "Men's Slopestyle — Final",       division: 'Pro',          active: true  },
  { id: 2, name: "Women's Big Air — Semi-Final",   division: 'Pro',          active: false },
  { id: 3, name: "Men's Big Air — Qualification",  division: 'Amateur',      active: false },
];

export const ATHLETES: Athlete[] = [
  { id: 1, bib: 1,  name: 'Mark McMorris',       country: 'CAN', club: 'Team Canada',     score: 92.40 },
  { id: 2, bib: 7,  name: 'Sébastien Toutant',   country: 'CAN', club: 'Team Canada',     score: 87.50 },
  { id: 3, bib: 3,  name: 'Yuki Kadono',          country: 'JPN', club: 'Team Japan',      score: 84.20 },
  { id: 4, bib: 11, name: 'Sven Thorgren',        country: 'SWE', club: 'Burton Global',   score: 78.60 },
  { id: 5, bib: 5,  name: 'Marcus Kleveland',     country: 'NOR', club: 'Nitro Snowboards', score: 71.30 },
  { id: 6, bib: 9,  name: 'Ryo Aono',             country: 'JPN', club: 'Team Japan',      score: 68.90 },
  { id: 7, bib: 2,  name: 'Torgeir Bergrem',      country: 'NOR', club: 'Lib Tech',        score: 65.10 },
  { id: 8, bib: 14, name: 'Chris Corning',        country: 'USA', club: 'Team USA',        score: 61.80 },
  { id: 9, bib: 6,  name: 'Mons Røisland',        country: 'NOR', club: 'Red Bull Athlethes', score: 60.00 },
  { id: 10, bib: 8, name: 'Scotty James',         country: 'AUS', club: 'Ride Snowboards',  score: 0 },
  { id: 11, bib: 12, name: 'Max Parrot',          country: 'CAN', club: 'Team Canada',     score: 0 },
  { id: 12, bib: 15, name: 'Staale Sandbech',     country: 'NOR', club: 'RØAAS',           score: 0 },
];
