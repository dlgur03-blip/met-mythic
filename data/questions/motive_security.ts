/**
 * MET Mythic v2.0 — Security (안정) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const SECURITY_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_SEC_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'security',
    text: '새 직장을 고를 때 가장 중요한 것은?',
    options: [
      { id: 'A', text: '안정성과 복지', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'B', text: '성장 가능성', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '성과에 따른 보상', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'D', text: '자유로운 분위기', value: 1, scores: { motive: 'freedom', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_SEC_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'security',
    text: '주말에 가장 하고 싶은 것은?',
    options: [
      { id: 'A', text: '집에서 편하게 쉬기', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'B', text: '새로운 곳 탐방하기', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'C', text: '밀린 일 정리하기', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'D', text: '사람들 만나기', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_SEC_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'security',
    text: '여행 계획을 세울 때 당신의 스타일은?',
    options: [
      { id: 'A', text: '숙소, 교통 등 미리 다 정해둔다', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'B', text: '대략만 정하고 현지에서 결정', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'C', text: '효율적인 동선 위주로 짠다', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'D', text: '같이 가는 사람에게 맡긴다', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_SEC_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'security',
    text: '예측 가능한 환경에서 마음이 편하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'security', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'security', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'security', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'security', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'security', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_SEC_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'security',
    text: '계획대로 진행되면 안심이 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'security', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'security', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'security', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'security', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'security', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_SEC_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'security',
    text: '익숙한 환경에 있으면 에너지가 보존된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'security', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'security', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'security', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'security', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'security', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_SEC_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'security',
    text: '불확실한 상황이 오래 가면 지친다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'security', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'security', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'security', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'security', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'security', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_SEC_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'security',
    text: '갑작스러운 변화가 생기면 스트레스를 받는다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'security', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'security', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'security', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'security', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'security', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_SEC_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'security',
    text: '회사에서 새 프로젝트에 지원할 기회가 생겼습니다. 성공하면 승진, 실패하면 평가에 불이익이 있습니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '지금 위치가 나쁘지 않으니 패스', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'B', text: '도전해본다, 승진이 목표', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '배울 게 있으면 해본다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '새로운 경험이니까 해본다', value: 1, scores: { motive: 'adventure', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_SEC_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'security',
    text: '친구가 "같이 창업하자"고 제안했습니다. 아이디어는 좋아 보입니다.',
    subtext: '이때 가장 먼저 드는 생각은?',
    options: [
      { id: 'A', text: '지금 직장이 있는데...', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'B', text: '성공 가능성이 얼마나 되지?', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '재밌겠다, 해볼까?', value: 1, scores: { motive: 'adventure', value: 1 } },
      { id: 'D', text: '친구와 함께라면 괜찮을지도', value: 1, scores: { motive: 'connection', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default SECURITY_QUESTIONS;
