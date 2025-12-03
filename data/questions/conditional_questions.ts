/**
 * MET Mythic v5.0 — Conditional Features Question Data
 * 
 * 조건부 기능 활성화를 위한 문항 메타데이터
 * 
 * #1 역문항 교차검증 (reverseOf)
 * #17 사회적 바람직성 보정 (socialDesirability)
 * 
 * 사용법:
 * 1. 이 파일을 data/questions/ 폴더에 추가
 * 2. all_questions.ts에서 import하여 기존 문항에 메타데이터 병합
 */

import type { MotiveSource } from '../../lib/types';

// ============================================
// 타입 정의
// ============================================

export interface QuestionMetadata {
  questionId: string;
  reverseOf?: string;           // 역문항 대상 ID
  socialDesirability: number;   // 0-1 (높을수록 "좋아 보이는" 답)
  sensitivityLevel?: 'low' | 'medium' | 'high';  // 민감도
}

export interface ReverseQuestion {
  id: string;
  category: string;
  subcategory: string;
  text: string;
  reverseOf: string;            // 원본 문항 ID
  socialDesirability: number;
  options: Array<{
    id: string;
    text: string;
    scores: {
      value: number;
      motive?: MotiveSource;
      [key: string]: any;
    };
  }>;
}

// ============================================
// 사회적 바람직성 점수 (기존 문항용)
// ============================================

/**
 * 사회적 바람직성 기준:
 * 
 * 0.9-1.0: 매우 높음 - "좋은 사람"으로 보이고 싶어 과장 가능
 *   - connection (연결): 타인 배려, 공감
 *   - 도덕적 판단 문항
 * 
 * 0.7-0.8: 높음 - 긍정적으로 보이고 싶어 약간 과장 가능
 *   - mastery (통달): 자기계발, 학습
 *   - creation (창조): 창의성
 * 
 * 0.5-0.6: 중립 - 사회적 편향 적음
 *   - adventure (모험): 새로운 경험
 *   - freedom (자유): 자율성
 * 
 * 0.3-0.4: 낮음 - 솔직하게 답하기 어려움
 *   - achievement (성취): 야망 인정하기 꺼림
 *   - security (안정): 보수적으로 보일까 우려
 * 
 * 0.1-0.2: 매우 낮음 - 부정적으로 인식될 수 있어 숨기는 경향
 *   - recognition (인정): 인정욕구는 부정적으로 인식
 */

export const SOCIAL_DESIRABILITY_BY_MOTIVE: Record<MotiveSource, number> = {
  connection: 0.85,    // 높음 - "나는 타인을 배려한다" 과장 경향
  mastery: 0.75,       // 높음 - "나는 성장하려 한다" 과장 경향
  creation: 0.70,      // 약간 높음
  freedom: 0.55,       // 중립
  adventure: 0.50,     // 중립
  achievement: 0.40,   // 약간 낮음 - 야망 숨기는 경향
  security: 0.35,      // 낮음 - 보수적으로 보일까 우려
  recognition: 0.20,   // 매우 낮음 - 인정욕구 숨기는 경향
};

// 카테고리별 기본 사회적 바람직성
export const SOCIAL_DESIRABILITY_BY_CATEGORY: Record<string, number> = {
  motive_source: 0.50,   // 동기 원천 - 중립
  ignition: 0.45,        // 점화 조건 - 약간 낮음
  direction: 0.55,       // 방향 - 중립
  operation: 0.50,       // 작동 방식 - 중립
  energy: 0.50,          // 에너지 - 중립
  conflict: 0.40,        // 갈등 - 낮음 (갈등 인정 어려움)
  context: 0.45,         // 맥락 - 약간 낮음
  hidden: 0.30,          // 숨겨진 - 낮음 (무의식 인정 어려움)
  maturity: 0.60,        // 성숙도 - 약간 높음
};

// ============================================
// 기존 문항에 대한 메타데이터 매핑
// ============================================

/**
 * 기존 문항 ID → 메타데이터 매핑
 * 
 * 문항 ID 패턴 예시:
 * - motive_achievement_001
 * - ignition_competition_001
 * - direction_approach_achievement_001
 */

