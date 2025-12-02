/**
 * MET Mythic v2.0 — Session 11 문항 인덱스
 * Context Part2 (10) + Hidden Part1 (12) + Hidden Part2 (12) = 34문항
 */

import { 
  CONTEXT_PART2_QUESTIONS, 
  GROWTH_QUESTIONS, 
  CRISIS_QUESTIONS 
} from './context_part2';
import { SHADOW_QUESTIONS } from './hidden_part1';
import { 
  HIDDEN_PART2_QUESTIONS, 
  PROJECTION_QUESTIONS, 
  COMPENSATION_QUESTIONS 
} from './hidden_part2';

// 개별 export
export { 
  CONTEXT_PART2_QUESTIONS, 
  GROWTH_QUESTIONS, 
  CRISIS_QUESTIONS 
} from './context_part2';
export { SHADOW_QUESTIONS } from './hidden_part1';
export { 
  HIDDEN_PART2_QUESTIONS, 
  PROJECTION_QUESTIONS, 
  COMPENSATION_QUESTIONS 
} from './hidden_part2';

// 숨겨진 동기 전체
export const HIDDEN_ALL_QUESTIONS = [
  ...SHADOW_QUESTIONS,
  ...HIDDEN_PART2_QUESTIONS,
];

// 통합 export
export const SESSION11_QUESTIONS = [
  ...CONTEXT_PART2_QUESTIONS,
  ...SHADOW_QUESTIONS,
  ...HIDDEN_PART2_QUESTIONS,
];

// 통계
export const SESSION11_STATS = {
  total: SESSION11_QUESTIONS.length,
  byCategory: {
    growth: GROWTH_QUESTIONS.length,
    crisis: CRISIS_QUESTIONS.length,
    shadow: SHADOW_QUESTIONS.length,
    projection: PROJECTION_QUESTIONS.length,
    compensation: COMPENSATION_QUESTIONS.length,
  },
  byType: {
    choice: SESSION11_QUESTIONS.filter(q => q.type === 'choice').length,
    bipolar: SESSION11_QUESTIONS.filter(q => q.type === 'bipolar').length,
    likert: SESSION11_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION11_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION11_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION11_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION11_QUESTIONS;
