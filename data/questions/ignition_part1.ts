/**
 * MET Mythic v2.0 — 점화 조건 Part 1
 * Competition(5) + Complexity(5) = 10문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Competition (경쟁) 5문항
// ============================================

export const COMPETITION_QUESTIONS: Question[] = [
  {
    id: 'IG_CMP_001',
    type: 'likert',
    category: 'ignition',
    subcategory: 'competition',
    text: '경쟁자가 있으면 더 집중하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CMP_002',
    type: 'likert',
    category: 'ignition',
    subcategory: 'competition',
    text: '"이기고 싶다"는 마음이 나를 움직인다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CMP_003',
    type: 'likert',
    category: 'ignition',
    subcategory: 'competition',
    text: '순위가 매겨지면 더 열심히 하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
  {
    id: 'IG_CMP_004',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'competition',
    text: '동료가 먼저 승진했습니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '나도 더 열심히 해야겠다 (불 붙음)', value: 5, scores: { value: 5 } },
      { id: 'B', text: '축하하지만 약간 아쉽다', value: 3, scores: { value: 3 } },
      { id: 'C', text: '내 페이스대로 하면 된다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '별 느낌 없다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CMP_005',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'competition',
    text: '팀 내 실적 순위가 공개됩니다.',
    subtext: '이때 드는 반응은?',
    options: [
      { id: 'A', text: '더 열심히 하게 된다', value: 5, scores: { value: 5 } },
      { id: 'B', text: '신경은 쓰이지만 딱히...', value: 3, scores: { value: 3 } },
      { id: 'C', text: '스트레스만 받는다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '관심 없다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
];

// ============================================
// Complexity (복잡성) 5문항
// ============================================

export const COMPLEXITY_QUESTIONS: Question[] = [
  {
    id: 'IG_CPX_001',
    type: 'likert',
    category: 'ignition',
    subcategory: 'complexity',
    text: '복잡한 문제일수록 더 집중하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CPX_002',
    type: 'likert',
    category: 'ignition',
    subcategory: 'complexity',
    text: '"어려운 문제"라는 말에 오히려 끌린다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CPX_003',
    type: 'likert',
    category: 'ignition',
    subcategory: 'complexity',
    text: '단순한 일은 금방 지루해진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
  {
    id: 'IG_CPX_004',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'complexity',
    text: '상사가 "이건 정말 복잡한 문제야"라고 했습니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '재밌겠다, 해보고 싶다', value: 5, scores: { value: 5 } },
      { id: 'B', text: '도전해볼 만하다', value: 4, scores: { value: 4 } },
      { id: 'C', text: '좀 부담된다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '피하고 싶다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CPX_005',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'complexity',
    text: '쉬운 업무 vs 복잡하지만 도전적인 업무, 선택할 수 있다면?',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '복잡한 쪽, 그래야 재밌다', value: 5, scores: { value: 5 } },
      { id: 'B', text: '복잡한 쪽, 성장할 수 있으니까', value: 4, scores: { value: 4 } },
      { id: 'C', text: '쉬운 쪽, 효율적이니까', value: 2, scores: { value: 2 } },
      { id: 'D', text: '쉬운 쪽, 스트레스 적으니까', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
];

// 통합 export
export const IGNITION_PART1_QUESTIONS = [
  ...COMPETITION_QUESTIONS,
  ...COMPLEXITY_QUESTIONS,
];

export default IGNITION_PART1_QUESTIONS;
