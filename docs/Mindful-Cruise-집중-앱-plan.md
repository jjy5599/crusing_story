# Implementation Plan: Mindful Cruise - ADHD 집중 앱

**Branch**: `mindful-cruise-focus-app` | **Date**: 2024-12-19 | **Spec**: [Mindful-Cruise-집중-앱-spec.md](./docs/Mindful-Cruise-집중-앱-spec.md)
**Project Root**: `C:\Users\jjy55\OneDrive\바탕 화면\app_dev\cruse\`
**Input**: Feature specification from spec.md

## Summary

ADHD 사용자를 위한 디지털 디톡스/집중 앱으로, 바다 항해 크루즈 컨셉의 게이미피케이션을 통해 사용자가 설정한 시간(최소 15분, 최대 2시간) 동안 집중하면 상품 추첨 티켓을 획득할 수 있는 앱입니다. 

현재 프로토타입이 Google AI Studio로 구현되어 있으며, React + TypeScript + Vite 기반의 웹 애플리케이션입니다. 핵심 기능은 구현되어 있으나 데이터 영속성과 상품 추첨 시스템이 추가로 필요합니다.

## Technical Context

**Language/Version**: TypeScript 5.8.2, JavaScript (ES2020+)  
**Primary Dependencies**: 
- React 19.2.1
- React DOM 19.2.1
- Vite 6.2.0
- @google/genai 1.31.0 (Gemini API)
- lucide-react 0.555.0 (아이콘)
- Tailwind CSS (스타일링)

**Storage**: 
- 현재: 메모리만 사용 (앱 재시작 시 초기화)
- 계획: localStorage (초기), IndexedDB (향후 확장 가능)

**Testing**: 
- 현재: 테스트 코드 없음
- 계획: Jest + React Testing Library (단위 테스트), Playwright (E2E 테스트)

**Target Platform**: 
- 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 모바일 브라우저 (iOS Safari, Chrome Mobile)
- PWA 지원 고려 (향후)

**Project Type**: Single-page web application (SPA)  
**Performance Goals**: 
- 초기 로딩 시간 < 3초
- 집중 모드 전환 시간 < 500ms
- AI 응답 시간 < 5초 (네트워크 의존)

**Constraints**: 
- 브라우저 자동 재생 정책 준수 (비디오/오디오)
- localStorage 용량 제한 (5-10MB)
- Gemini API 호출 제한 (비용 및 속도)
- 오프라인에서도 집중 모드 작동 필요

**Scale/Scope**: 
- 단일 사용자 앱 (멀티 유저 아님)
- 약 10-15개 주요 컴포넌트
- 3-4개 주요 화면 (홈, 집중 모드, 낚시, 도착)
- 약 5-10개 서비스/유틸리티 함수

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### 기술 스택 검증
- ✅ React + TypeScript: 검증된 웹 프레임워크
- ✅ Vite: 빠른 개발 서버 및 빌드 도구
- ✅ Tailwind CSS: 유틸리티 기반 CSS, 빠른 스타일링
- ✅ Gemini API: AI 기능 제공

### 아키텍처 검증
- ✅ 컴포넌트 기반 구조: 재사용 가능하고 유지보수 용이
- ⚠️ 상태 관리: 현재 useState만 사용, Context API 또는 상태 관리 라이브러리 고려 필요
- ⚠️ 데이터 영속성: localStorage 구현 필요 (현재 메모리만 사용)

### 성능 검증
- ✅ 코드 스플리팅 가능 (Vite 지원)
- ⚠️ 이미지/비디오 최적화 필요 (외부 리소스 사용)
- ⚠️ AI API 호출 최적화 필요 (캐싱 전략)

## Project Structure

### Documentation (this feature)

```text
C:\Users\jjy55\OneDrive\바탕 화면\app_dev\cruse\
├── docs/ (또는 루트)
│   ├── Mindful-Cruise-집중-앱-spec.md     # 스펙 문서
│   ├── Mindful-Cruise-집중-앱-plan.md    # 이 파일
│   ├── Mindful-Cruise-집중-앱-tasks.md   # 작업 목록
│   └── Mindful-Cruise-추가-필요사항-제안.md  # 개선 제안
```

### Source Code (repository root)

```text
C:\Users\jjy55\OneDrive\바탕 화면\app_dev\cruse\
├── docs/                                # 문서 폴더
│   ├── Mindful-Cruise-집중-앱-spec.md
│   ├── Mindful-Cruise-집중-앱-plan.md
│   ├── Mindful-Cruise-집중-앱-tasks.md
│   └── Mindful-Cruise-추가-필요사항-제안.md
├── src/                                 # 소스 코드
│   ├── components/
│   │   ├── SailingFocus.tsx            # 집중 모드 컴포넌트
│   │   ├── FishingGame.tsx             # 낚시 게임 컴포넌트
│   │   ├── ChatBot.tsx                 # AI 챗봇 컴포넌트 (프로토타입 제외)
│   │   ├── PhotoBooth.tsx              # AI 사진관 컴포넌트 (프로토타입 제외)
│   │   ├── CaptainBriefing.tsx         # AI 선장 브리핑 (프로토타입 제외)
│   │   ├── OceanBackground.tsx          # 바다 배경
│   │   ├── Dolphin.tsx                  # 돌고래 이벤트
│   │   ├── Seagulls.tsx                 # 갈매기 애니메이션
│   │   ├── RaffleScreen.tsx            # 추첨 화면 (US11)
│   │   ├── RaffleHistory.tsx           # 추첨 이력 (US11)
│   │   ├── OnboardingScreen.tsx        # 온보딩 화면 (US12)
│   │   ├── StatisticsScreen.tsx        # 통계 화면 (US13)
│   │   ├── NotificationSettings.tsx    # 알림 설정 (US14)
│   │   ├── AccessibilitySettings.tsx   # 접근성 설정 (US15)
│   │   ├── ErrorBoundary.tsx           # 에러 바운더리 (US17)
│   │   └── LazyImage.tsx               # 지연 로딩 이미지 (US18)
│   ├── services/
│   │   ├── geminiService.ts            # Gemini API 서비스 (프로토타입 제외)
│   │   ├── storage.ts                   # localStorage 서비스 (US10)
│   │   ├── ticket.ts                   # 티켓 관리 서비스 (US3)
│   │   ├── progress.ts                  # 진행도 관리 서비스 (US2)
│   │   ├── point.ts                     # 포인트 관리 서비스 (US4)
│   │   ├── raffle.ts                    # 추첨 로직 서비스 (US11)
│   │   ├── statistics.ts                # 통계 서비스 (US13)
│   │   └── notification.ts              # 알림 서비스 (US14)
│   ├── hooks/
│   │   ├── useOffline.ts                # 오프라인 상태 감지 (US16)
│   │   └── useVisibility.ts             # 화면 가시성 감지 (US6)
│   ├── utils/
│   │   ├── formatTime.ts                # 시간 포맷팅
│   │   ├── validation.ts                # 검증 함수
│   │   ├── errorLogger.ts               # 에러 로깅 (US17)
│   │   └── constants.ts                 # 상수 관리
│   ├── types.ts                         # TypeScript 타입 정의
│   ├── constants.ts                     # 상수 정의
│   ├── App.tsx                          # 메인 앱 컴포넌트
│   └── main.tsx                         # 진입점 (또는 index.tsx)
├── public/                              # 정적 파일
│   ├── sw.js                            # Service Worker (US16)
│   └── manifest.json                    # PWA 매니페스트 (US19)
├── tests/                               # 테스트 (향후 추가)
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

