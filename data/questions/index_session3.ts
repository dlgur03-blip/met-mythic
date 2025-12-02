/**
 * MET Mythic v2.0 — Session 3 문항 인덱스
 * Achievement(10) + Mastery(10) + Creation(10) = 30문항
 */

import { ACHIEVEMENT_QUESTIONS } from './motive_achievement';
import { MASTERY_QUESTIONS } from './motive_mastery';
import { CREATION_QUESTIONS } from './motive_creation';

// 개별 export
export { ACHIEVEMENT_QUESTIONS } from './motive_achievement';
export { MASTERY_QUESTIONS } from './motive_mastery';
export { CREATION_QUESTIONS } from './motive_creation';

// 통합 export
export const SESSION3_QUESTIONS = [
  ...ACHIEVEMENT_QUESTIONS,
  ...MASTERY_QUESTIONS,
  ...CREATION_QUESTIONS,
];

// 통계
export const SESSION3_STATS = {
  total: SESSION3_QUESTIONS.length,
  byCategory: {
    achievement: ACHIEVEMENT_QUESTIONS.length,
    mastery: MASTERY_QUESTIONS.length,
    creation: CREATION_QUESTIONS.length,
  },
  byType: {
    choice: SESSION3_QUESTIONS.filter(q => q.type === 'choice').length,
    likert: SESSION3_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION3_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION3_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION3_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

console.log('Session 3 문항 통계:', SESSION3_STATS);
// 예상 출력:
// {
//   total: 30,
//   byCategory: { achievement: 10, mastery: 10, creation: 10 },
//   byType: { choice: 9, likert: 15, scenario: 6 },
//   lite: 18,
//   full: 12
// }

export default SESSION3_QUESTIONS;
