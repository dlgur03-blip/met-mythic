/**
 * MET Mythic v2.0 — Session 7 문항 인덱스
 * Direction Part2 (22) + Operating Part1 (8) = 30문항
 */

import { DIRECTION_PART2_QUESTIONS } from './direction_part2';
import { OPERATING_PART1_QUESTIONS, RHYTHM_QUESTIONS, RECOVERY_QUESTIONS } from './operating_part1';

// 개별 export
export { DIRECTION_PART2_QUESTIONS } from './direction_part2';
export { OPERATING_PART1_QUESTIONS, RHYTHM_QUESTIONS, RECOVERY_QUESTIONS } from './operating_part1';

// 통합 export
export const SESSION7_QUESTIONS = [
  ...DIRECTION_PART2_QUESTIONS,
  ...OPERATING_PART1_QUESTIONS,
];

// 통계
export const SESSION7_STATS = {
  total: SESSION7_QUESTIONS.length,
  byCategory: {
    direction: DIRECTION_PART2_QUESTIONS.length,
    rhythm: RHYTHM_QUESTIONS.length,
    recovery: RECOVERY_QUESTIONS.length,
  },
  byType: {
    bipolar: SESSION7_QUESTIONS.filter(q => q.type === 'bipolar').length,
    likert: SESSION7_QUESTIONS.filter(q => q.type === 'likert').length,
  },
  lite: SESSION7_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION7_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION7_QUESTIONS;
