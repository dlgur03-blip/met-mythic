/**
 * MET Mythic v2.0 — Freedom (자유) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const FREEDOM_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_FRE_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '일할 때 가장 중요한 것은?',
    options: [
      { id: 'A', text: '내 방식대로 할 수 있는 자유', value: 1, scores: { motive: 'freedom', value: 1 } },
      { id: 'B', text: '명확한 목표와 성과', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '안정적인 환경', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'D', text: '좋은 동료들', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_FRE_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '이상적인 하루는?',
    options: [
      { id: 'A', text: '아무 계획 없이 하고 싶은 대로', value: 1, scores: { motive: 'freedom', value: 1 } },
      { id: 'B', text: '계획한 일을 다 끝낸 날', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '새로운 곳을 탐험한 날', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'D', text: '좋아하는 사람들과 보낸 날', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_FRE_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '직장을 그만두고 싶어지는 순간은?',
    options: [
      { id: 'A', text: '사소한 것까지 간섭받을 때', value: 1, scores: { motive: 'freedom', value: 1 } },
      { id: 'B', text: '성과를 내도 인정받지 못할 때', value: 1, scores: { motive: 'recognition', value: 1 } },
      { id: 'C', text: '배울 게 없다고 느낄 때', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '동료들과 안 맞을 때', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_FRE_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '스스로 결정할 수 있을 때 에너지가 난다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'freedom', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'freedom', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'freedom', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'freedom', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_FRE_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '틀에 박히지 않은 방식이 좋다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'freedom', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'freedom', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'freedom', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'freedom', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_FRE_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '누구의 눈치도 안 보는 상태가 이상적이다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'freedom', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'freedom', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'freedom', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'freedom', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_FRE_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '이래라저래라 하면 답답하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'freedom', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'freedom', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'freedom', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'freedom', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_FRE_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '통제당하는 느낌이 들면 힘이 빠진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'freedom', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'freedom', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'freedom', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'freedom', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_FRE_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '상사가 "이 방식대로만 해"라고 지시했습니다. 하지만 더 좋은 방법이 보입니다.',
    subtext: '당신의 반응은?',
    options: [
      { id: 'A', text: '내 방식으로 해보고 싶다', value: 1, scores: { motive: 'freedom', value: 1 } },
      { id: 'B', text: '일단 시키는 대로 한다', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'C', text: '더 좋은 방법을 제안해본다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '결과만 좋으면 방법은 상관없다', value: 1, scores: { motive: 'achievement', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_FRE_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '연봉이 20% 높지만 규칙이 많은 회사 vs 연봉은 그대로지만 자유로운 회사',
    subtext: '선택한다면?',
    options: [
      { id: 'A', text: '자유로운 회사', value: 1, scores: { motive: 'freedom', value: 1 } },
      { id: 'B', text: '연봉 높은 회사', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'C', text: '성장 기회가 더 많은 쪽', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '사람들이 더 좋은 쪽', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default FREEDOM_QUESTIONS;
