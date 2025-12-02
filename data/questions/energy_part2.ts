/**
 * MET Mythic v2.0 — 에너지 흐름 (Energy Flow) Part 2
 * Drain (소모) 추가 6문항 + Flow (흐름 패턴) 10문항 = 16문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Drain (소모) 추가 6문항
// ============================================

export const DRAIN_PART2_QUESTIONS: Question[] = [
  {
    id: 'EN_DRN_005',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '인정받지 못하면 의욕이 떨어진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'unrecognized', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'unrecognized', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'unrecognized', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'unrecognized', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'unrecognized', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_DRN_006',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '혼자 오래 있으면 에너지가 빠진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'isolation', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'isolation', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'isolation', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'isolation', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'isolation', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_DRN_007',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '불확실한 상황이 길어지면 지친다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'uncertainty', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'uncertainty', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'uncertainty', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'uncertainty', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'uncertainty', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_DRN_008',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '성과가 안 나오면 힘이 빠진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'no_progress', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'no_progress', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'no_progress', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'no_progress', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'no_progress', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_DRN_009',
    type: 'scenario',
    category: 'energy',
    subcategory: 'drain',
    text: '어떤 하루를 보내면 완전히 지쳐있나요?',
    subtext: '가장 해당하는 것을 고르세요.',
    options: [
      { id: 'A', text: '의미 없는 일만 반복한 날', value: 1, scores: { drain: 'meaningless', value: 1 } },
      { id: 'B', text: '갈등이 많았던 날', value: 1, scores: { drain: 'conflict', value: 1 } },
      { id: 'C', text: '아무것도 못 해낸 날', value: 1, scores: { drain: 'no_progress', value: 1 } },
      { id: 'D', text: '통제만 당한 날', value: 1, scores: { drain: 'control', value: 1 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_DRN_010',
    type: 'scenario',
    category: 'energy',
    subcategory: 'drain',
    text: '일주일간 가장 에너지를 뺏는 상황은?',
    subtext: '가장 해당하는 것을 고르세요.',
    options: [
      { id: 'A', text: '똑같은 일만 반복', value: 1, scores: { drain: 'routine', value: 1 } },
      { id: 'B', text: '인정받지 못함', value: 1, scores: { drain: 'unrecognized', value: 1 } },
      { id: 'C', text: '혼자서만 일함', value: 1, scores: { drain: 'isolation', value: 1 } },
      { id: 'D', text: '뭘 해야 할지 불확실', value: 1, scores: { drain: 'uncertainty', value: 1 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
];

// ============================================
// Flow (흐름 패턴) 10문항
// ============================================

export const FLOW_QUESTIONS: Question[] = [
  {
    id: 'EN_FLO_001',
    type: 'likert',
    category: 'energy',
    subcategory: 'flow',
    text: '몰입하면 시간 가는 줄 모른다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { flow: 'depth', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { flow: 'depth', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { flow: 'depth', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { flow: 'depth', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { flow: 'depth', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FLO_002',
    type: 'likert',
    category: 'energy',
    subcategory: 'flow',
    text: '적당한 도전이 있을 때 가장 잘 몰입한다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { flow: 'challenge', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { flow: 'challenge', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { flow: 'challenge', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { flow: 'challenge', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { flow: 'challenge', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FLO_003',
    type: 'likert',
    category: 'energy',
    subcategory: 'flow',
    text: '목표가 명확할 때 집중이 잘 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { flow: 'clarity', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { flow: 'clarity', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { flow: 'clarity', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { flow: 'clarity', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { flow: 'clarity', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FLO_004',
    type: 'likert',
    category: 'energy',
    subcategory: 'flow',
    text: '피드백이 바로 오면 더 몰입하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { flow: 'feedback', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { flow: 'feedback', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { flow: 'feedback', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { flow: 'feedback', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { flow: 'feedback', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_FLO_005',
    type: 'likert',
    category: 'energy',
    subcategory: 'flow',
    text: '방해 없는 환경에서 몰입이 잘 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { flow: 'uninterrupted', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { flow: 'uninterrupted', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { flow: 'uninterrupted', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { flow: 'uninterrupted', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { flow: 'uninterrupted', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_FLO_006',
    type: 'likert',
    category: 'energy',
    subcategory: 'flow',
    text: '내가 좋아하는 일을 할 때 자연스럽게 몰입된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { flow: 'intrinsic', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { flow: 'intrinsic', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { flow: 'intrinsic', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { flow: 'intrinsic', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { flow: 'intrinsic', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_FLO_007',
    type: 'scenario',
    category: 'energy',
    subcategory: 'flow',
    text: '가장 몰입이 잘 됐던 경험을 떠올려보세요.',
    subtext: '그때 무엇이 있었나요?',
    options: [
      { id: 'A', text: '적당히 어려운 과제', value: 1, scores: { flow: 'challenge', value: 1 } },
      { id: 'B', text: '명확한 목표', value: 1, scores: { flow: 'clarity', value: 1 } },
      { id: 'C', text: '즉각적인 피드백', value: 1, scores: { flow: 'feedback', value: 1 } },
      { id: 'D', text: '방해 없는 환경', value: 1, scores: { flow: 'uninterrupted', value: 1 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FLO_008',
    type: 'scenario',
    category: 'energy',
    subcategory: 'flow',
    text: '몰입이 깨지는 가장 큰 이유는?',
    subtext: '가장 해당하는 것을 고르세요.',
    options: [
      { id: 'A', text: '갑자기 들어오는 연락/알림', value: 1, scores: { flow: 'interruption', value: 1 } },
      { id: 'B', text: '뭘 해야 할지 모를 때', value: 1, scores: { flow: 'ambiguity', value: 1 } },
      { id: 'C', text: '너무 쉽거나 너무 어려울 때', value: 1, scores: { flow: 'mismatch', value: 1 } },
      { id: 'D', text: '결과가 안 보일 때', value: 1, scores: { flow: 'no_feedback', value: 1 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FLO_009',
    type: 'bipolar',
    category: 'energy',
    subcategory: 'flow',
    text: '몰입할 때 나는?',
    options: [
      { id: 'A', text: '한 가지에 깊이 파고든다', value: 1, scores: { flow: 'deep', value: 1 } },
      { id: 'B', text: '여러 가지를 넘나든다', value: 1, scores: { flow: 'wide', value: 1 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FLO_010',
    type: 'bipolar',
    category: 'energy',
    subcategory: 'flow',
    text: '몰입 상태에 들어가는 방식은?',
    options: [
      { id: 'A', text: '천천히 워밍업 후 진입', value: 1, scores: { flow: 'gradual', value: 1 } },
      { id: 'B', text: '바로 스위치 온', value: 1, scores: { flow: 'instant', value: 1 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
];

// 통합 export
export const ENERGY_PART2_QUESTIONS = [
  ...DRAIN_PART2_QUESTIONS,
  ...FLOW_QUESTIONS,
];

export default ENERGY_PART2_QUESTIONS;
