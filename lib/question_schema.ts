/**
 * MET Mythic v2.0 — 문항 스키마
 * 
 * 300문항 (Full) / 100문항 (Lite) 구조 정의
 */

import type { 
  MotiveSource, 
  IgnitionCondition, 
  OperationAxis,
  ContextType,
  Direction 
} from './types';

// ============================================
// 문항 카테고리 정의
// ============================================

export type QuestionCategory = 
  | 'motive_source'      // 동기 원천 (80문항)
  | 'ignition'           // 점화 조건 (30문항)
  | 'direction'          // 방향 (32문항)
  | 'operation'          // 동기 운영 (24문항)
  | 'energy'             // 에너지 흐름 (20문항)
  | 'conflict'           // 동기 충돌 (20문항)
  | 'context'            // 상황 변화 (30문항)
  | 'shadow'             // 숨겨진 동기 (24문항)
  | 'contamination'      // 동기 오염 (12문항)
  | 'maturity'           // 성숙도 (12문항)
  | 'archetype'          // 원형 층위 (8문항)
  | 'validation';        // 검증 (8문항)

// ============================================
// 문항 유형 정의
// ============================================

export type QuestionType = 
  | 'choice'      // 4지선다 - 각 선택지가 다른 동기에 매핑
  | 'likert'      // 리커트 5점 - 동의 정도
  | 'scenario'    // 시나리오 - 상황 제시 후 반응
  | 'bipolar';    // 양극 선택 - 두 동기 중 선택

// ============================================
// 문항 인터페이스
// ============================================

export interface Question {
  id: string;                           // 고유 ID (예: 'MS_ACH_001')
  category: QuestionCategory;
  subcategory: string;                  // 세부 카테고리 (예: 'achievement')
  type: QuestionType;
  
  text: string;                         // 문항 텍스트
  subtext?: string;                     // 부가 설명
  
  options: QuestionOption[];
  
  metadata: {
    layer: number;                      // 15레이어 중 해당 레이어
    isLite: boolean;                    // Lite 버전 포함 여부
    isTrap?: boolean;                   // 함정 문항 여부
    context?: ContextType;              // 상황 (평상시/압박/번아웃)
    pairWith?: string;                  // 쌍 문항 ID (검증용)
  };
}

export interface QuestionOption {
  id: string;                           // 선택지 ID (예: 'A', 'B', 'C', 'D')
  text: string;                         // 선택지 텍스트
  
  // 점수 매핑
  scores: {
    motive?: MotiveSource;              // 해당 동기
    value: number;                      // 점수 (1-5 또는 가중치)
    direction?: Direction;              // 접근/회피
  };
}

// ============================================
// 문항 배분 (마스터 플랜 기준)
// ============================================

export const QUESTION_DISTRIBUTION = {
  motive_source: {
    total: 80,
    lite: 40,
    perItem: 10,  // 8개 원천 × 10문항
    items: ['achievement', 'mastery', 'creation', 'recognition', 
            'connection', 'security', 'freedom', 'adventure'] as MotiveSource[],
  },
  ignition: {
    total: 30,
    lite: 15,
    perItem: 5,   // 6개 조건 × 5문항
    items: ['competition', 'complexity', 'deadline', 
            'audience', 'autonomy', 'crisis'] as IgnitionCondition[],
  },
  direction: {
    total: 32,
    lite: 16,
    perItem: 4,   // 8개 원천 × 4문항
    items: ['achievement', 'mastery', 'creation', 'recognition', 
            'connection', 'security', 'freedom', 'adventure'] as MotiveSource[],
  },
  operation: {
    total: 24,
    lite: 12,
    perItem: 6,   // 4축 × 6문항
    items: ['rhythm', 'recharge', 'release', 'recovery'] as OperationAxis[],
  },
  energy: {
    total: 20,
    lite: 8,
    breakdown: { fuel: 10, drain: 10 },
  },
  conflict: {
    total: 20,
    lite: 0,      // Full only
    perPair: 2,   // 10개 충돌 조합 × 2문항
  },
  context: {
    total: 30,
    lite: 0,      // Full only
    perContext: 10, // 3개 상황 × 10문항
    items: ['normal', 'pressure', 'burnout'] as ContextType[],
  },
  shadow: {
    total: 24,
    lite: 5,      // 최소한의 함정 문항
    perItem: 3,   // 8개 원천 × 3문항
  },
  contamination: {
    total: 12,
    lite: 0,      // Full only
  },
  maturity: {
    total: 12,
    lite: 4,
  },
  archetype: {
    total: 8,
    lite: 0,      // Full only
  },
  validation: {
    total: 8,
    lite: 0,      // Full only
  },
};

