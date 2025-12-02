/**
 * MET Mythic v2.0 — Session 8 문항 인덱스
 * Operating Part2 (16) + Energy Part1 (14) = 30문항
 */

import { 
  OPERATING_PART2_QUESTIONS, 
  RELAY_QUESTIONS, 
  RESISTANCE_QUESTIONS, 
  SCOPE_QUESTIONS 
} from './operating_part2';
import { 
  ENERGY_PART1_QUESTIONS, 
  FUEL_QUESTIONS, 
  DRAIN_PART1_QUESTIONS 
} from './energy_part1';

// 개별 export
export { 
  OPERATING_PART2_QUESTIONS, 
  RELAY_QUESTIONS, 
  RESISTANCE_QUESTIONS, 
  SCOPE_QUESTIONS 
} from './operating_part2';
export { 
  ENERGY_PART1_QUESTIONS, 
  FUEL_QUESTIONS, 
  DRAIN_PART1_QUESTIONS 
} from './energy_part1';

// 통합 export
export const SESSION8_QUESTIONS = [
  ...OPERATING_PART2_QUESTIONS,
  ...ENERGY_PART1_QUESTIONS,
];

// 통계
export const SESSION8_STATS = {
  total: SESSION8_QUESTIONS.length,
  byCategory: {
    relay: RELAY_QUESTIONS.length,
    resistance: RESISTANCE_QUESTIONS.length,
    scope: SCOPE_QUESTIONS.length,
    fuel: FUEL_QUESTIONS.length,
    drain: DRAIN_PART1_QUESTIONS.length,
  },
  byType: {
    bipolar: SESSION8_QUESTIONS.filter(q => q.type === 'bipolar').length,
    likert: SESSION8_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION8_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION8_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION8_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION8_QUESTIONS;
