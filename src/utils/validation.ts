import { MIN_FOCUS_MINUTES, MAX_FOCUS_MINUTES, ROUTE_TOTAL_MINUTES } from '../constants';

// 집중 시간 유효성 검증
export function validateFocusMinutes(minutes: number): boolean {
  return minutes >= MIN_FOCUS_MINUTES && minutes <= MAX_FOCUS_MINUTES;
}

// 항로 진행도 유효성 검증
export function validateRouteProgress(minutes: number): boolean {
  return minutes >= 0 && minutes <= ROUTE_TOTAL_MINUTES;
}

// 티켓 개수 유효성 검증
export function validateTicketCount(count: number): boolean {
  return count >= 0 && Number.isInteger(count);
}

// 포인트 유효성 검증
export function validatePoints(points: number): boolean {
  return points >= 0 && Number.isInteger(points);
}
