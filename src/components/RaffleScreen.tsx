import { useState } from 'react';
import { Ticket, Gift, Clock } from 'lucide-react';
import { RAFFLE_PRIZES } from '../constants';
import type { RaffleResult } from '../types';

interface RaffleScreenProps {
  ticketCount: number;
  onRaffle: (result: RaffleResult) => void;
  onBack: () => void;
  raffleHistory: RaffleResult[];
}

export default function RaffleScreen({ ticketCount, onRaffle, onBack, raffleHistory }: RaffleScreenProps) {
  const [isRaffling, setIsRaffling] = useState(false);
  const [result, setResult] = useState<RaffleResult | null>(null);

  // 추첨 실행
  const handleRaffle = () => {
    if (ticketCount < 1) {
      alert('티켓이 부족합니다!');
      return;
    }

    setIsRaffling(true);
    setResult(null);

    // 추첨 애니메이션 (2초)
    setTimeout(() => {
      // 당첨 확률 계산
      const rand = Math.random();
      let cumulativeProbability = 0;
      let selectedPrize = null;

      for (const prize of RAFFLE_PRIZES) {
        cumulativeProbability += prize.probability;
        if (rand < cumulativeProbability) {
          selectedPrize = prize;
          break;
        }
      }

      const raffleResult: RaffleResult = {
        id: `raffle-${Date.now()}`,
        timestamp: Date.now(),
        isWin: selectedPrize !== null,
        prize: selectedPrize ? {
          name: selectedPrize.name,
          description: selectedPrize.description,
        } : undefined,
      };

      setResult(raffleResult);
      setIsRaffling(false);
      onRaffle(raffleResult);
    }, 2000);
  };

  // 날짜 포맷
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-600 p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          ← 돌아가기
        </button>
        <div className="bg-white px-6 py-2 rounded-lg flex items-center gap-2">
          <Ticket className="text-purple-600" size={24} />
          <span className="font-bold text-purple-600">{ticketCount}장</span>
        </div>
      </div>

      {/* 추첨 영역 */}
      <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl mb-6">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-4">
          🎁 크루즈 승선권 추첨
        </h1>

        {/* 12월 말 오픈 공지 */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 font-semibold text-center mb-2">
            📅 12월 말 오픈 예정
          </p>
          <p className="text-blue-600 text-sm text-center">
            실제 크루즈 항해 체험권을 준비 중입니다!
          </p>
        </div>

        {!result && !isRaffling && (
          <div className="text-center">
            <Gift size={100} className="mx-auto text-purple-600 mb-6" />
            <p className="text-gray-600 mb-6">
              티켓 1장으로 크루즈 승선권 추첨에 참여하세요!
            </p>
            <button
              onClick={handleRaffle}
              disabled={ticketCount < 1}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                ticketCount < 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {ticketCount < 1 ? '티켓이 부족합니다' : '추첨하기'}
            </button>
          </div>
        )}

        {isRaffling && (
          <div className="text-center">
            <div className="animate-spin mb-6">
              <Gift size={100} className="mx-auto text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600 animate-pulse">
              추첨 중...
            </p>
          </div>
        )}

        {result && (
          <div className="text-center">
            {result.isWin ? (
              <>
                <div className="mb-6 animate-bounce">
                  <Gift size={100} className="mx-auto text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-4">
                  🎉 당첨! 🎉
                </p>
                <div className="bg-purple-50 rounded-lg p-6 mb-6">
                  <p className="text-xl font-bold text-purple-600 mb-2">
                    {result.prize?.name}
                  </p>
                  <p className="text-gray-600">
                    {result.prize?.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <Gift size={100} className="mx-auto text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-600 mb-4">
                  아쉽게도 꽝...
                </p>
                <p className="text-gray-500 mb-6">
                  다음 기회에 도전하세요!
                </p>
              </>
            )}
            <button
              onClick={() => setResult(null)}
              className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold hover:bg-purple-700 transition-colors"
            >
              확인
            </button>
          </div>
        )}
      </div>

      {/* 추첨 이력 */}
      {raffleHistory.length > 0 && (
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
            <Clock size={24} />
            추첨 이력
          </h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {raffleHistory.slice().reverse().map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg ${
                  item.isWin ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">
                      {item.isWin ? `🎉 ${item.prize?.name}` : '❌ 꽝'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>
                  {item.isWin && (
                    <span className="text-yellow-500">✨</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
