/**
 * MET Mythic v2.0 — Creation (창조) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const CREATION_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_CRE_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'creation',
    text: '가장 에너지가 나는 순간은?',
    options: [
      { id: 'A', text: '새로운 아이디어가 떠올랐을 때', value: 1, scores: { motive: 'creation', value: 1 } },
      { id: 'B', text: '어려운 목표를 달성했을 때', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '깊이 있는 대화를 나눴을 때', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '복잡한 것을 이해했을 때', value: 1, scores: { motive: 'mastery', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CRE_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'creation',
    text: '여유 시간이 생기면 가장 하고 싶은 것은?',
    options: [
      { id: 'A', text: '뭔가 만들거나 창작한다', value: 1, scores: { motive: 'creation', value: 1 } },
      { id: 'B', text: '밀린 일을 처리한다', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '새로운 곳을 탐험한다', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'D', text: '편하게 쉰다', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CRE_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'creation',
    text: '일할 때 가장 답답한 상황은?',
    options: [
      { id: 'A', text: '정해진 방식만 따라야 할 때', value: 1, scores: { motive: 'creation', value: 1 } },
      { id: 'B', text: '결과가 잘 안 나올 때', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '혼자 해야 할 때', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '원리를 모르고 해야 할 때', value: 1, scores: { motive: 'mastery', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_CRE_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'creation',
    text: '없던 것을 만들어내면 기분이 좋다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'creation', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'creation', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'creation', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'creation', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'creation', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CRE_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'creation',
    text: '새로운 방법을 찾으면 에너지가 난다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'creation', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'creation', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'creation', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'creation', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'creation', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CRE_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'creation',
    text: '내 손으로 직접 만든 것에 애착이 간다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'creation', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'creation', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'creation', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'creation', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'creation', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_CRE_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'creation',
    text: '똑같은 방식만 반복하면 답답하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'creation', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'creation', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'creation', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'creation', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'creation', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CRE_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'creation',
    text: '아이디어를 낼 수 없는 환경은 힘들다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'creation', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'creation', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'creation', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'creation', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'creation', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_CRE_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'creation',
    text: '팀에서 새 프로젝트 방향을 정하고 있습니다.',
    subtext: '당신이 가장 하고 싶은 역할은?',
    options: [
      { id: 'A', text: '새로운 아이디어 제안하기', value: 1, scores: { motive: 'creation', value: 1 } },
      { id: 'B', text: '목표와 일정 정하기', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '기술적 깊이 담당하기', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '팀원들 의견 조율하기', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CRE_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'creation',
    text: '기존 방식으로는 잘 안 풀리는 문제가 있습니다.',
    subtext: '이때 드는 생각은?',
    options: [
      { id: 'A', text: '완전히 다른 방법을 시도해보고 싶다', value: 1, scores: { motive: 'creation', value: 1 } },
      { id: 'B', text: '어떻게든 빨리 해결해야 한다', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '왜 안 되는지 원인부터 파악해야 한다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '경험 있는 사람한테 물어봐야겠다', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default CREATION_QUESTIONS;