// 총합 검증
export const TOTAL_FULL = Object.values(QUESTION_DISTRIBUTION)
  .reduce((sum, cat) => sum + cat.total, 0);  // 300

export const TOTAL_LITE = Object.values(QUESTION_DISTRIBUTION)
  .reduce((sum, cat) => sum + cat.lite, 0);   // 100

// ============================================
// 문항 ID 생성 헬퍼
// ============================================

/**
 * 문항 ID 생성
 * @param category 카테고리 (예: 'motive_source')
 * @param subcategory 세부 카테고리 (예: 'achievement')
 * @param index 순번 (1-based)
 * @returns ID (예: 'MS_ACH_001')
 */
export function generateQuestionId(
  category: QuestionCategory,
  subcategory: string,
  index: number
): string {
  const categoryPrefix: Record<QuestionCategory, string> = {
    motive_source: 'MS',
    ignition: 'IG',
    direction: 'DR',
    operation: 'OP',
    energy: 'EN',
    conflict: 'CF',
    context: 'CX',
    shadow: 'SH',
    contamination: 'CT',
    maturity: 'MT',
    archetype: 'AR',
    validation: 'VL',
  };
  
  const subPrefix = subcategory.substring(0, 3).toUpperCase();
  const num = index.toString().padStart(3, '0');
  
  return `${categoryPrefix[category]}_${subPrefix}_${num}`;
}

// ============================================
// 문항 설계 원칙 (마스터 플랜 기준)
// ============================================

export const QUESTION_PRINCIPLES = {
  // 동기 중심 문항 설계
  motiveVsPersonality: {
    wrong: "데드라인 전, 당신은?",                    // 성향 측정 ❌
    correct: "마감 전날, 무엇이 당신을 움직이게 했는가?",  // 동기 측정 ✅
  },
  
  // 4지선다 예시 (각 선택지가 다른 동기)
  choiceExample: {
    text: "복잡한 문제를 만났을 때 가장 먼저 드는 느낌은?",
    options: [
      { id: 'A', text: "풀고 싶다, 재밌겠다", motive: 'mastery' },
      { id: 'B', text: "빨리 해결하고 싶다", motive: 'achievement' },
      { id: 'C', text: "새로운 방법을 찾고 싶다", motive: 'creation' },
      { id: 'D', text: "누가 도와줬으면", motive: 'connection' },
    ],
  },
  
  // 리커트 예시
  likertExample: {
    text: "목표가 명확할 때 에너지가 난다",
    options: [
      { value: 1, text: "전혀 그렇지 않다" },
      { value: 2, text: "그렇지 않다" },
      { value: 3, text: "보통이다" },
      { value: 4, text: "그렇다" },
      { value: 5, text: "매우 그렇다" },
    ],
    motive: 'achievement',
  },
  
  // 시나리오 예시
  scenarioExample: {
    text: "프로젝트가 끝났습니다. 가장 먼저 드는 생각은?",
    subtext: "가장 솔직한 첫 반응을 선택하세요.",
    options: [
      { id: 'A', text: "해냈다!", motive: 'achievement' },
      { id: 'B', text: "뭘 배웠지?", motive: 'mastery' },
      { id: 'C', text: "다음엔 뭘 하지?", motive: 'adventure' },
      { id: 'D', text: "쉬고 싶다", motive: 'security' },
    ],
  },
  
  // 양극 선택 예시 (방향/충돌 측정용)
  bipolarExample: {
    text: "마감이 다가올 때...",
    options: [
      { id: 'A', text: "끝내면 성취감 느낄 거야", direction: 'approach' },
      { id: 'B', text: "못 끝내면 창피해", direction: 'avoidance' },
    ],
    motive: 'achievement',
  },
};

export default {
  QUESTION_DISTRIBUTION,
  TOTAL_FULL,
  TOTAL_LITE,
  generateQuestionId,
  QUESTION_PRINCIPLES,
};
