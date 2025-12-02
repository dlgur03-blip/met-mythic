/**
 * MET Mythic v2.0 — Session 9 문항 인덱스
 * Energy Part2 (16) + Conflict Part1 (14) = 30문항
 */

import { 
  ENERGY_PART2_QUESTIONS, 
  DRAIN_PART2_QUESTIONS, 
  FLOW_QUESTIONS 
} from './energy_part2';
import { CONFLICT_PART1_QUESTIONS } from './conflict_part1';

// 개별 export
export { 
  ENERGY_PART2_QUESTIONS, 
  DRAIN_PART2_QUESTIONS, 
  FLOW_QUESTIONS 
} from './energy_part2';
export { CONFLICT_PART1_QUESTIONS } from './conflict_part1';

// 통합 export
export const SESSION9_QUESTIONS = [
  ...ENERGY_PART2_QUESTIONS,
  ...CONFLICT_PART1_QUESTIONS,
];

// 통계
export const SESSION9_STATS = {
  total: SESSION9_QUESTIONS.length,
  byCategory: {
    drain: DRAIN_PART2_QUESTIONS.length,
    flow: FLOW_QUESTIONS.length,
    conflict: CONFLICT_PART1_QUESTIONS.length,
  },
  byType: {
    bipolar: SESSION9_QUESTIONS.filter(q => q.type === 'bipolar').length,
    likert: SESSION9_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION9_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION9_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION9_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION9_QUESTIONS;
