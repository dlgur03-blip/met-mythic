/**
 * MET Mythic v2.0 — Session 6 문항 인덱스
 * Ignition Part2 (20) + Direction Part1 (10) = 30문항
 */

import { 
  IGNITION_PART2_QUESTIONS, 
  DEADLINE_QUESTIONS, 
  AUDIENCE_QUESTIONS, 
  AUTONOMY_QUESTIONS, 
  CRISIS_QUESTIONS 
} from './ignition_part2';
import { DIRECTION_PART1_QUESTIONS } from './direction_part1';

// 개별 export
export { 
  IGNITION_PART2_QUESTIONS, 
  DEADLINE_QUESTIONS, 
  AUDIENCE_QUESTIONS, 
  AUTONOMY_QUESTIONS, 
  CRISIS_QUESTIONS 
} from './ignition_part2';
export { DIRECTION_PART1_QUESTIONS } from './direction_part1';

// 통합 export
export const SESSION6_QUESTIONS = [
  ...IGNITION_PART2_QUESTIONS,
  ...DIRECTION_PART1_QUESTIONS,
];

// 통계
export const SESSION6_STATS = {
  total: SESSION6_QUESTIONS.length,
  byCategory: {
    deadline: DEADLINE_QUESTIONS.length,
    audience: AUDIENCE_QUESTIONS.length,
    autonomy: AUTONOMY_QUESTIONS.length,
    crisis: CRISIS_QUESTIONS.length,
    direction: DIRECTION_PART1_QUESTIONS.length,
  },
  byType: {
    choice: SESSION6_QUESTIONS.filter(q => q.type === 'choice').length,
    likert: SESSION6_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION6_QUESTIONS.filter(q => q.type === 'scenario').length,
    bipolar: SESSION6_QUESTIONS.filter(q => q.type === 'bipolar').length,
  },
  lite: SESSION6_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION6_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION6_QUESTIONS;
