/**
 * MET Mythic v2.0 — 에너지 흐름 (Energy Flow) Part 1
 * Fuel (연료: 에너지 충전) 10문항 + Drain (소모: 에너지 방전) 4문항 = 14문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Fuel (연료: 에너지 충전 요소) 10문항
// ============================================

export const FUEL_QUESTIONS: Question[] = [
  {
    id: 'EN_FUE_001',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '새로운 아이디어가 떠오르면 에너지가 난다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'creation', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'creation', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'creation', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'creation', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'creation', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FUE_002',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '목표를 달성하면 힘이 솟는다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'achievement', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'achievement', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'achievement', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'achievement', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'achievement', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FUE_003',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '깊이 이해하면 충전되는 느낌이다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'mastery', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'mastery', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'mastery', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'mastery', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'mastery', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FUE_004',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '인정받으면 더 열심히 하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'recognition', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'recognition', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'recognition', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'recognition', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'recognition', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FUE_005',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '좋은 대화를 나누면 에너지가 충전된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'connection', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'connection', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'connection', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'connection', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'connection', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FUE_006',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '안정적인 상황에서 편안한 에너지가 생긴다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'security', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'security', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'security', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'security', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'security', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_FUE_007',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '자유롭게 할 수 있을 때 활력이 생긴다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'freedom', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'freedom', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'freedom', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'freedom', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'freedom', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_FUE_008',
    type: 'likert',
    category: 'energy',
    subcategory: 'fuel',
    text: '새로운 경험을 하면 살아있는 느낌이 든다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { source: 'adventure', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { source: 'adventure', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { source: 'adventure', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { source: 'adventure', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { source: 'adventure', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
  {
    id: 'EN_FUE_009',
    type: 'scenario',
    category: 'energy',
    subcategory: 'fuel',
    text: '어떤 하루를 보냈을 때 에너지가 남아있나요?',
    subtext: '가장 해당하는 것을 고르세요.',
    options: [
      { id: 'A', text: '뭔가 해냈을 때', value: 1, scores: { source: 'achievement', value: 1 } },
      { id: 'B', text: '새로운 걸 배웠을 때', value: 1, scores: { source: 'mastery', value: 1 } },
      { id: 'C', text: '사람들과 좋은 시간을 보냈을 때', value: 1, scores: { source: 'connection', value: 1 } },
      { id: 'D', text: '내 마음대로 보냈을 때', value: 1, scores: { source: 'freedom', value: 1 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_FUE_010',
    type: 'scenario',
    category: 'energy',
    subcategory: 'fuel',
    text: '일주일 휴가가 주어졌습니다. 에너지를 채우려면?',
    subtext: '가장 끌리는 것은?',
    options: [
      { id: 'A', text: '새로운 곳 탐험하기', value: 1, scores: { source: 'adventure', value: 1 } },
      { id: 'B', text: '관심사에 깊이 빠져들기', value: 1, scores: { source: 'mastery', value: 1 } },
      { id: 'C', text: '소중한 사람들과 시간 보내기', value: 1, scores: { source: 'connection', value: 1 } },
      { id: 'D', text: '아무것도 안 하고 푹 쉬기', value: 1, scores: { source: 'security', value: 1 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
];

// ============================================
// Drain (소모: 에너지 방전 요소) Part1 - 4문항
// ============================================

export const DRAIN_PART1_QUESTIONS: Question[] = [
  {
    id: 'EN_DRN_001',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '반복적인 일을 하면 힘이 빠진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'routine', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'routine', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'routine', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'routine', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'routine', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_DRN_002',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '의미 없는 회의를 하면 지친다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'meaningless', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'meaningless', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'meaningless', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'meaningless', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'meaningless', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_DRN_003',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '간섭을 많이 받으면 에너지가 소모된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'control', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'control', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'control', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'control', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'control', value: 5 } },
    ],
    metadata: { layer: 5, isLite: true },
  },
  {
    id: 'EN_DRN_004',
    type: 'likert',
    category: 'energy',
    subcategory: 'drain',
    text: '갈등 상황이 오래가면 지친다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { drain: 'conflict', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { drain: 'conflict', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { drain: 'conflict', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { drain: 'conflict', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { drain: 'conflict', value: 5 } },
    ],
    metadata: { layer: 5, isLite: false },
  },
];

// 통합 export
export const ENERGY_PART1_QUESTIONS = [
  ...FUEL_QUESTIONS,
  ...DRAIN_PART1_QUESTIONS,
];

export default ENERGY_PART1_QUESTIONS;
