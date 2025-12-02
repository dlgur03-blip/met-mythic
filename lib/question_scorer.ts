/**
 * MET Mythic v2.0 — Question Scorer
 * 문항 응답을 점수로 변환하는 로직
 */

import type { 
  Question, 
  Answer, 
  MotiveSource, 
  IgnitionCondition,
  MotiveScore,
  IgnitionScore,
  DirectionScore,
  OperationScore,
  Direction,
  OperationAxis,
} from './types';

import { ALL_QUESTIONS } from '../data/questions/all_questions';

// ============================================
// 문항 조회 (Question Lookup)
// ============================================

/** ID로 문항 조회 */
const questionMap = new Map<string, Question>();

export function initQuestionMap(questions: Question[] = ALL_QUESTIONS): void {
  questionMap.clear();
  for (const q of questions) {
    questionMap.set(q.id, q);
  }
}

export function getQuestion(id: string): Question | undefined {
  if (questionMap.size === 0) {
    initQuestionMap();
  }
  return questionMap.get(id);
}

// ============================================
// 점수 집계 헬퍼 (Score Aggregation Helpers)
// ============================================

interface ScoreAccumulator {
  total: number;
  count: number;
}

function createAccumulator(): ScoreAccumulator {
  return { total: 0, count: 0 };
}

function addScore(acc: ScoreAccumulator, value: number): void {
  acc.total += value;
  acc.count += 1;
}

function getAverage(acc: ScoreAccumulator, defaultValue = 50): number {
  return acc.count > 0 ? acc.total / acc.count : defaultValue;
}

// ============================================
// 동기 원천 점수 계산 (Motive Source Scoring)
// ============================================

const MOTIVE_SOURCES: MotiveSource[] = [
  'achievement', 'mastery', 'creation', 'recognition',
  'connection', 'security', 'freedom', 'adventure'
];

export function calculateMotiveScores(answers: Answer[]): MotiveScore[] {
  const accumulators: Record<MotiveSource, ScoreAccumulator> = {} as any;
  
  // 초기화
  for (const motive of MOTIVE_SOURCES) {
    accumulators[motive] = createAccumulator();
  }
  
  // 응답 처리
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    // motive_source 카테고리 문항만 처리
    if (question.category !== 'motive_source') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    
    // scores.motive가 있는 경우 (특정 동기 측정)
    if (scores.motive && MOTIVE_SOURCES.includes(scores.motive as MotiveSource)) {
      addScore(accumulators[scores.motive as MotiveSource], scores.value);
    }
    
    // subcategory로 동기 판별 (choice 타입)
    if (question.subcategory && MOTIVE_SOURCES.includes(question.subcategory as MotiveSource)) {
      addScore(accumulators[question.subcategory as MotiveSource], scores.value);
    }
  }
  
  // 점수 변환 (5점 척도 → 100점)
  const results: MotiveScore[] = MOTIVE_SOURCES.map(motive => ({
    motive,
    score: Math.round(getAverage(accumulators[motive], 2.5) * 20), // 1-5 → 20-100
    rank: 0,
  }));
  
  // 순위 정렬
  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => r.rank = i + 1);
  
  return results;
}

// ============================================
// 점화 조건 점수 계산 (Ignition Scoring)
// ============================================

const IGNITION_CONDITIONS: IgnitionCondition[] = [
  'competition', 'complexity', 'deadline', 
  'audience', 'autonomy', 'crisis'
];

export function calculateIgnitionScores(answers: Answer[]): IgnitionScore[] {
  const accumulators: Record<IgnitionCondition, ScoreAccumulator> = {} as any;
  
  for (const condition of IGNITION_CONDITIONS) {
    accumulators[condition] = createAccumulator();
  }
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'ignition') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    
    // ignition 필드가 있는 경우
    if (scores.ignition && IGNITION_CONDITIONS.includes(scores.ignition as IgnitionCondition)) {
      addScore(accumulators[scores.ignition as IgnitionCondition], scores.value);
    }
    
    // subcategory로 점화 조건 판별
    if (question.subcategory && IGNITION_CONDITIONS.includes(question.subcategory as IgnitionCondition)) {
      addScore(accumulators[question.subcategory as IgnitionCondition], scores.value);
    }
  }
  
  const results: IgnitionScore[] = IGNITION_CONDITIONS.map(condition => ({
    condition,
    score: Math.round(getAverage(accumulators[condition], 2.5) * 20),
    rank: 0,
  }));
  
  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => r.rank = i + 1);
  
  return results;
}

// ============================================
// 방향 점수 계산 (Direction Scoring)
// ============================================

