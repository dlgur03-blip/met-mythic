/**
 * MET Mythic v2.0 — Achievement (성취) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const ACHIEVEMENT_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_ACH_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '하루가 끝날 때 가장 뿌듯한 순간은?',
    options: [
      { id: 'A', text: '오늘 할 일을 다 끝냈을 때', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'B', text: '새로운 걸 깊이 이해했을 때', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '좋은 대화를 나눴을 때', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '방해 없이 내 시간을 보냈을 때', value: 1, scores: { motive: 'freedom', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ACH_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '게임을 할 때 가장 재미있는 순간은?',
    options: [
      { id: 'A', text: '스테이지를 클리어할 때', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'B', text: '숨겨진 메카니즘을 파악할 때', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '새로운 맵을 탐험할 때', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'D', text: '친구들과 함께 할 때', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ACH_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '새해 목표를 세울 때 가장 중요하게 생각하는 것은?',
    options: [
      { id: 'A', text: '구체적인 달성 기준이 있는지', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'B', text: '나를 성장시킬 수 있는지', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '새로운 경험이 될 수 있는지', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'D', text: '주변 사람들과 함께할 수 있는지', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_ACH_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '목표를 달성하면 에너지가 충전된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'achievement', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'achievement', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'achievement', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'achievement', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'achievement', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ACH_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '해낸 일의 목록을 보면 기분이 좋다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'achievement', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'achievement', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'achievement', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'achievement', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'achievement', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ACH_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '어려운 목표일수록 도전하고 싶다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'achievement', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'achievement', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'achievement', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'achievement', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'achievement', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_ACH_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '목표 없이 시간을 보내면 불안하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'achievement', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'achievement', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'achievement', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'achievement', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'achievement', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ACH_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '하루가 끝날 때 아무것도 못 했으면 기분이 나쁘다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'achievement', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'achievement', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'achievement', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'achievement', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'achievement', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_ACH_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '6개월간 준비한 프로젝트가 성공적으로 끝났습니다.',
    subtext: '가장 먼저 드는 느낌은?',
    options: [
      { id: 'A', text: '해냈다! 다음 목표는 뭐지?', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'B', text: '이 과정에서 뭘 배웠지?', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '함께한 사람들에게 고맙다', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '이제 좀 쉬고 싶다', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_ACH_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '동료가 "이번 프로젝트 목표가 좀 높은 것 같아"라고 합니다.',
    subtext: '당신의 반응은?',
    options: [
      { id: 'A', text: '높을수록 해낼 맛이 있지', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'B', text: '목표 자체보다 과정이 중요해', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '다 같이 하면 할 수 있어', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '현실적으로 조정하는 게 좋겠어', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default ACHIEVEMENT_QUESTIONS;
