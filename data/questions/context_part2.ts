/**
 * MET Mythic v2.0 — 상황 변화 (Context) Part 2
 * Growth (성장 상황) 5문항 + Crisis (위기 상황) 5문항 = 10문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Growth (성장 상황) 5문항
// ============================================

export const GROWTH_QUESTIONS: Question[] = [
  {
    id: 'CX_GRO_001',
    type: 'choice',
    category: 'context',
    subcategory: 'growth',
    text: '새로운 기회가 왔을 때 가장 중요하게 보는 것은?',
    options: [
      { id: 'A', text: '성과를 낼 수 있는지', value: 1, scores: { context: 'growth', motive: 'achievement', value: 1 } },
      { id: 'B', text: '배울 수 있는지', value: 1, scores: { context: 'growth', motive: 'mastery', value: 1 } },
      { id: 'C', text: '새로운 사람들을 만날 수 있는지', value: 1, scores: { context: 'growth', motive: 'connection', value: 1 } },
      { id: 'D', text: '새로운 경험인지', value: 1, scores: { context: 'growth', motive: 'adventure', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_GRO_002',
    type: 'likert',
    category: 'context',
    subcategory: 'growth',
    text: '성장 기회 앞에서 리스크를 감수한다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'growth', trait: 'risk_taking', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'growth', trait: 'risk_taking', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'growth', trait: 'risk_taking', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'growth', trait: 'risk_taking', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'growth', trait: 'risk_taking', value: 5 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_GRO_003',
    type: 'scenario',
    category: 'context',
    subcategory: 'growth',
    text: '승진 제안이 왔습니다. 새로운 역할입니다.',
    subtext: '가장 먼저 드는 생각은?',
    options: [
      { id: 'A', text: '성과를 증명할 기회다', value: 1, scores: { context: 'growth', motive: 'achievement', value: 1 } },
      { id: 'B', text: '새로운 걸 배울 수 있다', value: 1, scores: { context: 'growth', motive: 'mastery', value: 1 } },
      { id: 'C', text: '인정받았다는 뜻이다', value: 1, scores: { context: 'growth', motive: 'recognition', value: 1 } },
      { id: 'D', text: '부담이 될 수 있다', value: 1, scores: { context: 'growth', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_GRO_004',
    type: 'bipolar',
    category: 'context',
    subcategory: 'growth',
    text: '성장 기회 앞에서 나는?',
    options: [
      { id: 'A', text: '바로 뛰어든다', value: 1, scores: { context: 'growth', trait: 'eager', value: 1 } },
      { id: 'B', text: '신중하게 판단한다', value: 1, scores: { context: 'growth', trait: 'cautious', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_GRO_005',
    type: 'bipolar',
    category: 'context',
    subcategory: 'growth',
    text: '성장을 위해 더 중요한 것은?',
    options: [
      { id: 'A', text: '도전하는 것', value: 1, scores: { context: 'growth', trait: 'challenge', value: 1 } },
      { id: 'B', text: '기반을 다지는 것', value: 1, scores: { context: 'growth', trait: 'foundation', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
];

// ============================================
// Crisis (위기 상황) 5문항
// ============================================

export const CRISIS_QUESTIONS: Question[] = [
  {
    id: 'CX_CRI_001',
    type: 'choice',
    category: 'context',
    subcategory: 'crisis',
    text: '큰 위기 상황에서 가장 먼저 하는 것은?',
    options: [
      { id: 'A', text: '문제 해결에 집중한다', value: 1, scores: { context: 'crisis', motive: 'achievement', value: 1 } },
      { id: 'B', text: '원인을 분석한다', value: 1, scores: { context: 'crisis', motive: 'mastery', value: 1 } },
      { id: 'C', text: '주변에 도움을 요청한다', value: 1, scores: { context: 'crisis', motive: 'connection', value: 1 } },
      { id: 'D', text: '피해를 최소화한다', value: 1, scores: { context: 'crisis', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_CRI_002',
    type: 'likert',
    category: 'context',
    subcategory: 'crisis',
    text: '위기 상황에서 침착함을 유지한다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'crisis', trait: 'composure', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'crisis', trait: 'composure', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'crisis', trait: 'composure', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'crisis', trait: 'composure', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'crisis', trait: 'composure', value: 5 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_CRI_003',
    type: 'scenario',
    category: 'context',
    subcategory: 'crisis',
    text: '회사가 큰 위기에 처했습니다. 구조조정 이야기가 돕니다.',
    subtext: '이때 당신의 우선순위는?',
    options: [
      { id: 'A', text: '성과로 자리를 지킨다', value: 1, scores: { context: 'crisis', motive: 'achievement', value: 1 } },
      { id: 'B', text: '상황을 파악한다', value: 1, scores: { context: 'crisis', motive: 'mastery', value: 1 } },
      { id: 'C', text: '동료들과 정보를 공유한다', value: 1, scores: { context: 'crisis', motive: 'connection', value: 1 } },
      { id: 'D', text: '다른 기회를 알아본다', value: 1, scores: { context: 'crisis', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_CRI_004',
    type: 'bipolar',
    category: 'context',
    subcategory: 'crisis',
    text: '위기 상황에서 나는?',
    options: [
      { id: 'A', text: '리더십을 발휘한다', value: 1, scores: { context: 'crisis', trait: 'lead', value: 1 } },
      { id: 'B', text: '지시를 따른다', value: 1, scores: { context: 'crisis', trait: 'follow', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_CRI_005',
    type: 'bipolar',
    category: 'context',
    subcategory: 'crisis',
    text: '위기가 지나간 후 나는?',
    options: [
      { id: 'A', text: '빨리 일상으로 돌아간다', value: 1, scores: { context: 'crisis', recovery: 'quick', value: 1 } },
      { id: 'B', text: '시간을 두고 회복한다', value: 1, scores: { context: 'crisis', recovery: 'slow', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
];

// 통합 export
export const CONTEXT_PART2_QUESTIONS = [
  ...GROWTH_QUESTIONS,
  ...CRISIS_QUESTIONS,
];

export default CONTEXT_PART2_QUESTIONS;
