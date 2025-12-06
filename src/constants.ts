import { Route, Fish } from './types';

// 항로 정보
export const ROUTES: Record<string, Route> = {
  'yeongil-to-ulleung': {
    id: 'yeongil-to-ulleung',
    name: '영일만항 → 울릉도',
    direction: 'yeongil-to-ulleung',
    totalMinutes: 400,
    maxSessionMinutes: 120,
    description: '영일만항에서 울릉도까지 400분의 항해',
    startLat: 36.0190,
    startLng: 129.3435,
    endLat: 37.4844,
    endLng: 130.9056,
  },
  'ulleung-to-yeongil': {
    id: 'ulleung-to-yeongil',
    name: '울릉도 → 영일만항',
    direction: 'ulleung-to-yeongil',
    totalMinutes: 400,
    maxSessionMinutes: 120,
    description: '울릉도에서 영일만항까지 400분의 항해',
    startLat: 37.4844,
    startLng: 130.9056,
    endLat: 36.0190,
    endLng: 129.3435,
  },
};

// 집중 시간 제한
export const MIN_FOCUS_MINUTES = 15;
export const MAX_FOCUS_MINUTES = 120;
export const ROUTE_TOTAL_MINUTES = 400;

// 티켓 교환
export const POINTS_PER_TICKET = 200;

// 5분 확인 시간 제한
export const CONFIRMATION_TIME_LIMIT = 5 * 60 * 1000; // 5분 (밀리초)
export const LATE_CONFIRMATION_PENALTY = 0.1; // 10%만 인정

// 물고기 종류
export const FISH_TYPES: Fish[] = [
  { id: 'common-1', name: '고등어', rarity: 'common', pointValue: 10 },
  { id: 'common-2', name: '정어리', rarity: 'common', pointValue: 10 },
  { id: 'common-3', name: '멸치', rarity: 'common', pointValue: 10 },
  { id: 'rare-1', name: '방어', rarity: 'rare', pointValue: 30 },
  { id: 'rare-2', name: '참치', rarity: 'rare', pointValue: 30 },
  { id: 'epic-1', name: '광어', rarity: 'epic', pointValue: 50 },
  { id: 'legendary-1', name: '황금 고래', rarity: 'legendary', pointValue: 100 },
];

// 물고기 희귀도별 확률
export const FISH_RARITY_PROBABILITY = {
  common: 0.6,
  rare: 0.25,
  epic: 0.1,
  legendary: 0.05,
};

// 낚시 티켓 직접 획득 확률
export const FISHING_TICKET_PROBABILITY = 0.00003; // 0.003%

// 추첨 상품
export const RAFFLE_PRIZES = [
  {
    name: '크루즈 승선권',
    description: '12월 말 오픈 예정 - 실제 크루즈 항해 체험',
    probability: 1.0, // 100% 당첨 (12월 말 오픈 공지)
  },
];

// localStorage 키
export const STORAGE_KEYS = {
  ROUTE_PROGRESS: 'mindful-cruise-route-progress',
  TICKETS: 'mindful-cruise-tickets',
  POINTS: 'mindful-cruise-points',
  RAFFLE_HISTORY: 'mindful-cruise-raffle-history',
  STATISTICS: 'mindful-cruise-statistics',
  SETTINGS: 'mindful-cruise-settings',
  CURRENT_SESSION: 'mindful-cruise-current-session',
};

// 기본 설정값
export const DEFAULT_SETTINGS = {
  defaultFocusMinutes: 25,
  notificationsEnabled: true,
  darkMode: false,
  fontSize: 'medium' as const,
  onboardingCompleted: false,
};

// 입질 대기 시간 (밀리초)
export const MIN_BITE_WAIT_TIME = 3000; // 3초
export const MAX_BITE_WAIT_TIME = 10000; // 10초