export function calculateDirectionScores(answers: Answer[]): DirectionScore[] {
  const approachAccs: Record<MotiveSource, ScoreAccumulator> = {} as any;
  const avoidanceAccs: Record<MotiveSource, ScoreAccumulator> = {} as any;
  
  for (const motive of MOTIVE_SOURCES) {
    approachAccs[motive] = createAccumulator();
    avoidanceAccs[motive] = createAccumulator();
  }
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'direction') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    const motive = scores.motive as MotiveSource;
    const direction = scores.direction as Direction;
    
    if (!motive || !MOTIVE_SOURCES.includes(motive)) continue;
    
    if (direction === 'approach') {
      addScore(approachAccs[motive], scores.value);
    } else if (direction === 'avoidance') {
      addScore(avoidanceAccs[motive], scores.value);
    }
  }
  
  return MOTIVE_SOURCES.map(motive => {
    const approachScore = getAverage(approachAccs[motive], 2.5);
    const avoidanceScore = getAverage(avoidanceAccs[motive], 2.5);
    const total = approachScore + avoidanceScore;
    
    const approachPercent = total > 0 ? Math.round((approachScore / total) * 100) : 50;
    const avoidancePercent = 100 - approachPercent;
    
    return {
      motive,
      approach: approachPercent,
      avoidance: avoidancePercent,
      dominant: (approachPercent >= avoidancePercent ? 'approach' : 'avoidance') as Direction,
    };
  });
}

// ============================================
// 운영 점수 계산 (Operation Scoring)
// ============================================

// 운영 축 매핑 (subcategory → axis)
const OPERATION_AXIS_MAP: Record<string, OperationAxis> = {
  'rhythm': 'rhythm',
  'recovery': 'recovery', // 문항의 recovery = recharge 축
  'relay': 'release',     // 문항의 relay = release 축
  'resistance': 'recovery', // 저항 → recovery 관련
  'scope': 'rhythm',      // 범위 → rhythm 관련
};

const OPERATION_AXES: OperationAxis[] = ['rhythm', 'recharge', 'release', 'recovery'];

export function calculateOperationScores(answers: Answer[]): OperationScore[] {
  // 각 축별 극 점수 (-50 ~ +50)
  const axisScores: Record<OperationAxis, { left: number; right: number; count: number }> = {
    rhythm: { left: 0, right: 0, count: 0 },
    recharge: { left: 0, right: 0, count: 0 },
    release: { left: 0, right: 0, count: 0 },
    recovery: { left: 0, right: 0, count: 0 },
  };
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'operating') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    
    // axis와 pole로 점수 집계
    let axis = scores.axis as OperationAxis;
    
    // subcategory로 매핑
    if (!axis && question.subcategory) {
      axis = OPERATION_AXIS_MAP[question.subcategory] || question.subcategory as OperationAxis;
    }
    
    if (!axis || !OPERATION_AXES.includes(axis)) continue;
    
    const pole = scores.pole as string;
    const value = scores.value || 1;
    
    axisScores[axis].count++;
    
    // pole에 따라 left/right 점수 증가
    if (pole === 'planned' || pole === 'solitary' || pole === 'endurance' || pole === 'quick') {
      axisScores[axis].left += value;
    } else if (pole === 'spontaneous' || pole === 'social' || pole === 'burst' || pole === 'slow') {
      axisScores[axis].right += value;
    }
  }
  
  return OPERATION_AXES.map(axis => {
    const data = axisScores[axis];
    const total = data.left + data.right;
    
    // -50 ~ +50 범위로 변환
    let score = 0;
    if (total > 0) {
      score = Math.round(((data.right - data.left) / total) * 50);
    }
    
    let tendency: 'left' | 'balanced' | 'right' = 'balanced';
    if (score <= -15) tendency = 'left';
    else if (score >= 15) tendency = 'right';
    
    return { axis, score, tendency };
  });
}

// ============================================
// 에너지 점수 계산 (Energy Scoring)
// ============================================

export interface EnergyScore {
  fuel: Record<MotiveSource, number>;      // 충전 요소별 점수
  drain: Record<string, number>;           // 소모 요소별 점수
  flowPatterns: {
    deepFocus: number;      // 깊은 몰입
    challenge: number;      // 도전 선호
    clarity: number;        // 명확성 선호
    feedback: number;       // 피드백 선호
    environment: number;    // 환경 민감도
  };
}

