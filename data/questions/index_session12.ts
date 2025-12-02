/**
 * MET Mythic v2.0 — Session 12 문항 인덱스
 * Maturity Part1 (16) + Maturity Part2 (8) + Validation (12) = 36문항
 */

import { 
  MATURITY_PART1_QUESTIONS, 
  AWARENESS_QUESTIONS, 
  INTEGRATION_QUESTIONS 
} from './maturity_part1';
import { 
  MATURITY_PART2_QUESTIONS, 
  GROWTH_MATURITY_QUESTIONS,
  VALIDATION_QUESTIONS,
  CONSISTENCY_QUESTIONS,
  HONESTY_QUESTIONS
} from './maturity_part2';

// 개별 export
export { 
  MATURITY_PART1_QUESTIONS, 
  AWARENESS_QUESTIONS, 
  INTEGRATION_QUESTIONS 
} from './maturity_part1';
export { 
  MATURITY_PART2_QUESTIONS, 
  GROWTH_MATURITY_QUESTIONS,
  VALIDATION_QUESTIONS,
  CONSISTENCY_QUESTIONS,
  HONESTY_QUESTIONS
} from './maturity_part2';

// 성숙도 전체
export const MATURITY_ALL_QUESTIONS = [
  ...MATURITY_PART1_QUESTIONS,
  ...MATURITY_PART2_QUESTIONS,
];

// 통합 export
export const SESSION12_QUESTIONS = [
  ...MATURITY_PART1_QUESTIONS,
  ...MATURITY_PART2_QUESTIONS,
  ...VALIDATION_QUESTIONS,
];

// 통계
export const SESSION12_STATS = {
  total: SESSION12_QUESTIONS.length,
  byCategory: {
    awareness: AWARENESS_QUESTIONS.length,
    integration: INTEGRATION_QUESTIONS.length,
    growth: GROWTH_MATURITY_QUESTIONS.length,
    consistency: CONSISTENCY_QUESTIONS.length,
    honesty: HONESTY_QUESTIONS.length,
  },
  byType: {
    bipolar: SESSION12_QUESTIONS.filter(q => q.type === 'bipolar').length,
    likert: SESSION12_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION12_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION12_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION12_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION12_QUESTIONS;
