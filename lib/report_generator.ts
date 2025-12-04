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
      fuel: (result.energy as any)?.fuel || {},
      drain: (result.energy as any)?.drain || {},
      flowPatterns: (result.energy as any)?.flowPatterns || {},
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

---

# ⚠️ 렌더링 보완 지침 (위 프롬프트에 추가)

## 형식 변환 규칙

메인 프롬프트의 14개 섹션 구조는 그대로 따르되, **렌더링 문제를 방지**하기 위해 다음을 적용하세요:

### 금지 형식 → 대체 형식

1. **테이블 (|---|) 금지**
   - ❌ | 항목 | 내용 |
   - ✅ **항목**: 내용 (볼드 + 콜론 형태)
   - ✅ 또는 리스트로: "• 항목 — 내용"

2. **ASCII 박스 (┌─┐│└┘) 금지**
   - ❌ ┌────┐ │ 내용 │ └────┘
   - ✅ ### 섹션명 + 리스트 형태로 변환
   - ✅ 또는 인용문(>) + 이모지로 구분

3. **ASCII 그래프/막대 금지**
   - ❌ ██████████ 87점
   - ✅ "87점 (상위 12%)" 텍스트로 표현
   - ✅ 또는 이모지로: "🔥🔥🔥🔥🔥 (87/100)"

### DASHBOARD 섹션 변환 예시

메인 프롬프트의 DASHBOARD 예시 대신, 이 형식을 사용하세요:

---

## 12. DASHBOARD (동기 대시보드)

### 🔥 점화 조건 (IGNITION)
- **1순위**: 복잡성 (Complexity) — 92.4점
- **2순위**: 자율 (Autonomy) — 84.1점
- **회피**: 관중(Audience), 경쟁(Competition)

### 🚧 마찰 요소 (FRICTION)
- "대충 해도 돼" 지시 → 위험도 94.2%
- 피상적 회의 연속 → 위험도 87.6%
- 깊이 파는 것 방해 → 위험도 82.1%

### 🌊 몰입 조건 (FLOW)
- **조건**: 복잡한 문제 + 자율권 + 충분한 시간
- **최적 시간**: 오전 10시~12시
- **지속**: 2~3시간 블록 집중

### 🔋 충전 방법 (RECOVERY)
- **방법**: 혼자 깊이 파는 시간
- **장소**: 조용한 공간
- **숨겨진 충전**: 아는 것 인정받기

### ⚠️ 번아웃 신호 (BURNOUT)
- 경고 1단계: "새로운 것 귀찮다"
- 경고 2단계: "왜?"를 안 던짐
- 경고 3단계 (위험): 익숙한 것만 찾음

---

### CLOSING 섹션 변환

"다음 단계" 테이블 대신:

**📅 다음 단계**
- **2주 후**: 예측 검증 체크인
- **1개월 후**: 에너지 흐름 재측정
- **3개월 후**: 성숙도 재진단
- **6개월 후**: 종단 추적 리포트

---

# 🗡️ 추가 섹션: 당신의 무기 (CLOSING 직전에 삽입)

14개 섹션 중 13번(DASHBOARD)과 14번(CLOSING) 사이에 **새 섹션을 추가**하세요:

## 13.5 YOUR WEAPON (당신의 무기)

이 섹션은 보고서의 **선물**입니다. 분석이 아니라 **발견**입니다.

신화 인물이 가진 가장 강력한 힘을 추출하여, 사용자에게 "당신의 무기"로 선물합니다.

### 구성
1. **무기 이름** — 한 문장 정의 (예: "설계하는 힘", "돌파하는 힘")
2. **세부 능력 3가지** — 이 무기를 구성하는 요소
3. **빛나는 순간** — 이 능력이 폭발할 때
4. **활용 가이드** — 커리어, 관계, 일상에서의 활용
5. **그림자 경고** — 신화 인물의 실패에서 배우는 주의점

### 예시 (제갈량)

---

## 13.5 YOUR WEAPON (당신의 무기)

### 🗡️ 당신의 무기: 설계하는 힘

당신은 **설계합니다**.

혼돈 속에서 질서를 보고,
현재에서 미래를 읽고,
복잡함 속에서 구조를 만듭니다.

이것은 흔한 능력이 아닙니다.

융중의 27세 청년이 천하삼분지계를 그릴 수 있었던 것은
그가 "볼 수 있었기" 때문입니다.
당신도 볼 수 있습니다.

### 세부 능력

**1. 패턴 인식**
- 데이터에서 흐름을 읽습니다
- 남들이 못 보는 연결고리를 찾습니다
- "왜 이렇게 됐지?"를 끝까지 파고듭니다

**2. 장기적 안목**
- 3수 앞을 내다봅니다
- 당장의 손해도 큰 그림에서 판단합니다
- 기다릴 줄 압니다

**3. 구조화 능력**
- 복잡한 것을 단순하게 정리합니다
- 계획을 세우면 실행 가능한 단계로 쪼갭니다
- 추상적 아이디어를 구체적 로드맵으로 바꿉니다

### 이 무기가 빛나는 순간

- 복잡한 프로젝트를 맡았을 때
- 장기 전략이 필요한 역할에서
- 위기 상황에서 참모 역할을 할 때
- 아무도 답을 모르는 문제 앞에서

### 활용 가이드

**커리어**: 전략 기획, 컨설팅, 연구, 아키텍트 역할
**관계**: 조언자, 분석가, 문제 해결사 포지션
**일상**: 복잡한 결정 앞에서 구조화하는 습관

### ⚠️ 그림자 경고

제갈량은 오장원에서 별이 되었습니다.
모든 것을 설계하려 했기 때문입니다.

당신의 "설계하는 힘"도 과하면 독이 됩니다:
- 모든 것을 통제하려는 집착
- 위임하지 못하는 병목
- "내가 아니면 안 된다"는 고립

**기억하세요: 설계는 실행을 위한 것입니다. 설계 자체가 목적이 되면 오장원입니다.**

---

# 최종 체크리스트

✅ 14개 섹션 구조 유지 (메인 프롬프트 기준)
✅ 13.5 YOUR WEAPON 섹션 추가 (CLOSING 직전)
✅ 테이블/ASCII박스/그래프 → 리스트/텍스트로 변환
✅ 띄어쓰기/맞춤법 정확히
✅ 신화적 서술 유지
✅ 2만자 이상

이제 보고서를 작성해주세요.
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
