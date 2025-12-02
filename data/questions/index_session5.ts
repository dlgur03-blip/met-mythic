/**
 * MET Mythic v2.0 — Session 5 문항 인덱스
 * Freedom(10) + Adventure(10) + Ignition Part1(10) = 30문항
 */

import { FREEDOM_QUESTIONS } from './motive_freedom';
import { ADVENTURE_QUESTIONS } from './motive_adventure';
import { IGNITION_PART1_QUESTIONS, COMPETITION_QUESTIONS, COMPLEXITY_QUESTIONS } from './ignition_part1';

// 개별 export
export { FREEDOM_QUESTIONS } from './motive_freedom';
export { ADVENTURE_QUESTIONS } from './motive_adventure';
export { IGNITION_PART1_QUESTIONS, COMPETITION_QUESTIONS, COMPLEXITY_QUESTIONS } from './ignition_part1';

// 통합 export
export const SESSION5_QUESTIONS = [
  ...FREEDOM_QUESTIONS,
  ...ADVENTURE_QUESTIONS,
  ...IGNITION_PART1_QUESTIONS,
];

// 통계
export const SESSION5_STATS = {
  total: SESSION5_QUESTIONS.length,
  byCategory: {
    freedom: FREEDOM_QUESTIONS.length,
    adventure: ADVENTURE_QUESTIONS.length,
    competition: COMPETITION_QUESTIONS.length,
    complexity: COMPLEXITY_QUESTIONS.length,
  },
  byType: {
    choice: SESSION5_QUESTIONS.filter(q => q.type === 'choice').length,
    likert: SESSION5_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION5_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION5_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION5_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION5_QUESTIONS;
