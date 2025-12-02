/**
 * MET Mythic v2.0 — AI Report Generator
 * 
 * Full 결과 데이터를 Claude API용 프롬프트로 변환
 * 2만자 상세 보고서 생성
 */

import type { FullResult } from './full_api';
import type { Archetype, MotiveSource } from './types';

// ============================================
// 보고서 입력 타입 (프롬프트 명세 기준)
// ============================================

export interface SyncResult {
  archetype: {
    archetype: string;
    archetypeName: string;
    archetypeNameEn: string;
    score: number;
    rank: number;
  };
  figure: {
    figure: string;
    figureName: string;
    figureNameEn: string;
    origin: string;
    similarity: number;
    rank: number;
  };
  level: {
    level: 1 | 2 | 3 | 4;
    levelName: string;
    confidence: number;
    signalMatches: string[];
    nextLevelHint: string;
  };
  overallSync: number;
  allArchetypes: Array<{
    archetype: string;
    archetypeName: string;
    score: number;
    rank: number;
  }>;
  allFigures: Array<{
    figure: string;
    figureName: string;
    similarity: number;
    rank: number;
  }>;
}

export interface UserProfile {
  motivation: Record<MotiveSource, number>;
  ignition: {
    competition: number;
    complexity: number;
    deadline: number;
    audience: number;
    autonomy: number;
    crisis: number;
  };
  direction: Record<string, {
    approach: number;
    avoidance: number;
    dominant: 'approach' | 'avoidance';
  }>;
  shadow?: {
    surface: string;
    surfaceScore: number;
    hidden: string;
    hiddenScore: number;
    confidence: number;
    evidence: string[];
  };
  contamination?: {
    authentic: string[];
    contaminated: string;
    contaminatedScore: number;
    source: string;
    severity: number;
    evidence: string[];
  };
  // Full 전용 추가 데이터
  energy?: {
    fuel: Record<string, number>;
    drain: Record<string, number>;
    flowPatterns: Record<string, number>;
  };
  conflicts?: Array<{
    pair: [string, string];
    dominantPole: string;
    balanceRatio: number;
  }>;
  contextShifts?: Array<{
    context: string;
    dominantMotive: string;
    motiveShift: Record<string, number>;
  }>;
}

// ============================================
// 레벨 이름 매핑
// ============================================

const LEVEL_NAMES: Record<Archetype, Record<1 | 2 | 3 | 4, string>> = {
  conqueror: {
    1: '맹목적 파괴자',
    2: '야망의 전사',
    3: '전략적 정복자',
    4: '승패를 초월한 자',
  },
  sage: {
    1: '은둔하는 천재',
    2: '삼고초려의 군사',
    3: '출사표의 승상',
    4: '영원한 지략가',
  },
  creator: {
    1: '불완전한 창작자',
    2: '기술의 연마자',
    3: '걸작의 장인',
    4: '창조의 화신',
  },
  sovereign: {
    1: '힘에 취한 자',
    2: '왕좌의 수호자',
    3: '현명한 통치자',
    4: '영원한 군주',
  },
  healer: {
    1: '상처받은 치유자',
    2: '공감의 손길',
    3: '치유의 대가',
    4: '자비의 화신',
  },
  guardian: {
    1: '과잉 보호자',
    2: '충실한 파수꾼',
    3: '현명한 수호자',
    4: '영원한 방패',
  },
  rebel: {
    1: '무분별한 파괴자',
    2: '대의의 반역자',
    3: '변혁의 선구자',
    4: '자유의 화신',
  },
  explorer: {
    1: '도피하는 방랑자',
    2: '목적의 탐험가',
    3: '지혜로운 모험가',
    4: '영원한 여행자',
  },
};

const NEXT_LEVEL_HINTS: Record<1 | 2 | 3, string> = {
  1: '목적을 찾을 때',
  2: '책임을 받아들일 때',
  3: '한계를 초월할 때',
};

// ============================================
// FullResult → SyncResult 변환
// ============================================

