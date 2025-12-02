/**
 * MET Mythic v2.0 — 동기 충돌 (Conflict) Part 2
 * 5개 충돌 쌍 × 2문항 = 10문항
 */

import type { Question } from '../../lib/types';

export const CONFLICT_PART2_QUESTIONS: Question[] = [
  // ============================================
  // Mastery vs Achievement (2문항)
  // ============================================
  {
    id: 'CF_MAS_ACH_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'mastery_achievement',
    text: '프로젝트 마감이 다가옵니다. 완벽하게 이해하려면 시간이 더 필요합니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '일단 마감을 맞춘다', value: 5, scores: { pole: 'achievement', value: 5 } },
      { id: 'B', text: '적당히 타협한다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '제대로 이해할 때까지 더 파고든다', value: 5, scores: { pole: 'mastery', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_MAS_ACH_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'mastery_achievement',
    text: '일할 때 더 중요한 것은?',
    options: [
      { id: 'A', text: '결과를 빨리 내는 것', value: 1, scores: { pole: 'achievement', value: 1 } },
      { id: 'B', text: '완전히 이해하는 것', value: 1, scores: { pole: 'mastery', value: 1 } },
    ],
    metadata: { layer: 6, isLite: true },
  },

  // ============================================
  // Connection vs Freedom (2문항)
  // ============================================
  {
    id: 'CF_CON_FRE_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'connection_freedom',
    text: '주말에 혼자만의 시간이 필요한데, 친구들이 모임에 오라고 합니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '친구들과 함께한다', value: 5, scores: { pole: 'connection', value: 5 } },
      { id: 'B', text: '짧게 얼굴만 비친다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '혼자만의 시간을 지킨다', value: 5, scores: { pole: 'freedom', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_CON_FRE_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'connection_freedom',
    text: '삶에서 더 소중한 것은?',
    options: [
      { id: 'A', text: '사람들과의 관계', value: 1, scores: { pole: 'connection', value: 1 } },
      { id: 'B', text: '나만의 시간과 공간', value: 1, scores: { pole: 'freedom', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },

  // ============================================
  // Recognition vs Freedom (2문항)
  // ============================================
  {
    id: 'CF_REC_FRE_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'recognition_freedom',
    text: '승진 기회가 왔지만, 더 많은 책임과 규칙이 따릅니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '승진을 받아들인다', value: 5, scores: { pole: 'recognition', value: 5 } },
      { id: 'B', text: '조건을 협상해본다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '지금의 자유를 유지한다', value: 5, scores: { pole: 'freedom', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_REC_FRE_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'recognition_freedom',
    text: '커리어에서 더 중요한 것은?',
    options: [
      { id: 'A', text: '지위와 인정', value: 1, scores: { pole: 'recognition', value: 1 } },
      { id: 'B', text: '자율성과 자유', value: 1, scores: { pole: 'freedom', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },

  // ============================================
  // Creation vs Mastery (2문항)
  // ============================================
  {
    id: 'CF_CRE_MAS_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'creation_mastery',
    text: '새 아이디어가 떠올랐는데, 기존 기술을 더 깊이 익혀야 제대로 구현할 수 있습니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '일단 아이디어를 시도해본다', value: 5, scores: { pole: 'creation', value: 5 } },
      { id: 'B', text: '둘 다 병행한다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '기술을 먼저 마스터한다', value: 5, scores: { pole: 'mastery', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_CRE_MAS_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'creation_mastery',
    text: '배움에서 더 끌리는 것은?',
    options: [
      { id: 'A', text: '새로운 것을 만들어보기', value: 1, scores: { pole: 'creation', value: 1 } },
      { id: 'B', text: '기존 것을 완벽히 익히기', value: 1, scores: { pole: 'mastery', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },

  // ============================================
  // Adventure vs Connection (2문항)
  // ============================================
  {
    id: 'CF_ADV_CON_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'adventure_connection',
    text: '해외 장기 체류 기회가 왔습니다. 하지만 가족, 친구들과 멀어지게 됩니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '새로운 경험을 택한다', value: 5, scores: { pole: 'adventure', value: 5 } },
      { id: 'B', text: '짧은 기간으로 협상한다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '관계를 지키기 위해 포기한다', value: 5, scores: { pole: 'connection', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_ADV_CON_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'adventure_connection',
    text: '인생에서 더 중요한 것은?',
    options: [
      { id: 'A', text: '새로운 경험과 도전', value: 1, scores: { pole: 'adventure', value: 1 } },
      { id: 'B', text: '소중한 사람들과의 관계', value: 1, scores: { pole: 'connection', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },
];

export default CONFLICT_PART2_QUESTIONS;
