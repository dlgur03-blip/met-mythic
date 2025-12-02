/**
 * MET Mythic v2.0 — 점화 조건 Part 2
 * Deadline(5) + Audience(5) + Autonomy(5) + Crisis(5) = 20문항
 */

import type { Question } from '../../lib/types';

// ============================================
// Deadline (마감) 5문항
// ============================================

export const DEADLINE_QUESTIONS: Question[] = [
  {
    id: 'IG_DED_001',
    type: 'likert',
    category: 'ignition',
    subcategory: 'deadline',
    text: '마감이 있어야 일이 시작된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_DED_002',
    type: 'likert',
    category: 'ignition',
    subcategory: 'deadline',
    text: '마감 직전에 가장 집중이 잘 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_DED_003',
    type: 'likert',
    category: 'ignition',
    subcategory: 'deadline',
    text: '시간 제한이 없으면 일을 미루게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
  {
    id: 'IG_DED_004',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'deadline',
    text: '프로젝트 마감이 일주일 남았습니다.',
    subtext: '지금 당신의 상태는?',
    options: [
      { id: 'A', text: '엔진이 걸렸다, 집중 모드', value: 5, scores: { value: 5 } },
      { id: 'B', text: '슬슬 준비해야겠다', value: 3, scores: { value: 3 } },
      { id: 'C', text: '아직 여유 있으니까', value: 2, scores: { value: 2 } },
      { id: 'D', text: '마감과 상관없이 꾸준히 한다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_DED_005',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'deadline',
    text: '마감이 하루 연장됐습니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '김이 샌다, 집중이 풀림', value: 5, scores: { value: 5 } },
      { id: 'B', text: '다행이다, 더 잘할 수 있겠다', value: 2, scores: { value: 2 } },
      { id: 'C', text: '상관없다, 원래 페이스대로', value: 1, scores: { value: 1 } },
      { id: 'D', text: '안도된다, 여유가 생겼다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
];

// ============================================
// Audience (관중) 5문항
// ============================================

export const AUDIENCE_QUESTIONS: Question[] = [
  {
    id: 'IG_AUD_001',
    type: 'likert',
    category: 'ignition',
    subcategory: 'audience',
    text: '누군가 지켜보면 더 열심히 하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_AUD_002',
    type: 'likert',
    category: 'ignition',
    subcategory: 'audience',
    text: '발표나 프레젠테이션이 나를 각성시킨다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_AUD_003',
    type: 'likert',
    category: 'ignition',
    subcategory: 'audience',
    text: '혼자 하면 대충 하게 되는 경향이 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
  {
    id: 'IG_AUD_004',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'audience',
    text: '중요한 사람이 당신의 작업을 지켜보고 있습니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '더 잘해야겠다, 집중됨', value: 5, scores: { value: 5 } },
      { id: 'B', text: '긴장되지만 해볼 만하다', value: 4, scores: { value: 4 } },
      { id: 'C', text: '부담스럽다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '신경 쓰여서 못하겠다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
  {
    id: 'IG_AUD_005',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'audience',
    text: '운동할 때 트레이너가 옆에 있으면?',
    subtext: '당신의 반응은?',
    options: [
      { id: 'A', text: '더 열심히 하게 된다', value: 5, scores: { value: 5 } },
      { id: 'B', text: '도움은 되지만 별 차이 없다', value: 3, scores: { value: 3 } },
      { id: 'C', text: '오히려 불편하다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '혼자가 더 편하다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
];

// ============================================
// Autonomy (자율) 5문항
// ============================================

export const AUTONOMY_QUESTIONS: Question[] = [
  {
    id: 'IG_AUT_001',
    type: 'likert',
    category: 'ignition',
    subcategory: 'autonomy',
    text: '내 방식대로 할 수 있을 때 에너지가 난다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_AUT_002',
    type: 'likert',
    category: 'ignition',
    subcategory: 'autonomy',
    text: '자율권이 있어야 진짜 실력이 나온다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_AUT_003',
    type: 'likert',
    category: 'ignition',
    subcategory: 'autonomy',
    text: '가이드라인이 너무 많으면 의욕이 떨어진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
  {
    id: 'IG_AUT_004',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'autonomy',
    text: '상사가 "네 방식대로 해봐"라고 했습니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '좋다, 힘이 난다', value: 5, scores: { value: 5 } },
      { id: 'B', text: '괜찮다, 해볼 만하다', value: 4, scores: { value: 4 } },
      { id: 'C', text: '좀 불안하다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '기준을 알려줬으면', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_AUT_005',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'autonomy',
    text: '매뉴얼대로 vs 내 판단대로, 선택한다면?',
    subtext: '당신의 선호는?',
    options: [
      { id: 'A', text: '내 판단대로, 그래야 몰입된다', value: 5, scores: { value: 5 } },
      { id: 'B', text: '상황에 따라 다르다', value: 3, scores: { value: 3 } },
      { id: 'C', text: '매뉴얼대로, 안전하니까', value: 2, scores: { value: 2 } },
      { id: 'D', text: '매뉴얼대로, 책임이 명확하니까', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
];

// ============================================
// Crisis (위기) 5문항
// ============================================

export const CRISIS_QUESTIONS: Question[] = [
  {
    id: 'IG_CRI_001',
    type: 'likert',
    category: 'ignition',
    subcategory: 'crisis',
    text: '위기 상황에서 오히려 집중이 잘 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CRI_002',
    type: 'likert',
    category: 'ignition',
    subcategory: 'crisis',
    text: '급한 상황에서 평소보다 더 잘하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CRI_003',
    type: 'likert',
    category: 'ignition',
    subcategory: 'crisis',
    text: '평화로운 상황보다 긴장감이 있어야 움직인다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { value: 5 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
  {
    id: 'IG_CRI_004',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'crisis',
    text: '갑자기 큰 문제가 터졌습니다. 해결해야 합니다.',
    subtext: '이때 당신의 상태는?',
    options: [
      { id: 'A', text: '각성된다, 오히려 명확해짐', value: 5, scores: { value: 5 } },
      { id: 'B', text: '긴장되지만 해볼 만하다', value: 4, scores: { value: 4 } },
      { id: 'C', text: '스트레스받는다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '패닉이 온다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: true },
  },
  {
    id: 'IG_CRI_005',
    type: 'scenario',
    category: 'ignition',
    subcategory: 'crisis',
    text: '시스템 장애로 긴급 대응이 필요합니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '오히려 몰입된다', value: 5, scores: { value: 5 } },
      { id: 'B', text: '해결하면 뿌듯할 것 같다', value: 4, scores: { value: 4 } },
      { id: 'C', text: '빨리 끝났으면 좋겠다', value: 2, scores: { value: 2 } },
      { id: 'D', text: '피하고 싶다', value: 1, scores: { value: 1 } },
    ],
    metadata: { layer: 2, isLite: false },
  },
];

// 통합 export
export const IGNITION_PART2_QUESTIONS = [
  ...DEADLINE_QUESTIONS,
  ...AUDIENCE_QUESTIONS,
  ...AUTONOMY_QUESTIONS,
  ...CRISIS_QUESTIONS,
];

export default IGNITION_PART2_QUESTIONS;
