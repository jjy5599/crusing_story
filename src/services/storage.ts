import { STORAGE_KEYS, DEFAULT_SETTINGS, ROUTES } from '../constants';
import type {
  RouteProgress,
  Ticket,
  Point,
  RaffleHistory,
  Statistics,
  UserSettings,
  FocusSession,
} from '../types';

// localStorage에 데이터 저장
function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save to localStorage (${key}):`, error);
    // 저장 공간 부족 시 경고
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('저장 공간이 부족합니다. 일부 데이터를 정리해주세요.');
    }
  }
}

// localStorage에서 데이터 로드
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to load from localStorage (${key}):`, error);
    return defaultValue;
  }
}

// 항로 진행도 저장
export function saveRouteProgress(progress: RouteProgress): void {
  saveToStorage(STORAGE_KEYS.ROUTE_PROGRESS, progress);
}

// 항로 진행도 로드
export function loadRouteProgress(): RouteProgress {
  return loadFromStorage<RouteProgress>(STORAGE_KEYS.ROUTE_PROGRESS, {
    routeId: ROUTES['yeongil-to-ulleung'].id,
    direction: 'yeongil-to-ulleung',
    accumulatedMinutes: 0,
    lastUpdated: Date.now(),
  });
}

// 티켓 저장
export function saveTickets(tickets: Ticket): void {
  saveToStorage(STORAGE_KEYS.TICKETS, tickets);
}

// 티켓 로드
export function loadTickets(): Ticket {
  return loadFromStorage<Ticket>(STORAGE_KEYS.TICKETS, { count: 0 });
}

// 포인트 저장
export function savePoints(points: Point): void {
  saveToStorage(STORAGE_KEYS.POINTS, points);
}

// 포인트 로드
export function loadPoints(): Point {
  return loadFromStorage<Point>(STORAGE_KEYS.POINTS, { value: 0 });
}

// 추첨 이력 저장
export function saveRaffleHistory(history: RaffleHistory): void {
  saveToStorage(STORAGE_KEYS.RAFFLE_HISTORY, history);
}

// 추첨 이력 로드
export function loadRaffleHistory(): RaffleHistory {
  return loadFromStorage<RaffleHistory>(STORAGE_KEYS.RAFFLE_HISTORY, { results: [] });
}

// 통계 저장
export function saveStatistics(statistics: Statistics): void {
  saveToStorage(STORAGE_KEYS.STATISTICS, statistics);
}

// 통계 로드
export function loadStatistics(): Statistics {
  return loadFromStorage<Statistics>(STORAGE_KEYS.STATISTICS, {
    totalFocusMinutes: 0,
    totalCompletedRoutes: 0,
    totalTicketsEarned: 0,
    currentStreak: 0,
    dailyFocusMinutes: {},
  });
}

// 사용자 설정 저장
export function saveSettings(settings: UserSettings): void {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
}

// 사용자 설정 로드
export function loadSettings(): UserSettings {
  return loadFromStorage<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

// 현재 세션 저장
export function saveCurrentSession(session: FocusSession | null): void {
  if (session) {
    saveToStorage(STORAGE_KEYS.CURRENT_SESSION, session);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  }
}

// 현재 세션 로드
export function loadCurrentSession(): FocusSession | null {
  return loadFromStorage<FocusSession | null>(STORAGE_KEYS.CURRENT_SESSION, null);
}

// 모든 데이터 초기화
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
