import { useState, useEffect } from 'react';
import { Ship, Ticket as TicketIcon, Coins, Fish as FishIcon, Gift } from 'lucide-react';
import SailingFocus from './components/SailingFocus';
import FishingGame from './components/FishingGame';
import RaffleScreen from './components/RaffleScreen';
import {
  loadRouteProgress,
  loadTickets,
  loadPoints,
  loadRaffleHistory,
  loadStatistics,
  saveRouteProgress,
  saveTickets,
  savePoints,
  saveRaffleHistory,
  saveStatistics,
} from './services/storage';
import { ROUTES, ROUTE_TOTAL_MINUTES, MIN_FOCUS_MINUTES, MAX_FOCUS_MINUTES, POINTS_PER_TICKET } from './constants';
import { formatHoursAndMinutes, calculateProgress } from './utils/formatTime';
import type { Screen, RouteProgress, Ticket, Point, RaffleHistory, Statistics, Fish, RaffleResult } from './types';

export default function App() {
  // 화면 상태
  const [screen, setScreen] = useState<Screen>('home');

  // 데이터 상태
  const [routeProgress, setRouteProgress] = useState<RouteProgress | null>(null);
  const [tickets, setTickets] = useState<Ticket | null>(null);
  const [points, setPoints] = useState<Point | null>(null);
  const [raffleHistory, setRaffleHistory] = useState<RaffleHistory | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  // 집중 시간 설정
  const [focusMinutes, setFocusMinutes] = useState(25);

  // 데이터 로드
  useEffect(() => {
    setRouteProgress(loadRouteProgress());
    setTickets(loadTickets());
    setPoints(loadPoints());
    setRaffleHistory(loadRaffleHistory());
    setStatistics(loadStatistics());
  }, []);

  if (!routeProgress || !tickets || !points || !raffleHistory || !statistics) {
    return (
      <div className="min-h-screen bg-blue-500 flex items-center justify-center">
        <div className="text-white text-2xl">로딩 중...</div>
      </div>
    );
  }

  // 집중 모드 완료 처리
  const handleFocusComplete = (recognizedMinutes: number) => {
    const newAccumulatedMinutes = Math.min(
      routeProgress.accumulatedMinutes + recognizedMinutes,
      ROUTE_TOTAL_MINUTES
    );

    const completed = newAccumulatedMinutes >= ROUTE_TOTAL_MINUTES;

    const newProgress: RouteProgress = {
      ...routeProgress,
      accumulatedMinutes: completed ? 0 : newAccumulatedMinutes,
      direction: completed
        ? routeProgress.direction === 'yeongil-to-ulleung'
          ? 'ulleung-to-yeongil'
          : 'yeongil-to-ulleung'
        : routeProgress.direction,
      lastUpdated: Date.now(),
    };

    setRouteProgress(newProgress);
    saveRouteProgress(newProgress);

    // 통계 업데이트
    const newStats: Statistics = {
      ...statistics,
      totalFocusMinutes: statistics.totalFocusMinutes + recognizedMinutes,
      totalCompletedRoutes: completed ? statistics.totalCompletedRoutes + 1 : statistics.totalCompletedRoutes,
      totalTicketsEarned: completed ? statistics.totalTicketsEarned + 1 : statistics.totalTicketsEarned,
    };
    setStatistics(newStats);
    saveStatistics(newStats);

    // 완주 시 티켓 획득
    if (completed) {
      const newTickets: Ticket = { count: tickets.count + 1 };
      setTickets(newTickets);
      saveTickets(newTickets);

      setScreen('arrival');
    } else {
      setScreen('home');
    }
  };

  // 낚시로 물고기 잡기
  const handleCatchFish = (fish: Fish) => {
    const newPoints: Point = { value: points.value + fish.pointValue };
    setPoints(newPoints);
    savePoints(newPoints);
  };

  // 낚시로 티켓 잡기
  const handleCatchTicket = () => {
    const newTickets: Ticket = { count: tickets.count + 1 };
    setTickets(newTickets);
    saveTickets(newTickets);
  };

  // 포인트로 티켓 교환
  const handleExchangeTicket = () => {
    if (points.value < POINTS_PER_TICKET) {
      alert('포인트가 부족합니다!');
      return;
    }

    const newPoints: Point = { value: points.value - POINTS_PER_TICKET };
    const newTickets: Ticket = { count: tickets.count + 1 };

    setPoints(newPoints);
    setTickets(newTickets);
    savePoints(newPoints);
    saveTickets(newTickets);
  };

  // 추첨 실행
  const handleRaffle = (result: RaffleResult) => {
    // 티켓 소모
    const newTickets: Ticket = { count: Math.max(0, tickets.count - 1) };
    setTickets(newTickets);
    saveTickets(newTickets);

    // 추첨 이력 저장
    const newHistory: RaffleHistory = {
      results: [...raffleHistory.results, result],
    };
    setRaffleHistory(newHistory);
    saveRaffleHistory(newHistory);
  };

  // 홈 화면
  const renderHome = () => {
    const currentRoute = ROUTES[routeProgress.direction];
    const progress = calculateProgress(routeProgress.accumulatedMinutes, ROUTE_TOTAL_MINUTES);

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">🚢 Mindful Cruise</h1>
          <div className="flex gap-2">
            <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-1">
              <TicketIcon size={20} className="text-purple-600" />
              <span className="font-bold text-purple-600">{tickets.count}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-1">
              <Coins size={20} className="text-yellow-600" />
              <span className="font-bold text-yellow-600">{points.value}</span>
            </div>
          </div>
        </div>

        {/* 현재 항로 정보 */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">{currentRoute.name}</h2>

          {/* 진행도 바 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{formatHoursAndMinutes(routeProgress.accumulatedMinutes)}</span>
              <span>{formatHoursAndMinutes(ROUTE_TOTAL_MINUTES)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-600 mt-2">
              {Math.floor(progress)}% 완료
            </div>
          </div>

          {/* 집중 시간 설정 */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              집중 시간 설정 ({MIN_FOCUS_MINUTES}-{MAX_FOCUS_MINUTES}분)
            </label>
            <input
              type="range"
              min={MIN_FOCUS_MINUTES}
              max={MAX_FOCUS_MINUTES}
              value={focusMinutes}
              onChange={(e) => setFocusMinutes(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-2xl font-bold text-blue-600 mt-2">
              {focusMinutes}분
            </div>
          </div>

          {/* 출항하기 버튼 */}
          <button
            onClick={() => setScreen('focus')}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Ship size={24} />
            출항하기
          </button>
        </div>

        {/* 액션 버튼들 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setScreen('fishing')}
            className="bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition-colors flex flex-col items-center gap-2"
          >
            <FishIcon size={32} />
            <span>낚시하러 가기</span>
          </button>
          <button
            onClick={() => setScreen('raffle')}
            className="bg-purple-600 text-white py-4 rounded-lg font-bold hover:bg-purple-700 transition-colors flex flex-col items-center gap-2"
          >
            <Gift size={32} />
            <span>상품 추첨</span>
          </button>
        </div>

        {/* 포인트 교환 */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">포인트 상점</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">티켓 1장</p>
              <p className="text-lg font-bold text-yellow-600">{POINTS_PER_TICKET} 포인트</p>
            </div>
            <button
              onClick={handleExchangeTicket}
              disabled={points.value < POINTS_PER_TICKET}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                points.value < POINTS_PER_TICKET
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-600 text-white hover:bg-yellow-700'
              }`}
            >
              교환하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 도착 화면
  const renderArrival = () => {
    const destination = routeProgress.direction === 'ulleung-to-yeongil' ? '울릉도' : '영일만항';

    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-600 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-orange-600 mb-4">
            {destination} 도착!
          </h1>
          <p className="text-gray-600 mb-6">
            티켓 1장을 획득했습니다!
          </p>
          <button
            onClick={() => setScreen('home')}
            className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors"
          >
            다시 항해하기
          </button>
        </div>
      </div>
    );
  };

  // 화면 렌더링
  return (
    <>
      {screen === 'home' && renderHome()}
      {screen === 'focus' && (
        <SailingFocus
          plannedMinutes={focusMinutes}
          onComplete={handleFocusComplete}
          onCancel={() => setScreen('home')}
        />
      )}
      {screen === 'fishing' && (
        <FishingGame
          onCatchFish={handleCatchFish}
          onCatchTicket={handleCatchTicket}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'raffle' && (
        <RaffleScreen
          ticketCount={tickets.count}
          onRaffle={handleRaffle}
          onBack={() => setScreen('home')}
          raffleHistory={raffleHistory.results}
        />
      )}
      {screen === 'arrival' && renderArrival()}
    </>
  );
}
