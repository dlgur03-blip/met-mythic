/**
 * MET Mythic v2.0 — Adventure (탐험) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const ADVENTURE_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_ADV_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '휴가 때 가장 하고 싶은 것은?',
    options: [
      { id: 'A', text: '가보지 않은 곳 탐험', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'B', text: '좋아하는 사람들과 시간 보내기', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'C', text: '집에서 푹 쉬기', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'D', text: '밀린 일 정리하기', value: 1, scores: { motive: 'achievement', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ADV_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '음식점을 고를 때 당신의 스타일은?',
    options: [
      { id: 'A', text: '안 가본 새로운 곳', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'B', text: '검증된 맛집', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'C', text: '같이 가는 사람이 원하는 곳', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '가성비 좋은 곳', value: 1, scores: { motive: 'achievement', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ADV_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '새로운 취미를 시작할 때 드는 느낌은?',
    options: [
      { id: 'A', text: '설렌다, 뭔가 새로운 게 시작되는 느낌', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'B', text: '제대로 배워서 잘하고 싶다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '같이 할 사람이 있으면 좋겠다', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '꾸준히 할 수 있을지 걱정된다', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_ADV_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '새로운 경험을 하면 에너지가 충전된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'adventure', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'adventure', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'adventure', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'adventure', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ADV_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '미지의 영역이 나를 끌어당긴다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'adventure', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'adventure', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'adventure', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'adventure', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ADV_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '변화가 있어야 삶이 재밌다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'adventure', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'adventure', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'adventure', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'adventure', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_ADV_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '매일 똑같은 일상이 반복되면 답답하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'adventure', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'adventure', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'adventure', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'adventure', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ADV_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '새로운 게 없으면 지루해진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'adventure', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'adventure', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'adventure', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'adventure', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_ADV_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '해외 출장 기회가 생겼습니다. 처음 가보는 나라입니다.',
    subtext: '가장 먼저 드는 느낌은?',
    options: [
      { id: 'A', text: '기대된다, 새로운 경험!', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'B', text: '커리어에 도움이 될까?', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '준비할 게 많겠다', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'D', text: '거기서 배울 게 있을까?', value: 1, scores: { motive: 'mastery', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ADV_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '지금 하는 일을 5년 더 하면 전문가가 됩니다. 새 분야로 가면 다시 처음부터입니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '새 분야가 끌린다', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'B', text: '전문가가 되는 게 낫다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '안정적인 쪽이 낫다', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'D', text: '어디서든 성과를 내면 된다', value: 1, scores: { motive: 'achievement', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default ADVENTURE_QUESTIONS;
