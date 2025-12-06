import { useState, useEffect, useRef } from 'react';
import { Ship, Pause, Play } from 'lucide-react';
import { formatMinutesAndSeconds, calculateProgress } from '../utils/formatTime';
import { CONFIRMATION_TIME_LIMIT, LATE_CONFIRMATION_PENALTY } from '../constants';

interface SailingFocusProps {
  plannedMinutes: number;
  onComplete: (recognizedMinutes: number) => void;
  onCancel: () => void;
}

export default function SailingFocus({ plannedMinutes, onComplete, onCancel }: SailingFocusProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(plannedMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 화면 가시성 감지
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 타이머 로직
  useEffect(() => {
    if (isCompleted || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          setIsCompleted(true);
          setCompletionTime(Date.now());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isCompleted]);

  const handleConfirm = () => {
    if (!completionTime) return;

    const elapsedTime = Date.now() - completionTime;
    let recognizedMinutes = plannedMinutes;

    if (elapsedTime > CONFIRMATION_TIME_LIMIT) {
      // 5분 초과 시 10%만 인정
      recognizedMinutes = plannedMinutes * LATE_CONFIRMATION_PENALTY;
      alert(`확인이 늦어 인정 시간이 ${Math.floor(recognizedMinutes)}분으로 감소했습니다.`);
    }

    onComplete(recognizedMinutes);
  };

  const progress = calculateProgress(
    (plannedMinutes * 60 - remainingSeconds),
    plannedMinutes * 60
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* 배경 비디오 */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/crusing_video.mp4" type="video/mp4" />
      </video>

      {/* 어두운 오버레이 (가독성 향상) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* 화면 꺼짐 경고 */}
        {isPaused && !isCompleted && (
          <div className="absolute top-4 left-0 right-0 mx-auto w-fit bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg">
            ⚠️ 화면을 켜두세요!
          </div>
        )}

        {/* 배 애니메이션 */}
        <div className="mb-8 animate-bounce">
          <Ship size={80} className="text-white drop-shadow-lg" />
        </div>

        {/* 원형 타이머 */}
        <div className="relative w-64 h-64 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            {/* 배경 원 */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="16"
              fill="none"
            />
            {/* 진행 원 */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="white"
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          {/* 중앙 시간 표시 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-white drop-shadow-lg">
              {formatMinutesAndSeconds(remainingSeconds)}
            </div>
            <div className="text-white text-sm mt-2 drop-shadow-lg">
              {Math.floor(progress)}%
            </div>
          </div>
        </div>

        {/* 바다 파도 효과 */}
        <div className="text-white text-lg mb-8 animate-pulse drop-shadow-lg">
          🌊 항해 중... 🌊
        </div>

        {/* 버튼 영역 */}
        {!isCompleted ? (
          <div className="flex gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
              {isPaused ? '재개' : '일시정지'}
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg"
            >
              취소
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              🎉 항해 완료! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              {plannedMinutes}분 집중을 완료했습니다!
            </p>
            <button
              onClick={handleConfirm}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              하선 확인
            </button>
            <p className="text-xs text-gray-500 mt-2">
              5분 이내에 확인하세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
