/**
 * MET Mythic v2.0 — Session 4 문항 인덱스
 * Recognition(10) + Connection(10) + Security(10) = 30문항
 */

import { RECOGNITION_QUESTIONS } from './motive_recognition';
import { CONNECTION_QUESTIONS } from './motive_connection';
import { SECURITY_QUESTIONS } from './motive_security';

// 개별 export
export { RECOGNITION_QUESTIONS } from './motive_recognition';
export { CONNECTION_QUESTIONS } from './motive_connection';
export { SECURITY_QUESTIONS } from './motive_security';

// 통합 export
export const SESSION4_QUESTIONS = [
  ...RECOGNITION_QUESTIONS,
  ...CONNECTION_QUESTIONS,
  ...SECURITY_QUESTIONS,
];

// 통계
export const SESSION4_STATS = {
  total: SESSION4_QUESTIONS.length,
  byCategory: {
    recognition: RECOGNITION_QUESTIONS.length,
    connection: CONNECTION_QUESTIONS.length,
    security: SECURITY_QUESTIONS.length,
  },
  byType: {
    choice: SESSION4_QUESTIONS.filter(q => q.type === 'choice').length,
    likert: SESSION4_QUESTIONS.filter(q => q.type === 'likert').length,
    scenario: SESSION4_QUESTIONS.filter(q => q.type === 'scenario').length,
  },
  lite: SESSION4_QUESTIONS.filter(q => q.metadata.isLite).length,
  full: SESSION4_QUESTIONS.filter(q => !q.metadata.isLite).length,
};

export default SESSION4_QUESTIONS;
