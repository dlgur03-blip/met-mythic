/**
 * MET Mythic v2.0 — 동기 충돌 (Conflict) Part 1
 * 7개 충돌 쌍 × 2문항 = 14문항
 * 
 * 충돌 쌍:
 * 1. Achievement vs Connection (성과 vs 관계)
 * 2. Freedom vs Security (자유 vs 안정)
 * 3. Mastery vs Adventure (깊이 vs 넓이)
 * 4. Recognition vs Connection (인정 vs 소속)
 * 5. Achievement vs Freedom (성취 vs 자유)
 * 6. Security vs Adventure (안정 vs 탐험)
 * 7. Creation vs Security (창조 vs 안정)
 */

import type { Question } from '../../lib/types';

export const CONFLICT_PART1_QUESTIONS: Question[] = [
  // ============================================
  // Achievement vs Connection (2문항)
  // ============================================
  {
    id: 'CF_ACH_CON_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'achievement_connection',
    text: '중요한 마감이 있는데, 친한 친구가 힘든 일이 생겨 연락이 왔습니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '마감을 우선한다, 나중에 연락한다', value: 5, scores: { pole: 'achievement', value: 5 } },
      { id: 'B', text: '짧게라도 시간을 낸다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '친구를 우선한다, 마감은 어떻게든', value: 5, scores: { pole: 'connection', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_ACH_CON_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'achievement_connection',
    text: '팀에서 일할 때, 무엇이 더 중요한가요?',
    options: [
      { id: 'A', text: '결과를 내는 것', value: 1, scores: { pole: 'achievement', value: 1 } },
      { id: 'B', text: '관계가 좋은 것', value: 1, scores: { pole: 'connection', value: 1 } },
    ],
    metadata: { layer: 6, isLite: true },
  },

  // ============================================
  // Freedom vs Security (2문항)
  // ============================================
  {
    id: 'CF_FRE_SEC_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'freedom_security',
    text: '연봉 30% 높고 안정적이지만 규칙이 많은 회사 vs 연봉은 낮지만 자유로운 스타트업',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '안정적인 회사', value: 5, scores: { pole: 'security', value: 5 } },
      { id: 'B', text: '상황에 따라 다르다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '자유로운 스타트업', value: 5, scores: { pole: 'freedom', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_FRE_SEC_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'freedom_security',
    text: '인생에서 더 중요한 것은?',
    options: [
      { id: 'A', text: '안정적인 기반', value: 1, scores: { pole: 'security', value: 1 } },
      { id: 'B', text: '자유로운 선택', value: 1, scores: { pole: 'freedom', value: 1 } },
    ],
    metadata: { layer: 6, isLite: true },
  },

  // ============================================
  // Mastery vs Adventure (2문항)
  // ============================================
  {
    id: 'CF_MAS_ADV_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'mastery_adventure',
    text: '커리어 방향을 정해야 합니다. 5년간 한 분야 전문가 vs 여러 분야 경험',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '한 분야 전문가', value: 5, scores: { pole: 'mastery', value: 5 } },
      { id: 'B', text: '상황에 따라 다르다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '여러 분야 경험', value: 5, scores: { pole: 'adventure', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_MAS_ADV_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'mastery_adventure',
    text: '배움에서 더 끌리는 것은?',
    options: [
      { id: 'A', text: '깊이 파고들기', value: 1, scores: { pole: 'mastery', value: 1 } },
      { id: 'B', text: '넓게 경험하기', value: 1, scores: { pole: 'adventure', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },

  // ============================================
  // Recognition vs Connection (2문항)
  // ============================================
  {
    id: 'CF_REC_CON_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'recognition_connection',
    text: '팀 프로젝트에서 당신의 아이디어가 핵심이었습니다. 발표 기회가 왔습니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '내가 발표한다, 내 기여를 보여주고 싶다', value: 5, scores: { pole: 'recognition', value: 5 } },
      { id: 'B', text: '팀과 상의해서 정한다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '팀 대표가 하는 게 낫다', value: 5, scores: { pole: 'connection', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_REC_CON_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'recognition_connection',
    text: '직장에서 더 중요한 것은?',
    options: [
      { id: 'A', text: '내 기여를 인정받는 것', value: 1, scores: { pole: 'recognition', value: 1 } },
      { id: 'B', text: '팀에 소속되어 있는 것', value: 1, scores: { pole: 'connection', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },

  // ============================================
  // Achievement vs Freedom (2문항)
  // ============================================
  {
    id: 'CF_ACH_FRE_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'achievement_freedom',
    text: '목표 달성을 위해 자유 시간을 포기해야 하는 상황입니다.',
    subtext: '당신의 반응은?',
    options: [
      { id: 'A', text: '목표가 더 중요하다, 포기한다', value: 5, scores: { pole: 'achievement', value: 5 } },
      { id: 'B', text: '적당히 조율한다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '자유 시간이 더 소중하다', value: 5, scores: { pole: 'freedom', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_ACH_FRE_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'achievement_freedom',
    text: '일할 때 더 중요한 것은?',
    options: [
      { id: 'A', text: '성과를 내는 것', value: 1, scores: { pole: 'achievement', value: 1 } },
      { id: 'B', text: '내 방식대로 하는 것', value: 1, scores: { pole: 'freedom', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },

  // ============================================
  // Security vs Adventure (2문항)
  // ============================================
  {
    id: 'CF_SEC_ADV_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'security_adventure',
    text: '지금 직장은 안정적입니다. 해외에서 새로운 기회가 왔습니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '지금 직장을 유지한다', value: 5, scores: { pole: 'security', value: 5 } },
      { id: 'B', text: '조건을 더 따져본다', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '새로운 기회에 도전한다', value: 5, scores: { pole: 'adventure', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_SEC_ADV_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'security_adventure',
    text: '삶에서 더 끌리는 것은?',
    options: [
      { id: 'A', text: '예측 가능한 안정', value: 1, scores: { pole: 'security', value: 1 } },
      { id: 'B', text: '예측 불가능한 모험', value: 1, scores: { pole: 'adventure', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },

  // ============================================
  // Creation vs Security (2문항)
  // ============================================
  {
    id: 'CF_CRE_SEC_001',
    type: 'scenario',
    category: 'conflict',
    subcategory: 'creation_security',
    text: '새로운 아이디어가 떠올랐습니다. 실행하면 리스크가 있습니다.',
    subtext: '당신의 선택은?',
    options: [
      { id: 'A', text: '안전하게 기존 방식 유지', value: 5, scores: { pole: 'security', value: 5 } },
      { id: 'B', text: '작은 규모로 테스트', value: 3, scores: { pole: 'balanced', value: 3 } },
      { id: 'C', text: '아이디어를 실행해본다', value: 5, scores: { pole: 'creation', value: 5 } },
    ],
    metadata: { layer: 6, isLite: true },
  },
  {
    id: 'CF_CRE_SEC_002',
    type: 'bipolar',
    category: 'conflict',
    subcategory: 'creation_security',
    text: '일할 때 더 편한 것은?',
    options: [
      { id: 'A', text: '검증된 방식대로', value: 1, scores: { pole: 'security', value: 1 } },
      { id: 'B', text: '새로운 방식 시도', value: 1, scores: { pole: 'creation', value: 1 } },
    ],
    metadata: { layer: 6, isLite: false },
  },
];

export default CONFLICT_PART1_QUESTIONS;
