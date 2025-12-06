import { useState } from 'react';
import { Fish as FishIcon, Ticket } from 'lucide-react';
import {
  FISH_TYPES,
  FISH_RARITY_PROBABILITY,
  FISHING_TICKET_PROBABILITY,
  MIN_BITE_WAIT_TIME,
  MAX_BITE_WAIT_TIME
} from '../constants';
import type { Fish } from '../types';

interface FishingGameProps {
  onCatchFish: (fish: Fish) => void;
  onCatchTicket: () => void;
  onBack: () => void;
}

export default function FishingGame({ onCatchFish, onCatchTicket, onBack }: FishingGameProps) {
  const [isWaitingForBite, setIsWaitingForBite] = useState(false);
  const [hasBite, setHasBite] = useState(false);
  const [caughtItem, setCaughtItem] = useState<{ type: 'fish' | 'ticket'; fish?: Fish } | null>(null);
  const [isFishing, setIsFishing] = useState(false);

  // 낚시 시작
  const startFishing = () => {
    setIsFishing(true);
    setIsWaitingForBite(true);
    setHasBite(false);
    setCaughtItem(null);

    // 랜덤 시간 후 입질
    const waitTime = Math.random() * (MAX_BITE_WAIT_TIME - MIN_BITE_WAIT_TIME) + MIN_BITE_WAIT_TIME;

    setTimeout(() => {
      setHasBite(true);
      setIsWaitingForBite(false);
    }, waitTime);
  };

  // 물고기 잡기
  const catchItem = () => {
    if (!hasBite) return;

    // 티켓 획득 확률 체크
    if (Math.random() < FISHING_TICKET_PROBABILITY) {
      setCaughtItem({ type: 'ticket' });
      setHasBite(false);
      return;
    }

    // 물고기 희귀도 결정
    const rand = Math.random();
    let rarity: Fish['rarity'] = 'common';

    if (rand < FISH_RARITY_PROBABILITY.legendary) {
      rarity = 'legendary';
    } else if (rand < FISH_RARITY_PROBABILITY.legendary + FISH_RARITY_PROBABILITY.epic) {
      rarity = 'epic';
    } else if (rand < FISH_RARITY_PROBABILITY.legendary + FISH_RARITY_PROBABILITY.epic + FISH_RARITY_PROBABILITY.rare) {
      rarity = 'rare';
    }

    // 해당 희귀도의 물고기 랜덤 선택
    const fishOfRarity = FISH_TYPES.filter(f => f.rarity === rarity);
    const selectedFish = fishOfRarity[Math.floor(Math.random() * fishOfRarity.length)];

    setCaughtItem({ type: 'fish', fish: selectedFish });
    setHasBite(false);
  };

  // 획득 확인
  const confirmCatch = () => {
    if (!caughtItem) return;

    if (caughtItem.type === 'ticket') {
      onCatchTicket();
    } else if (caughtItem.fish) {
      onCatchFish(caughtItem.fish);
    }

    setCaughtItem(null);
    setIsFishing(false);
  };

  // 희귀도별 색상
  const getRarityColor = (rarity: Fish['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 flex flex-col items-center justify-center p-4">
      {/* 헤더 */}
      <div className="absolute top-4 left-4">
        <button
          onClick={onBack}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          ← 돌아가기
        </button>
      </div>

      {/* 배 갑판 배경 */}
      <div className="bg-amber-800 rounded-t-3xl p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          🎣 낚시하기
        </h2>

        {/* 낚시 상태 */}
        {!isFishing && !caughtItem && (
          <div className="text-center">
            <p className="text-white mb-6">
              물고기를 낚아서 포인트를 획득하세요!
            </p>
            <button
              onClick={startFishing}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              낚시 시작
            </button>
          </div>
        )}

        {/* 입질 대기 중 */}
        {isWaitingForBite && (
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <FishIcon size={80} className="text-white mx-auto" />
            </div>
            <p className="text-white text-lg">
              입질을 기다리는 중...
            </p>
          </div>
        )}

        {/* 입질! */}
        {hasBite && (
          <div className="text-center">
            <div className="animate-bounce mb-4">
              <FishIcon size={80} className="text-yellow-400 mx-auto" />
            </div>
            <p className="text-yellow-400 text-2xl font-bold mb-4 animate-pulse">
              입질이 왔다!
            </p>
            <button
              onClick={catchItem}
              className="bg-yellow-400 text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
            >
              잡기!
            </button>
          </div>
        )}

        {/* 잡은 물고기/티켓 */}
        {caughtItem && (
          <div className="text-center">
            {caughtItem.type === 'ticket' ? (
              <>
                <div className="mb-4">
                  <Ticket size={80} className="text-yellow-400 mx-auto" />
                </div>
                <p className="text-yellow-400 text-2xl font-bold mb-2">
                  🎉 티켓 발견!
                </p>
                <p className="text-white mb-6">
                  상품 추첨 티켓 1장을 획득했습니다!
                </p>
              </>
            ) : caughtItem.fish && (
              <>
                <div className="mb-4">
                  <FishIcon size={80} className={`mx-auto ${getRarityColor(caughtItem.fish.rarity)}`} />
                </div>
                <p className={`text-2xl font-bold mb-2 ${getRarityColor(caughtItem.fish.rarity)}`}>
                  {caughtItem.fish.name}
                </p>
                <p className="text-white mb-2">
                  희귀도: {caughtItem.fish.rarity}
                </p>
                <p className="text-white mb-6">
                  포인트: +{caughtItem.fish.pointValue}
                </p>
              </>
            )}
            <button
              onClick={confirmCatch}
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
            >
              획득하기
            </button>
          </div>
        )}
      </div>

      {/* 바다 */}
      <div className="bg-blue-600 w-full max-w-md h-32 flex items-center justify-center">
        <div className="text-4xl animate-pulse">
          🌊 🌊 🌊
        </div>
      </div>
    </div>
  );
}