export function calculateEnergyScores(answers: Answer[]): EnergyScore {
  const fuelAccs: Record<MotiveSource, ScoreAccumulator> = {} as any;
  const drainAccs: Record<string, ScoreAccumulator> = {};
  const flowAccs: Record<string, ScoreAccumulator> = {};
  
  for (const motive of MOTIVE_SOURCES) {
    fuelAccs[motive] = createAccumulator();
  }
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'energy') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    
    // Fuel (source로 동기 측정)
    if (scores.source && MOTIVE_SOURCES.includes(scores.source as MotiveSource)) {
      addScore(fuelAccs[scores.source as MotiveSource], scores.value);
    }
    
    // Drain
    if (scores.drain) {
      if (!drainAccs[scores.drain]) drainAccs[scores.drain] = createAccumulator();
      addScore(drainAccs[scores.drain], scores.value);
    }
    
    // Flow
    if (scores.flow) {
      if (!flowAccs[scores.flow]) flowAccs[scores.flow] = createAccumulator();
      addScore(flowAccs[scores.flow], scores.value);
    }
  }
  
  // Fuel 점수 변환
  const fuel: Record<MotiveSource, number> = {} as any;
  for (const motive of MOTIVE_SOURCES) {
    fuel[motive] = Math.round(getAverage(fuelAccs[motive], 2.5) * 20);
  }
  
  // Drain 점수 변환
  const drain: Record<string, number> = {};
  for (const [key, acc] of Object.entries(drainAccs)) {
    drain[key] = Math.round(getAverage(acc, 2.5) * 20);
  }
  
  // Flow 패턴 점수
  const flowPatterns = {
    deepFocus: Math.round(getAverage(flowAccs['deep'] || createAccumulator(), 2.5) * 20),
    challenge: Math.round(getAverage(flowAccs['challenge'] || createAccumulator(), 2.5) * 20),
    clarity: Math.round(getAverage(flowAccs['clarity'] || createAccumulator(), 2.5) * 20),
    feedback: Math.round(getAverage(flowAccs['feedback'] || createAccumulator(), 2.5) * 20),
    environment: Math.round(getAverage(flowAccs['environment'] || createAccumulator(), 2.5) * 20),
  };
  
  return { fuel, drain, flowPatterns };
}

// ============================================
// 충돌 점수 계산 (Conflict Scoring)
// ============================================

export interface ConflictScore {
  pair: [MotiveSource, MotiveSource];
  dominantPole: MotiveSource;
  balanceRatio: number; // 0-100, 50이면 완전 균형
}

export function calculateConflictScores(answers: Answer[]): ConflictScore[] {
  const pairAccs: Record<string, { poleA: number; poleB: number; count: number }> = {};
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'conflict') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    const pole = scores.pole as string;
    const subcategory = question.subcategory || '';
    
    if (!pairAccs[subcategory]) {
      pairAccs[subcategory] = { poleA: 0, poleB: 0, count: 0 };
    }
    
    pairAccs[subcategory].count++;
    
    // 첫 번째 pole이면 A, 두 번째면 B
    // subcategory 형식: "achievement_connection"
    const [poleAName, poleBName] = subcategory.split('_');
    
    if (pole === poleAName) {
      pairAccs[subcategory].poleA += scores.value || 1;
    } else if (pole === poleBName || pole === 'balanced') {
      pairAccs[subcategory].poleB += scores.value || 1;
    }
  }
  
  const results: ConflictScore[] = [];
  
  for (const [subcategory, data] of Object.entries(pairAccs)) {
    const parts = subcategory.split('_');
    if (parts.length !== 2) continue;
    
    const [motiveA, motiveB] = parts as [MotiveSource, MotiveSource];
    const total = data.poleA + data.poleB;
    
    let balanceRatio = 50;
    let dominantPole = motiveA;
    
    if (total > 0) {
      balanceRatio = Math.round((data.poleA / total) * 100);
      dominantPole = data.poleA >= data.poleB ? motiveA : motiveB;
    }
    
    results.push({
      pair: [motiveA, motiveB],
      dominantPole,
      balanceRatio,
    });
  }
  
  return results;
}

// ============================================
// 상황별 점수 계산 (Context Scoring)
// ============================================

export interface ContextScore {
  context: 'normal' | 'pressure' | 'growth' | 'crisis';
  dominantMotive: MotiveSource;
  motiveShift: Partial<Record<MotiveSource, number>>; // 평상시 대비 변화
}

