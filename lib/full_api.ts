/**
 * MET Mythic v2.0 — Full Version API
 * 
 * 310문항 Full 버전 전용 인터페이스
 * - 25-30분 소요
 * - 전체 동기 프로파일 + 원형 매칭
 * - 상세 분석 (충돌, 숨겨진 동기, 상황별, 에너지)
 */

import { ALL_QUESTIONS, QUESTION_STATS } from '../data/questions/all_questions';
import { 
  initQuestionMap,
  calculateAllScores,
  type AllScores,
  type EnergyScore,
  type ConflictScore,
  type ContextScore,
  type HiddenMotiveScore,
  type MaturityScore,
  type ValidationScore,
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
  Archetype,
} from './types';

// ============================================
// Full 버전 초기화
// ============================================

let isInitialized = false;

export function initFullVersion(): void {
  if (!isInitialized) {
    initQuestionMap(ALL_QUESTIONS);
    isInitialized = true;
  }
}

// ============================================
// 원형 데이터 (Full 버전용 - 상세)
// ============================================

const ARCHETYPES: Archetype[] = [
  'conqueror', 'sage', 'creator', 'sovereign', 
  'healer', 'guardian', 'rebel', 'explorer'
];

const ARCHETYPE_NAMES: Record<Archetype, { ko: string; en: string; emoji: string }> = {
  conqueror: { ko: '정복자', en: 'The Conqueror', emoji: '⚔️' },
  sage:      { ko: '현자', en: 'The Sage', emoji: '📚' },
  creator:   { ko: '창조자', en: 'The Creator', emoji: '🎨' },
  sovereign: { ko: '군주', en: 'The Sovereign', emoji: '👑' },
  healer:    { ko: '치유자', en: 'The Healer', emoji: '💚' },
  guardian:  { ko: '수호자', en: 'The Guardian', emoji: '🛡️' },
  rebel:     { ko: '반역자', en: 'The Rebel', emoji: '🔥' },
  explorer:  { ko: '탐험가', en: 'The Explorer', emoji: '🧭' },
};

const ARCHETYPE_WEIGHTS: Record<Archetype, Partial<Record<MotiveSource, number>>> = {
  conqueror: { achievement: 0.45, freedom: 0.25, mastery: 0.15, recognition: 0.15 },
  sage:      { mastery: 0.45, achievement: 0.20, creation: 0.20, connection: 0.15 },
  creator:   { creation: 0.45, mastery: 0.25, freedom: 0.20, recognition: 0.10 },
  sovereign: { recognition: 0.40, achievement: 0.25, security: 0.20, connection: 0.15 },
  healer:    { connection: 0.45, security: 0.25, creation: 0.15, mastery: 0.15 },
  guardian:  { security: 0.45, connection: 0.25, achievement: 0.15, mastery: 0.15 },
  rebel:     { freedom: 0.45, creation: 0.25, adventure: 0.20, achievement: 0.10 },
  explorer:  { adventure: 0.45, freedom: 0.25, mastery: 0.20, creation: 0.10 },
};

const ARCHETYPE_CONDITIONS: Record<Archetype, {
  primary?: { motive: MotiveSource; min: number };
  secondary?: { motive: MotiveSource; min: number };
  exclude?: { motive: MotiveSource; max: number };
}> = {
  conqueror: { primary: { motive: 'achievement', min: 70 }, exclude: { motive: 'security', max: 60 } },
  sage:      { primary: { motive: 'mastery', min: 70 }, secondary: { motive: 'creation', min: 50 } },
  creator:   { primary: { motive: 'creation', min: 70 }, secondary: { motive: 'freedom', min: 50 } },
  sovereign: { primary: { motive: 'recognition', min: 65 }, secondary: { motive: 'achievement', min: 55 } },
  healer:    { primary: { motive: 'connection', min: 70 }, secondary: { motive: 'security', min: 50 } },
  guardian:  { primary: { motive: 'security', min: 70 }, secondary: { motive: 'connection', min: 55 } },
  rebel:     { primary: { motive: 'freedom', min: 70 }, exclude: { motive: 'security', max: 50 } },
  explorer:  { primary: { motive: 'adventure', min: 70 }, secondary: { motive: 'freedom', min: 55 } },
};

