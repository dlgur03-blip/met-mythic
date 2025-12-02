/**
 * MET Mythic v2.0 — Session 10 문항 인덱스
 * Conflict Part2 (10) + Context Part1 (20) = 30문항
 */

import { CONFLICT_PART2_QUESTIONS } from './conflict_part2';
import { 
  CONTEXT_PART1_QUESTIONS, 
  NORMAL_QUESTIONS, 
  PRESSURE_QUESTIONS 
} from './context_part1';

// 개별 export
export { CONFLICT_PART2_QUESTIONS } from './conflict_part2';
export { 
  CONTEXT_PART1_QUESTIONS, 
  NORMAL_QUESTIONS, 
  PRESSURE_QUESTIONS 
} from './context_part1';

// 통합 export
export const SESSION10_QUESTIONS = [
  ...CONFLICT_PART2_QUESTIONS,
  ...CONTEXT_PART1_QUESTIONS,
];

// 통계
export const SESSION10_STATS = {
  total: SESSION10_QUESTIONS.length,
  byCategory: {
    conflict: CONFLICT_PART2_QUESTIONS.length,
    normal: NORMAL_QUESTIONS.length,
    pressure: PRESSURE_QUESTIONS.length,
  },
  byType: {
    choice: SESSION10_QUESTIONS.filter(q => q.type === 'choice').length,
    bipolar: SESSION10_QUESTIONS.filter(q => q.type === 'bipolar').length,
    likert: SESSION10_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION10_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION10_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION10_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION10_QUESTIONS;
