/**
 * MET Mythic v2.0 — Recognition (인정) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const RECOGNITION_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_REC_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '열심히 한 일이 끝났을 때 가장 바라는 것은?',
    options: [
      { id: 'A', text: '누군가 알아봐주는 것', value: 1, scores: { motive: 'recognition', value: 1 } },
      { id: 'B', text: '스스로 성장했다는 느낌', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '목표를 달성했다는 사실', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'D', text: '이제 쉴 수 있다는 안도감', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_REC_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'recognition',
    text: 'SNS에 글을 올렸을 때 가장 신경 쓰이는 것은?',
    options: [
      { id: 'A', text: '좋아요/반응이 얼마나 오는지', value: 1, scores: { motive: 'recognition', value: 1 } },
      { id: 'B', text: '내용이 정확한지', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'C', text: '새로운 사람들과 연결되는지', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '별로 신경 안 쓴다', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_REC_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '회의에서 내 의견이 채택됐을 때 드는 느낌은?',
    options: [
      { id: 'A', text: '내 가치를 인정받은 느낌', value: 1, scores: { motive: 'recognition', value: 1 } },
      { id: 'B', text: '팀에 기여해서 기쁨', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'C', text: '내 분석이 맞았다는 확인', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '일이 잘 풀려서 다행', value: 1, scores: { motive: 'achievement', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_REC_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '내 노력을 알아주면 에너지가 난다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'recognition', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'recognition', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'recognition', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'recognition', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_REC_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '존경받는 위치에 있고 싶다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'recognition', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'recognition', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'recognition', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'recognition', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_REC_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '칭찬을 들으면 더 열심히 하게 된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'recognition', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'recognition', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'recognition', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'recognition', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_REC_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '무시당하면 힘이 빠진다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'recognition', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'recognition', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'recognition', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'recognition', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_REC_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '내 기여가 묻히면 속상하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'recognition', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'recognition', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'recognition', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'recognition', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_REC_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '팀 프로젝트에서 당신의 아이디어로 성공했지만, 발표는 다른 사람이 했습니다.',
    subtext: '이때 드는 솔직한 느낌은?',
    options: [
      { id: 'A', text: '내 기여를 알아줬으면 좋겠다', value: 1, scores: { motive: 'recognition', value: 1 } },
      { id: 'B', text: '결과가 좋으니 됐다', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '팀이 성공해서 기쁘다', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '발표 안 해서 편하다', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_REC_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '상사가 회의에서 "이건 팀 전체의 성과입니다"라고 말했습니다. 실제로는 당신이 80%를 했습니다.',
    subtext: '이때 드는 생각은?',
    options: [
      { id: 'A', text: '내 이름이 언급됐으면...', value: 1, scores: { motive: 'recognition', value: 1 } },
      { id: 'B', text: '상사가 알면 됐지', value: 1, scores: { motive: 'security', value: 1 } },
      { id: 'C', text: '팀을 위한 거니까 괜찮다', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'D', text: '일이 끝나서 다행이다', value: 1, scores: { motive: 'achievement', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default RECOGNITION_QUESTIONS;