// 신화 인물 프로필 (6명씩)
const FIGURE_PROFILES: Record<Archetype, Array<{
  key: string;
  name: string;
  nameEn: string;
  origin: string;
  motivation: Record<MotiveSource, number>;
}>> = {
  conqueror: [
    { key: 'napoleon', name: '나폴레옹', nameEn: 'Napoleon', origin: '프랑스',
      motivation: { achievement: 0.95, freedom: 0.70, mastery: 0.80, recognition: 0.85, connection: 0.40, security: 0.30, creation: 0.50, adventure: 0.75 }},
    { key: 'alexander', name: '알렉산더', nameEn: 'Alexander', origin: '그리스',
      motivation: { achievement: 0.95, adventure: 0.90, freedom: 0.75, recognition: 0.80, mastery: 0.70, connection: 0.50, creation: 0.40, security: 0.20 }},
    { key: 'genghis', name: '칭기즈칸', nameEn: 'Genghis Khan', origin: '몽골',
      motivation: { achievement: 0.95, freedom: 0.85, adventure: 0.80, recognition: 0.70, mastery: 0.65, security: 0.50, connection: 0.45, creation: 0.30 }},
    { key: 'caesar', name: '율리우스 카이사르', nameEn: 'Julius Caesar', origin: '로마',
      motivation: { achievement: 0.90, recognition: 0.90, mastery: 0.75, freedom: 0.65, connection: 0.55, adventure: 0.60, security: 0.40, creation: 0.35 }},
    { key: 'ares', name: '아레스', nameEn: 'Ares', origin: '그리스 신화',
      motivation: { achievement: 0.90, freedom: 0.80, adventure: 0.85, recognition: 0.70, mastery: 0.60, connection: 0.30, security: 0.20, creation: 0.25 }},
    { key: 'guan_yu', name: '관우', nameEn: 'Guan Yu', origin: '중국',
      motivation: { achievement: 0.85, mastery: 0.90, connection: 0.75, recognition: 0.70, security: 0.60, freedom: 0.55, adventure: 0.50, creation: 0.30 }},
  ],
  sage: [
    { key: 'zhuge', name: '제갈량', nameEn: 'Zhuge Liang', origin: '중국',
      motivation: { mastery: 0.95, achievement: 0.80, connection: 0.70, creation: 0.75, recognition: 0.60, security: 0.55, freedom: 0.45, adventure: 0.40 }},
    { key: 'athena', name: '아테나', nameEn: 'Athena', origin: '그리스 신화',
      motivation: { mastery: 0.90, achievement: 0.75, creation: 0.80, recognition: 0.65, security: 0.60, connection: 0.55, freedom: 0.50, adventure: 0.45 }},
    { key: 'gandalf', name: '간달프', nameEn: 'Gandalf', origin: '판타지',
      motivation: { mastery: 0.90, connection: 0.75, freedom: 0.70, adventure: 0.65, creation: 0.60, achievement: 0.55, security: 0.40, recognition: 0.45 }},
    { key: 'thoth', name: '토트', nameEn: 'Thoth', origin: '이집트 신화',
      motivation: { mastery: 0.95, creation: 0.85, achievement: 0.65, recognition: 0.60, security: 0.55, connection: 0.50, freedom: 0.45, adventure: 0.35 }},
    { key: 'odin_sage', name: '오딘', nameEn: 'Odin', origin: '북유럽 신화',
      motivation: { mastery: 0.90, achievement: 0.80, freedom: 0.75, adventure: 0.70, recognition: 0.65, creation: 0.60, security: 0.40, connection: 0.50 }},
    { key: 'saraswati', name: '사라스와티', nameEn: 'Saraswati', origin: '인도 신화',
      motivation: { mastery: 0.95, creation: 0.90, connection: 0.65, recognition: 0.55, achievement: 0.50, security: 0.50, freedom: 0.55, adventure: 0.40 }},
  ],
  creator: [
    { key: 'hephaestus', name: '헤파이스토스', nameEn: 'Hephaestus', origin: '그리스 신화',
      motivation: { creation: 0.95, mastery: 0.90, achievement: 0.60, security: 0.55, recognition: 0.50, connection: 0.45, freedom: 0.50, adventure: 0.30 }},
    { key: 'daedalus', name: '다이달로스', nameEn: 'Daedalus', origin: '그리스 신화',
      motivation: { creation: 0.95, mastery: 0.85, freedom: 0.70, achievement: 0.65, adventure: 0.55, recognition: 0.50, connection: 0.45, security: 0.40 }},
    { key: 'nuwa', name: '여와', nameEn: 'Nüwa', origin: '중국 신화',
      motivation: { creation: 0.95, connection: 0.80, security: 0.70, mastery: 0.65, achievement: 0.55, recognition: 0.50, freedom: 0.45, adventure: 0.35 }},
    { key: 'brahma', name: '브라흐마', nameEn: 'Brahma', origin: '인도 신화',
      motivation: { creation: 0.95, mastery: 0.80, recognition: 0.65, achievement: 0.60, connection: 0.55, security: 0.55, freedom: 0.50, adventure: 0.40 }},
    { key: 'ptah', name: '프타', nameEn: 'Ptah', origin: '이집트 신화',
      motivation: { creation: 0.95, mastery: 0.85, achievement: 0.60, security: 0.60, recognition: 0.55, connection: 0.50, freedom: 0.45, adventure: 0.30 }},
    { key: 'izanagi', name: '이자나기', nameEn: 'Izanagi', origin: '일본 신화',
      motivation: { creation: 0.90, connection: 0.75, security: 0.65, mastery: 0.60, achievement: 0.55, recognition: 0.50, freedom: 0.50, adventure: 0.45 }},
  ],
  sovereign: [
    { key: 'zeus', name: '제우스', nameEn: 'Zeus', origin: '그리스 신화',
      motivation: { recognition: 0.95, achievement: 0.85, freedom: 0.70, security: 0.65, mastery: 0.60, connection: 0.55, adventure: 0.50, creation: 0.40 }},
    { key: 'jade_emperor', name: '옥황상제', nameEn: 'Jade Emperor', origin: '중국 신화',
      motivation: { recognition: 0.90, security: 0.85, achievement: 0.75, mastery: 0.65, connection: 0.60, creation: 0.45, freedom: 0.40, adventure: 0.30 }},
    { key: 'odin_king', name: '오딘', nameEn: 'Odin', origin: '북유럽 신화',
      motivation: { recognition: 0.85, mastery: 0.90, achievement: 0.80, freedom: 0.70, adventure: 0.65, security: 0.55, creation: 0.50, connection: 0.45 }},
    { key: 'ra', name: '라', nameEn: 'Ra', origin: '이집트 신화',
      motivation: { recognition: 0.95, achievement: 0.80, security: 0.75, mastery: 0.70, creation: 0.60, connection: 0.50, freedom: 0.45, adventure: 0.40 }},
    { key: 'indra', name: '인드라', nameEn: 'Indra', origin: '인도 신화',
      motivation: { recognition: 0.90, achievement: 0.85, adventure: 0.70, freedom: 0.65, mastery: 0.60, security: 0.55, connection: 0.45, creation: 0.40 }},
    { key: 'amaterasu', name: '아마테라스', nameEn: 'Amaterasu', origin: '일본 신화',
      motivation: { recognition: 0.85, connection: 0.75, security: 0.80, creation: 0.65, achievement: 0.60, mastery: 0.55, freedom: 0.45, adventure: 0.35 }},
  ],
  healer: [
    { key: 'guanyin', name: '관음', nameEn: 'Guanyin', origin: '동아시아',
      motivation: { connection: 0.95, security: 0.80, creation: 0.60, mastery: 0.55, recognition: 0.45, achievement: 0.40, freedom: 0.50, adventure: 0.30 }},
    { key: 'asclepius', name: '아스클레피오스', nameEn: 'Asclepius', origin: '그리스 신화',
      motivation: { connection: 0.90, mastery: 0.85, achievement: 0.65, security: 0.60, recognition: 0.55, creation: 0.50, freedom: 0.40, adventure: 0.35 }},
    { key: 'brigid', name: '브리짓', nameEn: 'Brigid', origin: '켈트 신화',
      motivation: { connection: 0.85, creation: 0.80, security: 0.70, mastery: 0.65, recognition: 0.55, achievement: 0.50, freedom: 0.50, adventure: 0.40 }},
    { key: 'dian_cecht', name: '디안 케트', nameEn: 'Dian Cecht', origin: '켈트 신화',
      motivation: { connection: 0.85, mastery: 0.90, achievement: 0.70, security: 0.65, creation: 0.60, recognition: 0.55, freedom: 0.40, adventure: 0.35 }},
    { key: 'eir', name: '에이르', nameEn: 'Eir', origin: '북유럽 신화',
      motivation: { connection: 0.90, security: 0.75, mastery: 0.70, achievement: 0.55, creation: 0.50, recognition: 0.45, freedom: 0.50, adventure: 0.40 }},
    { key: 'yakushi', name: '약사여래', nameEn: 'Yakushi Nyorai', origin: '불교',
      motivation: { connection: 0.95, security: 0.80, mastery: 0.70, creation: 0.55, achievement: 0.45, recognition: 0.40, freedom: 0.45, adventure: 0.30 }},
  ],
  guardian: [
    { key: 'heimdall', name: '헤임달', nameEn: 'Heimdall', origin: '북유럽 신화',
      motivation: { security: 0.95, achievement: 0.70, mastery: 0.75, connection: 0.65, recognition: 0.55, freedom: 0.40, creation: 0.35, adventure: 0.45 }},
    { key: 'hestia', name: '헤스티아', nameEn: 'Hestia', origin: '그리스 신화',
      motivation: { security: 0.90, connection: 0.85, creation: 0.55, mastery: 0.50, achievement: 0.40, recognition: 0.35, freedom: 0.40, adventure: 0.25 }},
    { key: 'jizo', name: '지장보살', nameEn: 'Jizo', origin: '불교',
      motivation: { security: 0.85, connection: 0.95, mastery: 0.60, creation: 0.50, achievement: 0.40, recognition: 0.35, freedom: 0.40, adventure: 0.30 }},
    { key: 'anubis', name: '아누비스', nameEn: 'Anubis', origin: '이집트 신화',
      motivation: { security: 0.95, mastery: 0.80, connection: 0.60, achievement: 0.55, recognition: 0.50, creation: 0.40, freedom: 0.35, adventure: 0.45 }},
    { key: 'zhong_kui', name: '종규', nameEn: 'Zhong Kui', origin: '중국',
      motivation: { security: 0.90, achievement: 0.75, connection: 0.60, recognition: 0.65, mastery: 0.55, freedom: 0.45, creation: 0.35, adventure: 0.40 }},
    { key: 'durga', name: '두르가', nameEn: 'Durga', origin: '인도 신화',
      motivation: { security: 0.85, achievement: 0.85, connection: 0.70, mastery: 0.65, recognition: 0.60, freedom: 0.55, creation: 0.50, adventure: 0.50 }},
  ],
  rebel: [
    { key: 'prometheus', name: '프로메테우스', nameEn: 'Prometheus', origin: '그리스 신화',
      motivation: { freedom: 0.95, creation: 0.85, connection: 0.75, mastery: 0.65, achievement: 0.60, recognition: 0.55, adventure: 0.70, security: 0.15 }},
    { key: 'loki', name: '로키', nameEn: 'Loki', origin: '북유럽 신화',
      motivation: { freedom: 0.95, creation: 0.80, adventure: 0.85, mastery: 0.60, recognition: 0.65, achievement: 0.55, connection: 0.45, security: 0.20 }},
    { key: 'sun_wukong', name: '손오공', nameEn: 'Sun Wukong', origin: '중국',
      motivation: { freedom: 0.95, adventure: 0.95, achievement: 0.80, mastery: 0.75, recognition: 0.70, creation: 0.55, connection: 0.60, security: 0.15 }},
    { key: 'maui', name: '마우이', nameEn: 'Maui', origin: '폴리네시아',
      motivation: { freedom: 0.90, adventure: 0.90, creation: 0.75, achievement: 0.80, recognition: 0.75, connection: 0.65, mastery: 0.60, security: 0.25 }},
    { key: 'eris', name: '에리스', nameEn: 'Eris', origin: '그리스 신화',
      motivation: { freedom: 0.95, creation: 0.65, adventure: 0.75, recognition: 0.80, achievement: 0.60, mastery: 0.50, connection: 0.35, security: 0.15 }},
    { key: 'lucifer', name: '루시퍼', nameEn: 'Lucifer', origin: '기독교',
      motivation: { freedom: 0.95, recognition: 0.85, achievement: 0.75, mastery: 0.65, creation: 0.55, adventure: 0.50, connection: 0.25, security: 0.10 }},
  ],
  explorer: [
    { key: 'odysseus', name: '오디세우스', nameEn: 'Odysseus', origin: '그리스 신화',
      motivation: { adventure: 0.90, mastery: 0.85, achievement: 0.75, freedom: 0.70, connection: 0.80, security: 0.55, recognition: 0.60, creation: 0.40 }},
    { key: 'gilgamesh', name: '길가메시', nameEn: 'Gilgamesh', origin: '메소포타미아',
      motivation: { adventure: 0.90, achievement: 0.90, mastery: 0.70, freedom: 0.65, connection: 0.75, recognition: 0.80, creation: 0.45, security: 0.35 }},
    { key: 'xuanzang', name: '삼장법사', nameEn: 'Xuanzang', origin: '중국',
      motivation: { adventure: 0.80, mastery: 0.90, connection: 0.70, achievement: 0.70, freedom: 0.50, recognition: 0.50, creation: 0.55, security: 0.45 }},
    { key: 'hermes', name: '헤르메스', nameEn: 'Hermes', origin: '그리스 신화',
      motivation: { adventure: 0.90, freedom: 0.85, mastery: 0.65, connection: 0.60, achievement: 0.55, creation: 0.50, recognition: 0.50, security: 0.30 }},
    { key: 'marco_polo', name: '마르코 폴로', nameEn: 'Marco Polo', origin: '베네치아',
      motivation: { adventure: 0.95, achievement: 0.80, mastery: 0.65, freedom: 0.75, recognition: 0.70, creation: 0.55, connection: 0.50, security: 0.25 }},
    { key: 'ibn_battuta', name: '이븐 바투타', nameEn: 'Ibn Battuta', origin: '모로코',
      motivation: { adventure: 0.95, mastery: 0.75, connection: 0.70, freedom: 0.80, achievement: 0.65, recognition: 0.55, creation: 0.45, security: 0.30 }},
  ],
};

