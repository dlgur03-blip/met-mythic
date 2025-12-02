/**
 * MET Mythic v2.0 — 운영 (Operating) Part 1
 * Rhythm (계획 vs 즉흥) 4문항 + Recovery (고독 vs 사회적) 4문항 = 8문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Rhythm (리듬: 계획형 vs 즉흥형) 4문항
// ============================================

export const RHYTHM_QUESTIONS: Question[] = [
  {
    id: 'OP_RHY_001',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'rhythm',
    text: '일을 시작할 때 나는?',
    options: [
      { id: 'A', text: '계획을 먼저 세운다', value: 1, scores: { axis: 'rhythm', pole: 'planned' } },
      { id: 'B', text: '일단 시작하고 본다', value: 1, scores: { axis: 'rhythm', pole: 'spontaneous' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_RHY_002',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'rhythm',
    text: '하루 일과를 보내는 방식은?',
    options: [
      { id: 'A', text: '정해진 루틴대로 움직인다', value: 1, scores: { axis: 'rhythm', pole: 'planned' } },
      { id: 'B', text: '그때그때 상황에 맞춘다', value: 1, scores: { axis: 'rhythm', pole: 'spontaneous' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_RHY_003',
    type: 'likert',
    category: 'operating',
    subcategory: 'rhythm',
    text: '계획 없이 움직이면 불안하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'rhythm', value: 1, pole: 'spontaneous' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'rhythm', value: 2, pole: 'spontaneous' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'rhythm', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'rhythm', value: 4, pole: 'planned' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'rhythm', value: 5, pole: 'planned' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
  {
    id: 'OP_RHY_004',
    type: 'likert',
    category: 'operating',
    subcategory: 'rhythm',
    text: '계획이 바뀌어도 별로 신경 안 쓴다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'rhythm', value: 1, pole: 'planned' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'rhythm', value: 2, pole: 'planned' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'rhythm', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'rhythm', value: 4, pole: 'spontaneous' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'rhythm', value: 5, pole: 'spontaneous' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
];

// ============================================
// Recovery (회복: 고독형 vs 사회형) 4문항
// ============================================

export const RECOVERY_QUESTIONS: Question[] = [
  {
    id: 'OP_REC_001',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'recovery',
    text: '지쳤을 때 에너지를 채우는 방법은?',
    options: [
      { id: 'A', text: '혼자만의 시간', value: 1, scores: { axis: 'recovery', pole: 'solitude' } },
      { id: 'B', text: '사람들과 어울리기', value: 1, scores: { axis: 'recovery', pole: 'social' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_REC_002',
    type: 'bipolar',
    category: 'operating',
    subcategory: 'recovery',
    text: '힘든 하루 끝에 선호하는 것은?',
    options: [
      { id: 'A', text: '조용히 혼자 쉬기', value: 1, scores: { axis: 'recovery', pole: 'solitude' } },
      { id: 'B', text: '친구들과 수다 떨기', value: 1, scores: { axis: 'recovery', pole: 'social' } },
    ],
    metadata: { layer: 4, isLite: true },
  },
  {
    id: 'OP_REC_003',
    type: 'likert',
    category: 'operating',
    subcategory: 'recovery',
    text: '사람들과 오래 있으면 에너지가 빠진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'recovery', value: 1, pole: 'social' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'recovery', value: 2, pole: 'social' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'recovery', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'recovery', value: 4, pole: 'solitude' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'recovery', value: 5, pole: 'solitude' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
  {
    id: 'OP_REC_004',
    type: 'likert',
    category: 'operating',
    subcategory: 'recovery',
    text: '혼자 있으면 오히려 더 지친다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { axis: 'recovery', value: 1, pole: 'solitude' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { axis: 'recovery', value: 2, pole: 'solitude' } },
      { id: '3', text: '보통이다', value: 3, scores: { axis: 'recovery', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { axis: 'recovery', value: 4, pole: 'social' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { axis: 'recovery', value: 5, pole: 'social' } },
    ],
    metadata: { layer: 4, isLite: false },
  },
];

// 통합 export
export const OPERATING_PART1_QUESTIONS = [
  ...RHYTHM_QUESTIONS,
  ...RECOVERY_QUESTIONS,
];

export default OPERATING_PART1_QUESTIONS;