export const QUESTION_METADATA: Record<string, Partial<QuestionMetadata>> = {
  // ============================================
  // 동기 원천 (motive_source) 문항들
  // ============================================
  
  // Achievement (성취)
  'motive_achievement_001': { socialDesirability: 0.40 },
  'motive_achievement_002': { socialDesirability: 0.35 },
  'motive_achievement_003': { socialDesirability: 0.45 },
  'motive_achievement_004': { socialDesirability: 0.40 },
  'motive_achievement_005': { socialDesirability: 0.38 },
  
  // Mastery (통달)
  'motive_mastery_001': { socialDesirability: 0.75 },
  'motive_mastery_002': { socialDesirability: 0.78 },
  'motive_mastery_003': { socialDesirability: 0.72 },
  'motive_mastery_004': { socialDesirability: 0.76 },
  'motive_mastery_005': { socialDesirability: 0.74 },
  
  // Creation (창조)
  'motive_creation_001': { socialDesirability: 0.70 },
  'motive_creation_002': { socialDesirability: 0.72 },
  'motive_creation_003': { socialDesirability: 0.68 },
  'motive_creation_004': { socialDesirability: 0.71 },
  'motive_creation_005': { socialDesirability: 0.69 },
  
  // Recognition (인정)
  'motive_recognition_001': { socialDesirability: 0.20 },
  'motive_recognition_002': { socialDesirability: 0.18 },
  'motive_recognition_003': { socialDesirability: 0.22 },
  'motive_recognition_004': { socialDesirability: 0.19 },
  'motive_recognition_005': { socialDesirability: 0.21 },
  
  // Connection (연결)
  'motive_connection_001': { socialDesirability: 0.85 },
  'motive_connection_002': { socialDesirability: 0.88 },
  'motive_connection_003': { socialDesirability: 0.82 },
  'motive_connection_004': { socialDesirability: 0.86 },
  'motive_connection_005': { socialDesirability: 0.84 },
  
  // Security (안정)
  'motive_security_001': { socialDesirability: 0.35 },
  'motive_security_002': { socialDesirability: 0.32 },
  'motive_security_003': { socialDesirability: 0.38 },
  'motive_security_004': { socialDesirability: 0.34 },
  'motive_security_005': { socialDesirability: 0.36 },
  
  // Freedom (자유)
  'motive_freedom_001': { socialDesirability: 0.55 },
  'motive_freedom_002': { socialDesirability: 0.52 },
  'motive_freedom_003': { socialDesirability: 0.58 },
  'motive_freedom_004': { socialDesirability: 0.54 },
  'motive_freedom_005': { socialDesirability: 0.56 },
  
  // Adventure (모험)
  'motive_adventure_001': { socialDesirability: 0.50 },
  'motive_adventure_002': { socialDesirability: 0.48 },
  'motive_adventure_003': { socialDesirability: 0.52 },
  'motive_adventure_004': { socialDesirability: 0.49 },
  'motive_adventure_005': { socialDesirability: 0.51 },
  
  // ============================================
  // Hidden (숨겨진 동기) 문항들 - 낮은 사회적 바람직성
  // ============================================
  'hidden_shadow_001': { socialDesirability: 0.25, sensitivityLevel: 'high' },
  'hidden_shadow_002': { socialDesirability: 0.22, sensitivityLevel: 'high' },
  'hidden_shadow_003': { socialDesirability: 0.28, sensitivityLevel: 'high' },
  'hidden_projection_001': { socialDesirability: 0.30, sensitivityLevel: 'medium' },
  'hidden_projection_002': { socialDesirability: 0.27, sensitivityLevel: 'medium' },
  
  // ============================================
  // Conflict (갈등) 문항들
  // ============================================
  'conflict_freedom_security_001': { socialDesirability: 0.40, sensitivityLevel: 'medium' },
  'conflict_freedom_security_002': { socialDesirability: 0.38, sensitivityLevel: 'medium' },
  'conflict_achievement_connection_001': { socialDesirability: 0.42, sensitivityLevel: 'medium' },
  'conflict_recognition_creation_001': { socialDesirability: 0.35, sensitivityLevel: 'medium' },
};

// ============================================
// 역문항 정의 (새로 추가될 문항들)
// ============================================