// ============================================
// 코사인 유사도 계산
// ============================================

function weightedSimilarity(
  userMotives: Record<string, number>,
  figureMotives: Record<string, number>
): number {
  const motives = [
    'achievement', 'mastery', 'creation', 'recognition',
    'connection', 'security', 'freedom', 'adventure'
  ];
  
  let totalDiff = 0;
  let maxPossibleDiff = 0;
  
  for (const motive of motives) {
    const userVal = userMotives[motive] || 50;
    const figureVal = (figureMotives[motive] || 0.5) * 100;
    
    const diff = Math.abs(userVal - figureVal);
    totalDiff += diff;
    maxPossibleDiff += 100;
  }
  
  const rawSimilarity = 1 - (totalDiff / maxPossibleDiff);
  const scaledSimilarity = 30 + (rawSimilarity * 70);
  
  return Math.round(scaledSimilarity * 10) / 10;
}

// ============================================
// 원형 매칭 (Full 버전)
// ============================================

function matchArchetypeFull(motivation: UserMotivation): ArchetypeMatch[] {
  const results: ArchetypeMatch[] = [];

  for (const archetype of ARCHETYPES) {
    let score = 0;
    const weights = ARCHETYPE_WEIGHTS[archetype];
    const conditions = ARCHETYPE_CONDITIONS[archetype];

    // 1. 가중치 기반 점수 계산
    for (const [motive, weight] of Object.entries(weights)) {
      const userValue = motivation[motive as MotiveSource] || 0;
      score += (userValue / 100) * (weight as number) * 100;
    }

    // 2. 조건 보너스/패널티
    let conditionBonus = 0;

    if (conditions.primary) {
      const userVal = motivation[conditions.primary.motive];
      if (userVal >= conditions.primary.min) {
        conditionBonus += 10;
      } else {
        conditionBonus -= 15;
      }
    }

    if (conditions.secondary) {
      const userVal = motivation[conditions.secondary.motive];
      if (userVal >= conditions.secondary.min) {
        conditionBonus += 5;
      }
    }

    if (conditions.exclude) {
      const userVal = motivation[conditions.exclude.motive];
      if (userVal > conditions.exclude.max) {
        conditionBonus -= 15;
      }
    }

    score = Math.min(100, Math.max(0, score + conditionBonus));

    results.push({
      archetype,
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

// ============================================
// 신화 인물 매칭 (Full 버전)
// ============================================

function matchFigureFull(
  motivation: UserMotivation,
  archetype: Archetype
): FigureMatch[] {
  const figures = FIGURE_PROFILES[archetype];
  const results: FigureMatch[] = [];

  for (const figure of figures) {
    const similarity = weightedSimilarity(motivation, figure.motivation);

    results.push({
      figure: figure.key,
      figureName: figure.name,
      figureNameEn: figure.nameEn,
      origin: figure.origin,
      similarity: Math.round(similarity * 100 * 10) / 10,
      rank: 0,
    });
  }

  results.sort((a, b) => b.similarity - a.similarity);
  results.forEach((r, i) => r.rank = i + 1);

  return results;
}

// ============================================
// Full 버전 결과 타입
// ============================================

export interface FullResult {
  version: 'full';
  questionCount: number;
  nickname?: string;  // 🆕 이 줄 추가!

  
  // 핵심 점수 (Lite와 동일)
  motiveScores: MotiveScore[];
  ignitionScores: IgnitionScore[];
  directionScores: DirectionScore[];
  operationScores: OperationScore[];
  
  // 원형 매칭
  primaryArchetype: ArchetypeMatch & { emoji: string };
  secondaryArchetype: ArchetypeMatch & { emoji: string };
  allArchetypes: ArchetypeMatch[];
  
  // 신화 인물 (Top 3)
  primaryFigure: FigureMatch;
  topFigures: FigureMatch[];
  
  // 🆕 Full 전용 상세 분석
  energy: EnergyScore;
  conflicts: ConflictScore[];
  contextShifts: ContextScore[];
  hiddenMotives: HiddenMotiveScore;
  
  // 성숙도 (상세)
  maturity: MaturityScore;
  
  // 검증
  validation: ValidationScore;
  
  // 메타데이터
  completedAt: Date;
  totalTimeMs: number;
}

// ============================================
// Full 버전 점수 계산
// ============================================

export function calculateFullScores(answers: Answer[]): FullResult {
  initFullVersion();
  
  // 전체 점수 계산
  const allScores = calculateAllScores(answers);
  
  // UserMotivation 객체 생성
  const motivation: UserMotivation = {} as UserMotivation;
  for (const score of allScores.motive) {
    motivation[score.motive] = score.score;
  }
  
  // 원형 매칭
  const archetypeMatches = matchArchetypeFull(motivation);
  const primaryArchetype = {
    ...archetypeMatches[0],
    emoji: ARCHETYPE_NAMES[archetypeMatches[0].archetype as Archetype].emoji,
  };
  const secondaryArchetype = {
    ...archetypeMatches[1],
    emoji: ARCHETYPE_NAMES[archetypeMatches[1].archetype as Archetype].emoji,
  };
  
  // 신화 인물 매칭 (1위 원형 기준)
  const figureMatches = matchFigureFull(motivation, archetypeMatches[0].archetype as Archetype);
  
  // 응답 시간 계산
  const totalTimeMs = answers.reduce((sum, a) => sum + a.responseTimeMs, 0);
  
  return {
    version: 'full',
    questionCount: answers.length,
    
    motiveScores: allScores.motive,
    ignitionScores: allScores.ignition,
    directionScores: allScores.direction,
    operationScores: allScores.operation,
    
    primaryArchetype,
    secondaryArchetype,
    allArchetypes: archetypeMatches,
    
    primaryFigure: figureMatches[0],
    topFigures: figureMatches.slice(0, 3),
    
    // Full 전용
    energy: allScores.energy,
    conflicts: allScores.conflict,
    contextShifts: allScores.context,
    hiddenMotives: allScores.hidden,
    
    maturity: allScores.maturity,
    validation: allScores.validation,
    
    completedAt: new Date(),
    totalTimeMs,
  };
}

// ============================================
// Full 문항 가져오기
// ============================================

export function getFullQuestions() {
  return {
    questions: ALL_QUESTIONS,
    stats: QUESTION_STATS,
    estimatedTime: '25-30분',
  };
}

// ============================================
// 원형 정보 가져오기
// ============================================

export function getArchetypeInfo(archetype: Archetype) {
  return {
    ...ARCHETYPE_NAMES[archetype],
    weights: ARCHETYPE_WEIGHTS[archetype],
    conditions: ARCHETYPE_CONDITIONS[archetype],
    figures: FIGURE_PROFILES[archetype],
  };
}

export function getAllArchetypeNames() {
  return ARCHETYPE_NAMES;
}

export default {
  initFullVersion,
  calculateFullScores,
  getFullQuestions,
  getArchetypeInfo,
  getAllArchetypeNames,
};
