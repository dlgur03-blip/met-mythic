/**
 * MET Mythic v2.0 — Mastery (통달) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const MASTERY_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_MAS_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '새로운 기술을 배울 때 가장 좋은 순간은?',
    options: [
      { id: 'A', text: '원리를 완전히 이해했을 때', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'B', text: '그걸로 뭔가를 만들어냈을 때', value: 1, scores: { motive: 'creation', value: 1 } },
      { id: 'C', text: '남들보다 빨리 익혔을 때', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'D', text: '다른 사람에게 가르쳐줄 수 있을 때', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_MAS_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '책을 읽을 때 가장 끌리는 것은?',
    options: [
      { id: 'A', text: '깊이 있는 전문 서적', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'B', text: '바로 적용할 수 있는 실용서', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '새로운 세계를 보여주는 책', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'D', text: '창의적 영감을 주는 책', value: 1, scores: { motive: 'creation', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_MAS_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '유튜브에서 30분짜리 영상을 볼 때 어떤 것을 선택하나요?',
    options: [
      { id: 'A', text: '특정 주제를 깊이 파고드는 강의', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'B', text: '생산성을 높이는 팁 모음', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '가보지 못한 곳의 여행 영상', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'D', text: '재미있는 예능/토크쇼', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_MAS_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '"왜 그런지" 알아야 직성이 풀린다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'mastery', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'mastery', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'mastery', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'mastery', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_MAS_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '한 분야를 깊이 파고들면 시간 가는 줄 모른다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'mastery', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'mastery', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'mastery', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'mastery', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_MAS_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '복잡한 것의 구조를 파악하면 기분이 좋다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'mastery', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'mastery', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'mastery', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'mastery', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_MAS_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '제대로 모르면서 하는 것이 불편하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'mastery', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'mastery', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'mastery', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'mastery', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_MAS_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '피상적으로만 아는 상태가 답답하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'mastery', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'mastery', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'mastery', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'mastery', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_MAS_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '처음 보는 복잡한 시스템을 접했습니다.',
    subtext: '이때 드는 첫 느낌은?',
    options: [
      { id: 'A', text: '어떻게 돌아가는지 알고 싶다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'B', text: '빨리 익혀서 활용하고 싶다', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '이걸 개선할 방법이 있을까', value: 1, scores: { motive: 'creation', value: 1 } },
      { id: 'D', text: '아는 사람한테 물어봐야겠다', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_MAS_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '어떤 주제에 대해 토론 중입니다. 상대방의 논리에 허점이 보입니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '왜 그렇게 생각하는지 더 듣고 싶다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'B', text: '이 토론에서 이기고 싶다', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '관계가 나빠지면 어쩌지', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '이 토론 자체가 피곤하다', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default MASTERY_QUESTIONS;