/**
 * 역문항 설계 원칙:
 * 
 * 1. 원본과 반대 방향으로 측정
 * 2. 응답 합이 6이면 일관적 (예: 원본 5 + 역문항 1 = 6)
 * 3. 같은 동기를 다른 관점에서 측정
 * 
 * 역문항 ID 패턴: {원본ID}_rev
 */

export const REVERSE_QUESTIONS: ReverseQuestion[] = [
  // ============================================
  // Achievement (성취) 역문항
  // ============================================
  {
    id: 'motive_achievement_001_rev',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '결과보다는 과정 자체를 즐기는 편이다.',
    reverseOf: 'motive_achievement_001',
    socialDesirability: 0.65,  // 역문항은 바람직성 반전
    options: [
      { id: 'motive_achievement_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'achievement' } },
      { id: 'motive_achievement_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'achievement' } },
      { id: 'motive_achievement_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'achievement' } },
      { id: 'motive_achievement_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'achievement' } },
      { id: 'motive_achievement_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'achievement' } },
    ],
  },
  {
    id: 'motive_achievement_002_rev',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '목표를 달성하지 못해도 크게 실망하지 않는다.',
    reverseOf: 'motive_achievement_002',
    socialDesirability: 0.55,
    options: [
      { id: 'motive_achievement_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'achievement' } },
      { id: 'motive_achievement_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'achievement' } },
      { id: 'motive_achievement_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'achievement' } },
      { id: 'motive_achievement_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'achievement' } },
      { id: 'motive_achievement_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'achievement' } },
    ],
  },
  {
    id: 'motive_achievement_003_rev',
    category: 'motive_source',
    subcategory: 'achievement',
    text: '경쟁에서 지더라도 별로 개의치 않는다.',
    reverseOf: 'motive_achievement_003',
    socialDesirability: 0.60,
    options: [
      { id: 'motive_achievement_003_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'achievement' } },
      { id: 'motive_achievement_003_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'achievement' } },
      { id: 'motive_achievement_003_rev_3', text: '보통이다', scores: { value: 3, motive: 'achievement' } },
      { id: 'motive_achievement_003_rev_4', text: '그렇다', scores: { value: 2, motive: 'achievement' } },
      { id: 'motive_achievement_003_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'achievement' } },
    ],
  },
  
  // ============================================
  // Mastery (통달) 역문항
  // ============================================
  {
    id: 'motive_mastery_001_rev',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '어떤 분야에서 전문가가 되는 것은 내게 중요하지 않다.',
    reverseOf: 'motive_mastery_001',
    socialDesirability: 0.30,
    options: [
      { id: 'motive_mastery_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'mastery' } },
      { id: 'motive_mastery_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'mastery' } },
      { id: 'motive_mastery_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'mastery' } },
      { id: 'motive_mastery_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'mastery' } },
      { id: 'motive_mastery_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'mastery' } },
    ],
  },
  {
    id: 'motive_mastery_002_rev',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '새로운 것을 배우는 것이 번거롭게 느껴질 때가 많다.',
    reverseOf: 'motive_mastery_002',
    socialDesirability: 0.25,
    options: [
      { id: 'motive_mastery_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'mastery' } },
      { id: 'motive_mastery_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'mastery' } },
      { id: 'motive_mastery_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'mastery' } },
      { id: 'motive_mastery_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'mastery' } },
      { id: 'motive_mastery_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'mastery' } },
    ],
  },
  {
    id: 'motive_mastery_003_rev',
    category: 'motive_source',
    subcategory: 'mastery',
    text: '깊이보다는 다양한 경험이 더 중요하다고 생각한다.',
    reverseOf: 'motive_mastery_003',
    socialDesirability: 0.50,
    options: [
      { id: 'motive_mastery_003_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'mastery' } },
      { id: 'motive_mastery_003_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'mastery' } },
      { id: 'motive_mastery_003_rev_3', text: '보통이다', scores: { value: 3, motive: 'mastery' } },
      { id: 'motive_mastery_003_rev_4', text: '그렇다', scores: { value: 2, motive: 'mastery' } },
      { id: 'motive_mastery_003_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'mastery' } },
    ],
  },
  
  // ============================================
  // Creation (창조) 역문항
  // ============================================
  {
    id: 'motive_creation_001_rev',
    category: 'motive_source',
    subcategory: 'creation',
    text: '이미 검증된 방법을 따르는 것이 더 편하다.',
    reverseOf: 'motive_creation_001',
    socialDesirability: 0.40,
    options: [
      { id: 'motive_creation_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'creation' } },
      { id: 'motive_creation_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'creation' } },
      { id: 'motive_creation_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'creation' } },
      { id: 'motive_creation_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'creation' } },
      { id: 'motive_creation_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'creation' } },
    ],
  },
  {
    id: 'motive_creation_002_rev',
    category: 'motive_source',
    subcategory: 'creation',
    text: '새로운 아이디어를 내는 것보다 실행하는 것이 더 중요하다.',
    reverseOf: 'motive_creation_002',
    socialDesirability: 0.55,
    options: [
      { id: 'motive_creation_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'creation' } },
      { id: 'motive_creation_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'creation' } },
      { id: 'motive_creation_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'creation' } },
      { id: 'motive_creation_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'creation' } },
      { id: 'motive_creation_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'creation' } },
    ],
  },
  
  // ============================================
  // Recognition (인정) 역문항
  // ============================================
  {
    id: 'motive_recognition_001_rev',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '다른 사람들이 나를 어떻게 생각하든 상관없다.',
    reverseOf: 'motive_recognition_001',
    socialDesirability: 0.75,  // 높음 - "나는 남 신경 안 써" 과장 경향
    options: [
      { id: 'motive_recognition_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'recognition' } },
      { id: 'motive_recognition_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'recognition' } },
      { id: 'motive_recognition_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'recognition' } },
      { id: 'motive_recognition_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'recognition' } },
      { id: 'motive_recognition_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'recognition' } },
    ],
  },
  {
    id: 'motive_recognition_002_rev',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '내 업적이 알려지지 않아도 괜찮다.',
    reverseOf: 'motive_recognition_002',
    socialDesirability: 0.80,
    options: [
      { id: 'motive_recognition_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'recognition' } },
      { id: 'motive_recognition_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'recognition' } },
      { id: 'motive_recognition_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'recognition' } },
      { id: 'motive_recognition_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'recognition' } },
      { id: 'motive_recognition_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'recognition' } },
    ],
  },
  {
    id: 'motive_recognition_003_rev',
    category: 'motive_source',
    subcategory: 'recognition',
    text: '칭찬을 받지 못해도 내가 한 일에 만족한다.',
    reverseOf: 'motive_recognition_003',
    socialDesirability: 0.82,
    options: [
      { id: 'motive_recognition_003_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'recognition' } },
      { id: 'motive_recognition_003_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'recognition' } },
      { id: 'motive_recognition_003_rev_3', text: '보통이다', scores: { value: 3, motive: 'recognition' } },
      { id: 'motive_recognition_003_rev_4', text: '그렇다', scores: { value: 2, motive: 'recognition' } },
      { id: 'motive_recognition_003_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'recognition' } },
    ],
  },
  
  // ============================================
  // Connection (연결) 역문항
  // ============================================
  {
    id: 'motive_connection_001_rev',
    category: 'motive_source',
    subcategory: 'connection',
    text: '혼자 있는 시간이 다른 사람과 함께하는 것보다 훨씬 좋다.',
    reverseOf: 'motive_connection_001',
    socialDesirability: 0.25,  // 낮음 - "나는 사람 싫어" 인정 어려움
    options: [
      { id: 'motive_connection_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'connection' } },
      { id: 'motive_connection_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'connection' } },
      { id: 'motive_connection_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'connection' } },
      { id: 'motive_connection_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'connection' } },
      { id: 'motive_connection_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'connection' } },
    ],
  },
  {
    id: 'motive_connection_002_rev',
    category: 'motive_source',
    subcategory: 'connection',
    text: '사람들과 깊은 관계를 맺는 것이 번거롭게 느껴진다.',
    reverseOf: 'motive_connection_002',
    socialDesirability: 0.20,
    options: [
      { id: 'motive_connection_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'connection' } },
      { id: 'motive_connection_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'connection' } },
      { id: 'motive_connection_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'connection' } },
      { id: 'motive_connection_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'connection' } },
      { id: 'motive_connection_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'connection' } },
    ],
  },
  {
    id: 'motive_connection_003_rev',
    category: 'motive_source',
    subcategory: 'connection',
    text: '타인의 감정에 공감하는 것이 에너지 소모처럼 느껴진다.',
    reverseOf: 'motive_connection_003',
    socialDesirability: 0.15,
    options: [
      { id: 'motive_connection_003_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'connection' } },
      { id: 'motive_connection_003_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'connection' } },
      { id: 'motive_connection_003_rev_3', text: '보통이다', scores: { value: 3, motive: 'connection' } },
      { id: 'motive_connection_003_rev_4', text: '그렇다', scores: { value: 2, motive: 'connection' } },
      { id: 'motive_connection_003_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'connection' } },
    ],
  },
  
  // ============================================
  // Security (안정) 역문항
  // ============================================
  {
    id: 'motive_security_001_rev',
    category: 'motive_source',
    subcategory: 'security',
    text: '불확실한 상황이 오히려 흥미롭다.',
    reverseOf: 'motive_security_001',
    socialDesirability: 0.60,
    options: [
      { id: 'motive_security_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'security' } },
      { id: 'motive_security_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'security' } },
      { id: 'motive_security_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'security' } },
      { id: 'motive_security_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'security' } },
      { id: 'motive_security_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'security' } },
    ],
  },
  {
    id: 'motive_security_002_rev',
    category: 'motive_source',
    subcategory: 'security',
    text: '안정된 직장보다 도전적인 기회가 더 끌린다.',
    reverseOf: 'motive_security_002',
    socialDesirability: 0.55,
    options: [
      { id: 'motive_security_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'security' } },
      { id: 'motive_security_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'security' } },
      { id: 'motive_security_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'security' } },
      { id: 'motive_security_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'security' } },
      { id: 'motive_security_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'security' } },
    ],
  },
  {
    id: 'motive_security_003_rev',
    category: 'motive_source',
    subcategory: 'security',
    text: '미래를 계획하는 것보다 현재를 즐기는 것이 낫다.',
    reverseOf: 'motive_security_003',
    socialDesirability: 0.50,
    options: [
      { id: 'motive_security_003_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'security' } },
      { id: 'motive_security_003_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'security' } },
      { id: 'motive_security_003_rev_3', text: '보통이다', scores: { value: 3, motive: 'security' } },
      { id: 'motive_security_003_rev_4', text: '그렇다', scores: { value: 2, motive: 'security' } },
      { id: 'motive_security_003_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'security' } },
    ],
  },
  
  // ============================================
  // Freedom (자유) 역문항
  // ============================================
  {
    id: 'motive_freedom_001_rev',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '정해진 규칙을 따르는 것이 오히려 편하다.',
    reverseOf: 'motive_freedom_001',
    socialDesirability: 0.45,
    options: [
      { id: 'motive_freedom_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'freedom' } },
      { id: 'motive_freedom_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'freedom' } },
      { id: 'motive_freedom_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'freedom' } },
      { id: 'motive_freedom_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'freedom' } },
      { id: 'motive_freedom_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'freedom' } },
    ],
  },
  {
    id: 'motive_freedom_002_rev',
    category: 'motive_source',
    subcategory: 'freedom',
    text: '자율성보다 안내를 받는 것이 더 좋다.',
    reverseOf: 'motive_freedom_002',
    socialDesirability: 0.40,
    options: [
      { id: 'motive_freedom_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'freedom' } },
      { id: 'motive_freedom_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'freedom' } },
      { id: 'motive_freedom_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'freedom' } },
      { id: 'motive_freedom_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'freedom' } },
      { id: 'motive_freedom_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'freedom' } },
    ],
  },
  
  // ============================================
  // Adventure (모험) 역문항
  // ============================================
  {
    id: 'motive_adventure_001_rev',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '익숙한 환경에 머무르는 것이 편하다.',
    reverseOf: 'motive_adventure_001',
    socialDesirability: 0.45,
    options: [
      { id: 'motive_adventure_001_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'adventure' } },
      { id: 'motive_adventure_001_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'adventure' } },
      { id: 'motive_adventure_001_rev_3', text: '보통이다', scores: { value: 3, motive: 'adventure' } },
      { id: 'motive_adventure_001_rev_4', text: '그렇다', scores: { value: 2, motive: 'adventure' } },
      { id: 'motive_adventure_001_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'adventure' } },
    ],
  },
  {
    id: 'motive_adventure_002_rev',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '새로운 경험보다 검증된 것이 좋다.',
    reverseOf: 'motive_adventure_002',
    socialDesirability: 0.42,
    options: [
      { id: 'motive_adventure_002_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'adventure' } },
      { id: 'motive_adventure_002_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'adventure' } },
      { id: 'motive_adventure_002_rev_3', text: '보통이다', scores: { value: 3, motive: 'adventure' } },
      { id: 'motive_adventure_002_rev_4', text: '그렇다', scores: { value: 2, motive: 'adventure' } },
      { id: 'motive_adventure_002_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'adventure' } },
    ],
  },
  {
    id: 'motive_adventure_003_rev',
    category: 'motive_source',
    subcategory: 'adventure',
    text: '위험을 감수하는 것이 불필요하게 느껴진다.',
    reverseOf: 'motive_adventure_003',
    socialDesirability: 0.48,
    options: [
      { id: 'motive_adventure_003_rev_1', text: '전혀 그렇지 않다', scores: { value: 5, motive: 'adventure' } },
      { id: 'motive_adventure_003_rev_2', text: '그렇지 않다', scores: { value: 4, motive: 'adventure' } },
      { id: 'motive_adventure_003_rev_3', text: '보통이다', scores: { value: 3, motive: 'adventure' } },
      { id: 'motive_adventure_003_rev_4', text: '그렇다', scores: { value: 2, motive: 'adventure' } },
      { id: 'motive_adventure_003_rev_5', text: '매우 그렇다', scores: { value: 1, motive: 'adventure' } },
    ],
  },
];

// ============================================
// 역문항 쌍 매핑 (검증용)
// ============================================

export const REVERSE_PAIRS: Array<{ original: string; reverse: string; motive: MotiveSource }> = [
  // Achievement
  { original: 'motive_achievement_001', reverse: 'motive_achievement_001_rev', motive: 'achievement' },
  { original: 'motive_achievement_002', reverse: 'motive_achievement_002_rev', motive: 'achievement' },
  { original: 'motive_achievement_003', reverse: 'motive_achievement_003_rev', motive: 'achievement' },
  
  // Mastery
  { original: 'motive_mastery_001', reverse: 'motive_mastery_001_rev', motive: 'mastery' },
  { original: 'motive_mastery_002', reverse: 'motive_mastery_002_rev', motive: 'mastery' },
  { original: 'motive_mastery_003', reverse: 'motive_mastery_003_rev', motive: 'mastery' },
  
  // Creation
  { original: 'motive_creation_001', reverse: 'motive_creation_001_rev', motive: 'creation' },
  { original: 'motive_creation_002', reverse: 'motive_creation_002_rev', motive: 'creation' },
  
  // Recognition
  { original: 'motive_recognition_001', reverse: 'motive_recognition_001_rev', motive: 'recognition' },
  { original: 'motive_recognition_002', reverse: 'motive_recognition_002_rev', motive: 'recognition' },
  { original: 'motive_recognition_003', reverse: 'motive_recognition_003_rev', motive: 'recognition' },
  
  // Connection
  { original: 'motive_connection_001', reverse: 'motive_connection_001_rev', motive: 'connection' },
  { original: 'motive_connection_002', reverse: 'motive_connection_002_rev', motive: 'connection' },
  { original: 'motive_connection_003', reverse: 'motive_connection_003_rev', motive: 'connection' },
  
  // Security
  { original: 'motive_security_001', reverse: 'motive_security_001_rev', motive: 'security' },
  { original: 'motive_security_002', reverse: 'motive_security_002_rev', motive: 'security' },
  { original: 'motive_security_003', reverse: 'motive_security_003_rev', motive: 'security' },
  
  // Freedom
  { original: 'motive_freedom_001', reverse: 'motive_freedom_001_rev', motive: 'freedom' },
  { original: 'motive_freedom_002', reverse: 'motive_freedom_002_rev', motive: 'freedom' },
  
  // Adventure
  { original: 'motive_adventure_001', reverse: 'motive_adventure_001_rev', motive: 'adventure' },
  { original: 'motive_adventure_002', reverse: 'motive_adventure_002_rev', motive: 'adventure' },
  { original: 'motive_adventure_003', reverse: 'motive_adventure_003_rev', motive: 'adventure' },
];

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 문항 ID로 사회적 바람직성 점수 가져오기
 */
export function getSocialDesirability(questionId: string, category: string, subcategory: string): number {
  // 1순위: 개별 문항 메타데이터
  if (QUESTION_METADATA[questionId]?.socialDesirability !== undefined) {
    return QUESTION_METADATA[questionId].socialDesirability!;
  }
  
  // 2순위: 동기별 기본값 (motive_source 카테고리만)
  if (category === 'motive_source' && SOCIAL_DESIRABILITY_BY_MOTIVE[subcategory as MotiveSource] !== undefined) {
    return SOCIAL_DESIRABILITY_BY_MOTIVE[subcategory as MotiveSource];
  }
  
  // 3순위: 카테고리별 기본값
  if (SOCIAL_DESIRABILITY_BY_CATEGORY[category] !== undefined) {
    return SOCIAL_DESIRABILITY_BY_CATEGORY[category];
  }
  
  // 기본값
  return 0.50;
}

/**
 * 역문항 대상 찾기
 */
export function findReverseQuestion(questionId: string): ReverseQuestion | null {
  return REVERSE_QUESTIONS.find(q => q.reverseOf === questionId) || null;
}

/**
 * 역문항 쌍 찾기
 */
export function findReversePair(questionId: string): { original: string; reverse: string } | null {
  // questionId가 원본인 경우
  const asOriginal = REVERSE_PAIRS.find(p => p.original === questionId);
  if (asOriginal) return { original: asOriginal.original, reverse: asOriginal.reverse };
  
  // questionId가 역문항인 경우
  const asReverse = REVERSE_PAIRS.find(p => p.reverse === questionId);
  if (asReverse) return { original: asReverse.original, reverse: asReverse.reverse };
  
  return null;
}

/**
 * 모든 역문항 ID 목록
 */
export function getReverseQuestionIds(): string[] {
  return REVERSE_QUESTIONS.map(q => q.id);
}

/**
 * 총 역문항 쌍 개수
 */
export function getTotalReversePairs(): number {
  return REVERSE_PAIRS.length;
}

// ============================================
// 기존 문항에 메타데이터 병합하는 헬퍼
// ============================================

export interface QuestionWithMetadata {
  id: string;
  category: string;
  subcategory: string;
  text: string;
  options: any[];
  // 추가 메타데이터
  reverseOf?: string;
  socialDesirability: number;
  sensitivityLevel?: 'low' | 'medium' | 'high';
}

/**
 * 기존 문항 배열에 메타데이터 병합
 */
export function mergeQuestionMetadata<T extends { id: string; category: string; subcategory: string }>(
  questions: T[]
): (T & { socialDesirability: number; reverseOf?: string })[] {
  return questions.map(q => {
    const metadata = QUESTION_METADATA[q.id];
    const reverseQ = REVERSE_QUESTIONS.find(rq => rq.reverseOf === q.id);
    
    return {
      ...q,
      socialDesirability: getSocialDesirability(q.id, q.category, q.subcategory),
      reverseOf: metadata?.reverseOf,
      sensitivityLevel: metadata?.sensitivityLevel,
      hasReverseQuestion: !!reverseQ,
    };
  });
}

/**
 * 역문항을 기존 문항 배열에 추가
 */
export function addReverseQuestions<T extends { id: string }>(
  questions: T[]
): (T | ReverseQuestion)[] {
  const existingIds = new Set(questions.map(q => q.id));
  const newReverseQuestions = REVERSE_QUESTIONS.filter(rq => !existingIds.has(rq.id));
  
  return [...questions, ...newReverseQuestions];
}

// ============================================
// Exports
// ============================================

export default {
  SOCIAL_DESIRABILITY_BY_MOTIVE,
  SOCIAL_DESIRABILITY_BY_CATEGORY,
  QUESTION_METADATA,
  REVERSE_QUESTIONS,
  REVERSE_PAIRS,
  getSocialDesirability,
  findReverseQuestion,
  findReversePair,
  getReverseQuestionIds,
  getTotalReversePairs,
  mergeQuestionMetadata,
  addReverseQuestions,
};