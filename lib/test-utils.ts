/**
 * MET Mythic — Test Utilities (Builder Mode)
 * 
 * 특정 닉네임 입력 시 더미데이터로 바로 결과 확인
 * 
 * 사용법:
 * - 닉네임에 "test" 입력 → 랜덤 더미 데이터
 * - 닉네임에 "test-정복자" 입력 → 정복자 성향 더미
 * - 닉네임에 "test-현자" 입력 → 현자 성향 더미
 * - 닉네임에 "test-fast" 입력 → 빠른 응답 (낮은 신뢰도)
 * - 닉네임에 "test-slow" 입력 → 느린 응답
 * - 닉네임에 "test-극단" 입력 → 극단값만 (패널티 테스트)
 * - 닉네임에 "test-무성의" 입력 → 연속 동일 응답
 */

import type { Answer, MotiveSource, Archetype } from './types';
import { ALL_QUESTIONS } from '../data/questions/all_questions';

// 테스트 닉네임인지 확인
export function isTestNickname(nickname: string): boolean {
  return nickname.toLowerCase().startsWith('test');
}

// 테스트 유형 파싱
export function parseTestType(nickname: string): {
  isTest: boolean;
  archetype?: Archetype;
  pattern?: 'fast' | 'slow' | 'extreme' | 'lazy' | 'random';
} {
  const lower = nickname.toLowerCase();
  
  if (!lower.startsWith('test')) {
    return { isTest: false };
  }
  
  // 원형 테스트
  const archetypeMap: Record<string, Archetype> = {
    '정복자': 'conqueror',
    'conqueror': 'conqueror',
    '현자': 'sage',
    'sage': 'sage',
    '창조자': 'creator',
    'creator': 'creator',
    '군주': 'sovereign',
    'sovereign': 'sovereign',
    '치유자': 'healer',
    'healer': 'healer',
    '수호자': 'guardian',
    'guardian': 'guardian',
    '반역자': 'rebel',
    'rebel': 'rebel',
    '탐험가': 'explorer',
    'explorer': 'explorer',
  };
  
  for (const [key, archetype] of Object.entries(archetypeMap)) {
    if (lower.includes(key)) {
      return { isTest: true, archetype };
    }
  }
  
  // 패턴 테스트
  if (lower.includes('fast') || lower.includes('빠른')) {
    return { isTest: true, pattern: 'fast' };
  }
  if (lower.includes('slow') || lower.includes('느린')) {
    return { isTest: true, pattern: 'slow' };
  }
  if (lower.includes('극단') || lower.includes('extreme')) {
    return { isTest: true, pattern: 'extreme' };
  }
  if (lower.includes('무성의') || lower.includes('lazy')) {
    return { isTest: true, pattern: 'lazy' };
  }
  
  return { isTest: true, pattern: 'random' };
}

// 원형별 동기 프로필
const ARCHETYPE_PROFILES: Record<Archetype, Record<MotiveSource, number>> = {
  conqueror: { achievement: 90, freedom: 75, mastery: 70, recognition: 65, adventure: 60, creation: 40, connection: 35, security: 20 },
  sage:      { mastery: 90, creation: 75, achievement: 65, connection: 55, recognition: 50, freedom: 45, security: 40, adventure: 35 },
  creator:   { creation: 90, mastery: 80, freedom: 70, achievement: 55, recognition: 50, adventure: 45, connection: 40, security: 35 },
  sovereign: { recognition: 90, achievement: 80, security: 65, mastery: 60, connection: 55, creation: 45, freedom: 40, adventure: 30 },
  healer:    { connection: 90, security: 75, creation: 60, mastery: 55, recognition: 45, achievement: 40, freedom: 45, adventure: 30 },
  guardian:  { security: 90, connection: 80, mastery: 65, achievement: 55, recognition: 50, creation: 40, freedom: 30, adventure: 25 },
  rebel:     { freedom: 95, adventure: 85, creation: 70, achievement: 60, recognition: 55, mastery: 50, connection: 40, security: 10 },
  explorer:  { adventure: 90, freedom: 80, mastery: 65, achievement: 60, connection: 55, creation: 50, recognition: 45, security: 25 },
};

