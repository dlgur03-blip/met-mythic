/**
 * MET Mythic v2.0 — 전체 문항 통합
 * 총 310문항 (300 + 검증 10)
 */

// Session 3: 동기 원천 Part1
import { ACHIEVEMENT_QUESTIONS } from './motive_achievement';
import { MASTERY_QUESTIONS } from './motive_mastery';
import { CREATION_QUESTIONS } from './motive_creation';

// Session 4: 동기 원천 Part2
import { RECOGNITION_QUESTIONS } from './motive_recognition';
import { CONNECTION_QUESTIONS } from './motive_connection';
import { SECURITY_QUESTIONS } from './motive_security';

// Session 5: 동기 원천 Part3 + 점화조건 Part1
import { FREEDOM_QUESTIONS } from './motive_freedom';
import { ADVENTURE_QUESTIONS } from './motive_adventure';
import { IGNITION_PART1_QUESTIONS } from './ignition_part1';

// Session 6: 점화조건 Part2 + 방향 Part1
import { IGNITION_PART2_QUESTIONS } from './ignition_part2';
import { DIRECTION_PART1_QUESTIONS } from './direction_part1';

// Session 7: 방향 Part2 + 운영 Part1
import { DIRECTION_PART2_QUESTIONS } from './direction_part2';
import { OPERATING_PART1_QUESTIONS } from './operating_part1';

// Session 8: 운영 Part2 + 에너지 Part1
import { OPERATING_PART2_QUESTIONS } from './operating_part2';
import { ENERGY_PART1_QUESTIONS } from './energy_part1';

// Session 9: 에너지 Part2 + 충돌 Part1
import { ENERGY_PART2_QUESTIONS } from './energy_part2';
import { CONFLICT_PART1_QUESTIONS } from './conflict_part1';

// Session 10: 충돌 Part2 + 상황 변화 Part1
import { CONFLICT_PART2_QUESTIONS } from './conflict_part2';
import { CONTEXT_PART1_QUESTIONS } from './context_part1';

// Session 11: 상황 변화 Part2 + 숨겨진 동기
import { CONTEXT_PART2_QUESTIONS } from './context_part2';
import { SHADOW_QUESTIONS } from './hidden_part1';
import { HIDDEN_PART2_QUESTIONS } from './hidden_part2';

// Session 12: 성숙도 + 검증
import { MATURITY_PART1_QUESTIONS } from './maturity_part1';
import { MATURITY_PART2_QUESTIONS, VALIDATION_QUESTIONS } from './maturity_part2';

// ============================================
// 카테고리별 통합
// ============================================

// 동기 원천 (80문항)
export const MOTIVE_QUESTIONS = [
  ...ACHIEVEMENT_QUESTIONS,
  ...MASTERY_QUESTIONS,
  ...CREATION_QUESTIONS,
  ...RECOGNITION_QUESTIONS,
  ...CONNECTION_QUESTIONS,
  ...SECURITY_QUESTIONS,
  ...FREEDOM_QUESTIONS,
  ...ADVENTURE_QUESTIONS,
];

// 점화 조건 (30문항)
export const IGNITION_QUESTIONS = [
  ...IGNITION_PART1_QUESTIONS,
  ...IGNITION_PART2_QUESTIONS,
];

// 방향 (32문항)
export const DIRECTION_QUESTIONS = [
  ...DIRECTION_PART1_QUESTIONS,
  ...DIRECTION_PART2_QUESTIONS,
];

// 운영 (24문항)
export const OPERATING_QUESTIONS = [
  ...OPERATING_PART1_QUESTIONS,
  ...OPERATING_PART2_QUESTIONS,
];

// 에너지 흐름 (30문항)
export const ENERGY_QUESTIONS = [
  ...ENERGY_PART1_QUESTIONS,
  ...ENERGY_PART2_QUESTIONS,
];

// 동기 충돌 (24문항)
export const CONFLICT_QUESTIONS = [
  ...CONFLICT_PART1_QUESTIONS,
  ...CONFLICT_PART2_QUESTIONS,
];

// 상황 변화 (30문항)
export const CONTEXT_QUESTIONS = [
  ...CONTEXT_PART1_QUESTIONS,
  ...CONTEXT_PART2_QUESTIONS,
];

// 숨겨진 동기 (24문항)
export const HIDDEN_QUESTIONS = [
  ...SHADOW_QUESTIONS,
  ...HIDDEN_PART2_QUESTIONS,
];

// 성숙도 (24문항)
export const MATURITY_QUESTIONS = [
  ...MATURITY_PART1_QUESTIONS,
  ...MATURITY_PART2_QUESTIONS,
];

// ============================================
// 전체 문항
// ============================================

export const ALL_QUESTIONS = [
  ...MOTIVE_QUESTIONS,      // 80
  ...IGNITION_QUESTIONS,    // 30
  ...DIRECTION_QUESTIONS,   // 32
  ...OPERATING_QUESTIONS,   // 24
  ...ENERGY_QUESTIONS,      // 30
  ...CONFLICT_QUESTIONS,    // 24
  ...CONTEXT_QUESTIONS,     // 30
  ...HIDDEN_QUESTIONS,      // 24
  ...MATURITY_QUESTIONS,    // 24
  ...VALIDATION_QUESTIONS,  // 12
];

// Lite 버전 (약 100문항)
export const LITE_QUESTIONS = ALL_QUESTIONS.filter(q => q.metadata.isLite);

// Full 버전 (전체)
export const FULL_QUESTIONS = ALL_QUESTIONS;

// ============================================
// 통계
// ============================================

export const QUESTION_STATS = {
  total: ALL_QUESTIONS.length,
  
  byCategory: {
    motive_source: MOTIVE_QUESTIONS.length,
    ignition: IGNITION_QUESTIONS.length,
    direction: DIRECTION_QUESTIONS.length,
    operating: OPERATING_QUESTIONS.length,
    energy: ENERGY_QUESTIONS.length,
    conflict: CONFLICT_QUESTIONS.length,
    context: CONTEXT_QUESTIONS.length,
    hidden: HIDDEN_QUESTIONS.length,
    maturity: MATURITY_QUESTIONS.length,
    validation: VALIDATION_QUESTIONS.length,
  },
  
  byType: {
    choice: ALL_QUESTIONS.filter(q => q.type === 'choice').length,
    likert: ALL_QUESTIONS.filter(q => q.type === 'likert').length,
    bipolar: ALL_QUESTIONS.filter(q => q.type === 'bipolar').length,
    scenario: ALL_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  
  byVersion: {
    lite: LITE_QUESTIONS.length,
    full: FULL_QUESTIONS.length,
  },
  
  byLayer: {
    layer1: ALL_QUESTIONS.filter(q => q.metadata.layer === 1).length,
    layer2: ALL_QUESTIONS.filter(q => q.metadata.layer === 2).length,
    layer3: ALL_QUESTIONS.filter(q => q.metadata.layer === 3).length,
    layer4: ALL_QUESTIONS.filter(q => q.metadata.layer === 4).length,
    layer5: ALL_QUESTIONS.filter(q => q.metadata.layer === 5).length,
    layer6: ALL_QUESTIONS.filter(q => q.metadata.layer === 6).length,
    layer7: ALL_QUESTIONS.filter(q => q.metadata.layer === 7).length,
    layer8: ALL_QUESTIONS.filter(q => q.metadata.layer === 8).length,
    layer9: ALL_QUESTIONS.filter(q => q.metadata.layer === 9).length,
    layer10: ALL_QUESTIONS.filter(q => q.metadata.layer === 10).length,
  },
};

// 기본 export
export default ALL_QUESTIONS;
