/**
 * MET Mythic v2.0 — Type Definitions
 */

// ============================================
// 기본 타입 (Basic Types)
// ============================================

/** 동기 원천 8개 */
export type MotiveSource = 
  | 'achievement' 
  | 'mastery' 
  | 'creation' 
  | 'recognition' 
  | 'connection' 
  | 'security' 
  | 'freedom' 
  | 'adventure';

/** 점화 조건 6개 */
export type IgnitionCondition = 
  | 'competition' 
  | 'complexity' 
  | 'deadline' 
  | 'audience' 
  | 'autonomy' 
  | 'crisis';

/** 방향 */
export type Direction = 'approach' | 'avoidance';

/** 원형 8개 */
export type Archetype = 
  | 'conqueror' 
  | 'sage' 
  | 'creator' 
  | 'sovereign' 
  | 'healer' 
  | 'guardian' 
  | 'rebel' 
  | 'explorer';

/** 동기 운영 4축 */
export type OperationAxis = 'rhythm' | 'recharge' | 'release' | 'recovery';

/** 상황 */
export type ContextType = 'normal' | 'pressure' | 'burnout';

/** 성숙도 레벨 1-4 */
export type MaturityLevel = 1 | 2 | 3 | 4;

/** 문항 유형 */
export type QuestionType = 
  | 'choice'      // 4지선다
  | 'likert'      // 리커트 5점
  | 'scenario'    // 시나리오 기반
  | 'bipolar'     // 양극형 (A vs B)
  | 'trap';       // 함정 문항

// ============================================
// 문항 관련 (Questions)
// ============================================

/** 문항 정의 */
export interface Question {
  id: string;
  type: QuestionType;
  category: string;           // 'motive', 'ignition', 'direction', 'operating', 'energy', 'conflict', 'context', 'hidden', 'maturity', 'validation'
  subcategory?: string;       // 'achievement', 'mastery' 등
  text: string;               // 문항 텍스트
  subtext?: string;           // 보조 텍스트 (시나리오 문항용)
  options: QuestionOption[];
  metadata: {
    layer: number;            // 1-10 레이어
    isLite: boolean;          // Lite 버전 포함 여부
    isTrap?: boolean;         // 함정 문항 여부
    context?: ContextType;    // 상황 (평상시/압박/번아웃)
    checkAgainst?: string;    // 검증용 비교 대상
    socialDesirability?: boolean; // 사회적 바람직성 문항
    selfReport?: boolean;     // 자기보고 문항
  };
}

/** 문항 선택지 */
export interface QuestionOption {
  id: string;
  text: string;
  value: number;              // 점수 (1-5 또는 0/1)
  scores: Record<string, any>; // 유연한 점수 매핑 객체
}

/** 사용자 응답 */
export interface Answer {
  questionId: string;
  optionId: string;
  value: number;
  responseTimeMs: number;     // 응답 시간 (밀리초)
  timestamp: Date;
}

// ============================================
// 점수 결과 (Scores)
// ============================================

/** 동기 원천 점수 */
export interface MotiveScore {
  motive: MotiveSource;
  score: number;              // 0-100
  percentile?: number;        // 백분위
  rank: number;               // 순위 1-8
}

/** 점화 조건 점수 */
export interface IgnitionScore {
  condition: IgnitionCondition;
  score: number;              // 0-100
  rank: number;               // 순위 1-6
}

/** 방향 점수 */
export interface DirectionScore {
  motive: MotiveSource;
  approach: number;           // 접근 비율 (%)
  avoidance: number;          // 회피 비율 (%)
  dominant: Direction;
}

/** 동기 운영 점수 */
export interface OperationScore {
  axis: OperationAxis;
  score: number;              // -50 ~ +50
  tendency: 'left' | 'balanced' | 'right';
}

// ============================================
// 원형 매칭 (Archetype Matching)
// ============================================

/** 원형 매칭 결과 */
export interface ArchetypeMatch {
  archetype: Archetype;
  archetypeName: string;      // 한글명
  archetypeNameEn: string;    // 영문명
  score: number;              // 0-100
  rank: number;
}

/** 신화 인물 매칭 결과 */
export interface FigureMatch {
  figure: string;             // 키 (예: 'zhuge')
  figureName: string;         // 한글명 (예: '제갈량')
  figureNameEn: string;       // 영문명
  origin: string;             // 문화권 (예: '중국')
  similarity: number;         // 유사도 0-100
  rank: number;
}

/** 레벨 판정 결과 */
export interface LevelResult {
  level: MaturityLevel;
  levelName: string;
  confidence: number;         // 신뢰도 0-100
  signalMatches: string[];    // 매칭된 신호들
  nextLevelHint: string | null;
}

// ============================================
// 종합 결과 (Final Results)
// ============================================

/** 사용자 동기 프로파일 */
export interface UserMotivation {
  achievement: number;
  freedom: number;
  security: number;
  adventure: number;
  connection: number;
  mastery: number;
  recognition: number;
  creation: number;
}

/** 사용자 점화 프로파일 */
export interface UserIgnition {
  competition: number;
  complexity: number;
  deadline: number;
  audience: number;
  autonomy: number;
  crisis: number;
}

/** 숨겨진 동기 */
export interface ShadowMotive {
  surface: MotiveSource;
  surfaceScore: number;
  hidden: MotiveSource;
  hiddenScore: number;
  confidence: number;
  evidence: string[];
}

/** 동기 오염 */
export interface Contamination {
  authentic: MotiveSource[];
  contaminated: MotiveSource;
  contaminatedScore: number;
  source: string;
  severity: number;
  evidence: string[];
}

/** 전체 사용자 프로파일 */
export interface UserProfile {
  motivation: UserMotivation;
  ignition: UserIgnition;
  direction: Record<MotiveSource, DirectionScore>;
  operation: OperationScore[];
  shadow?: ShadowMotive;
  contamination?: Contamination;
  maturitySignals: string[];
}

/** 싱크로율 최종 결과 */
export interface SyncResult {
  archetype: ArchetypeMatch;
  figure: FigureMatch;
  level: LevelResult;
  overallSync: number;        // 종합 싱크로율 0-100
  allArchetypes: ArchetypeMatch[];
  allFigures: FigureMatch[];
}

/** 전체 검사 결과 */
export interface METResult {
  userId: string;
  version: 'lite' | 'full';
  createdAt: Date;
  
  // 점수
  motiveScores: MotiveScore[];
  ignitionScores: IgnitionScore[];
  directionScores: DirectionScore[];
  operationScores: OperationScore[];
  
  // 원형 매칭
  sync: SyncResult;
  
  // 추가 분석
  shadow?: ShadowMotive;
  contamination?: Contamination;
  
  // 응답 메타데이터
  totalResponseTime: number;
  suspiciousResponses: number;  // 1초 미만 응답 수
}

// ============================================
// 보고서 생성용 (Report Generation)
// ============================================

/** AI 보고서 생성 입력 */
export interface ReportInput {
  syncResult: SyncResult;
  userProfile: UserProfile;
  archetypeMarkdown: string;  // 1위 원형 마크다운 전체
}

/** 보고서 출력 */
export interface ReportOutput {
  markdown: string;
  generatedAt: Date;
}
