/**
 * MET Mythic v2.0 — 방향 (Direction) Part 2
 * 기존 5개 동기 각 2문항 추가 (10) + Recognition/Connection/Adventure 각 4문항 (12) = 22문항
 */

import type { Question } from '../../lib/types';

export const DIRECTION_PART2_QUESTIONS: Question[] = [
  // ============================================
  // Achievement 추가 2문항
  // ============================================
  {
    id: 'DR_ACH_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'achievement',
    text: '중요한 시험을 앞두고 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '합격하면 성취감이 클 거야', value: 1, scores: { motive: 'achievement', value: 1, direction: 'approach' } },
      { id: 'B', text: '떨어지면 안 돼', value: 1, scores: { motive: 'achievement', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_ACH_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'achievement',
    text: '마감 직전 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '끝내면 뿌듯할 거야', value: 1, scores: { motive: 'achievement', value: 1, direction: 'approach' } },
      { id: 'B', text: '못 끝내면 큰일이야', value: 1, scores: { motive: 'achievement', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Mastery 추가 2문항
  // ============================================
  {
    id: 'DR_MAS_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'mastery',
    text: '어려운 책을 읽을 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '이해하면 뿌듯할 거야', value: 1, scores: { motive: 'mastery', value: 1, direction: 'approach' } },
      { id: 'B', text: '모르면 찝찝해', value: 1, scores: { motive: 'mastery', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_MAS_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'mastery',
    text: '복잡한 시스템을 배울 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '마스터하면 좋겠다', value: 1, scores: { motive: 'mastery', value: 1, direction: 'approach' } },
      { id: 'B', text: '이해 못하면 불편해', value: 1, scores: { motive: 'mastery', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Creation 추가 2문항
  // ============================================
  {
    id: 'DR_CRE_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'creation',
    text: '프로젝트를 시작할 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '새로운 걸 만들 생각에 신난다', value: 1, scores: { motive: 'creation', value: 1, direction: 'approach' } },
      { id: 'B', text: '또 같은 걸 하면 지루할 것 같다', value: 1, scores: { motive: 'creation', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_CRE_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'creation',
    text: '회의에서 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '새 아이디어를 내고 싶다', value: 1, scores: { motive: 'creation', value: 1, direction: 'approach' } },
      { id: 'B', text: '기존 방식만 고수하면 답답하다', value: 1, scores: { motive: 'creation', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Freedom 추가 2문항
  // ============================================
  {
    id: 'DR_FRE_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'freedom',
    text: '새 프로젝트를 맡을 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '내 재량이 있으면 힘이 난다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'approach' } },
      { id: 'B', text: '간섭이 심하면 의욕이 꺾인다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_FRE_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'freedom',
    text: '시간을 쓸 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '자유롭게 쓰면 충전된다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'approach' } },
      { id: 'B', text: '강제로 정해지면 힘이 빠진다', value: 1, scores: { motive: 'freedom', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Security 추가 2문항
  // ============================================
  {
    id: 'DR_SEC_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'security',
    text: '새 직장을 고를 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '안정적이면 마음이 놓인다', value: 1, scores: { motive: 'security', value: 1, direction: 'approach' } },
      { id: 'B', text: '불안정하면 견디기 힘들다', value: 1, scores: { motive: 'security', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_SEC_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'security',
    text: '큰 결정을 내릴 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '확실하면 편안하다', value: 1, scores: { motive: 'security', value: 1, direction: 'approach' } },
      { id: 'B', text: '불확실하면 스트레스다', value: 1, scores: { motive: 'security', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Recognition 4문항 (신규)
  // ============================================
  {
    id: 'DR_REC_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'recognition',
    text: '열심히 일할 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '인정받으면 기분이 좋을 거야', value: 1, scores: { motive: 'recognition', value: 1, direction: 'approach' } },
      { id: 'B', text: '무시당하면 힘들어', value: 1, scores: { motive: 'recognition', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_REC_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'recognition',
    text: '발표를 준비할 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '잘하면 주목받을 수 있어', value: 1, scores: { motive: 'recognition', value: 1, direction: 'approach' } },
      { id: 'B', text: '못하면 평가가 나빠질 거야', value: 1, scores: { motive: 'recognition', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_REC_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'recognition',
    text: '팀 프로젝트에서 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '기여를 알아주면 뿌듯하다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'approach' } },
      { id: 'B', text: '공이 묻히면 속상하다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },
  {
    id: 'DR_REC_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'recognition',
    text: 'SNS에 글을 올릴 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '반응이 오면 기분이 좋다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'approach' } },
      { id: 'B', text: '반응이 없으면 허무하다', value: 1, scores: { motive: 'recognition', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Connection 4문항 (신규)
  // ============================================
  {
    id: 'DR_CON_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'connection',
    text: '사람들과 어울릴 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '함께하면 에너지가 난다', value: 1, scores: { motive: 'connection', value: 1, direction: 'approach' } },
      { id: 'B', text: '혼자 있으면 외롭다', value: 1, scores: { motive: 'connection', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_CON_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'connection',
    text: '관계를 유지하려고 할 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '친밀해지면 좋겠다', value: 1, scores: { motive: 'connection', value: 1, direction: 'approach' } },
      { id: 'B', text: '멀어지면 불안하다', value: 1, scores: { motive: 'connection', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_CON_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'connection',
    text: '팀에서 일할 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '협력하면 더 잘할 수 있다', value: 1, scores: { motive: 'connection', value: 1, direction: 'approach' } },
      { id: 'B', text: '갈등이 생기면 힘들다', value: 1, scores: { motive: 'connection', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },
  {
    id: 'DR_CON_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'connection',
    text: '누군가를 도울 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '도움이 되면 뿌듯하다', value: 1, scores: { motive: 'connection', value: 1, direction: 'approach' } },
      { id: 'B', text: '거절당하면 서운하다', value: 1, scores: { motive: 'connection', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },

  // ============================================
  // Adventure 4문항 (신규)
  // ============================================
  {
    id: 'DR_ADV_001',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'adventure',
    text: '새로운 경험을 할 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '새로우면 설렌다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'approach' } },
      { id: 'B', text: '똑같으면 지루하다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_ADV_002',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'adventure',
    text: '여행을 떠날 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '미지의 곳이 끌린다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'approach' } },
      { id: 'B', text: '익숙한 곳만 가면 답답하다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: true },
  },
  {
    id: 'DR_ADV_003',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'adventure',
    text: '새 프로젝트를 맡을 때 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '새 영역이면 기대된다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'approach' } },
      { id: 'B', text: '같은 일만 반복하면 힘들다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },
  {
    id: 'DR_ADV_004',
    type: 'bipolar',
    category: 'direction',
    subcategory: 'adventure',
    text: '일상에서 나를 움직이는 것은?',
    options: [
      { id: 'A', text: '변화가 있으면 활력이 난다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'approach' } },
      { id: 'B', text: '똑같은 루틴은 지치게 한다', value: 1, scores: { motive: 'adventure', value: 1, direction: 'avoidance' } },
    ],
    metadata: { layer: 3, isLite: false },
  },
];

export default DIRECTION_PART2_QUESTIONS;
