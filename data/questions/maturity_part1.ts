/**
 * MET Mythic v2.0 — 성숙도 (Maturity) Part 1
 * Awareness (자각: 동기 인식 수준) 8문항
 * Integration (통합: 동기 조화 수준) 8문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Awareness (자각) 8문항
// ============================================

export const AWARENESS_QUESTIONS: Question[] = [
  {
    id: 'MT_AWR_001',
    type: 'likert',
    category: 'maturity',
    subcategory: 'awareness',
    text: '내가 왜 이런 선택을 하는지 잘 안다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'awareness', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'awareness', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'awareness', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'awareness', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'awareness', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_AWR_002',
    type: 'likert',
    category: 'maturity',
    subcategory: 'awareness',
    text: '나를 움직이는 진짜 이유를 알고 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'awareness', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'awareness', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'awareness', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'awareness', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'awareness', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_AWR_003',
    type: 'likert',
    category: 'maturity',
    subcategory: 'awareness',
    text: '내 감정의 원인을 파악하는 편이다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'emotional', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'emotional', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'emotional', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'emotional', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'emotional', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_AWR_004',
    type: 'likert',
    category: 'maturity',
    subcategory: 'awareness',
    text: '내 약점과 한계를 잘 알고 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'limitation', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'limitation', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'limitation', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'limitation', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'limitation', value: 5 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
  {
    id: 'MT_AWR_005',
    type: 'scenario',
    category: 'maturity',
    subcategory: 'awareness',
    text: '중요한 결정을 내린 후 돌아봤을 때',
    subtext: '당신은 보통 어떻게 하나요?',
    options: [
      { id: 'A', text: '왜 그런 결정을 했는지 분석한다', value: 5, scores: { maturity: 'reflection', value: 5 } },
      { id: 'B', text: '결과만 확인하고 넘어간다', value: 2, scores: { maturity: 'reflection', value: 2 } },
      { id: 'C', text: '별로 생각하지 않는다', value: 1, scores: { maturity: 'reflection', value: 1 } },
      { id: 'D', text: '잘 모르겠다', value: 1, scores: { maturity: 'reflection', value: 1 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_AWR_006',
    type: 'scenario',
    category: 'maturity',
    subcategory: 'awareness',
    text: '갑자기 화가 났을 때',
    subtext: '당신은 보통 어떻게 하나요?',
    options: [
      { id: 'A', text: '왜 화가 났는지 곰곰이 생각한다', value: 5, scores: { maturity: 'emotional', value: 5 } },
      { id: 'B', text: '일단 진정하고 본다', value: 3, scores: { maturity: 'emotional', value: 3 } },
      { id: 'C', text: '그냥 표출한다', value: 1, scores: { maturity: 'emotional', value: 1 } },
      { id: 'D', text: '참고 넘어간다', value: 2, scores: { maturity: 'emotional', value: 2 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
  {
    id: 'MT_AWR_007',
    type: 'bipolar',
    category: 'maturity',
    subcategory: 'awareness',
    text: '나는 내 동기를?',
    options: [
      { id: 'A', text: '잘 이해하고 있다', value: 1, scores: { maturity: 'self_knowledge', value: 5 } },
      { id: 'B', text: '아직 파악 중이다', value: 1, scores: { maturity: 'self_knowledge', value: 2 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_AWR_008',
    type: 'bipolar',
    category: 'maturity',
    subcategory: 'awareness',
    text: '내 행동 패턴을?',
    options: [
      { id: 'A', text: '스스로 잘 안다', value: 1, scores: { maturity: 'pattern', value: 5 } },
      { id: 'B', text: '타인이 더 잘 안다', value: 1, scores: { maturity: 'pattern', value: 2 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
];

// ============================================
// Integration (통합) 8문항
// ============================================

export const INTEGRATION_QUESTIONS: Question[] = [
  {
    id: 'MT_INT_001',
    type: 'likert',
    category: 'maturity',
    subcategory: 'integration',
    text: '서로 다른 욕구들 사이에서 균형을 찾는 편이다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'balance', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'balance', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'balance', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'balance', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'balance', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_INT_002',
    type: 'likert',
    category: 'maturity',
    subcategory: 'integration',
    text: '내면의 갈등을 잘 다루는 편이다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'conflict_mgmt', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'conflict_mgmt', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'conflict_mgmt', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'conflict_mgmt', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'conflict_mgmt', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_INT_003',
    type: 'likert',
    category: 'maturity',
    subcategory: 'integration',
    text: '하고 싶은 것과 해야 하는 것 사이에서 조화를 찾는다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'harmony', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'harmony', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'harmony', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'harmony', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'harmony', value: 5 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_INT_004',
    type: 'likert',
    category: 'maturity',
    subcategory: 'integration',
    text: '단기 욕구와 장기 목표 사이에서 균형을 맞춘다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { maturity: 'temporal', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { maturity: 'temporal', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { maturity: 'temporal', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { maturity: 'temporal', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { maturity: 'temporal', value: 5 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
  {
    id: 'MT_INT_005',
    type: 'scenario',
    category: 'maturity',
    subcategory: 'integration',
    text: '일과 삶 사이에서 갈등이 생겼을 때',
    subtext: '당신은 보통 어떻게 하나요?',
    options: [
      { id: 'A', text: '양쪽 다 만족시키는 방법을 찾는다', value: 5, scores: { maturity: 'synthesis', value: 5 } },
      { id: 'B', text: '우선순위를 정해 하나를 선택한다', value: 3, scores: { maturity: 'synthesis', value: 3 } },
      { id: 'C', text: '상황에 따라 다르다', value: 2, scores: { maturity: 'synthesis', value: 2 } },
      { id: 'D', text: '갈등 상황이 불편해서 피한다', value: 1, scores: { maturity: 'synthesis', value: 1 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_INT_006',
    type: 'scenario',
    category: 'maturity',
    subcategory: 'integration',
    text: '성취 욕구와 관계 욕구가 충돌할 때',
    subtext: '당신은 보통 어떻게 하나요?',
    options: [
      { id: 'A', text: '둘 다 살리는 방법을 찾는다', value: 5, scores: { maturity: 'creative', value: 5 } },
      { id: 'B', text: '하나를 포기한다', value: 2, scores: { maturity: 'creative', value: 2 } },
      { id: 'C', text: '그때그때 다르다', value: 2, scores: { maturity: 'creative', value: 2 } },
      { id: 'D', text: '갈등 자체를 피한다', value: 1, scores: { maturity: 'creative', value: 1 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
  {
    id: 'MT_INT_007',
    type: 'bipolar',
    category: 'maturity',
    subcategory: 'integration',
    text: '내면의 다양한 욕구들이?',
    options: [
      { id: 'A', text: '조화롭게 공존한다', value: 1, scores: { maturity: 'wholeness', value: 5 } },
      { id: 'B', text: '자주 충돌한다', value: 1, scores: { maturity: 'wholeness', value: 2 } },
    ],
    metadata: { layer: 9, isLite: true },
  },
  {
    id: 'MT_INT_008',
    type: 'bipolar',
    category: 'maturity',
    subcategory: 'integration',
    text: '나의 여러 모습이?',
    options: [
      { id: 'A', text: '하나로 통합되어 있다', value: 1, scores: { maturity: 'identity', value: 5 } },
      { id: 'B', text: '상황마다 다르다', value: 1, scores: { maturity: 'identity', value: 2 } },
    ],
    metadata: { layer: 9, isLite: false },
  },
];

// 통합 export
export const MATURITY_PART1_QUESTIONS = [
  ...AWARENESS_QUESTIONS,
  ...INTEGRATION_QUESTIONS,
];

export default MATURITY_PART1_QUESTIONS;
