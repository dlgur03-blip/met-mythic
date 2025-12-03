/**
 * MET Mythic v5.0 — 전체 문항 통합
 * 총 310문항 (300 + 검증 10) + 역문항 24개 = 334문항
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

// 🆕 v5.0: 조건부 기능 (역문항 + 사회적 바람직성)
import {
  REVERSE_QUESTIONS,
  REVERSE_PAIRS,
  mergeQuestionMetadata,
  addReverseQuestions,
  getSocialDesirability,
  SOCIAL_DESIRABILITY_BY_MOTIVE,
  SOCIAL_DESIRABILITY_BY_CATEGORY,
} from './conditional_questions';

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
// 전체 문항 (기본)
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

// ============================================
// 🆕 v5.0: 조건부 기능 통합
// ============================================

// 메타데이터가 병합된 문항들 (사회적 바람직성 점수 포함)
export const QUESTIONS_WITH_METADATA = mergeQuestionMetadata(ALL_QUESTIONS);

// 역문항이 포함된 전체 문항 (Full 버전용 - 334문항)
export const ALL_QUESTIONS_WITH_REVERSE = addReverseQuestions(ALL_QUESTIONS);

// 역문항 쌍 export (검증용)
export { REVERSE_PAIRS };

// 역문항만 export
export { REVERSE_QUESTIONS };

// 사회적 바람직성 함수 export
export { getSocialDesirability, SOCIAL_DESIRABILITY_BY_MOTIVE, SOCIAL_DESIRABILITY_BY_CATEGORY };

// ============================================
// Lite / Full 버전
// ============================================

// Lite 버전 (약 100문항 - 역문항 미포함)
export const LITE_QUESTIONS = ALL_QUESTIONS.filter(q => q.metadata.isLite);

// Full 버전 (기존 310문항)
export const FULL_QUESTIONS = ALL_QUESTIONS;

// Full 버전 + 역문항 (334문항)
export const FULL_QUESTIONS_WITH_REVERSE = ALL_QUESTIONS_WITH_REVERSE;

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

// 🆕 v5.0: 확장된 통계
export const QUESTION_STATS_EXTENDED = {
  ...QUESTION_STATS,
  
  // 역문항 통계
  reverseQuestionCount: REVERSE_QUESTIONS.length,
  reversePairCount: REVERSE_PAIRS.length,
  totalWithReverse: ALL_QUESTIONS.length + REVERSE_QUESTIONS.length,
  
  // 버전별 (역문항 포함)
  byVersionExtended: {
    lite: LITE_QUESTIONS.length,
    full: FULL_QUESTIONS.length,
    fullWithReverse: ALL_QUESTIONS_WITH_REVERSE.length,
  },
};

// ============================================
// 문항 셔플 함수 (역문항 간격 유지)
// ============================================

export function shuffleQuestionsWithReverse(questions: typeof ALL_QUESTIONS): typeof ALL_QUESTIONS {
  // 역문항 쌍 ID 집합
  const reversePairIds = new Set(REVERSE_PAIRS.flatMap(p => [p.original, p.reverse]));
  
  // 일반 문항과 역문항 쌍 분리
  const regularQuestions = questions.filter(q => !reversePairIds.has(q.id));
  const pairQuestions = questions.filter(q => reversePairIds.has(q.id));
  
  // 일반 문항 셔플
  const shuffledRegular = [...regularQuestions].sort(() => Math.random() - 0.5);
  
  // 결과 배열
  const result: typeof ALL_QUESTIONS = [];
  
  // 역문항 원본-역문항 쌍 맵
  const originalToReverse = new Map<string, typeof ALL_QUESTIONS[0]>();
  const reverseToOriginal = new Map<string, typeof ALL_QUESTIONS[0]>();
  
  for (const pair of REVERSE_PAIRS) {
    const originalQ = pairQuestions.find(q => q.id === pair.original);
    const reverseQ = pairQuestions.find(q => q.id === pair.reverse);
    if (originalQ && reverseQ) {
      originalToReverse.set(pair.original, reverseQ);
      reverseToOriginal.set(pair.reverse, originalQ);
    }
  }
  
  // 원본 문항만 추출
  const originalQuestions = pairQuestions.filter(q => 
    REVERSE_PAIRS.some(p => p.original === q.id)
  );
  
  // 원본 문항 셔플
  const shuffledOriginals = [...originalQuestions].sort(() => Math.random() - 0.5);
  
  // 일반 문항 사이에 원본 문항 분산 배치
  let originalIndex = 0;
  const insertPositions: number[] = [];
  
  // 매 15문항마다 원본 문항 삽입 위치 계산
  for (let i = 14; i < shuffledRegular.length && originalIndex < shuffledOriginals.length; i += 15) {
    insertPositions.push(i);
    originalIndex++;
  }
  
  // 역문항 삽입 위치 (원본 + 20문항 후)
  const reverseInsertMap = new Map<number, typeof ALL_QUESTIONS[0]>();
  
  originalIndex = 0;
  let offset = 0;
  
  for (let i = 0; i < shuffledRegular.length; i++) {
    const adjustedIndex = i + offset;
    
    // 역문항 삽입 위치인지 확인
    const reverseQ = reverseInsertMap.get(adjustedIndex);
    if (reverseQ) {
      result.push(reverseQ);
      reverseInsertMap.delete(adjustedIndex);
      offset++;
    }
    
    result.push(shuffledRegular[i]);
    
    // 원본 문항 삽입 위치인지 확인
    if (insertPositions.includes(i) && originalIndex < shuffledOriginals.length) {
      const originalQ = shuffledOriginals[originalIndex];
      result.push(originalQ);
      
      // 역문항은 20문항 후에 삽입 예약
      const reverseQ = originalToReverse.get(originalQ.id);
      if (reverseQ) {
        const reversePosition = result.length + 20;
        reverseInsertMap.set(reversePosition, reverseQ);
      }
      
      originalIndex++;
      offset++;
    }
  }
  
  // 남은 역문항 추가
  for (const [, reverseQ] of reverseInsertMap) {
    result.push(reverseQ);
  }
  
  // 아직 추가 안 된 원본 문항 추가
  for (let i = originalIndex; i < shuffledOriginals.length; i++) {
    const originalQ = shuffledOriginals[i];
    result.push(originalQ);
    
    const reverseQ = originalToReverse.get(originalQ.id);
    if (reverseQ) {
      result.push(reverseQ);
    }
  }
  
  return result;
}

// ============================================
// 기본 export
// ============================================

export default ALL_QUESTIONS;