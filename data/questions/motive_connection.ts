/**
 * MET Mythic v2.0 — Connection (연결) 동기 원천 문항
 * 10문항: 선택형 3 + 리커트(접근) 3 + 리커트(회피) 2 + 시나리오 2
 */

import type { Question } from '../../lib/types';

export const CONNECTION_QUESTIONS: Question[] = [
  // ============================================
  // 선택형 3문항
  // ============================================
  {
    id: 'MS_CON_001',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'connection',
    text: '좋은 하루의 기준은?',
    options: [
      { id: 'A', text: '의미 있는 대화를 나눈 날', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'B', text: '할 일을 다 끝낸 날', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '새로운 걸 배운 날', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '아무 문제 없이 평화로운 날', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CON_002',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'connection',
    text: '일이 힘들 때 가장 도움이 되는 것은?',
    options: [
      { id: 'A', text: '같이 고민해주는 사람', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'B', text: '명확한 목표와 계획', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '문제의 원인 파악', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '충분한 휴식', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CON_003',
    type: 'choice',
    category: 'motive_source',
    subcategory: 'connection',
    text: '팀 프로젝트에서 가장 중요하게 생각하는 것은?',
    options: [
      { id: 'A', text: '팀원들과의 관계', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'B', text: '프로젝트 성공', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '내가 맡은 부분의 완성도', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '내 역할에 대한 인정', value: 1, scores: { motive: 'recognition', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 접근형 3문항
  // ============================================
  {
    id: 'MS_CON_004',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'connection',
    text: '사람들과 깊은 대화를 나누면 에너지가 충전된다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'connection', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'connection', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'connection', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'connection', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'connection', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CON_005',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'connection',
    text: '누군가에게 도움이 되면 뿌듯하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'connection', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'connection', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'connection', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'connection', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'connection', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CON_006',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'connection',
    text: '함께하는 것 자체가 좋다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'connection', value: 1, direction: 'approach' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'connection', value: 2, direction: 'approach' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'connection', value: 3, direction: 'approach' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'connection', value: 4, direction: 'approach' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'connection', value: 5, direction: 'approach' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 리커트 회피형 2문항
  // ============================================
  {
    id: 'MS_CON_007',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'connection',
    text: '혼자 있는 시간이 길어지면 힘들다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'connection', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'connection', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'connection', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'connection', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'connection', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CON_008',
    type: 'likert',
    category: 'motive_source',
    subcategory: 'connection',
    text: '관계가 소원해지면 마음이 불편하다.',
    options: [
      { id: '1', text: '전혀 그렇지 않다', value: 1, scores: { motive: 'connection', value: 1, direction: 'avoidance' } },
      { id: '2', text: '그렇지 않다', value: 2, scores: { motive: 'connection', value: 2, direction: 'avoidance' } },
      { id: '3', text: '보통이다', value: 3, scores: { motive: 'connection', value: 3, direction: 'avoidance' } },
      { id: '4', text: '그렇다', value: 4, scores: { motive: 'connection', value: 4, direction: 'avoidance' } },
      { id: '5', text: '매우 그렇다', value: 5, scores: { motive: 'connection', value: 5, direction: 'avoidance' } },
    ],
    metadata: { layer: 1, isLite: false },
  },

  // ============================================
  // 시나리오형 2문항
  // ============================================
  {
    id: 'MS_CON_009',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'connection',
    text: '오랜만에 여유 시간이 생겼습니다.',
    subtext: '가장 하고 싶은 것은?',
    options: [
      { id: 'A', text: '오랫동안 못 본 친구 만나기', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'B', text: '밀린 일 처리하기', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '관심 있는 분야 공부하기', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '혼자 푹 쉬기', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: true },
  },
  {
    id: 'MS_CON_010',
    type: 'scenario',
    category: 'motive_source',
    subcategory: 'connection',
    text: '팀원 한 명이 개인 사정으로 힘들어하고 있습니다. 마감이 다가오고 있습니다.',
    subtext: '당신의 우선순위는?',
    options: [
      { id: 'A', text: '먼저 팀원 이야기를 들어본다', value: 1, scores: { motive: 'connection', value: 1 } },
      { id: 'B', text: '마감을 먼저 맞추고 나중에 챙긴다', value: 1, scores: { motive: 'achievement', value: 1 } },
      { id: 'C', text: '업무 분배를 재조정한다', value: 1, scores: { motive: 'mastery', value: 1 } },
      { id: 'D', text: '상사에게 상황을 보고한다', value: 1, scores: { motive: 'security', value: 1 } },
    ],
    metadata: { layer: 1, isLite: false },
  },
];

export default CONNECTION_QUESTIONS;