export function convertToSyncResult(result: FullResult): SyncResult {
  const archetype = result.primaryArchetype.archetype as Archetype;
  const level = result.maturity.level;
  
  return {
    archetype: {
      archetype: result.primaryArchetype.archetype,
      archetypeName: result.primaryArchetype.archetypeName,
      archetypeNameEn: result.primaryArchetype.archetypeNameEn,
      score: result.primaryArchetype.score,
      rank: result.primaryArchetype.rank,
    },
    figure: {
      figure: result.primaryFigure.figure,
      figureName: result.primaryFigure.figureName,
      figureNameEn: result.primaryFigure.figureNameEn,
      origin: result.primaryFigure.origin,
      similarity: result.primaryFigure.similarity,
      rank: result.primaryFigure.rank,
    },
    level: {
      level: level,
      levelName: LEVEL_NAMES[archetype]?.[level] || `레벨 ${level}`,
      confidence: result.maturity.overall,
      signalMatches: generateSignalMatches(result),
      nextLevelHint: level < 4 ? NEXT_LEVEL_HINTS[level as 1 | 2 | 3] : '이미 최고 단계입니다',
    },
    overallSync: result.primaryArchetype.score,
    allArchetypes: result.allArchetypes.map(a => ({
      archetype: a.archetype,
      archetypeName: a.archetypeName,
      score: a.score,
      rank: a.rank,
    })),
    allFigures: result.topFigures.map(f => ({
      figure: f.figure,
      figureName: f.figureName,
      similarity: f.similarity,
      rank: f.rank,
    })),
  };
}

function generateSignalMatches(result: FullResult): string[] {
  const signals: string[] = [];
  
  // 성숙도 기반 신호
  if (result.maturity.awareness >= 70) signals.push('높은 자기 인식');
  if (result.maturity.integration >= 70) signals.push('동기 통합 능력');
  if (result.maturity.growth >= 70) signals.push('성장 지향성');
  
  // 검증 기반 신호
  if (result.validation.isValid) signals.push('응답 일관성 확인');
  
  // 동기 기반 신호
  const topMotive = result.motiveScores[0];
  if (topMotive.score >= 80) signals.push(`강한 ${getMotiveName(topMotive.motive)} 동기`);
  
  return signals.length > 0 ? signals : ['분석 중'];
}

function getMotiveName(motive: MotiveSource): string {
  const names: Record<MotiveSource, string> = {
    achievement: '성취',
    mastery: '통달',
    creation: '창조',
    recognition: '인정',
    connection: '연결',
    security: '안정',
    freedom: '자유',
    adventure: '모험',
  };
  return names[motive] || motive;
}

// ============================================
// FullResult → UserProfile 변환
// ============================================

export function convertToUserProfile(result: FullResult): UserProfile {
  // motivation 변환
  const motivation: Record<MotiveSource, number> = {} as Record<MotiveSource, number>;
  for (const score of result.motiveScores) {
    motivation[score.motive] = score.score;
  }
  
  // ignition 변환
  const ignition = {
    competition: 50,
    complexity: 50,
    deadline: 50,
    audience: 50,
    autonomy: 50,
    crisis: 50,
  };
  for (const score of result.ignitionScores) {
    if (score.condition in ignition) {
      ignition[score.condition as keyof typeof ignition] = score.score;
    }
  }
  
  // direction 변환
  const direction: Record<string, { approach: number; avoidance: number; dominant: 'approach' | 'avoidance' }> = {};
  for (const dir of result.directionScores) {
    direction[dir.motive] = {
      approach: dir.approach,
      avoidance: dir.avoidance,
      dominant: dir.dominant,
    };
  }
  
  // shadow 변환 (숨겨진 동기에서)
  let shadow: UserProfile['shadow'] = undefined;
  if (Object.keys(result.hiddenMotives.shadow).length > 0) {
    const shadowEntries = Object.entries(result.hiddenMotives.shadow);
    if (shadowEntries.length > 0) {
      const [hiddenMotive, hiddenScore] = shadowEntries[0];
      const surfaceMotive = result.motiveScores[0];
      
      shadow = {
        surface: surfaceMotive.motive,
        surfaceScore: surfaceMotive.score,
        hidden: hiddenMotive,
        hiddenScore: hiddenScore as number,
        confidence: 70,
        evidence: ['숨겨진 동기 문항 응답 분석'],
      };
    }
  }
  
  return {
    motivation,
    ignition,
    direction,
    shadow,
    energy: {
      fuel: result.energy.fuel,
      drain: result.energy.drain,
      flowPatterns: result.energy.flowPatterns,
    },
    conflicts: result.conflicts.map(c => ({
      pair: c.pair,
      dominantPole: c.dominantPole,
      balanceRatio: c.balanceRatio,
    })),
    contextShifts: result.contextShifts.map(c => ({
      context: c.context,
      dominantMotive: c.dominantMotive,
      motiveShift: c.motiveShift as Record<string, number>,
    })),
  };
}

