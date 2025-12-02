/**
 * MET Mythic v2.0 — 성숙도 (Maturity) Part 2 + 검증 (Validation)
 * Growth (성장: 동기 발달 수준) 8문항
 * Validation (검증: 일관성/정직성) 12문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Growth (성장) 8문항
// ============================================

export const GROWTH_MATURITY_QUESTIONS: Question[] = [
  {
    id: 'MT_GRW_001',
    type: 'likert',
    category: 'maturity',
    subcategory: 'growth',
    text: '시간이 지나면서 나 자신을 더 잘 이해하게 되었다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'self_growth', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'self_growth', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'self_growth', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'self_growth', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'self_growth', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_GRW_002',
    type: 'likert',
    category: 'maturity',
    subcategory: 'growth',
    text: '예전보다 감정을 더 잘 다룬다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'emotional_growth', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'emotional_growth', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'emotional_growth', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'emotional_growth', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'emotional_growth', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_GRW_003',
    type: 'likert',
    category: 'maturity',
    subcategory: 'growth',
    text: '과거의 실수에서 배운 것들이 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'learning', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'learning', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'learning', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'learning', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'learning', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_GRW_004',
    type: 'likert',
    category: 'maturity',
    subcategory: 'growth',
    text: '나의 한계를 인정하면서도 성장하려고 노력한다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'acceptance', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'acceptance', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'acceptance', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'acceptance', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'acceptance', value: 5 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
  {
    id: 'MT_GRW_005',
    type: 'scenario',
    category: 'maturity',
    subcategory: 'growth',
    text: '5년 전의 나와 지금의 나를 비교하면',
    subtext: '가장 크게 달라진 것은?',
    options: [
      { id: 'A', text: '나 자신을 더 잘 안다', value: 5, scores: { maturity: 'self_awareness', value: 5 } },
      { id: 'B', text: '감정 조절을 더 잘한다', value: 4, scores: { maturity: 'regulation', value: 4 } },
      { id: 'C', text: '별로 달라지지 않았다', value: 1, scores: { maturity: 'stagnant', value: 1 } },
      { id: 'D', text: '잘 모르겠다', value: 1, scores: { maturity: 'unclear', value: 1 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_GRW_006',
    type: 'scenario',
    category: 'maturity',
    subcategory: 'growth',
    text: '어려운 상황을 겪은 후',
    subtext: '당신은 보통 어떤 변화가 있나요?',
    options: [
      { id: 'A', text: '한 단계 성장한 느낌이 든다', value: 5, scores: { maturity: 'resilience', value: 5 } },
      { id: 'B', text: '새로운 관점을 얻는다', value: 4, scores: { maturity: 'perspective', value: 4 } },
      { id: 'C', text: '힘들기만 했다', value: 1, scores: { maturity: 'struggle', value: 1 } },
      { id: 'D', text: '별 변화 없다', value: 1, scores: { maturity: 'static', value: 1 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
  {
    id: 'MT_GRW_007',
    type: 'bipolar',
    category: 'maturity',
    subcategory: 'growth',
    text: '나는 계속?',
    options: [
      { id: 'A', text: '성장하고 있다', value: 1, scores: { maturity: 'growing', value: 5 } },
      { id: 'B', text: '제자리인 것 같다', value: 1, scores: { maturity: 'growing', value: 2 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_GRW_008',
    type: 'bipolar',
    category: 'maturity',
    subcategory: 'growth',
    text: '인생의 어려움이?',
    options: [
      { id: 'A', text: '나를 성장시켰다', value: 1, scores: { maturity: 'adversity', value: 5 } },
      { id: 'B', text: '힘들기만 했다', value: 1, scores: { maturity: 'adversity', value: 2 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
];

// ============================================
// Validation - Consistency (일관성 검증) 6문항
// ============================================

export const CONSISTENCY_QUESTIONS: Question[] = [
  {
    id: 'VL_CON_001',
    type: 'likert',
    category: 'validation',
    subcategory: 'consistency',
    text: '목표 달성이 중요하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { check: 'achievement', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { check: 'achievement', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { check: 'achievement', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { check: 'achievement', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { check: 'achievement', value: 5 } },
    ],
    metadata: { layer: 10, isLite: true, checkAgainst: 'MS_ACH' },
  },
  {
    id: 'VL_CON_002',
    type: 'likert',
    category: 'validation',
    subcategory: 'consistency',
    text: '깊이 있게 이해하는 것이 중요하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { check: 'mastery', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { check: 'mastery', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { check: 'mastery', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { check: 'mastery', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { check: 'mastery', value: 5 } },
    ],
    metadata: { layer: 10, isLite: true, checkAgainst: 'MS_MAS' },
  },
  {
    id: 'VL_CON_003',
    type: 'likert',
    category: 'validation',
    subcategory: 'consistency',
    text: '사람들과의 관계가 중요하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { check: 'connection', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { check: 'connection', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { check: 'connection', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { check: 'connection', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { check: 'connection', value: 5 } },
    ],
    metadata: { layer: 10, isLite: true, checkAgainst: 'MS_CON' },
  },
  {
    id: 'VL_CON_004',
    type: 'likert',
    category: 'validation',
    subcategory: 'consistency',
    text: '안정적인 환경이 중요하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { check: 'security', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { check: 'security', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { check: 'security', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { check: 'security', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { check: 'security', value: 5 } },
    ],
    metadata: { layer: 10, isLite: false, checkAgainst: 'MS_SEC' },
  },
  {
    id: 'VL_CON_005',
    type: 'likert',
    category: 'validation',
    subcategory: 'consistency',
    text: '자유롭게 살고 싶다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { check: 'freedom', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { check: 'freedom', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { check: 'freedom', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { check: 'freedom', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { check: 'freedom', value: 5 } },
    ],
    metadata: { layer: 10, isLite: false, checkAgainst: 'MS_FRE' },
  },
  {
    id: 'VL_CON_006',
    type: 'likert',
    category: 'validation',
    subcategory: 'consistency',
    text: '새로운 경험이 중요하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { check: 'adventure', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { check: 'adventure', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { check: 'adventure', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { check: 'adventure', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { check: 'adventure', value: 5 } },
    ],
    metadata: { layer: 10, isLite: false, checkAgainst: 'MS_ADV' },
  },
];

// ============================================
// Validation - Honesty (정직성 검증) 6문항
// ============================================

export const HONESTY_QUESTIONS: Question[] = [
  {
    id: 'VL_HON_001',
    type: 'likert',
    category: 'validation',
    subcategory: 'honesty',
    text: '나는 항상 약속을 지킨다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { honesty: 'promise', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { honesty: 'promise', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { honesty: 'promise', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { honesty: 'promise', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { honesty: 'promise', value: 5 } },
    ],
    metadata: { layer: 10, isLite: true, socialDesirability: true },
  },
  {
    id: 'VL_HON_002',
    type: 'likert',
    category: 'validation',
    subcategory: 'honesty',
    text: '나는 한 번도 거짓말을 한 적이 없다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { honesty: 'lie', value: 5 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { honesty: 'lie', value: 4 } },
      { id: '3', text: '보통이다', value: 3, scores: { honesty: 'lie', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { honesty: 'lie', value: 2 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { honesty: 'lie', value: 1 } },
    ],
    metadata: { layer: 10, isLite: true, socialDesirability: true },
  },
  {
    id: 'VL_HON_003',
    type: 'likert',
    category: 'validation',
    subcategory: 'honesty',
    text: '나는 모든 사람을 똑같이 대한다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { honesty: 'equal', value: 5 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { honesty: 'equal', value: 4 } },
      { id: '3', text: '보통이다', value: 3, scores: { honesty: 'equal', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { honesty: 'equal', value: 2 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { honesty: 'equal', value: 1 } },
    ],
    metadata: { layer: 10, isLite: true, socialDesirability: true },
  },
  {
    id: 'VL_HON_004',
    type: 'likert',
    category: 'validation',
    subcategory: 'honesty',
    text: '나는 남의 흉을 본 적이 없다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { honesty: 'gossip', value: 5 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { honesty: 'gossip', value: 4 } },
      { id: '3', text: '보통이다', value: 3, scores: { honesty: 'gossip', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { honesty: 'gossip', value: 2 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { honesty: 'gossip', value: 1 } },
    ],
    metadata: { layer: 10, isLite: false, socialDesirability: true },
  },
  {
    id: 'VL_HON_005',
    type: 'likert',
    category: 'validation',
    subcategory: 'honesty',
    text: '나는 화가 나도 절대 표현하지 않는다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { honesty: 'anger', value: 5 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { honesty: 'anger', value: 4 } },
      { id: '3', text: '보통이다', value: 3, scores: { honesty: 'anger', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { honesty: 'anger', value: 2 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { honesty: 'anger', value: 1 } },
    ],
    metadata: { layer: 10, isLite: false, socialDesirability: true },
  },
  {
    id: 'VL_HON_006',
    type: 'likert',
    category: 'validation',
    subcategory: 'honesty',
    text: '이 검사에 솔직하게 응답했다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { honesty: 'self_report', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { honesty: 'self_report', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { honesty: 'self_report', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { honesty: 'self_report', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { honesty: 'self_report', value: 5 } },
    ],
    metadata: { layer: 10, isLite: true, selfReport: true },
  },
];

// 통합 export
export const MATURITY_PART2_QUESTIONS = GROWTH_MATURITY_QUESTIONS;

export const VALIDATION_QUESTIONS = [
  ...CONSISTENCY_QUESTIONS,
  ...HONESTY_QUESTIONS,
];

export default [...MATURITY_PART2_QUESTIONS, ...VALIDATION_QUESTIONS];
