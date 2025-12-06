// 항로 방향
export type RouteDirection = 'yeongil-to-ulleung' | 'ulleung-to-yeongil';

// 항로 정보
export interface Route {
  id: string;
  name: string;
  direction: RouteDirection;
  totalMinutes: number; // 400분
  maxSessionMinutes: number; // 120분
  description: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

// 항로 진행도
export interface RouteProgress {
  routeId: string;
  direction: RouteDirection;
  accumulatedMinutes: number; // 누적 집중 시간 (최대 400분)
  lastUpdated: number; // 타임스탬프
}

// 집중 세션
export interface FocusSession {
  id: string;
  startTime: number;
  plannedMinutes: number; // 설정한 시간 (최대 120분)
  completedMinutes: number; // 실제 완료한 시간
  isCompleted: boolean;
  confirmedAt?: number; // 확인 시간
  recognizedMinutes: number; // 인정된 시간 (5분 지연 페널티 적용)
}

// 티켓
export interface Ticket {
  count: number;
}

// 포인트
export interface Point {
  value: number;
}

// 물고기
export interface Fish {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  pointValue: number;
}

// 추첨 결과
export interface RaffleResult {
  id: string;
  timestamp: number;
  isWin: boolean;
  prize?: {
    name: string;
    description: string;
    imageUrl?: string;
  };
}

// 추첨 이력
export interface RaffleHistory {
  results: RaffleResult[];
}

// 통계 데이터
export interface Statistics {
  totalFocusMinutes: number;
  totalCompletedRoutes: number;
  totalTicketsEarned: number;
  currentStreak: number; // 연속 달성 일수
  lastFocusDate?: number;
  dailyFocusMinutes: { [date: string]: number };
}

// 사용자 설정
export interface UserSettings {
  defaultFocusMinutes: number; // 기본 집중 시간
  notificationsEnabled: boolean;
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  onboardingCompleted: boolean;
}

// 전체 앱 상태
export interface AppState {
  currentRoute: RouteDirection;
  routeProgress: RouteProgress;
  tickets: Ticket;
  points: Point;
  raffleHistory: RaffleHistory;
  statistics: Statistics;
  settings: UserSettings;
  currentSession?: FocusSession;
}

// 화면 상태
export type Screen = 'home' | 'focus' | 'fishing' | 'raffle' | 'arrival' | 'statistics' | 'settings';

// 낚시 게임 상태
export interface FishingState {
  isFishing: boolean;
  fishingStartTime?: number;
  caughtFish?: Fish;
  isWaitingForBite: boolean;
  biteTime?: number;
}