// ============================================
// 보고서 프롬프트 조합
// ============================================

export interface ReportGenerationInput {
  syncResult: SyncResult;
  userProfile: UserProfile;
  archetypeMarkdown: string;
  reportPrompt: string;
}

export function buildReportPrompt(input: ReportGenerationInput): string {
  const { syncResult, userProfile, archetypeMarkdown, reportPrompt } = input;
  
  return `${reportPrompt}

=== SYNC_RESULT ===
${JSON.stringify(syncResult, null, 2)}

=== USER_PROFILE ===
${JSON.stringify(userProfile, null, 2)}

=== ARCHETYPE_MARKDOWN ===
${archetypeMarkdown}

위 데이터를 기반으로 MET Mythic 보고서를 작성해주세요.
- 보고서는 한국어로 작성합니다
- 2만자 내외의 상세한 분석을 제공합니다
- 프롬프트의 모든 섹션을 포함합니다
- 신화적 서술 기법을 활용합니다
- PDF 출력에 최적화된 마크다운 형식으로 작성합니다
`;
}

// ============================================
// 보고서 생성 요청 타입
// ============================================

export interface ReportRequest {
  fullResult: FullResult;
  archetypeMarkdown: string;
}

export interface ReportResponse {
  success: boolean;
  report?: string;
  error?: string;
  tokensUsed?: number;
}

// ============================================
// 보고서 프리뷰 생성 (API 없이 미리보기)
// ============================================

export function generateReportPreview(result: FullResult): string {
  const syncResult = convertToSyncResult(result);
  const userProfile = convertToUserProfile(result);
  
  const topMotives = result.motiveScores.slice(0, 3);
  const topIgnitions = result.ignitionScores.slice(0, 2);
  
  return `# MET Mythic Report Preview

## ${syncResult.archetype.archetypeName} (${syncResult.archetype.archetypeNameEn})

> 싱크로율: ${syncResult.overallSync}%

---

### 신화 인물: ${syncResult.figure.figureName}
- 출처: ${syncResult.figure.origin}
- 유사도: ${syncResult.figure.similarity}%

---

### 성숙도 레벨: Lv.${syncResult.level.level}
**${syncResult.level.levelName}**

신뢰도: ${syncResult.level.confidence}%

---

### 동기 원천 Top 3

| 순위 | 동기 | 점수 |
|------|------|------|
| 1 | ${getMotiveName(topMotives[0].motive)} | ${topMotives[0].score} |
| 2 | ${getMotiveName(topMotives[1].motive)} | ${topMotives[1].score} |
| 3 | ${getMotiveName(topMotives[2].motive)} | ${topMotives[2].score} |

---

### 점화 조건 Top 2

- ${topIgnitions[0].condition}: ${topIgnitions[0].score}
- ${topIgnitions[1].condition}: ${topIgnitions[1].score}

---

*이것은 미리보기입니다. 전체 AI 보고서를 생성하려면 "AI 보고서 생성" 버튼을 클릭하세요.*
*AI 보고서는 2만자 내외의 상세한 분석을 제공합니다.*
`;
}

export default {
  convertToSyncResult,
  convertToUserProfile,
  buildReportPrompt,
  generateReportPreview,
};
