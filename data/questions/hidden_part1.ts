/**
 * MET Mythic v2.0 — 숨겨진 동기 (Hidden) Part 1
 * Shadow (그림자: 억압된 동기) 12문항
 * 
 * 의식적으로 부정하거나 억압하는 동기를 측정
 */

import type { Question } from '../../lib/types';

export const SHADOW_QUESTIONS: Question[] = [
  // ============================================
  // Achievement Shadow
  // ============================================
  {
    id: 'HD_SHD_001',
    type: 'likert',
    category: 'hidden',
    subcategory: 'shadow',
    text: '다른 사람보다 뛰어나고 싶은 마음이 솔직히 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { shadow: 'achievement', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { shadow: 'achievement', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { shadow: 'achievement', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { shadow: 'achievement', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { shadow: 'achievement', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_SHD_002',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'shadow',
    text: '동료가 나보다 먼저 승진했습니다.',
    subtext: '솔직한 첫 반응은?',
    options: [
      { id: 'A', text: '축하하지만 내심 아쉽다', value: 4, scores: { shadow: 'achievement', value: 4 } },
      { id: 'B', text: '나도 더 노력해야겠다', value: 3, scores: { shadow: 'achievement', value: 3 } },
      { id: 'C', text: '진심으로 기쁘다', value: 1, scores: { shadow: 'achievement', value: 1 } },
      { id: 'D', text: '솔직히 시기심이 든다', value: 5, scores: { shadow: 'achievement', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },

  // ============================================
  // Recognition Shadow
  // ============================================
  {
    id: 'HD_SHD_003',
    type: 'likert',
    category: 'hidden',
    subcategory: 'shadow',
    text: '인정받고 싶은 마음을 숨기려고 할 때가 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { shadow: 'recognition', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { shadow: 'recognition', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { shadow: 'recognition', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { shadow: 'recognition', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { shadow: 'recognition', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_SHD_004',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'shadow',
    text: '열심히 한 일이 주목받지 못했습니다.',
    subtext: '솔직한 느낌은?',
    options: [
      { id: 'A', text: '괜찮다, 결과가 중요하니까', value: 1, scores: { shadow: 'recognition', value: 1 } },
      { id: 'B', text: '약간 서운하다', value: 3, scores: { shadow: 'recognition', value: 3 } },
      { id: 'C', text: '상당히 속상하다', value: 4, scores: { shadow: 'recognition', value: 4 } },
      { id: 'D', text: '화가 난다', value: 5, scores: { shadow: 'recognition', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },

  // ============================================
  // Security Shadow
  // ============================================
  {
    id: 'HD_SHD_005',
    type: 'likert',
    category: 'hidden',
    subcategory: 'shadow',
    text: '안정을 원하는 마음을 나약하다고 느낄 때가 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { shadow: 'security', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { shadow: 'security', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { shadow: 'security', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { shadow: 'security', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { shadow: 'security', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
  {
    id: 'HD_SHD_006',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'shadow',
    text: '도전적인 기회를 거절했습니다. 안정이 중요했기 때문입니다.',
    subtext: '이후 드는 느낌은?',
    options: [
      { id: 'A', text: '현명한 선택이었다', value: 1, scores: { shadow: 'security', value: 1 } },
      { id: 'B', text: '약간 아쉽다', value: 3, scores: { shadow: 'security', value: 3 } },
      { id: 'C', text: '겁쟁이 같아서 싫다', value: 5, scores: { shadow: 'security', value: 5 } },
      { id: 'D', text: '상황에 따라 다르다', value: 2, scores: { shadow: 'security', value: 2 } },
    ],
    metadata: { layer: 8, isLite: false },
  },

  // ============================================
  // Connection Shadow
  // ============================================
  {
    id: 'HD_SHD_007',
    type: 'likert',
    category: 'hidden',
    subcategory: 'shadow',
    text: '사람들과 어울리고 싶은 마음을 숨길 때가 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { shadow: 'connection', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { shadow: 'connection', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { shadow: 'connection', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { shadow: 'connection', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { shadow: 'connection', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_SHD_008',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'shadow',
    text: '모임에 초대받지 못했습니다.',
    subtext: '솔직한 느낌은?',
    options: [
      { id: 'A', text: '상관없다', value: 1, scores: { shadow: 'connection', value: 1 } },
      { id: 'B', text: '약간 서운하다', value: 3, scores: { shadow: 'connection', value: 3 } },
      { id: 'C', text: '상당히 외롭다', value: 4, scores: { shadow: 'connection', value: 4 } },
      { id: 'D', text: '거절당한 느낌이다', value: 5, scores: { shadow: 'connection', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },

  // ============================================
  // Freedom Shadow
  // ============================================
  {
    id: 'HD_SHD_009',
    type: 'likert',
    category: 'hidden',
    subcategory: 'shadow',
    text: '자유롭고 싶은 마음이 이기적으로 느껴질 때가 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { shadow: 'freedom', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { shadow: 'freedom', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { shadow: 'freedom', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { shadow: 'freedom', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { shadow: 'freedom', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },
  {
    id: 'HD_SHD_010',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'shadow',
    text: '책임을 피해서 자유를 선택한 적이 있습니다.',
    subtext: '이때 드는 느낌은?',
    options: [
      { id: 'A', text: '당연한 선택이었다', value: 1, scores: { shadow: 'freedom', value: 1 } },
      { id: 'B', text: '약간 죄책감이 있다', value: 3, scores: { shadow: 'freedom', value: 3 } },
      { id: 'C', text: '상당히 괴롭다', value: 4, scores: { shadow: 'freedom', value: 4 } },
      { id: 'D', text: '스스로가 실망스럽다', value: 5, scores: { shadow: 'freedom', value: 5 } },
    ],
    metadata: { layer: 8, isLite: false },
  },

  // ============================================
  // Adventure Shadow
  // ============================================
  {
    id: 'HD_SHD_011',
    type: 'likert',
    category: 'hidden',
    subcategory: 'shadow',
    text: '모험하고 싶은 마음을 억누를 때가 있다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { shadow: 'adventure', value: 1 } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { shadow: 'adventure', value: 2 } },
      { id: '3', text: '보통이다', value: 3, scores: { shadow: 'adventure', value: 3 } },
      { id: '4', text: '그렇다', value: 4, scores: { shadow: 'adventure', value: 4 } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { shadow: 'adventure', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
  {
    id: 'HD_SHD_012',
    type: 'scenario',
    category: 'hidden',
    subcategory: 'shadow',
    text: '안전한 선택을 했지만, 마음 한편에는 다른 길이 있었습니다.',
    subtext: '이때 느낌은?',
    options: [
      { id: 'A', text: '잘한 선택이다', value: 1, scores: { shadow: 'adventure', value: 1 } },
      { id: 'B', text: '가끔 궁금하다', value: 3, scores: { shadow: 'adventure', value: 3 } },
      { id: 'C', text: '자주 후회된다', value: 4, scores: { shadow: 'adventure', value: 4 } },
      { id: 'D', text: '그 길이 계속 떠오른다', value: 5, scores: { shadow: 'adventure', value: 5 } },
    ],
    metadata: { layer: 8, isLite: true },
  },
];

export default SHADOW_QUESTIONS;
