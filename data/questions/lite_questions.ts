/**
 * MET Mythic v2.0 — Lite Version (100문항)
 * 
 * 선별 기준:
 * - 각 카테고리의 핵심 문항만 포함
 * - 10-15분 내 완료 가능
 * - 기본 동기 프로파일 + 원형 매칭에 충분한 데이터
 */

import { ALL_QUESTIONS } from './all_questions';
import type { Question } from '../../lib/types';

// ============================================
// Lite 문항 ID 목록 (수동 선별)
// ============================================

const LITE_QUESTION_IDS = new Set([
  // ========================================
  // 동기 원천 (40문항) - 각 동기당 5문항
  // ========================================
  
  // Achievement (5)
  'MS_ACH_001', 'MS_ACH_002', 'MS_ACH_003', 'MS_ACH_005', 'MS_ACH_009',
  // Mastery (5)
  'MS_MAS_001', 'MS_MAS_002', 'MS_MAS_003', 'MS_MAS_005', 'MS_MAS_009',
  // Creation (5)
  'MS_CRE_001', 'MS_CRE_002', 'MS_CRE_003', 'MS_CRE_005', 'MS_CRE_009',
  // Recognition (5)
  'MS_REC_001', 'MS_REC_002', 'MS_REC_003', 'MS_REC_005', 'MS_REC_009',
  // Connection (5)
  'MS_CON_001', 'MS_CON_002', 'MS_CON_003', 'MS_CON_005', 'MS_CON_009',
  // Security (5)
  'MS_SEC_001', 'MS_SEC_002', 'MS_SEC_003', 'MS_SEC_005', 'MS_SEC_009',
  // Freedom (5)
  'MS_FRE_001', 'MS_FRE_002', 'MS_FRE_003', 'MS_FRE_005', 'MS_FRE_009',
  // Adventure (5)
  'MS_ADV_001', 'MS_ADV_002', 'MS_ADV_003', 'MS_ADV_005', 'MS_ADV_009',
  
  // ========================================
  // 점화 조건 (12문항) - 각 조건당 2문항
  // ========================================
  
  // Competition (2)
  'IG_CMP_001', 'IG_CMP_004',
  // Complexity (2)
  'IG_CPX_001', 'IG_CPX_004',
  // Deadline (2)
  'IG_DED_001', 'IG_DED_004',
  // Audience (2)
  'IG_AUD_001', 'IG_AUD_004',
  // Autonomy (2)
  'IG_AUT_001', 'IG_AUT_004',
  // Crisis (2)
  'IG_CRI_001', 'IG_CRI_004',
  
  // ========================================
  // 방향 (8문항) - 각 동기당 1문항
  // ========================================
  
  'DR_ACH_001', 'DR_MAS_001', 'DR_CRE_001', 'DR_REC_001',
  'DR_CON_001', 'DR_SEC_001', 'DR_FRE_001', 'DR_ADV_001',
  
  // ========================================
  // 운영 (8문항) - 핵심 축별 2문항
  // ========================================
  
  // Rhythm (2)
  'OP_RHY_001', 'OP_RHY_002',
  // Recovery (2)
  'OP_REC_001', 'OP_REC_002',
  // Relay (2)
  'OP_REL_001', 'OP_REL_002',
  // Resistance (2)
  'OP_RES_001', 'OP_RES_002',
  
  // ========================================
  // 에너지 흐름 (10문항)
  // ========================================
  
  // Fuel (4)
  'EN_FUE_001', 'EN_FUE_002', 'EN_FUE_005', 'EN_FUE_008',
  // Drain (3)
  'EN_DRN_001', 'EN_DRN_002', 'EN_DRN_005',
  // Flow (3)
  'EN_FLO_001', 'EN_FLO_002', 'EN_FLO_006',
  
  // ========================================
  // 동기 충돌 (8문항) - 핵심 쌍만
  // ========================================
  
  // Achievement vs Connection
  'CF_ACH_CON_001', 'CF_ACH_CON_002',
  // Freedom vs Security
  'CF_FRE_SEC_001', 'CF_FRE_SEC_002',
  // Mastery vs Adventure
  'CF_MAS_ADV_001', 'CF_MAS_ADV_002',
  // Achievement vs Freedom
  'CF_ACH_FRE_001', 'CF_ACH_FRE_002',
  
  // ========================================
  // 상황 변화 (8문항)
  // ========================================
  
  // Normal (4)
  'CX_NOR_001', 'CX_NOR_002', 'CX_NOR_003', 'CX_NOR_010',
  // Pressure (4)
  'CX_PRE_001', 'CX_PRE_002', 'CX_PRE_003', 'CX_PRE_010',
  
  // ========================================
  // 숨겨진 동기 (6문항)
  // ========================================
  
  // Shadow (4)
  'HD_SHD_001', 'HD_SHD_003', 'HD_SHD_007', 'HD_SHD_011',
  // Projection (1)
  'HD_PRJ_001',
  // Compensation (1)
  'HD_CMP_001',
  
  // ========================================
  // 성숙도 (6문항)
  // ========================================
  
  // Awareness (3)
  'MT_AWR_001', 'MT_AWR_002', 'MT_AWR_005',
  // Integration (2)
  'MT_INT_001', 'MT_INT_005',
  // Growth (1)
  'MT_GRW_001',
  
  // ========================================
  // 검증 (4문항)
  // ========================================
  
  // Consistency (2)
  'VL_CON_001', 'VL_CON_003',
  // Honesty (2)
  'VL_HON_001', 'VL_HON_006',
]);