export function calculateContextScores(
  answers: Answer[], 
  baselineMotives: Record<MotiveSource, number>
): ContextScore[] {
  const contextAccs: Record<string, Record<MotiveSource, ScoreAccumulator>> = {};
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'context') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    const context = scores.context as string || question.subcategory || 'normal';
    const motive = scores.motive as MotiveSource;
    
    if (!contextAccs[context]) {
      contextAccs[context] = {} as any;
      for (const m of MOTIVE_SOURCES) {
        contextAccs[context][m] = createAccumulator();
      }
    }
    
    if (motive && MOTIVE_SOURCES.includes(motive)) {
      addScore(contextAccs[context][motive], scores.value || 1);
    }
  }
  
  const results: ContextScore[] = [];
  
  for (const [context, accs] of Object.entries(contextAccs)) {
    const motiveScores: Record<MotiveSource, number> = {} as any;
    let maxScore = 0;
    let dominantMotive: MotiveSource = 'achievement';
    
    for (const motive of MOTIVE_SOURCES) {
      const score = getAverage(accs[motive], 0) * accs[motive].count; // 빈도 가중
      motiveScores[motive] = score;
      
      if (score > maxScore) {
        maxScore = score;
        dominantMotive = motive;
      }
    }
    
    // 평상시 대비 변화 계산
    const motiveShift: Partial<Record<MotiveSource, number>> = {};
    for (const motive of MOTIVE_SOURCES) {
      const baseline = baselineMotives[motive] || 50;
      const current = motiveScores[motive] * 20 || 50;
      const shift = current - baseline;
      if (Math.abs(shift) > 10) {
        motiveShift[motive] = shift;
      }
    }
    
    results.push({
      context: context as any,
      dominantMotive,
      motiveShift,
    });
  }
  
  return results;
}

// ============================================
// 숨겨진 동기 점수 계산 (Hidden Motive Scoring)
// ============================================

export interface HiddenMotiveScore {
  shadow: Partial<Record<MotiveSource, number>>;       // 억압된 동기
  projection: Partial<Record<MotiveSource, number>>;   // 투사된 동기
  compensation: Partial<Record<string, number>>;       // 보상 동기
}

export function calculateHiddenScores(answers: Answer[]): HiddenMotiveScore {
  const shadowAccs: Record<string, ScoreAccumulator> = {};
  const projectionAccs: Record<string, ScoreAccumulator> = {};
  const compensationAccs: Record<string, ScoreAccumulator> = {};
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'hidden') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    
    if (scores.shadow) {
      if (!shadowAccs[scores.shadow]) shadowAccs[scores.shadow] = createAccumulator();
      addScore(shadowAccs[scores.shadow], scores.value);
    }
    
    if (scores.projection) {
      if (!projectionAccs[scores.projection]) projectionAccs[scores.projection] = createAccumulator();
      addScore(projectionAccs[scores.projection], scores.value);
    }
    
    if (scores.compensation) {
      if (!compensationAccs[scores.compensation]) compensationAccs[scores.compensation] = createAccumulator();
      addScore(compensationAccs[scores.compensation], scores.value);
    }
  }
  
  const shadow: Partial<Record<MotiveSource, number>> = {};
  for (const [key, acc] of Object.entries(shadowAccs)) {
    shadow[key as MotiveSource] = Math.round(getAverage(acc, 2.5) * 20);
  }
  
  const projection: Partial<Record<MotiveSource, number>> = {};
  for (const [key, acc] of Object.entries(projectionAccs)) {
    projection[key as MotiveSource] = Math.round(getAverage(acc, 2.5) * 20);
  }
  
  const compensation: Partial<Record<string, number>> = {};
  for (const [key, acc] of Object.entries(compensationAccs)) {
    compensation[key] = Math.round(getAverage(acc, 2.5) * 20);
  }
  
  return { shadow, projection, compensation };
}

// ============================================
// 성숙도 점수 계산 (Maturity Scoring)
// ============================================

export interface MaturityScore {
  awareness: number;      // 자각 (0-100)
  integration: number;    // 통합 (0-100)
  growth: number;         // 성장 (0-100)
  overall: number;        // 종합 (0-100)
  level: 1 | 2 | 3 | 4;   // 레벨 판정
}

export function calculateMaturityScores(answers: Answer[]): MaturityScore {
  const awarenessAcc = createAccumulator();
  const integrationAcc = createAccumulator();
  const growthAcc = createAccumulator();
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'maturity') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    const maturityType = scores.maturity as string;
    const value = scores.value;
    
    if (question.subcategory === 'awareness' || maturityType?.includes('awareness') || maturityType?.includes('emotional') || maturityType?.includes('reflection')) {
      addScore(awarenessAcc, value);
    }
    
    if (question.subcategory === 'integration' || maturityType?.includes('balance') || maturityType?.includes('harmony') || maturityType?.includes('synthesis')) {
      addScore(integrationAcc, value);
    }
    
    if (question.subcategory === 'growth' || maturityType?.includes('growth') || maturityType?.includes('learning') || maturityType?.includes('resilience')) {
      addScore(growthAcc, value);
    }
  }
  
  const awareness = Math.round(getAverage(awarenessAcc, 2.5) * 20);
  const integration = Math.round(getAverage(integrationAcc, 2.5) * 20);
  const growth = Math.round(getAverage(growthAcc, 2.5) * 20);
  const overall = Math.round((awareness + integration + growth) / 3);
  
  // 레벨 판정
  let level: 1 | 2 | 3 | 4;
  if (overall >= 80) level = 4;
  else if (overall >= 60) level = 3;
  else if (overall >= 40) level = 2;
  else level = 1;
  
  return { awareness, integration, growth, overall, level };
}

