# Tasks: Mindful Cruise - ADHD 집중 앱

**Input**: Design documents from `C:\Users\jjy55\OneDrive\바탕 화면\app_dev\cruse\docs\`
**Prerequisites**: 
- spec.md (required)
- plan.md (required)
- 추가 필요사항 제안 문서 (참고)

**Tests**: 테스트는 선택사항이지만, 핵심 기능(P1)에 대해서는 테스트 작성 권장

**Organization**: 작업은 사용자 스토리별로 그룹화되어 각 스토리를 독립적으로 구현하고 테스트할 수 있도록 구성됩니다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 이 작업이 속한 사용자 스토리 (예: US1, US2, US3)
- 설명에 정확한 파일 경로 포함

## Path Conventions

- **프로젝트 루트**: `C:\Users\jjy55\OneDrive\바탕 화면\app_dev\cruse\`
- **소스 코드**: `src/`
- **컴포넌트**: `src/components/`
- **서비스**: `src/services/`
- **훅**: `src/hooks/`
- **유틸리티**: `src/utils/`
- **타입**: `src/types.ts`
- **테스트**: `tests/` (프로젝트 루트)
- **문서**: `docs/` (프로젝트 루트)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 프로젝트 초기화 및 기본 구조

- [x] T001 프로젝트 구조 확인 및 문서화
- [ ] T002 [P] 테스트 프레임워크 설정 (Jest + React Testing Library)
- [ ] T003 [P] E2E 테스트 프레임워크 설정 (Playwright)
- [ ] T004 [P] ESLint 및 Prettier 설정
- [ ] T005 환경 변수 설정 (.env 파일, API 키 관리)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리가 의존하는 핵심 인프라

**⚠️ CRITICAL**: 이 단계가 완료되지 않으면 사용자 스토리 작업을 시작할 수 없습니다.

- [ ] T006 데이터 영속성 서비스 구현 (`services/storage.ts`)
  - localStorage 래퍼 함수 생성
  - 데이터 직렬화/역직렬화
  - 에러 처리 및 폴백

- [ ] T007 [P] 상태 관리 구조 설정
  - Context API 또는 Zustand 선택 및 설정
  - 전역 상태 타입 정의

- [ ] T008 [P] 에러 처리 인프라 설정
  - 에러 바운더리 컴포넌트
  - 에러 로깅 유틸리티

- [ ] T009 [P] 유틸리티 함수 생성 (`src/utils/`)
  - 시간 포맷팅 함수 (`src/utils/formatTime.ts`)
  - 검증 함수 (`src/utils/validation.ts`)
  - 상수 관리 (`src/utils/constants.ts`)

- [ ] T010 데이터 모델 타입 정의 업데이트 (`src/types.ts`)
  - 저장소 스키마 타입 추가
  - 영속성 관련 타입 추가

**Checkpoint**: Foundation ready - 사용자 스토리 구현을 시작할 수 있습니다.

---

## Phase 3: User Story 1 - 항로 선택 및 집중 모드 시작 (Priority: P1) 🎯 MVP

**Goal**: 사용자가 항로를 선택하고 집중 모드를 시작할 수 있게 합니다.

**Independent Test**: 사용자가 앱을 열고, 항로를 선택하고, 집중 시간을 설정한 후 집중 모드를 시작할 수 있는지 확인합니다.

### Tests for User Story 1 (권장)

- [ ] T011 [P] [US1] 항로 선택 컴포넌트 테스트 (`tests/unit/components/RouteSelector.test.tsx`)
- [ ] T012 [P] [US1] 집중 시간 설정 테스트 (`tests/unit/components/FocusDurationSlider.test.tsx`)
- [ ] T013 [P] [US1] 집중 모드 시작 통합 테스트 (`tests/integration/SailingFocus.test.tsx`)

### Implementation for User Story 1

- [ ] T014 [US1] 항로 선택 UI 구현 (`src/components/RouteSelector.tsx` 또는 `src/App.tsx` 내)
- [ ] T015 [US1] 집중 시간 슬라이더 구현 (`src/App.tsx` 내)
- [ ] T016 [US1] 집중 모드 화면 구현 (`src/components/SailingFocus.tsx`)
- [ ] T017 [US1] 원형 타이머 컴포넌트 구현 (`src/components/SailingFocus.tsx` 내)
- [ ] T018 [US1] 집중 모드 시작 시 데이터 저장 (localStorage)
- [ ] T019 [US1] 집중 모드 상태 관리 개선 (Context API 또는 Zustand)

**Checkpoint**: 이 시점에서 User Story 1이 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 4: User Story 2 - 집중 시간 완료 및 진행도 업데이트 (Priority: P1)

**Goal**: 집중 시간 완료 시 진행도를 업데이트하고 목적지 도착 여부를 확인합니다.

**Independent Test**: 사용자가 30분 집중 모드를 완료하면 진행도가 30분 증가하고, 남은 시간이 정확히 표시되는지 확인합니다.

### Tests for User Story 2 (권장)

- [ ] T020 [P] [US2] 집중 시간 완료 처리 테스트 (`tests/unit/components/SailingFocus.test.tsx`)
- [ ] T021 [P] [US2] 진행도 업데이트 테스트 (`tests/unit/services/progress.test.ts`)
- [ ] T022 [P] [US2] 5분 지연 패널티 테스트 (`tests/unit/components/SailingFocus.test.tsx`)

### Implementation for User Story 2

- [ ] T023 [US2] 집중 시간 완료 감지 로직 (`src/components/SailingFocus.tsx`)
- [ ] T024 [US2] "하선 확인" 버튼 구현 (`src/components/SailingFocus.tsx`)
- [ ] T025 [US2] 5분 지연 패널티 로직 구현 (`src/components/SailingFocus.tsx`)
- [ ] T026 [US2] 진행도 업데이트 서비스 구현 (`src/services/progress.ts`)
- [ ] T027 [US2] 진행도 localStorage 저장
- [ ] T028 [US2] 진행도 시각화 (홈 화면 진행도 바)
- [ ] T029 [US2] 도착 화면 전환 로직 (`src/App.tsx`)

**Checkpoint**: 이 시점에서 User Story 2가 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 5: User Story 3 - 목적지 도착 및 왕복 항로 전환 (Priority: P1)

**Goal**: 항로 완주 시 티켓을 획득하고 왕복 항로로 자동 전환합니다.

**Independent Test**: 사용자가 항로를 완주하면 티켓을 획득하고, 자동으로 반대 방향 항로로 전환되는지 확인합니다.

### Tests for User Story 3 (권장)

- [ ] T030 [P] [US3] 티켓 획득 로직 테스트 (`tests/unit/services/ticket.test.ts`)
- [ ] T031 [P] [US3] 왕복 항로 전환 테스트 (`tests/unit/services/route.test.ts`)
- [ ] T032 [P] [US3] 티켓 표시 UI 테스트 (`tests/unit/components/TicketDisplay.test.tsx`)

### Implementation for User Story 3

- [ ] T033 [US3] 도착 화면 구현 (`src/App.tsx` 내 `renderArrival`)
- [ ] T034 [US3] 울릉도 도착 처리 (티켓 1장 보상)
- [ ] T035 [US3] 영일만항 도착 처리 (티켓 1장 보상)
- [ ] T036 [US3] 티켓 관리 서비스 구현 (`src/services/ticket.ts`)
- [ ] T037 [US3] 티켓 localStorage 저장
- [ ] T038 [US3] 티켓 표시 UI 개선 (홈 화면)
- [ ] T039 [US3] 항로 진행도 리셋 및 왕복 전환 로직
  - 울릉도 도착 시 울릉도→영일만항 항로로 전환
  - 영일만항 도착 시 영일만항→울릉도 항로로 전환

**Checkpoint**: 이 시점에서 User Story 3가 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 6: User Story 4 - 낚시 게임으로 포인트 획득 (Priority: P2)

**Goal**: 낚시 게임을 통해 포인트를 획득하고 항로 진행도에 반영합니다.

**Independent Test**: 사용자가 낚시 게임을 시작하고 물고기를 낚으면 포인트를 획득하는지 확인합니다.

### Tests for User Story 4 (선택사항)

- [ ] T040 [P] [US4] 낚시 게임 로직 테스트 (`tests/unit/components/FishingGame.test.tsx`)
- [ ] T041 [P] [US4] 포인트 획득 테스트 (`tests/unit/services/point.test.ts`)

### Implementation for User Story 4

- [ ] T042 [US4] 낚시 게임 화면 구현 (`src/components/FishingGame.tsx`)
- [ ] T043 [US4] 입질 감지 및 반응 로직
- [ ] T044 [US4] 물고기 종류 결정 로직
- [ ] T045 [US4] 포인트 획득 처리
- [ ] T046 [US4] 포인트 관리 서비스 구현 (`src/services/point.ts`)
- [ ] T047 [US4] 포인트 localStorage 저장
- [ ] T048 [US4] 낚시 시간 진행도 반영
- [ ] T049 [US4] 티켓 드롭 확률 구현 (0.003%)

**Checkpoint**: 이 시점에서 User Story 4가 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 7: User Story 5 - 포인트로 티켓 교환 (Priority: P2)

**Goal**: 포인트를 티켓으로 교환할 수 있는 상점 기능을 제공합니다.

**Independent Test**: 사용자가 200 포인트 이상을 보유하고 있을 때 티켓을 교환할 수 있는지 확인합니다.

### Tests for User Story 5 (선택사항)

- [ ] T050 [P] [US5] 포인트 교환 로직 테스트 (`tests/unit/services/exchange.test.ts`)
- [ ] T051 [P] [US5] 교환 UI 테스트 (`tests/unit/components/ExchangeModal.test.tsx`)

### Implementation for User Story 5

- [ ] T052 [US5] 포인트 상점 모달 구현 (`src/App.tsx` 내)
- [ ] T053 [US5] 포인트 교환 로직 구현
- [ ] T054 [US5] 교환 검증 로직 (포인트 부족 시 비활성화)
- [ ] T055 [US5] 교환 후 데이터 저장 (localStorage)

**Checkpoint**: 이 시점에서 User Story 5가 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 8: User Story 6 - 화면 꺼짐 감지 및 집중 모드 보호 (Priority: P2)

**Goal**: 화면 전환을 감지하고 타이머를 일시정지합니다.

**Independent Test**: 사용자가 집중 모드 중에 브라우저 탭을 전환하면 타이머가 일시정지되는지 확인합니다.

### Tests for User Story 6 (선택사항)

- [ ] T056 [P] [US6] 화면 전환 감지 테스트 (`tests/unit/hooks/useVisibility.test.ts`)
- [ ] T057 [P] [US6] 타이머 일시정지 테스트 (`tests/unit/components/SailingFocus.test.tsx`)

### Implementation for User Story 6

- [ ] T058 [US6] visibilitychange 이벤트 리스너 구현 (`src/components/SailingFocus.tsx`)
- [ ] T059 [US6] 타이머 일시정지/재개 로직
- [ ] T060 [US6] 경고 메시지 표시 ("⚠️ 화면을 켜두세요!")
- [ ] T061 [US6] 일시정지 시간 제외 로직 (진행도에 반영 안 함)

**Checkpoint**: 이 시점에서 User Story 6이 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 9: User Story 7 - AI 선장 브리핑 (Priority: P3)

**Goal**: 선택한 항로에 맞는 AI 선장의 환영 메시지를 표시합니다.

**Independent Test**: 사용자가 홈 화면에 접속하면 선택한 항로에 맞는 AI 메시지가 표시되는지 확인합니다.

### Tests for User Story 7 (선택사항)

- [ ] T062 [P] [US7] AI 메시지 생성 테스트 (`tests/unit/services/geminiService.test.ts`)
- [ ] T063 [P] [US7] 브리핑 컴포넌트 테스트 (`tests/unit/components/CaptainBriefing.test.tsx`)

### Implementation for User Story 7

- [ ] T064 [US7] AI 선장 브리핑 컴포넌트 구현 (`src/components/CaptainBriefing.tsx`) [프로토타입 제외]
- [ ] T065 [US7] Gemini API 호출 로직 (`src/services/geminiService.ts`) [프로토타입 제외]
- [ ] T066 [US7] 에러 처리 및 폴백 메시지 [프로토타입 제외]
- [ ] T067 [US7] 메시지 캐싱 (같은 항로에 대해 재호출 방지) [프로토타입 제외]

**Checkpoint**: 이 시점에서 User Story 7이 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 10: User Story 8 - AI 챗봇 (Priority: P3)

**Goal**: AI 선장과 대화하여 항해, 바다, 목적지에 대한 정보를 얻을 수 있습니다.

**Independent Test**: 사용자가 챗봇에 메시지를 보내면 AI 응답을 받을 수 있는지 확인합니다.

### Tests for User Story 8 (선택사항)

- [ ] T068 [P] [US8] 챗봇 메시지 전송 테스트 (`tests/unit/components/ChatBot.test.tsx`)
- [ ] T069 [P] [US8] AI 응답 처리 테스트 (`tests/unit/services/geminiService.test.ts`)

### Implementation for User Story 8

- [ ] T070 [US8] 챗봇 컴포넌트 구현 (`src/components/ChatBot.tsx`) [프로토타입 제외]
- [ ] T071 [US8] 메시지 전송 로직 [프로토타입 제외]
- [ ] T072 [US8] Gemini API 통합 [프로토타입 제외]
- [ ] T073 [US8] 에러 처리 및 재시도 로직 [프로토타입 제외]
- [ ] T074 [US8] 메시지 히스토리 저장 (선택사항) [프로토타입 제외]

**Checkpoint**: 이 시점에서 User Story 8이 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 11: User Story 9 - AI 사진관 (Priority: P3)

**Goal**: 항해 중인 바다의 풍경을 묘사하여 AI로 생성한 엽서 이미지를 만들고 저장합니다.

**Independent Test**: 사용자가 사진관에서 프롬프트를 입력하여 이미지를 생성하고 저장할 수 있는지 확인합니다.

### Tests for User Story 9 (선택사항)

- [ ] T075 [P] [US9] 이미지 생성 테스트 (`tests/unit/services/geminiService.test.ts`)
- [ ] T076 [P] [US9] 사진관 컴포넌트 테스트 (`tests/unit/components/PhotoBooth.test.tsx`)

### Implementation for User Story 9

- [ ] T077 [US9] 사진관 컴포넌트 구현 (`src/components/PhotoBooth.tsx`) [프로토타입 제외]
- [ ] T078 [US9] 이미지 생성 로직 (`src/services/geminiService.ts`) [프로토타입 제외]
- [ ] T079 [US9] 이미지 다운로드 기능 [프로토타입 제외]
- [ ] T080 [US9] 에러 처리 및 재시도 로직 [프로토타입 제외]
- [ ] T081 [US9] 이미지 크기 선택 UI 개선 [프로토타입 제외]

**Checkpoint**: 이 시점에서 User Story 9가 완전히 작동하고 독립적으로 테스트 가능해야 합니다.

---

## Phase 12: Critical Missing Features (P1 - 우선순위 높음)

**Purpose**: 앱의 핵심 가치를 완성하기 위한 필수 기능

### 데이터 영속성 구현 (User Story 10)

- [ ] T082 [P] [US10] localStorage 서비스 구현 (`src/services/storage.ts`)
  - `saveRouteProgress()`: 항로 진행도 저장
  - `loadRouteProgress()`: 항로 진행도 로드
  - `saveTickets()`: 티켓 저장
  - `loadTickets()`: 티켓 로드
  - `savePoints()`: 포인트 저장
  - `loadPoints()`: 포인트 로드
  - `saveSettings()`: 사용자 설정 저장
  - `loadSettings()`: 사용자 설정 로드
  - `saveStatistics()`: 통계 데이터 저장
  - `loadStatistics()`: 통계 데이터 로드
  - `saveRaffleHistory()`: 추첨 이력 저장
  - `loadRaffleHistory()`: 추첨 이력 로드
  - 에러 처리 및 폴백
  - 저장 공간 부족 시 알림

- [ ] T083 [US10] 앱 시작 시 데이터 로드 (`src/App.tsx`)
  - 컴포넌트 마운트 시 저장된 데이터 로드
  - 기본값 설정 (데이터 없을 때)
  - 로딩 상태 표시

- [ ] T084 [US10] 데이터 변경 시 자동 저장
  - 진행도 업데이트 시 저장
  - 티켓 획득 시 저장
  - 포인트 변경 시 저장
  - 설정 변경 시 저장
  - 통계 업데이트 시 저장

### 상품 추첨 시스템 구현 (User Story 11)

- [ ] T085 [P] [US11] 추첨 화면 구현 (`src/components/RaffleScreen.tsx`)
  - 티켓 사용 UI
  - 보유 티켓 개수 표시
  - 추첨 애니메이션
  - 결과 표시
  - 추첨 이력 보기

- [ ] T086 [P] [US11] 추첨 로직 구현 (`src/services/raffle.ts`)
  - 티켓 소모 검증
  - 추첨 풀 관리 (초기에는 하드코딩, 향후 관리자 기능)
  - 확률 계산
  - 당첨/꽝 결정

- [ ] T087 [US11] 추첨 결과 저장
  - 추첨 이력 저장 (localStorage)
  - 상품 정보 저장
  - 추첨 날짜 기록

- [ ] T100 [P] [US11] 추첨 이력 화면 구현 (`src/components/RaffleHistory.tsx`)
  - 과거 추첨 이력 표시
  - 당첨/꽝 결과 표시
  - 날짜별 정렬

---

## Phase 13: User Experience Enhancements (P2)

**Purpose**: 사용자 경험을 개선하는 추가 기능

### 사용자 온보딩 (User Story 12)

- [ ] T088 [P] [US12] 온보딩 화면 구현 (`src/components/OnboardingScreen.tsx`)
  - 첫 실행 감지
  - 앱 소개 슬라이드
  - 사용법 튜토리얼
  - 기본 집중 시간 설정 UI
  - 알림 설정 UI
  - "건너뛰기" 옵션

- [ ] T089 [US12] 온보딩 상태 저장
  - 온보딩 완료 여부 저장 (localStorage)
  - 다시 보지 않기 옵션
  - 설정값 저장

### 통계 및 진행 상황 시각화 (User Story 13)

- [ ] T090 [P] [US13] 통계 화면 구현 (`src/components/StatisticsScreen.tsx`)
  - 일일/주간/월간 집중 시간 차트
  - 완주한 항로 이력
  - 획득한 티켓 총 개수
  - 연속 달성 일수 (Streak) 표시
  - 시각적 차트 및 그래프 (Chart.js 또는 Recharts 사용)

- [ ] T091 [US13] 통계 데이터 수집 서비스 구현 (`src/services/statistics.ts`)
  - 집중 세션 기록
  - 일일 집중 시간 계산
  - 주간/월간 집중 시간 집계
  - Streak 계산 로직
  - 완주한 항로 수 집계

- [ ] T101 [P] [US13] 통계 데이터 저장 및 로드
  - 통계 데이터 localStorage 저장
  - 앱 시작 시 통계 데이터 로드
  - 통계 데이터 업데이트

### 알림 시스템 (User Story 14)

- [ ] T092 [P] [US14] 브라우저 알림 API 통합 (`src/services/notification.ts`)
  - 알림 권한 요청
  - 집중 시간 완료 알림
  - 목적지 도착 알림
  - 일일 목표 달성 알림
  - 알림 권한 상태 확인

- [ ] T093 [US14] 알림 설정 UI (`src/components/NotificationSettings.tsx`)
  - 알림 켜기/끄기 토글
  - 알림 종류별 설정
  - 알림 설정 저장

---

## Phase 14: Polish & Cross-Cutting Concerns

**Purpose**: 여러 사용자 스토리에 영향을 미치는 개선 사항

### 접근성 개선 (User Story 15)

- [ ] T094 [P] [US15] 접근성 기능 구현 (`src/components/AccessibilitySettings.tsx`)
  - 다크 모드 지원 (테마 전환)
  - 폰트 크기 조절 (Small, Medium, Large)
  - 색상 대비 개선 (고대비 모드)
  - 키보드 단축키 지원
  - 스크린 리더 지원 (ARIA 레이블 추가)

- [ ] T102 [US15] 접근성 설정 저장 및 적용
  - 설정 localStorage 저장
  - 앱 시작 시 설정 적용
  - 전역 테마 컨텍스트

### 오프라인 지원 (User Story 16)

- [ ] T103 [P] [US16] 오프라인 상태 감지 (`src/hooks/useOffline.ts`)
  - 온라인/오프라인 상태 감지
  - 오프라인 상태 표시 UI
  - 오프라인 상태 알림

- [ ] T104 [US16] 오프라인 데이터 동기화
  - 오프라인에서 변경된 데이터 추적
  - 온라인 복귀 시 데이터 동기화
  - 충돌 해결 로직

- [ ] T105 [P] [US16] Service Worker 구현 (`public/sw.js`)
  - 정적 리소스 캐싱
  - 오프라인 폴백 페이지
  - 캐시 업데이트 전략

### 에러 처리 개선 (User Story 17)

- [ ] T097 [P] [US17] 전역 에러 바운더리 구현 (`src/components/ErrorBoundary.tsx`)
  - React Error Boundary 사용
  - 에러 발생 시 폴백 UI
  - 에러 로깅 (선택사항)

- [ ] T106 [US17] 사용자 친화적인 에러 메시지
  - 네트워크 오류 메시지
  - 데이터 저장 오류 메시지
  - 재시도 버튼 제공

- [ ] T107 [P] [US17] 에러 로깅 유틸리티 (`src/utils/errorLogger.ts`)
  - 에러 로깅 함수
  - 에러 타입별 처리
  - 에러 리포트 (선택사항)

### 성능 최적화 (User Story 18)

- [ ] T095 [P] [US18] 성능 최적화 구현
  - 이미지 지연 로딩 (`src/components/LazyImage.tsx`)
  - 코드 스플리팅 (React.lazy, Suspense)
  - 비디오 로딩 최적화 (preload, poster 이미지)
  - AI API 호출 최적화 (캐싱)

- [ ] T108 [US18] 성능 모니터링
  - 초기 로딩 시간 측정
  - 화면 전환 시간 측정
  - 성능 메트릭 수집

### 모바일 반응형 개선 (User Story 19)

- [ ] T096 [P] [US19] 모바일 반응형 개선
  - 터치 인터페이스 최적화 (터치 영역 크기 조정)
  - 화면 크기별 레이아웃 조정 (반응형 디자인)
  - 모바일 브라우저 호환성 테스트
  - 스와이프 제스처 지원

- [ ] T109 [US19] PWA 지원 구현
  - manifest.json 생성
  - Service Worker 등록
  - 오프라인 지원
  - 설치 가능한 앱

### 문서화 및 코드 정리

- [ ] T098 [P] 문서화 업데이트
  - README.md 업데이트
  - 사용자 가이드 작성
  - 개발자 문서 작성
  - API 문서 작성

- [ ] T099 [P] 코드 정리 및 리팩토링
  - 중복 코드 제거
  - 컴포넌트 분리
  - 타입 안정성 개선
  - 코드 스타일 통일

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 의존성 없음 - 즉시 시작 가능
- **Foundational (Phase 2)**: Setup 완료 후 시작 - 모든 사용자 스토리 블로킹
- **User Stories (Phase 3-11)**: Foundational 완료 후 시작
  - 병렬 실행 가능 (팀 구성에 따라)
  - 또는 우선순위 순서대로 (P1 → P2 → P3)
- **Critical Missing Features (Phase 12)**: P1 사용자 스토리 완료 후 시작 권장
  - 데이터 영속성 (US10): 모든 스토리에 필요하므로 최우선
  - 상품 추첨 시스템 (US11): 티켓 시스템 완료 후
- **User Experience Enhancements (Phase 13)**: 핵심 기능 완료 후 시작
  - 사용자 온보딩 (US12): 독립적, 첫 실행 시 필요
  - 통계 시각화 (US13): 데이터 영속성 완료 후
  - 알림 시스템 (US14): 독립적
- **Polish (Phase 14)**: 모든 주요 기능 완료 후 시작
  - 접근성 (US15): 독립적
  - 오프라인 지원 (US16): Service Worker 필요
  - 에러 처리 (US17): 전역 개선
  - 성능 최적화 (US18): 전체 최적화
  - 모바일 반응형 (US19): UI 개선

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 완료 후 시작 - 다른 스토리와 독립적
- **User Story 2 (P1)**: User Story 1 완료 후 시작 권장 (진행도 시스템 의존)
- **User Story 3 (P1)**: User Story 2 완료 후 시작 권장 (도착 시스템 의존)
- **User Story 4 (P2)**: Foundational 완료 후 시작 - 독립적
- **User Story 5 (P2)**: User Story 4 완료 후 시작 권장 (포인트 시스템 의존)
- **User Story 6 (P2)**: User Story 1 완료 후 시작 권장 (집중 모드 의존)
- **User Story 7-9 (P3)**: Foundational 완료 후 시작 - 독립적, AI 기능 (프로토타입 제외)
- **User Story 10 (P1)**: Foundational 완료 후 시작 - 데이터 영속성, 모든 스토리에 필요
- **User Story 11 (P1)**: User Story 3 완료 후 시작 권장 - 티켓 시스템 의존
- **User Story 12 (P2)**: Foundational 완료 후 시작 - 독립적, 첫 실행 시 필요
- **User Story 13 (P2)**: User Story 10 완료 후 시작 권장 - 통계 데이터 저장 의존
- **User Story 14 (P2)**: Foundational 완료 후 시작 - 독립적
- **User Story 15-19 (P3)**: 핵심 기능 완료 후 시작 - 개선 사항

### Within Each User Story

- 테스트(포함된 경우)는 구현 전에 작성하고 실패 확인
- 모델/타입 → 서비스 → 컴포넌트 순서
- 핵심 구현 → 통합 순서
- 스토리 완료 후 다음 우선순위로 이동

### Parallel Opportunities

- Setup의 모든 [P] 작업은 병렬 실행 가능
- Foundational의 모든 [P] 작업은 병렬 실행 가능 (Phase 2 내)
- Foundational 완료 후 모든 사용자 스토리는 병렬 시작 가능
- 각 사용자 스토리의 [P] 테스트는 병렬 실행 가능
- 각 사용자 스토리의 [P] 모델/서비스는 병렬 실행 가능
- 다른 사용자 스토리는 다른 팀원이 병렬 작업 가능

---

## Implementation Strategy

### MVP First (User Story 1-3만)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료 (CRITICAL - 모든 스토리 블로킹)
3. Phase 3-5: User Story 1-3 완료
4. **STOP and VALIDATE**: User Story 1-3 독립 테스트
5. Phase 12: 데이터 영속성 및 상품 추첨 시스템 추가
6. 배포/데모 준비

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. User Story 1 → 독립 테스트 → 배포/데모 (기본 MVP)
3. User Story 2 → 독립 테스트 → 배포/데모
4. User Story 3 → 독립 테스트 → 배포/데모
5. 데이터 영속성 → 배포/데모
6. 상품 추첨 시스템 → 배포/데모
7. 각 스토리는 이전 스토리를 깨뜨리지 않으면서 가치 추가

### Parallel Team Strategy

여러 개발자가 있을 경우:

1. 팀이 Setup + Foundational을 함께 완료
2. Foundational 완료 후:
   - Developer A: User Story 1-3 (P1)
   - Developer B: User Story 4-6 (P2)
   - Developer C: 데이터 영속성 및 상품 추첨 시스템
3. 스토리가 독립적으로 완료되고 통합

---

## Notes

- [P] 작업 = 다른 파일, 의존성 없음
- [Story] 레이블은 특정 사용자 스토리로 작업을 매핑하여 추적 가능하게 함
- 각 사용자 스토리는 독립적으로 완료 가능하고 테스트 가능해야 함
- 테스트는 구현 전에 실패 확인
- 각 작업 또는 논리적 그룹 후 커밋
- 모든 체크포인트에서 스토리를 독립적으로 검증
- 피해야 할 것: 모호한 작업, 같은 파일 충돌, 독립성을 깨는 스토리 간 의존성