// ============================================
// Lite 문항 추출
// ============================================

export const LITE_VERSION_QUESTIONS: Question[] = ALL_QUESTIONS.filter(
  q => LITE_QUESTION_IDS.has(q.id)
);

// ID 순서대로 정렬
LITE_VERSION_QUESTIONS.sort((a, b) => {
  const categoryOrder = [
    'motive_source', 'ignition', 'direction', 'operating', 
    'energy', 'conflict', 'context', 'hidden', 'maturity', 'validation'
  ];
  const catA = categoryOrder.indexOf(a.category);
  const catB = categoryOrder.indexOf(b.category);
  if (catA !== catB) return catA - catB;
  return a.id.localeCompare(b.id);
});

// ============================================
// 통계
// ============================================

export const LITE_STATS = {
  total: LITE_VERSION_QUESTIONS.length,
  target: 110,
  
  byCategory: {
    motive_source: LITE_VERSION_QUESTIONS.filter(q => q.category === 'motive_source').length,
    ignition: LITE_VERSION_QUESTIONS.filter(q => q.category === 'ignition').length,
    direction: LITE_VERSION_QUESTIONS.filter(q => q.category === 'direction').length,
    operating: LITE_VERSION_QUESTIONS.filter(q => q.category === 'operating').length,
    energy: LITE_VERSION_QUESTIONS.filter(q => q.category === 'energy').length,
    conflict: LITE_VERSION_QUESTIONS.filter(q => q.category === 'conflict').length,
    context: LITE_VERSION_QUESTIONS.filter(q => q.category === 'context').length,
    hidden: LITE_VERSION_QUESTIONS.filter(q => q.category === 'hidden').length,
    maturity: LITE_VERSION_QUESTIONS.filter(q => q.category === 'maturity').length,
    validation: LITE_VERSION_QUESTIONS.filter(q => q.category === 'validation').length,
  },
  
  byType: {
    choice: LITE_VERSION_QUESTIONS.filter(q => q.type === 'choice').length,
    likert: LITE_VERSION_QUESTIONS.filter(q => q.type === 'likert').length,
    bipolar: LITE_VERSION_QUESTIONS.filter(q => q.type === 'bipolar').length,
    scenario: LITE_VERSION_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  
  estimatedTime: '10-12분',
};

// ============================================
// 누락 검증
// ============================================

export function validateLiteQuestions(): { missing: string[]; found: number } {
  const allIds = new Set(ALL_QUESTIONS.map(q => q.id));
  const missing: string[] = [];
  
  for (const id of LITE_QUESTION_IDS) {
    if (!allIds.has(id)) {
      missing.push(id);
    }
  }
  
  return {
    missing,
    found: LITE_QUESTION_IDS.size - missing.length,
  };
}

export default LITE_VERSION_QUESTIONS;