// ============================================
// 검증 점수 계산 (Validation Scoring)
// ============================================

export interface ValidationScore {
  consistency: number;           // 일관성 (0-100, 높을수록 일관)
  honesty: number;               // 정직성 (0-100, 높을수록 솔직)
  socialDesirability: number;    // 사회적 바람직성 (0-100, 높을수록 의심)
  isValid: boolean;              // 유효 여부
  flags: string[];               // 경고 플래그
}

export function calculateValidationScores(answers: Answer[]): ValidationScore {
  const consistencyAcc = createAccumulator();
  const honestyAcc = createAccumulator();
  let socialDesirabilityCount = 0;
  let socialDesirabilityHigh = 0;
  const flags: string[] = [];
  
  for (const answer of answers) {
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    
    if (question.category !== 'validation') continue;
    
    const selectedOption = question.options.find(o => o.id === answer.optionId);
    if (!selectedOption) continue;
    
    const scores = selectedOption.scores;
    
    if (scores.check) {
      // 일관성 검증 (다른 문항과 비교 필요 - 여기서는 단순화)
      addScore(consistencyAcc, scores.value);
    }
    
    if (scores.honesty) {
      addScore(honestyAcc, scores.value);
      
      // 사회적 바람직성 체크
      if (question.metadata.socialDesirability) {
        socialDesirabilityCount++;
        if (selectedOption.value >= 4) {
          socialDesirabilityHigh++;
        }
      }
    }
  }
  
  const consistency = Math.round(getAverage(consistencyAcc, 3) * 20);
  const honesty = Math.round(getAverage(honestyAcc, 3) * 20);
  
  // 사회적 바람직성 비율
  const socialDesirability = socialDesirabilityCount > 0 
    ? Math.round((socialDesirabilityHigh / socialDesirabilityCount) * 100)
    : 0;
  
  // 플래그 생성
  if (socialDesirability > 60) {
    flags.push('HIGH_SOCIAL_DESIRABILITY');
  }
  
  if (honesty < 40) {
    flags.push('LOW_HONESTY_SCORE');
  }
  
  // 유효성 판정
  const isValid = socialDesirability <= 80 && honesty >= 30 && flags.length <= 1;
  
  return { consistency, honesty, socialDesirability, isValid, flags };
}

// ============================================
// 통합 점수 계산 (Unified Scoring)
// ============================================

export interface AllScores {
  motive: MotiveScore[];
  ignition: IgnitionScore[];
  direction: DirectionScore[];
  operation: OperationScore[];
  energy: EnergyScore;
  conflict: ConflictScore[];
  context: ContextScore[];
  hidden: HiddenMotiveScore;
  maturity: MaturityScore;
  validation: ValidationScore;
}

export function calculateAllScores(answers: Answer[]): AllScores {
  // 먼저 동기 원천 계산 (다른 계산에서 baseline으로 사용)
  const motive = calculateMotiveScores(answers);
  
  // baseline 동기 맵 생성
  const baselineMotives: Record<MotiveSource, number> = {} as any;
  for (const m of motive) {
    baselineMotives[m.motive] = m.score;
  }
  
  return {
    motive,
    ignition: calculateIgnitionScores(answers),
    direction: calculateDirectionScores(answers),
    operation: calculateOperationScores(answers),
    energy: calculateEnergyScores(answers),
    conflict: calculateConflictScores(answers),
    context: calculateContextScores(answers, baselineMotives),
    hidden: calculateHiddenScores(answers),
    maturity: calculateMaturityScores(answers),
    validation: calculateValidationScores(answers),
  };
}

export default {
  initQuestionMap,
  getQuestion,
  calculateMotiveScores,
  calculateIgnitionScores,
  calculateDirectionScores,
  calculateOperationScores,
  calculateEnergyScores,
  calculateConflictScores,
  calculateContextScores,
  calculateHiddenScores,
  calculateMaturityScores,
  calculateValidationScores,
  calculateAllScores,
};
