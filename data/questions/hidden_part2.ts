/**
 * MET Mythic v2.0 — 숨겨진 동기 (Hidden) Part 2
 * Projection (투사: 타인에게 투사하는 동기) 6문항
 * Compensation (보상: 부족함을 채우려는 동기) 6문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Projection (투사) 6문항
// ============================================

export const PROJECTION_QUESTIONS: Question[] = [
  {
    id: 'HD_PRJ_001',
    type: 'likert',
    category: 'hidden',
    subcategory: 'projection',
    text: '지나치게 성과에 집착하는 사람이 불편하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { projection: 'achievement', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { projection: 'achievement', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { projection: 'achievement', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { projection: 'achievement', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { projection: 'achievement', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_PRJ_002',
    type: 'likert',
    category: 'hidden',
    subcategory: 'projection',
    text: '관심받으려고 애쓰는 사람이 거슬린다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { projection: 'recognition', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { projection: 'recognition', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { projection: 'recognition', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { projection: 'recognition', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { projection: 'recognition', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_PRJ_003',
    type: 'likert',
    category: 'hidden',
    subcategory: 'projection',
    text: '너무 안전하게만 사는 사람이 답답하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { projection: 'security', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { projection: 'security', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { projection: 'security', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { projection: 'security', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { projection: 'security', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
  {
    id: 'HD_PRJ_004',
    type: 'likert',
    category: 'hidden',
    subcategory: 'projection',
    text: '지나치게 자유분방한 사람이 무책임해 보인다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { projection: 'freedom', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { projection: 'freedom', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { projection: 'freedom', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { projection: 'freedom', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { projection: 'freedom', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
  {
    id: 'HD_PRJ_005',
    type: 'likert',
    category: 'hidden',
    subcategory: 'projection',
    text: '인간관계에 너무 집착하는 사람이 불편하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { projection: 'connection', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { projection: 'connection', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { projection: 'connection', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { projection: 'connection', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { projection: 'connection', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_PRJ_006',
    type: 'likert',
    category: 'hidden',
    subcategory: 'projection',
    text: '무모하게 도전하는 사람이 이해가 안 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { projection: 'adventure', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { projection: 'adventure', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { projection: 'adventure', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { projection: 'adventure', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { projection: 'adventure', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
];

// ============================================
// Compensation (보상) 6문항
// ============================================

export const COMPENSATION_QUESTIONS: Question[] = [
  {
    id: 'HD_CMP_001',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'compensation',
    text: '어릴 때 인정받지 못했던 기억이 있습니다.',
    subtext: '지금의 나에게 미치는 영향은?',
    options: [
      { id: 'A', text: '별 영향 없다', value: 1, scores: { compensation: 'recognition', value: 1 } },
      { id: 'B', text: '가끔 생각난다', value: 2, scores: { compensation: 'recognition', value: 2 } },
      { id: 'C', text: '인정받고 싶은 마음이 크다', value: 4, scores: { compensation: 'recognition', value: 4 } },
      { id: 'D', text: '성취로 증명하고 싶다', value: 5, scores: { compensation: 'recognition', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_CMP_002',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'compensation',
    text: '불안정했던 시기를 겪은 적이 있습니다.',
    subtext: '지금의 나에게 미치는 영향은?',
    options: [
      { id: 'A', text: '별 영향 없다', value: 1, scores: { compensation: 'security', value: 1 } },
      { id: 'B', text: '가끔 불안하다', value: 2, scores: { compensation: 'security', value: 2 } },
      { id: 'C', text: '안정을 중요하게 여긴다', value: 4, scores: { compensation: 'security', value: 4 } },
      { id: 'D', text: '안전을 최우선으로 한다', value: 5, scores: { compensation: 'security', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_CMP_003',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'compensation',
    text: '외로웠던 시기가 있었습니다.',
    subtext: '지금의 나에게 미치는 영향은?',
    options: [
      { id: 'A', text: '별 영향 없다', value: 1, scores: { compensation: 'connection', value: 1 } },
      { id: 'B', text: '가끔 외로움을 느낀다', value: 2, scores: { compensation: 'connection', value: 2 } },
      { id: 'C', text: '관계를 중요하게 여긴다', value: 4, scores: { compensation: 'connection', value: 4 } },
      { id: 'D', text: '관계에 매달리게 된다', value: 5, scores: { compensation: 'connection', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_CMP_004',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'compensation',
    text: '통제당했던 경험이 있습니다.',
    subtext: '지금의 나에게 미치는 영향은?',
    options: [
      { id: 'A', text: '별 영향 없다', value: 1, scores: { compensation: 'freedom', value: 1 } },
      { id: 'B', text: '가끔 답답함을 느낀다', value: 2, scores: { compensation: 'freedom', value: 2 } },
      { id: 'C', text: '자유를 중요하게 여긴다', value: 4, scores: { compensation: 'freedom', value: 4 } },
      { id: 'D', text: '통제를 극도로 싫어한다', value: 5, scores: { compensation: 'freedom', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
  {
    id: 'HD_CMP_005',
    type: 'likert',
    category: 'hidden',
    subcategory: 'compensation',
    text: '과거에 채우지 못한 것을 지금 채우려는 느낌이 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { compensation: 'general', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { compensation: 'general', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { compensation: 'general', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { compensation: 'general', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { compensation: 'general', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
  {
    id: 'HD_CMP_006',
    type: 'likert',
    category: 'hidden',
    subcategory: 'compensation',
    text: '부모님이 이루지 못한 것을 대신 이루고 싶은 마음이 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { compensation: 'inherited', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { compensation: 'inherited', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { compensation: 'inherited', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { compensation: 'inherited', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { compensation: 'inherited', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
];

// 통합 export
export const HIDDEN_PART2_QUESTIONS = [
  ...PROJECTION_QUESTIONS,
  ...COMPENSATION_QUESTIONS,
];

export default HIDDEN_PART2_QUESTIONS;
