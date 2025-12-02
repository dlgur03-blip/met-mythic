/**
 * MET Mythic v2.0 — 상황 변화 (Context) Part 1
 * Normal (평상시) 10문항 + Pressure (압박) 10문항 = 20문항
 * 
 * 상황별 동기 변화를 측정
 */

import type { Question } from '../../lib/types';

// ============================================
// Normal (평상시) 10문항
// ============================================

export const NORMAL_QUESTIONS: Question[] = [
  {
    id: 'CX_NOR_001',
    type: 'choice',
    category: 'context',
    subcategory: 'normal',
    text: '평소에 일할 때 가장 중요하게 생각하는 것은?',
    options: [
      { id: 'A', text: '목표 달성', value: 1, scores: { context: 'normal', motive: 'achievement', value: 1 } },
      { id: 'B', text: '깊이 있는 이해', value: 1, scores: { context: 'normal', motive: 'mastery', value: 1 } },
      { id: 'C', text: '좋은 관계 유지', value: 1, scores: { context: 'normal', motive: 'connection', value: 1 } },
      { id: 'D', text: '자유로운 방식', value: 1, scores: { context: 'normal', motive: 'freedom', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_NOR_002',
    type: 'choice',
    category: 'context',
    subcategory: 'normal',
    text: '여유 있는 주말, 가장 하고 싶은 것은?',
    options: [
      { id: 'A', text: '밀린 일 정리하기', value: 1, scores: { context: 'normal', motive: 'achievement', value: 1 } },
      { id: 'B', text: '새로운 곳 탐험하기', value: 1, scores: { context: 'normal', motive: 'adventure', value: 1 } },
      { id: 'C', text: '사람들과 만나기', value: 1, scores: { context: 'normal', motive: 'connection', value: 1 } },
      { id: 'D', text: '편하게 쉬기', value: 1, scores: { context: 'normal', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_NOR_003',
    type: 'likert',
    category: 'context',
    subcategory: 'normal',
    text: '평소에 새로운 도전을 즐긴다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'normal', trait: 'challenge', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'normal', trait: 'challenge', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'normal', trait: 'challenge', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'normal', trait: 'challenge', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'normal', trait: 'challenge', value: 5 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_NOR_004',
    type: 'likert',
    category: 'context',
    subcategory: 'normal',
    text: '평소에 계획을 세우고 따르는 편이다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'normal', trait: 'planning', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'normal', trait: 'planning', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'normal', trait: 'planning', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'normal', trait: 'planning', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'normal', trait: 'planning', value: 5 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_NOR_005',
    type: 'likert',
    category: 'context',
    subcategory: 'normal',
    text: '평소에 인정받는 것이 중요하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'normal', motive: 'recognition', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'normal', motive: 'recognition', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'normal', motive: 'recognition', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'normal', motive: 'recognition', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'normal', motive: 'recognition', value: 5 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_NOR_006',
    type: 'scenario',
    category: 'context',
    subcategory: 'normal',
    text: '평범한 월요일 아침입니다. 일주일을 시작하며 가장 먼저 생각하는 것은?',
    subtext: '가장 해당하는 것을 고르세요.',
    options: [
      { id: 'A', text: '이번 주 달성할 목표', value: 1, scores: { context: 'normal', motive: 'achievement', value: 1 } },
      { id: 'B', text: '배우고 싶은 것들', value: 1, scores: { context: 'normal', motive: 'mastery', value: 1 } },
      { id: 'C', text: '만날 사람들', value: 1, scores: { context: 'normal', motive: 'connection', value: 1 } },
      { id: 'D', text: '그냥 무난하게 보내고 싶다', value: 1, scores: { context: 'normal', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_NOR_007',
    type: 'scenario',
    category: 'context',
    subcategory: 'normal',
    text: '평소 업무 스타일을 가장 잘 설명하는 것은?',
    subtext: '가장 해당하는 것을 고르세요.',
    options: [
      { id: 'A', text: '목표 지향적으로 일한다', value: 1, scores: { context: 'normal', motive: 'achievement', value: 1 } },
      { id: 'B', text: '깊이 파고드는 편이다', value: 1, scores: { context: 'normal', motive: 'mastery', value: 1 } },
      { id: 'C', text: '새로운 시도를 좋아한다', value: 1, scores: { context: 'normal', motive: 'creation', value: 1 } },
      { id: 'D', text: '안정적인 루틴을 선호한다', value: 1, scores: { context: 'normal', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_NOR_008',
    type: 'bipolar',
    category: 'context',
    subcategory: 'normal',
    text: '평소에 나는?',
    options: [
      { id: 'A', text: '적극적으로 움직인다', value: 1, scores: { context: 'normal', trait: 'proactive', value: 1 } },
      { id: 'B', text: '상황을 지켜본다', value: 1, scores: { context: 'normal', trait: 'reactive', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_NOR_009',
    type: 'bipolar',
    category: 'context',
    subcategory: 'normal',
    text: '평소 의사결정 스타일은?',
    options: [
      { id: 'A', text: '빠르게 결정한다', value: 1, scores: { context: 'normal', trait: 'decisive', value: 1 } },
      { id: 'B', text: '충분히 고민한다', value: 1, scores: { context: 'normal', trait: 'deliberate', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_NOR_010',
    type: 'bipolar',
    category: 'context',
    subcategory: 'normal',
    text: '평소 에너지 관리 방식은?',
    options: [
      { id: 'A', text: '쓰면서 충전한다', value: 1, scores: { context: 'normal', trait: 'active_recovery', value: 1 } },
      { id: 'B', text: '쉬면서 충전한다', value: 1, scores: { context: 'normal', trait: 'passive_recovery', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
];

// ============================================
// Pressure (압박 상황) 10문항
// ============================================

export const PRESSURE_QUESTIONS: Question[] = [
  {
    id: 'CX_PRE_001',
    type: 'choice',
    category: 'context',
    subcategory: 'pressure',
    text: '마감이 촉박할 때 가장 먼저 하는 것은?',
    options: [
      { id: 'A', text: '우선순위를 정하고 집중한다', value: 1, scores: { context: 'pressure', motive: 'achievement', value: 1 } },
      { id: 'B', text: '문제의 핵심을 파악한다', value: 1, scores: { context: 'pressure', motive: 'mastery', value: 1 } },
      { id: 'C', text: '도움을 요청한다', value: 1, scores: { context: 'pressure', motive: 'connection', value: 1 } },
      { id: 'D', text: '일단 침착하게 정리한다', value: 1, scores: { context: 'pressure', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_PRE_002',
    type: 'choice',
    category: 'context',
    subcategory: 'pressure',
    text: '압박 상황에서 나의 변화는?',
    options: [
      { id: 'A', text: '더 집중하게 된다', value: 1, scores: { context: 'pressure', response: 'focus', value: 1 } },
      { id: 'B', text: '창의적 해결책을 찾는다', value: 1, scores: { context: 'pressure', response: 'creative', value: 1 } },
      { id: 'C', text: '주변 도움을 구한다', value: 1, scores: { context: 'pressure', response: 'social', value: 1 } },
      { id: 'D', text: '스트레스를 받는다', value: 1, scores: { context: 'pressure', response: 'stress', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_PRE_003',
    type: 'likert',
    category: 'context',
    subcategory: 'pressure',
    text: '압박받을 때 오히려 실력이 더 나온다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'pressure', trait: 'thrive', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'pressure', trait: 'thrive', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'pressure', trait: 'thrive', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'pressure', trait: 'thrive', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'pressure', trait: 'thrive', value: 5 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_PRE_004',
    type: 'likert',
    category: 'context',
    subcategory: 'pressure',
    text: '압박 상황에서 평소보다 관계에 더 신경 쓴다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'pressure', motive: 'connection', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'pressure', motive: 'connection', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'pressure', motive: 'connection', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'pressure', motive: 'connection', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'pressure', motive: 'connection', value: 5 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_PRE_005',
    type: 'likert',
    category: 'context',
    subcategory: 'pressure',
    text: '압박 상황에서 안전한 선택을 하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { context: 'pressure', motive: 'security', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { context: 'pressure', motive: 'security', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { context: 'pressure', motive: 'security', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { context: 'pressure', motive: 'security', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { context: 'pressure', motive: 'security', value: 5 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_PRE_006',
    type: 'scenario',
    category: 'context',
    subcategory: 'pressure',
    text: '중요한 발표가 일주일 앞으로 다가왔습니다.',
    subtext: '당신의 우선순위는?',
    options: [
      { id: 'A', text: '완벽하게 준비해서 성공시킨다', value: 1, scores: { context: 'pressure', motive: 'achievement', value: 1 } },
      { id: 'B', text: '내용을 깊이 이해한다', value: 1, scores: { context: 'pressure', motive: 'mastery', value: 1 } },
      { id: 'C', text: '피드백을 받아 개선한다', value: 1, scores: { context: 'pressure', motive: 'connection', value: 1 } },
      { id: 'D', text: '무리하지 않고 적당히 한다', value: 1, scores: { context: 'pressure', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_PRE_007',
    type: 'scenario',
    category: 'context',
    subcategory: 'pressure',
    text: '프로젝트가 위기에 처했습니다. 팀원들이 지쳐있습니다.',
    subtext: '당신의 우선순위는?',
    options: [
      { id: 'A', text: '결과를 내는 것', value: 1, scores: { context: 'pressure', motive: 'achievement', value: 1 } },
      { id: 'B', text: '문제 원인을 찾는 것', value: 1, scores: { context: 'pressure', motive: 'mastery', value: 1 } },
      { id: 'C', text: '팀원들을 챙기는 것', value: 1, scores: { context: 'pressure', motive: 'connection', value: 1 } },
      { id: 'D', text: '현실적으로 조정하는 것', value: 1, scores: { context: 'pressure', motive: 'security', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
  {
    id: 'CX_PRE_008',
    type: 'bipolar',
    category: 'context',
    subcategory: 'pressure',
    text: '압박받을 때 나는?',
    options: [
      { id: 'A', text: '평소보다 더 적극적이 된다', value: 1, scores: { context: 'pressure', response: 'fight', value: 1 } },
      { id: 'B', text: '한 발 물러나 관망한다', value: 1, scores: { context: 'pressure', response: 'flight', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_PRE_009',
    type: 'bipolar',
    category: 'context',
    subcategory: 'pressure',
    text: '압박 상황에서 의사결정은?',
    options: [
      { id: 'A', text: '더 과감해진다', value: 1, scores: { context: 'pressure', trait: 'bold', value: 1 } },
      { id: 'B', text: '더 신중해진다', value: 1, scores: { context: 'pressure', trait: 'cautious', value: 1 } },
    ],
    metadata: { layer: 7, isLite: false },
  },
  {
    id: 'CX_PRE_010',
    type: 'bipolar',
    category: 'context',
    subcategory: 'pressure',
    text: '압박받을 때 에너지는?',
    options: [
      { id: 'A', text: '오히려 올라간다', value: 1, scores: { context: 'pressure', energy: 'increase', value: 1 } },
      { id: 'B', text: '빠르게 소모된다', value: 1, scores: { context: 'pressure', energy: 'decrease', value: 1 } },
    ],
    metadata: { layer: 7, isLite: true },
  },
];

// 통합 export
export const CONTEXT_PART1_QUESTIONS = [
  ...NORMAL_QUESTIONS,
  ...PRESSURE_QUESTIONS,
];

export default CONTEXT_PART1_QUESTIONS;
