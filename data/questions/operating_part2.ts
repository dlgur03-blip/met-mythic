/**
 * MET Mythic v2.0 — 운영 (Operating) Part 2
 * Relay (지구력 vs 폭발력) 6문항 + Resistance (스트레스 반응) 6문항 + Scope (멀티 vs 싱글) 4문항 = 16문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Relay (릴레이: 지구력형 vs 폭발형) 6문항
// ============================================

export const RELAY_QUESTIONS: Question[] = [
  {
    id: 'OP_REL_001',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'relay',
    text: '일할 때 나의 패턴은?',
    options: [
      { id: 'A', text: '꾸준히 오래 집중한다', value: 1, scores: { axis: 'relay', pole: 'endurance' } },
      { id: 'B', text: '짧고 강렬하게 몰입한다', value: 1, scores: { axis: 'relay', pole: 'burst' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_REL_002',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'relay',
    text: '마라톤 vs 100미터 달리기, 비유하자면?',
    options: [
      { id: 'A', text: '마라톤 스타일', value: 1, scores: { axis: 'relay', pole: 'endurance' } },
      { id: 'B', text: '100미터 스타일', value: 1, scores: { axis: 'relay', pole: 'burst' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_REL_003',
    type: 'likert',
    category: 'operating',
    subcategory: 'relay',
    text: '짧고 강렬하게 몰입하는 편이다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'relay', value: 1, pole: 'endurance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'relay', value: 2, pole: 'endurance' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'relay', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'relay', value: 4, pole: 'burst' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'relay', value: 5, pole: 'burst' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
  {
    id: 'OP_REL_004',
    type: 'likert',
    category: 'operating',
    subcategory: 'relay',
    text: '오래 일해도 페이스가 잘 유지된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'relay', value: 1, pole: 'burst' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'relay', value: 2, pole: 'burst' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'relay', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'relay', value: 4, pole: 'endurance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'relay', value: 5, pole: 'endurance' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
  {
    id: 'OP_REL_005',
    type: 'scenario',
    category: 'operating',
    subcategory: 'relay',
    text: '큰 프로젝트를 맡았습니다. 3개월 기한입니다.',
    subtext: '당신의 작업 패턴은?',
    options: [
      { id: 'A', text: '매일 조금씩 꾸준히 진행', value: 1, scores: { axis: 'relay', pole: 'endurance' } },
      { id: 'B', text: '집중 기간에 몰아서 처리', value: 1, scores: { axis: 'relay', pole: 'burst' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_REL_006',
    type: 'scenario',
    category: 'operating',
    subcategory: 'relay',
    text: '하루 8시간 일해야 합니다.',
    subtext: '선호하는 방식은?',
    options: [
      { id: 'A', text: '쉬는 시간 짧게, 꾸준히 일하기', value: 1, scores: { axis: 'relay', pole: 'endurance' } },
      { id: 'B', text: '집중-휴식 반복, 강약 조절', value: 1, scores: { axis: 'relay', pole: 'burst' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
];

// ============================================
// Resistance (저항: 스트레스 반응) 6문항
// ============================================

export const RESISTANCE_QUESTIONS: Question[] = [
  {
    id: 'OP_RES_001',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'resistance',
    text: '압박을 받을 때 나는?',
    options: [
      { id: 'A', text: '더 집중하게 된다', value: 1, scores: { axis: 'resistance', pole: 'thrive' } },
      { id: 'B', text: '힘이 빠진다', value: 1, scores: { axis: 'resistance', pole: 'avoid' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_RES_002',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'resistance',
    text: '스트레스 상황에서 나의 성과는?',
    options: [
      { id: 'A', text: '평소보다 잘 나온다', value: 1, scores: { axis: 'resistance', pole: 'thrive' } },
      { id: 'B', text: '평소보다 못 나온다', value: 1, scores: { axis: 'resistance', pole: 'avoid' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_RES_003',
    type: 'likert',
    category: 'operating',
    subcategory: 'resistance',
    text: '긴장되면 실력이 더 나온다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'resistance', value: 1, pole: 'avoid' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'resistance', value: 2, pole: 'avoid' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'resistance', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'resistance', value: 4, pole: 'thrive' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'resistance', value: 5, pole: 'thrive' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
  {
    id: 'OP_RES_004',
    type: 'likert',
    category: 'operating',
    subcategory: 'resistance',
    text: '압박이 심하면 제 실력이 안 나온다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'resistance', value: 1, pole: 'thrive' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'resistance', value: 2, pole: 'thrive' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'resistance', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'resistance', value: 4, pole: 'avoid' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'resistance', value: 5, pole: 'avoid' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
  {
    id: 'OP_RES_005',
    type: 'scenario',
    category: 'operating',
    subcategory: 'resistance',
    text: '중요한 발표 직전입니다.',
    subtext: '이때 당신의 상태는?',
    options: [
      { id: 'A', text: '각성된다, 집중 모드', value: 1, scores: { axis: 'resistance', pole: 'thrive' } },
      { id: 'B', text: '떨린다, 불안하다', value: 1, scores: { axis: 'resistance', pole: 'avoid' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_RES_006',
    type: 'scenario',
    category: 'operating',
    subcategory: 'resistance',
    text: '갑자기 일이 몰렸습니다.',
    subtext: '이때 당신의 반응은?',
    options: [
      { id: 'A', text: '오히려 잘 돌아간다', value: 1, scores: { axis: 'resistance', pole: 'thrive' } },
      { id: 'B', text: '멘탈이 흔들린다', value: 1, scores: { axis: 'resistance', pole: 'avoid' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
];

// ============================================
// Scope (범위: 멀티태스킹 vs 싱글태스킹) 4문항
// ============================================

export const SCOPE_QUESTIONS: Question[] = [
  {
    id: 'OP_SCP_001',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'scope',
    text: '일할 때 선호하는 방식은?',
    options: [
      { id: 'A', text: '한 가지에 깊이 집중', value: 1, scores: { axis: 'scope', pole: 'single' } },
      { id: 'B', text: '여러 가지 병행', value: 1, scores: { axis: 'scope', pole: 'multi' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_SCP_002',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'scope',
    text: '브라우저 탭을 쓸 때 나는?',
    options: [
      { id: 'A', text: '필요한 것만 최소한으로', value: 1, scores: { axis: 'scope', pole: 'single' } },
      { id: 'B', text: '여러 개 열어두고 왔다 갔다', value: 1, scores: { axis: 'scope', pole: 'multi' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_SCP_003',
    type: 'likert',
    category: 'operating',
    subcategory: 'scope',
    text: '여러 일을 동시에 하면 효율이 떨어진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'scope', value: 1, pole: 'multi' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'scope', value: 2, pole: 'multi' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'scope', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'scope', value: 4, pole: 'single' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'scope', value: 5, pole: 'single' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
  {
    id: 'OP_SCP_004',
    type: 'likert',
    category: 'operating',
    subcategory: 'scope',
    text: '한 가지만 하면 오히려 답답하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'scope', value: 1, pole: 'single' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'scope', value: 2, pole: 'single' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'scope', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'scope', value: 4, pole: 'multi' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'scope', value: 5, pole: 'multi' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
];

// 통합 export
export const OPERATING_PART2_QUESTIONS = [
  ...RELAY_QUESTIONS,
  ...RESISTANCE_QUESTIONS,
  ...SCOPE_QUESTIONS,
];

export default OPERATING_PART2_QUESTIONS;
