/**
 * MET Mythic v2.0 — Lite Version API
 * 
 * 110문항 Lite 버전 전용 인터페이스
 * - 10-12분 소요
 * - 기본 동기 프로파일 + 원형 매칭
 * - 일부 고급 분석 제한
 */

import { LITE_VERSION_QUESTIONS, LITE_STATS } from '../data/questions/lite_questions';
import { 
  initQuestionMap,
  calculateMotiveScores,
  calculateIgnitionScores,
  calculateDirectionScores,
  calculateOperationScores,
  calculateMaturityScores,
  calculateValidationScores,
} from './question_scorer';
import type { 
  Answer, 
  MotiveScore, 
  IgnitionScore, 
  DirectionScore, 
  OperationScore,
  ArchetypeMatch,
  FigureMatch,
  UserMotivation,
  MotiveSource,
} from './types';

// ============================================
// Lite 버전 초기화
// ============================================

let isInitialized = false;

export function initLiteVersion(): void {
  if (!isInitialized) {
    initQuestionMap(LITE_VERSION_QUESTIONS);
    isInitialized = true;
  }
}

// ============================================
// 간단한 원형 매칭 (Lite용)
// ============================================

const ARCHETYPES = ['conqueror', 'sage', 'creator', 'sovereign', 'healer', 'guardian', 'rebel', 'explorer'] as const;

const ARCHETYPE_NAMES: Record<string, { ko: string; en: string }> = {
  conqueror: { ko: '정복자', en: 'The Conqueror' },
  sage:      { ko: '현자', en: 'The Sage' },
  creator:   { ko: '창조자', en: 'The Creator' },
  sovereign: { ko: '군주', en: 'The Sovereign' },
  healer:    { ko: '치유자', en: 'The Healer' },
  guardian:  { ko: '수호자', en: 'The Guardian' },
  rebel:     { ko: '반역자', en: 'The Rebel' },
  explorer:  { ko: '탐험가', en: 'The Explorer' },
};

const ARCHETYPE_WEIGHTS: Record<string, Partial<Record<MotiveSource, number>>> = {
  conqueror: { achievement: 0.55, freedom: 0.25, mastery: 0.20 },
  sage:      { mastery: 0.55, achievement: 0.25, connection: 0.20 },
  creator:   { creation: 0.55, mastery: 0.25, freedom: 0.20 },
  sovereign: { recognition: 0.55, achievement: 0.25, security: 0.20 },
  healer:    { connection: 0.55, security: 0.25, creation: 0.20 },
  guardian:  { security: 0.55, connection: 0.25, achievement: 0.20 },
  rebel:     { freedom: 0.55, creation: 0.25, adventure: 0.20 },
  explorer:  { adventure: 0.55, freedom: 0.25, mastery: 0.20 },
};

const FIGURE_PROFILES: Record<string, { key: string; name: string; nameEn: string; origin: string }[]> = {
  conqueror: [{ key: 'napoleon', name: '나폴레옹', nameEn: 'Napoleon', origin: '프랑스' }],
  sage:      [{ key: 'zhuge', name: '제갈량', nameEn: 'Zhuge Liang', origin: '중국' }],
  creator:   [{ key: 'hephaestus', name: '헤파이스토스', nameEn: 'Hephaestus', origin: '그리스' }],
  sovereign: [{ key: 'zeus', name: '제우스', nameEn: 'Zeus', origin: '그리스' }],
  healer:    [{ key: 'guanyin', name: '관음', nameEn: 'Guanyin', origin: '중국' }],
  guardian:  [{ key: 'heimdall', name: '헤임달', nameEn: 'Heimdall', origin: '북유럽' }],
  rebel:     [{ key: 'prometheus', name: '프로메테우스', nameEn: 'Prometheus', origin: '그리스' }],
  explorer:  [{ key: 'odysseus', name: '오디세우스', nameEn: 'Odysseus', origin: '그리스' }],
};

function matchArchetypeLite(motivation: UserMotivation): ArchetypeMatch[] {
  const results: ArchetypeMatch[] = [];
  
  for (const archetype of ARCHETYPES) {
    let score = 0;
    const weights = ARCHETYPE_WEIGHTS[archetype];
    
    for (const [motive, weight] of Object.entries(weights)) {
      const userValue = motivation[motive as MotiveSource] || 0;
      score += (userValue / 100) * (weight as number) * 100;
    }
    
    results.push({
      archetype: archetype as any,
      archetypeName: ARCHETYPE_NAMES[archetype].ko,
      archetypeNameEn: ARCHETYPE_NAMES[archetype].en,
      score: Math.round(score * 10) / 10,
      rank: 0,
    });
  }
  
  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => r.rank = i + 1);
  
  return results;
}

function matchFigureLite(archetype: string): FigureMatch {
  const figures = FIGURE_PROFILES[archetype] || FIGURE_PROFILES.sage;
  const figure = figures[0];
  
  return {
    figure: figure.key,
    figureName: figure.name,
    figureNameEn: figure.nameEn,
    origin: figure.origin,
    similarity: 75 + Math.random() * 20, // 75-95% 범위
    rank: 1,
  };
}

