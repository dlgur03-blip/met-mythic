/**
 * MET Mythic v2.0 — 방향 (Direction) Part 1
 * Achievement, Mastery, Creation, Freedom, Security 각 2문항 (접근1 + 회피1) = 10문항
 */

import type { Question } from '../../lib/types';

export const DIRECTION_PART1_QUESTIONS: Question[] = [
  // ============================================
  // Achievement 방향 2문항
  // ============================================
  {
    id: 'DR_ACH_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'achievement',
    text: '목표를 향해 달릴 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '달성하면 뿌듯할 거야', value: 1, scores: { motive: 'achievement', value: 1, direction: 'approach' } },
      { id: 'B', text: '못하면 안 돼', value: 1, scores: { motive: 'achievement', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_ACH_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'achievement',
    text: '경쟁 상황에서 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '이기면 기분 좋을 거야', value: 1, scores: { motive: 'achievement', value: 1, direction: 'approach' } },
      { id: 'B', text: '지면 창피해', value: 1, scores: { motive: 'achievement', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },

  // ============================================
  // Mastery 방향 2문항
  // ============================================
  {
    id: 'DR_MAS_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'mastery',
    text: '새로운 것을 배울 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '알면 재밌을 것 같아서', value: 1, scores: { motive: 'mastery', value: 1, direction: 'approach' } },
      { id: 'B', text: '모르면 불안해서', value: 1, scores: { motive: 'mastery', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_MAS_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'mastery',
    text: '깊이 파고들 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '완전히 이해하면 좋겠다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'approach' } },
      { id: 'B', text: '대충 알면 불편하다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Creation 방향 2문항
  // ============================================
  {
    id: 'DR_CRE_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'creation',
    text: '새로운 것을 만들 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '뭔가 만들어내면 신난다', value: 1, scores: { motive: 'creation', value: 1, direction: 'approach' } },
      { id: 'B', text: '아무것도 못 만들면 답답하다', value: 1, scores: { motive: 'creation', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_CRE_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'creation',
    text: '아이디어를 낼 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '새로운 걸 생각하면 즐겁다', value: 1, scores: { motive: 'creation', value: 1, direction: 'approach' } },
      { id: 'B', text: '똑같은 것만 반복하면 못 견딘다', value: 1, scores: { motive: 'creation', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Freedom 방향 2문항
  // ============================================
  {
    id: 'DR_FRE_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'freedom',
    text: '일할 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '자유롭게 하면 에너지가 난다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'approach' } },
      { id: 'B', text: '통제받으면 힘이 빠진다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_FRE_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'freedom',
    text: '결정을 내릴 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '내가 선택하면 책임감이 생긴다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'approach' } },
      { id: 'B', text: '시키는 대로 하면 답답하다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Security 방향 2문항
  // ============================================
  {
    id: 'DR_SEC_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'security',
    text: '환경이 바뀔 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '안정되면 마음이 편하다', value: 1, scores: { motive: 'security', value: 1, direction: 'approach' } },
      { id: 'B', text: '불안정하면 힘들다', value: 1, scores: { motive: 'security', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_SEC_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'security',
    text: '계획을 세울 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '예측 가능하면 안심된다', value: 1, scores: { motive: 'security', value: 1, direction: 'approach' } },
      { id: 'B', text: '불확실하면 불안하다', value: 1, scores: { motive: 'security', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },
];

export default DIRECTION_PART1_QUESTIONS;