// 더미 응답 생성
export function generateDummyAnswers(testType: ReturnType<typeof parseTestType>): Answer[] {
  const questions = ALL_QUESTIONS;
  const answers: Answer[] = [];
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const options = question.options;
    
    let selectedOption;
    let responseTimeMs: number;
    
    // 패턴별 응답 생성
    if (testType.pattern === 'fast') {
      // 빠른 응답 (0.3-1초)
      selectedOption = options[Math.floor(Math.random() * options.length)];
      responseTimeMs = 300 + Math.random() * 700;
      
    } else if (testType.pattern === 'slow') {
      // 느린 응답 (8-20초)
      selectedOption = options[Math.floor(Math.random() * options.length)];
      responseTimeMs = 8000 + Math.random() * 12000;
      
    } else if (testType.pattern === 'extreme') {
      // 극단값만 (1 or 5)
      const extremeOptions = options.filter(o => o.scores.value === 1 || o.scores.value === 5);
      selectedOption = extremeOptions.length > 0 
        ? extremeOptions[Math.floor(Math.random() * extremeOptions.length)]
        : options[0];
      responseTimeMs = 1500 + Math.random() * 2000;
      
    } else if (testType.pattern === 'lazy') {
      // 무성의 (연속 동일 응답)
      selectedOption = options[2]; // 항상 중간값
      responseTimeMs = 400 + Math.random() * 600;
      
    } else if (testType.archetype) {
      // 원형 맞춤 응답
      const profile = ARCHETYPE_PROFILES[testType.archetype];
      selectedOption = selectOptionByProfile(question, profile);
      responseTimeMs = 2000 + Math.random() * 3000;
      
    } else {
      // 랜덤
      selectedOption = options[Math.floor(Math.random() * options.length)];
      responseTimeMs = 1500 + Math.random() * 4000;
    }
    
    answers.push({
      questionId: question.id,
      optionId: selectedOption.id,
      responseTimeMs: Math.round(responseTimeMs),
      value: selectedOption.value ?? 0,
      timestamp: Date.now(),
    } as any);
  }
  
  return answers;
}

// 프로필 기반 옵션 선택
function selectOptionByProfile(
  question: typeof ALL_QUESTIONS[0],
  profile: Record<MotiveSource, number>
): typeof ALL_QUESTIONS[0]['options'][0] {
  const options = question.options;
  
  // 문항의 동기와 관련된 프로필 점수 확인
  const subcategory = question.subcategory as MotiveSource;
  const targetScore = profile[subcategory] || 50;
  
  // 높은 점수 동기면 높은 값 선택, 낮은 점수면 낮은 값
  const targetValue = Math.round(1 + (targetScore / 100) * 4); // 1-5
  
  // 가장 가까운 값의 옵션 찾기
  let bestOption = options[0];
  let bestDiff = Math.abs((options[0].scores.value || 3) - targetValue);
  
  for (const option of options) {
    const diff = Math.abs((option.scores.value || 3) - targetValue);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestOption = option;
    }
  }
  
  // 약간의 랜덤성 추가 (80% 확률로 최적, 20%는 ±1)
  if (Math.random() > 0.8) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  
  return bestOption;
}

// 테스트 결과 설명
export function getTestDescription(testType: ReturnType<typeof parseTestType>): string {
  if (testType.archetype) {
    const names: Record<Archetype, string> = {
      conqueror: '정복자', sage: '현자', creator: '창조자', sovereign: '군주',
      healer: '치유자', guardian: '수호자', rebel: '반역자', explorer: '탐험가'
    };
    return `🧪 테스트 모드: ${names[testType.archetype]} 성향 더미 데이터`;
  }
  
  switch (testType.pattern) {
    case 'fast': return '🧪 테스트 모드: 빠른 응답 (낮은 신뢰도 예상)';
    case 'slow': return '🧪 테스트 모드: 느린 응답 (회피 패턴 예상)';
    case 'extreme': return '🧪 테스트 모드: 극단값 응답 (패널티 예상)';
    case 'lazy': return '🧪 테스트 모드: 무성의 응답 (F등급 예상)';
    default: return '🧪 테스트 모드: 랜덤 더미 데이터';
  }
}

// 전체 테스트 닉네임 목록
export const TEST_NICKNAMES = [
  'test',
  'test-정복자',
  'test-현자', 
  'test-창조자',
  'test-군주',
  'test-치유자',
  'test-수호자',
  'test-반역자',
  'test-탐험가',
  'test-fast',
  'test-slow',
  'test-극단',
  'test-무성의',
];

export default {
  isTestNickname,
  parseTestType,
  generateDummyAnswers,
  getTestDescription,
  TEST_NICKNAMES,
};