// ============================================
// Lite 버전 결과 타입
// ============================================

export interface LiteResult {
  version: 'lite';
  questionCount: number;
  
  // 핵심 점수
  motiveScores: MotiveScore[];
  ignitionScores: IgnitionScore[];
  directionScores: DirectionScore[];
  operationScores: OperationScore[];
  
  // 원형 매칭
  primaryArchetype: ArchetypeMatch;
  primaryFigure: FigureMatch;
  allArchetypes: ArchetypeMatch[];
  
  // 성숙도 (기본)
  maturityLevel: 1 | 2 | 3 | 4;
  maturityScore: number;
  
  // 검증
  isValid: boolean;
  validationFlags: string[];
  
  // 메타데이터
  completedAt: Date;
  totalTimeMs: number;
  
  // Lite 제한 안내
  limitations: string[];
}

// ============================================
// Lite 버전 점수 계산
// ============================================

export function calculateLiteScores(answers: Answer[]): LiteResult {
  initLiteVersion();
  
  // 기본 점수 계산
  const motiveScores = calculateMotiveScores(answers);
  const ignitionScores = calculateIgnitionScores(answers);
  const directionScores = calculateDirectionScores(answers);
  const operationScores = calculateOperationScores(answers);
  const maturityResult = calculateMaturityScores(answers);
  const validationResult = calculateValidationScores(answers);
  
  // UserMotivation 객체 생성
  const motivation: UserMotivation = {} as UserMotivation;
  for (const score of motiveScores) {
    motivation[score.motive] = score.score;
  }
  
  // 원형 매칭
  const archetypeMatches = matchArchetypeLite(motivation);
  const primaryArchetype = archetypeMatches[0];
  
  // 신화 인물 매칭
  const primaryFigure = matchFigureLite(primaryArchetype.archetype);
  
  // 응답 시간 계산
  const totalTimeMs = answers.reduce((sum, a) => sum + a.responseTimeMs, 0);
  
  return {
    version: 'lite',
    questionCount: answers.length,
    
    motiveScores,
    ignitionScores,
    directionScores,
    operationScores,
    
    primaryArchetype,
    primaryFigure,
    allArchetypes: archetypeMatches,
    
    maturityLevel: maturityResult.level,
    maturityScore: maturityResult.overall,
    
    isValid: validationResult.isValid,
    validationFlags: (validationResult as any).flags || [],
    
    completedAt: new Date(),
    totalTimeMs,
    
    limitations: [
      '숨겨진 동기(그림자/투사/보상) 상세 분석 미제공',
      '상황별 동기 변화 상세 분석 미제공',
      '동기 충돌 전체 쌍 분석 미제공 (4쌍만 분석)',
      'Full 버전에서 더 정확한 결과를 확인하실 수 있습니다',
    ],
  };
}

// ============================================
// Lite 문항 가져오기
// ============================================

export function getLiteQuestions() {
  return {
    questions: LITE_VERSION_QUESTIONS,
    stats: LITE_STATS,
    estimatedTime: '10-12분',
  };
}

// ============================================
// Lite 버전 요약 텍스트 생성
// ============================================

export function generateLiteSummary(result: LiteResult): string {
  const top3Motives = result.motiveScores.slice(0, 3);
  const top2Ignitions = result.ignitionScores.slice(0, 2);
  
  const motiveNames: Record<string, string> = {
    achievement: '성취', mastery: '통달', creation: '창조', recognition: '인정',
    connection: '연결', security: '안정', freedom: '자유', adventure: '모험',
  };
  
  const ignitionNames: Record<string, string> = {
    competition: '경쟁', complexity: '복잡성', deadline: '마감',
    audience: '관중', autonomy: '자율', crisis: '위기',
  };
  
  return `
## 당신의 동기 프로파일 (Lite)

### 원형: ${result.primaryArchetype.archetypeName}
${result.primaryFigure.figureName}(${result.primaryFigure.origin})과 ${result.primaryArchetype.score}% 싱크로

### 핵심 동기 (Top 3)
1. ${motiveNames[top3Motives[0].motive]} (${top3Motives[0].score}점)
2. ${motiveNames[top3Motives[1].motive]} (${top3Motives[1].score}점)
3. ${motiveNames[top3Motives[2].motive]} (${top3Motives[2].score}점)

### 점화 조건 (Top 2)
- ${ignitionNames[top2Ignitions[0].condition]}: ${top2Ignitions[0].score}점
- ${ignitionNames[top2Ignitions[1].condition]}: ${top2Ignitions[1].score}점

### 성숙도
Level ${result.maturityLevel} (${result.maturityScore}점)

---
*Lite 버전입니다. Full 버전에서 더 상세한 분석을 확인하세요.*
`.trim();
}

export default {
  initLiteVersion,
  calculateLiteScores,
  getLiteQuestions,
  generateLiteSummary,
};