**Structure Decision**: Single-page application 구조를 유지하되, 컴포넌트를 기능별로 분리하여 재사용성과 유지보수성을 높입니다. 서비스 레이어를 분리하여 비즈니스 로직과 UI를 분리합니다.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 외부 비디오 리소스 사용 | 몰입감 있는 배경 제공 | 정적 이미지로 대체 가능하지만 사용자 경험이 저하됨 |
| Gemini API 의존성 | AI 기능 제공 | AI 없이도 작동 가능하지만 앱의 차별화 요소 손실 |
| 복잡한 상태 관리 | 여러 화면과 모드 전환 | 단순화 가능하지만 확장성과 유지보수성 저하 |

## Implementation Phases

### Phase 0: Research & Setup
- [x] 현재 구현 상태 분석
- [x] 기술 스택 확인
- [ ] 데이터 영속성 전략 결정 (localStorage vs IndexedDB)
- [ ] 테스트 프레임워크 설정
- [ ] CI/CD 파이프라인 설정 (선택사항)

### Phase 1: Core Features (P1)
- [ ] 데이터 영속성 구현 (localStorage)
  - localStorage 서비스 구현
  - 데이터 직렬화/역직렬화
  - 에러 처리 및 폴백
  - 앱 시작 시 데이터 로드
  - 데이터 변경 시 자동 저장
- [ ] 상품 추첨 시스템 구현
  - 추첨 화면 UI
  - 추첨 로직 및 애니메이션
  - 추첨 결과 표시
  - 추첨 이력 저장
- [ ] 에러 처리 개선
  - 전역 에러 바운더리
  - 사용자 친화적인 에러 메시지
  - 재시도 메커니즘
- [ ] 기본 테스트 작성

### Phase 2: User Experience (P2)
- [ ] 사용자 온보딩 화면
  - 첫 실행 감지
  - 앱 소개 및 튜토리얼
  - 기본 집중 시간 설정
  - 알림 설정
  - 온보딩 완료 상태 저장
- [ ] 통계 및 진행 상황 시각화
  - 통계 화면 구현
  - 일일/주간/월간 집중 시간 차트
  - 완주한 항로 이력
  - 획득한 티켓 총 개수
  - 연속 달성 일수(Streak) 계산
