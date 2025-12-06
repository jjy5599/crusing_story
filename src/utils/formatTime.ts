// 분을 "MM:SS" 형식으로 변환
export function formatMinutesAndSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 분을 "N분" 형식으로 변환
export function formatMinutes(minutes: number): string {
  return `${minutes}분`;
}

// 분을 "N시간 M분" 형식으로 변환
export function formatHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}분`;
  }

  if (remainingMinutes === 0) {
    return `${hours}시간`;
  }

  return `${hours}시간 ${remainingMinutes}분`;
}

// 진행률 계산 (0-100)
export function calculateProgress(current: number, total: number): number {
  return Math.min(100, Math.max(0, (current / total) * 100));
}