- [ ] 알림 시스템 구현
  - 브라우저 알림 API 통합
  - 알림 권한 요청
  - 집중 시간 완료 알림
  - 목적지 도착 알림
  - 알림 설정 UI
- [ ] 접근성 개선
  - 다크 모드 지원
  - 폰트 크기 조절
  - 색상 대비 개선
  - 키보드 단축키 지원
  - 스크린 리더 지원

### Phase 3: Enhancement (P3)
- [ ] 성능 최적화
  - 이미지 지연 로딩
  - 코드 스플리팅
  - 비디오 로딩 최적화
  - AI API 호출 최적화 (캐싱)
- [ ] 모바일 반응형 개선
  - 터치 인터페이스 최적화
  - 화면 크기별 레이아웃 조정
  - 모바일 브라우저 호환성 테스트
- [ ] 오프라인 지원
  - 오프라인 상태 감지
  - 집중 모드 오프라인 작동
  - 낚시 게임 오프라인 작동
  - 오프라인 데이터 동기화
- [ ] PWA 지원 (선택사항)
  - Service Worker 구현
  - 오프라인 캐싱
  - 설치 가능한 앱

## Key Technical Decisions

### 1. 데이터 영속성
**선택**: localStorage (초기), IndexedDB (향후)
**이유**: 
- localStorage는 간단하고 대부분의 사용 사례에 충분
- IndexedDB는 복잡한 쿼리나 대용량 데이터가 필요할 때 마이그레이션
- 저장할 데이터: 진행도, 티켓, 포인트, 설정, 통계, 추첨 이력
- 자동 저장: 데이터 변경 시 즉시 localStorage에 저장
- 에러 처리: 저장 공간 부족 시 사용자에게 알림

### 2. 상태 관리
**선택**: React Context API 또는 Zustand
**이유**: 
- 현재는 useState만 사용하지만, 전역 상태가 필요해짐
- Redux는 오버킬, Context API는 간단하지만 성능 이슈 가능
- Zustand는 경량이고 성능이 좋음

### 3. 테스트 전략
**선택**: Jest + React Testing Library (단위), Playwright (E2E)
**이유**: 
- React Testing Library는 컴포넌트 테스트에 최적화
- Playwright는 크로스 브라우저 E2E 테스트에 적합

### 4. 배포 전략
**선택**: Vercel 또는 Netlify
**이유**: 
- 정적 사이트 호스팅에 최적화
- 자동 배포 및 CDN 제공
- 무료 플랜 제공

### 5. 상품 추첨 시스템
**선택**: 클라이언트 사이드 추첨 (초기), 서버 사이드 추첨 (향후)
**이유**: 
- 초기에는 하드코딩된 추첨 풀 사용
- 향후 관리자 기능으로 추첨 풀 관리 가능
- 추첨 이력은 localStorage에 저장

### 6. 통계 시스템
**선택**: 클라이언트 사이드 통계 계산
**이유**: 
- 집중 세션 데이터를 기반으로 통계 계산
- 일일/주간/월간 집중 시간 집계
- Streak 계산 로직 구현

### 7. 알림 시스템
**선택**: 브라우저 Notification API
**이유**: 
- 웹 표준 API 사용
- 권한 요청 및 관리
- 오프라인에서도 작동 (Service Worker와 함께)

### 8. 오프라인 지원
**선택**: Service Worker + Cache API
**이유**: 
- 집중 모드와 낚시 게임은 오프라인에서도 작동
- 정적 리소스 캐싱
- 오프라인 데이터 동기화

## Dependencies & Risks

### External Dependencies
- **Gemini API**: 
  - 위험: API 키 노출, 호출 제한, 비용
  - 완화: 환경 변수 사용, 에러 처리, 캐싱

- **외부 비디오 리소스 (Pexels)**:
  - 위험: 외부 서비스 의존성, 로딩 실패
  - 완화: 폴백 이미지 제공, 에러 처리

### Technical Risks
- **브라우저 자동 재생 정책**: 
  - 위험: 비디오 자동 재생 실패
  - 완화: 사용자 상호작용 후 재생, 폴백 이미지

- **localStorage 용량 제한**:
  - 위험: 데이터 저장 실패
  - 완화: 데이터 압축, 오래된 데이터 정리, IndexedDB 마이그레이션

- **AI API 응답 지연**:
  - 위험: 사용자 경험 저하
  - 완화: 로딩 상태 표시, 타임아웃 설정, 폴백 메시지

## Success Metrics

- **기능 완성도**: 모든 P1 기능 구현 완료
- **데이터 영속성**: 앱 재시작 후에도 진행도 유지
- **사용자 경험**: 집중 모드 시작부터 완료까지 < 1분
- **성능**: 초기 로딩 시간 < 3초
- **안정성**: 크래시 없이 주요 플로우 완료

