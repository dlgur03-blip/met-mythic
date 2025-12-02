/**
 * MET Mythic v2.0 — 통합 계산 엔진
 * 
 * scoring_functions.ts + sync_calculator.ts 통합
 */

import type {
  MotiveSource,
  IgnitionCondition,
  Archetype,
  OperationAxis,
  MaturityLevel,
  UserMotivation,
  UserIgnition,
  UserProfile,
  MotiveScore,
  IgnitionScore,
  DirectionScore,
  OperationScore,
  ArchetypeMatch,
  FigureMatch,
  LevelResult,
  SyncResult,
  Answer,
} from './types';

// ============================================
// 상수 정의 (Constants)
// ============================================

export const MOTIVE_SOURCES: MotiveSource[] = [
  'achievement', 'mastery', 'creation', 'recognition',
  'connection', 'security', 'freedom', 'adventure'
];

export const IGNITION_CONDITIONS: IgnitionCondition[] = [
  'competition', 'complexity', 'deadline', 
  'audience', 'autonomy', 'crisis'
];

export const ARCHETYPES: Archetype[] = [
  'conqueror', 'sage', 'creator', 'sovereign',
  'healer', 'guardian', 'rebel', 'explorer'
];

/** 원형 한글/영문명 */
export const ARCHETYPE_NAMES: Record<Archetype, { ko: string; en: string }> = {
  conqueror: { ko: '정복자', en: 'The Conqueror' },
  sage:      { ko: '현자', en: 'The Sage' },
  creator:   { ko: '창조자', en: 'The Creator' },
  sovereign: { ko: '군주', en: 'The Sovereign' },
  healer:    { ko: '치유자', en: 'The Healer' },
  guardian:  { ko: '수호자', en: 'The Guardian' },
  rebel:     { ko: '반역자', en: 'The Rebel' },
  explorer:  { ko: '탐험가', en: 'The Explorer' },
};

/** 원형별 동기 가중치 */
export const ARCHETYPE_WEIGHTS: Record<Archetype, Partial<Record<MotiveSource, number>>> = {
  conqueror: { achievement: 0.55, freedom: 0.25, mastery: 0.20 },
  sage:      { mastery: 0.55, achievement: 0.25, connection: 0.20 },
  creator:   { creation: 0.55, mastery: 0.25, freedom: 0.20 },
  sovereign: { recognition: 0.55, achievement: 0.25, security: 0.20 },
  healer:    { connection: 0.55, security: 0.25, creation: 0.20 },
  guardian:  { security: 0.55, connection: 0.25, achievement: 0.20 },
  rebel:     { freedom: 0.55, creation: 0.25, adventure: 0.20 },
  explorer:  { adventure: 0.55, freedom: 0.25, mastery: 0.20 },
};

/** 원형 일치 조건 */
export const ARCHETYPE_CONDITIONS: Record<Archetype, {
  primary: { motive: MotiveSource; min: number };
  secondary?: { motive: MotiveSource; min: number };
  exclude?: { motive: MotiveSource; max: number };
  compare?: { motive: MotiveSource; greaterThan: MotiveSource };
}> = {
  conqueror: {
    primary: { motive: 'achievement', min: 65 },
    secondary: { motive: 'freedom', min: 50 },
    exclude: { motive: 'security', max: 60 },
  },
  sage: {
    primary: { motive: 'mastery', min: 65 },
    secondary: { motive: 'achievement', min: 40 },
    exclude: { motive: 'adventure', max: 60 },
  },
  creator: {
    primary: { motive: 'creation', min: 65 },
    secondary: { motive: 'freedom', min: 50 },
    compare: { motive: 'creation', greaterThan: 'security' },
  },
  sovereign: {
    primary: { motive: 'recognition', min: 60 },
    secondary: { motive: 'achievement', min: 50 },
    compare: { motive: 'recognition', greaterThan: 'connection' },
  },
  healer: {
    primary: { motive: 'connection', min: 65 },
    secondary: { motive: 'security', min: 40 },
    compare: { motive: 'connection', greaterThan: 'recognition' },
  },
  guardian: {
    primary: { motive: 'security', min: 65 },
    secondary: { motive: 'connection', min: 40 },
    compare: { motive: 'security', greaterThan: 'adventure' },
  },
  rebel: {
    primary: { motive: 'freedom', min: 65 },
    exclude: { motive: 'security', max: 45 },
    compare: { motive: 'freedom', greaterThan: 'security' },
  },
  explorer: {
    primary: { motive: 'adventure', min: 65 },
    secondary: { motive: 'freedom', min: 50 },
    compare: { motive: 'adventure', greaterThan: 'security' },
  },
};

/** 신화 인물 프로파일 (원형별 6명) */
export const FIGURE_PROFILES: Record<Archetype, Array<{
  key: string;
  name: string;
  nameEn: string;
  origin: string;
  motivation: Record<MotiveSource, number>;  // 0-1 정규화 값
}>> = {
  conqueror: [
    { key: 'ares', name: '아레스', nameEn: 'Ares', origin: '그리스',
      motivation: { achievement: 0.95, freedom: 0.60, mastery: 0.50, adventure: 0.55, connection: 0.25, security: 0.15, recognition: 0.70, creation: 0.10 }},
    { key: 'thor', name: '토르', nameEn: 'Thor', origin: '북유럽',
      motivation: { achievement: 0.85, freedom: 0.55, mastery: 0.60, adventure: 0.70, connection: 0.65, security: 0.50, recognition: 0.60, creation: 0.20 }},
    { key: 'xiangyu', name: '항우', nameEn: 'Xiang Yu', origin: '중국',
      motivation: { achievement: 0.95, freedom: 0.70, mastery: 0.55, adventure: 0.50, connection: 0.60, security: 0.20, recognition: 0.90, creation: 0.15 }},
    { key: 'indra', name: '인드라', nameEn: 'Indra', origin: '인도',
      motivation: { achievement: 0.85, freedom: 0.55, mastery: 0.65, adventure: 0.60, connection: 0.40, security: 0.45, recognition: 0.80, creation: 0.25 }},
    { key: 'heracles', name: '헤라클레스', nameEn: 'Heracles', origin: '그리스',
      motivation: { achievement: 0.90, freedom: 0.50, mastery: 0.70, adventure: 0.75, connection: 0.55, security: 0.30, recognition: 0.85, creation: 0.20 }},
    { key: 'cuchulain', name: '쿠훌린', nameEn: 'Cú Chulainn', origin: '켈트',
      motivation: { achievement: 0.90, freedom: 0.65, mastery: 0.80, adventure: 0.70, connection: 0.60, security: 0.25, recognition: 0.85, creation: 0.15 }},
  ],
  sage: [
    { key: 'zhuge', name: '제갈량', nameEn: 'Zhuge Liang', origin: '중국',
      motivation: { mastery: 0.95, achievement: 0.80, connection: 0.70, creation: 0.65, security: 0.50, recognition: 0.60, freedom: 0.35, adventure: 0.25 }},
    { key: 'athena', name: '아테나', nameEn: 'Athena', origin: '그리스',
      motivation: { mastery: 0.90, achievement: 0.85, recognition: 0.60, creation: 0.50, security: 0.55, connection: 0.45, freedom: 0.40, adventure: 0.30 }},
    { key: 'odin', name: '오딘', nameEn: 'Odin', origin: '북유럽',
      motivation: { mastery: 0.95, freedom: 0.70, adventure: 0.65, achievement: 0.60, recognition: 0.55, creation: 0.50, security: 0.25, connection: 0.40 }},
    { key: 'ganesha', name: '가네샤', nameEn: 'Ganesha', origin: '인도',
      motivation: { mastery: 0.85, security: 0.70, creation: 0.60, connection: 0.55, achievement: 0.50, recognition: 0.40, freedom: 0.35, adventure: 0.30 }},
    { key: 'thoth', name: '토트', nameEn: 'Thoth', origin: '이집트',
      motivation: { mastery: 0.95, creation: 0.75, security: 0.60, achievement: 0.55, recognition: 0.35, connection: 0.40, freedom: 0.45, adventure: 0.30 }},
    { key: 'saraswati', name: '사라스와티', nameEn: 'Saraswati', origin: '인도',
      motivation: { mastery: 0.90, creation: 0.85, freedom: 0.50, connection: 0.45, achievement: 0.40, recognition: 0.35, security: 0.30, adventure: 0.40 }},
  ],
  creator: [
    { key: 'hephaestus', name: '헤파이스토스', nameEn: 'Hephaestus', origin: '그리스',
      motivation: { creation: 0.95, mastery: 0.85, security: 0.50, achievement: 0.60, recognition: 0.40, connection: 0.35, freedom: 0.45, adventure: 0.25 }},
    { key: 'prometheus', name: '프로메테우스', nameEn: 'Prometheus', origin: '그리스',
      motivation: { creation: 0.90, freedom: 0.85, connection: 0.70, mastery: 0.65, achievement: 0.55, recognition: 0.50, adventure: 0.45, security: 0.15 }},
    { key: 'nuwa', name: '여와', nameEn: 'Nüwa', origin: '중국',
      motivation: { creation: 0.95, connection: 0.80, security: 0.65, mastery: 0.60, achievement: 0.50, recognition: 0.45, freedom: 0.40, adventure: 0.35 }},
    { key: 'brahma', name: '브라흐마', nameEn: 'Brahma', origin: '인도',
      motivation: { creation: 0.95, mastery: 0.75, freedom: 0.50, achievement: 0.45, security: 0.40, recognition: 0.35, connection: 0.55, adventure: 0.30 }},
    { key: 'ptah', name: '프타', nameEn: 'Ptah', origin: '이집트',
      motivation: { creation: 0.90, mastery: 0.85, security: 0.65, achievement: 0.55, connection: 0.50, recognition: 0.40, freedom: 0.35, adventure: 0.25 }},
    { key: 'daedalus', name: '다이달로스', nameEn: 'Daedalus', origin: '그리스',
      motivation: { creation: 0.90, mastery: 0.90, freedom: 0.70, achievement: 0.65, adventure: 0.55, connection: 0.50, security: 0.35, recognition: 0.45 }},
  ],
  sovereign: [
    { key: 'zeus', name: '제우스', nameEn: 'Zeus', origin: '그리스',
      motivation: { recognition: 0.95, achievement: 0.85, security: 0.70, freedom: 0.60, mastery: 0.55, connection: 0.50, creation: 0.30, adventure: 0.40 }},
    { key: 'odin_sov', name: '오딘', nameEn: 'Odin', origin: '북유럽',
      motivation: { recognition: 0.85, mastery: 0.90, achievement: 0.75, freedom: 0.65, adventure: 0.60, security: 0.50, creation: 0.45, connection: 0.40 }},
    { key: 'jade_emperor', name: '옥황상제', nameEn: 'Jade Emperor', origin: '중국',
      motivation: { recognition: 0.90, security: 0.85, achievement: 0.70, connection: 0.60, mastery: 0.55, freedom: 0.35, creation: 0.30, adventure: 0.20 }},
    { key: 'ra', name: '라', nameEn: 'Ra', origin: '이집트',
      motivation: { recognition: 0.95, achievement: 0.80, security: 0.75, creation: 0.60, mastery: 0.55, connection: 0.45, freedom: 0.40, adventure: 0.35 }},
    { key: 'amaterasu', name: '아마테라스', nameEn: 'Amaterasu', origin: '일본',
      motivation: { recognition: 0.85, connection: 0.75, security: 0.70, creation: 0.55, achievement: 0.60, mastery: 0.50, freedom: 0.40, adventure: 0.30 }},
    { key: 'marduk', name: '마르둑', nameEn: 'Marduk', origin: '메소포타미아',
      motivation: { recognition: 0.90, achievement: 0.90, security: 0.65, mastery: 0.60, creation: 0.55, freedom: 0.50, connection: 0.45, adventure: 0.40 }},
  ],
  healer: [
    { key: 'guanyin', name: '관음', nameEn: 'Guanyin', origin: '중국/불교',
      motivation: { connection: 0.95, security: 0.70, creation: 0.50, mastery: 0.55, recognition: 0.35, achievement: 0.40, freedom: 0.45, adventure: 0.25 }},
    { key: 'asclepius', name: '아스클레피오스', nameEn: 'Asclepius', origin: '그리스',
      motivation: { connection: 0.85, mastery: 0.80, security: 0.65, achievement: 0.60, creation: 0.45, recognition: 0.50, freedom: 0.35, adventure: 0.30 }},
    { key: 'brigid', name: '브리기드', nameEn: 'Brigid', origin: '켈트',
      motivation: { connection: 0.80, creation: 0.75, security: 0.60, mastery: 0.55, freedom: 0.50, achievement: 0.45, recognition: 0.40, adventure: 0.35 }},
    { key: 'isis', name: '이시스', nameEn: 'Isis', origin: '이집트',
      motivation: { connection: 0.90, mastery: 0.75, security: 0.70, creation: 0.60, achievement: 0.55, recognition: 0.50, freedom: 0.40, adventure: 0.35 }},
    { key: 'yakushi', name: '약사여래', nameEn: 'Yakushi', origin: '불교',
      motivation: { connection: 0.90, security: 0.75, mastery: 0.70, creation: 0.45, achievement: 0.40, recognition: 0.35, freedom: 0.30, adventure: 0.25 }},
    { key: 'eir', name: '에이르', nameEn: 'Eir', origin: '북유럽',
      motivation: { connection: 0.85, mastery: 0.80, security: 0.60, freedom: 0.55, achievement: 0.50, creation: 0.45, recognition: 0.40, adventure: 0.35 }},
  ],
  guardian: [
    { key: 'heimdall', name: '헤임달', nameEn: 'Heimdall', origin: '북유럽',
      motivation: { security: 0.95, connection: 0.65, achievement: 0.60, mastery: 0.70, recognition: 0.50, freedom: 0.30, creation: 0.25, adventure: 0.35 }},
    { key: 'hestia', name: '헤스티아', nameEn: 'Hestia', origin: '그리스',
      motivation: { security: 0.90, connection: 0.80, creation: 0.40, mastery: 0.45, achievement: 0.35, recognition: 0.30, freedom: 0.35, adventure: 0.20 }},
    { key: 'jizo', name: '지장보살', nameEn: 'Jizo', origin: '불교',
      motivation: { security: 0.85, connection: 0.90, mastery: 0.60, creation: 0.40, achievement: 0.35, recognition: 0.30, freedom: 0.35, adventure: 0.25 }},
    { key: 'anubis', name: '아누비스', nameEn: 'Anubis', origin: '이집트',
      motivation: { security: 0.90, mastery: 0.75, connection: 0.60, achievement: 0.55, recognition: 0.50, creation: 0.35, freedom: 0.30, adventure: 0.40 }},
    { key: 'zhong_kui', name: '종규', nameEn: 'Zhong Kui', origin: '중국',
      motivation: { security: 0.90, achievement: 0.70, connection: 0.55, recognition: 0.65, mastery: 0.50, freedom: 0.40, creation: 0.30, adventure: 0.35 }},
    { key: 'durga', name: '두르가', nameEn: 'Durga', origin: '인도',
      motivation: { security: 0.85, achievement: 0.80, connection: 0.70, mastery: 0.60, recognition: 0.55, freedom: 0.50, creation: 0.45, adventure: 0.40 }},
  ],
  rebel: [
    { key: 'prometheus_rebel', name: '프로메테우스', nameEn: 'Prometheus', origin: '그리스',
      motivation: { freedom: 0.95, creation: 0.80, connection: 0.70, mastery: 0.60, achievement: 0.55, recognition: 0.50, adventure: 0.65, security: 0.10 }},
    { key: 'loki', name: '로키', nameEn: 'Loki', origin: '북유럽',
      motivation: { freedom: 0.90, creation: 0.75, adventure: 0.80, mastery: 0.55, recognition: 0.60, achievement: 0.50, connection: 0.40, security: 0.15 }},
    { key: 'sun_wukong', name: '손오공', nameEn: 'Sun Wukong', origin: '중국',
      motivation: { freedom: 0.95, adventure: 0.90, achievement: 0.75, mastery: 0.70, recognition: 0.65, creation: 0.50, connection: 0.55, security: 0.10 }},
    { key: 'maui', name: '마우이', nameEn: 'Maui', origin: '폴리네시아',
      motivation: { freedom: 0.85, adventure: 0.85, creation: 0.70, achievement: 0.75, recognition: 0.70, connection: 0.60, mastery: 0.55, security: 0.20 }},
    { key: 'eris', name: '에리스', nameEn: 'Eris', origin: '그리스',
      motivation: { freedom: 0.90, creation: 0.60, adventure: 0.70, recognition: 0.75, achievement: 0.55, mastery: 0.45, connection: 0.30, security: 0.10 }},
    { key: 'lucifer', name: '루시퍼', nameEn: 'Lucifer', origin: '기독교',
      motivation: { freedom: 0.95, recognition: 0.80, achievement: 0.70, mastery: 0.60, creation: 0.50, adventure: 0.45, connection: 0.20, security: 0.05 }},
  ],
  explorer: [
    { key: 'odysseus', name: '오디세우스', nameEn: 'Odysseus', origin: '그리스',
      motivation: { adventure: 0.85, mastery: 0.80, achievement: 0.70, freedom: 0.60, connection: 0.75, security: 0.50, recognition: 0.55, creation: 0.35 }},
    { key: 'gilgamesh', name: '길가메시', nameEn: 'Gilgamesh', origin: '메소포타미아',
      motivation: { adventure: 0.80, achievement: 0.85, mastery: 0.65, freedom: 0.55, connection: 0.70, recognition: 0.75, creation: 0.40, security: 0.30 }},
    { key: 'xuanzang', name: '삼장법사', nameEn: 'Xuanzang', origin: '중국',
      motivation: { adventure: 0.70, mastery: 0.85, connection: 0.60, achievement: 0.65, freedom: 0.40, recognition: 0.45, creation: 0.50, security: 0.35 }},
    { key: 'hermes', name: '헤르메스', nameEn: 'Hermes', origin: '그리스',
      motivation: { adventure: 0.85, freedom: 0.80, mastery: 0.60, connection: 0.55, achievement: 0.50, creation: 0.40, recognition: 0.45, security: 0.25 }},
    { key: 'exploration_spirit', name: '탐험 정신', nameEn: 'Spirit of Exploration', origin: '대항해시대',
      motivation: { adventure: 0.95, achievement: 0.80, mastery: 0.60, freedom: 0.70, recognition: 0.65, creation: 0.50, connection: 0.40, security: 0.15 }},
    { key: 'inuit_spirit', name: '이누이트 정신', nameEn: 'Inuit Spirit', origin: '북극',
      motivation: { adventure: 0.75, security: 0.70, mastery: 0.80, connection: 0.65, freedom: 0.50, achievement: 0.55, recognition: 0.35, creation: 0.40 }},
  ],
};

/** 레벨명 */
export const LEVEL_NAMES: Record<MaturityLevel, { ko: string; en: string }> = {
  1: { ko: '그림자', en: 'Shadow' },
  2: { ko: '각성', en: 'Awakening' },
  3: { ko: '통합', en: 'Integration' },
  4: { ko: '초월', en: 'Transcendence' },
};

/** 운영 축 라벨 */
export const OPERATION_LABELS: Record<OperationAxis, { left: string; right: string }> = {
  rhythm:   { left: '계획형', right: '즉흥형' },
  recharge: { left: '고독 충전', right: '사회적 충전' },
  release:  { left: '지구력형', right: '폭발형' },
  recovery: { left: '빠른 회복', right: '느린 회복' },
};

// ============================================
// 유틸리티 함수 (Utilities)
// ============================================

/** 소수점 1자리 포맷 */
export function formatScore(value: number): number {
  return Math.round(value * 10) / 10;
}

/** 코사인 유사도 계산 */
export function cosineSimilarity(
  vec1: Record<MotiveSource, number>,
  vec2: Record<MotiveSource, number>
): number {
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (const key of MOTIVE_SOURCES) {
    const v1 = vec1[key] / 100;  // 0-100 → 0-1 정규화
    const v2 = vec2[key];        // 이미 0-1
    
    dotProduct += v1 * v2;
    norm1 += v1 * v1;
    norm2 += v2 * v2;
  }

  if (norm1 === 0 || norm2 === 0) return 0;
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

// ============================================
// 점수 계산 함수 (Score Calculations)
// ============================================

// question_scorer.ts에서 실제 구현 가져오기
export { 
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
  initQuestionMap,
  type EnergyScore,
  type ConflictScore,
  type ContextScore,
  type HiddenMotiveScore,
  type MaturityScore,
  type ValidationScore,
  type AllScores,
} from './question_scorer';

// ============================================
// 원형 매칭 (Archetype Matching)
// ============================================

/** 원형 매칭 */
export function matchArchetype(motivation: UserMotivation): ArchetypeMatch[] {
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

    // primary 조건
    if (conditions.primary) {
      const userVal = motivation[conditions.primary.motive];
      if (userVal >= conditions.primary.min) {
        conditionBonus += 10;
      } else {
        conditionBonus -= 15;
      }
    }

    // secondary 조건
    if (conditions.secondary) {
      const userVal = motivation[conditions.secondary.motive];
      if (userVal >= conditions.secondary.min) {
        conditionBonus += 5;
      }
    }

    // exclude 조건
    if (conditions.exclude) {
      const userVal = motivation[conditions.exclude.motive];
      if (userVal > conditions.exclude.max) {
        conditionBonus -= 15;
      }
    }

    // compare 조건
    if (conditions.compare) {
      const val1 = motivation[conditions.compare.motive];
      const val2 = motivation[conditions.compare.greaterThan];
      if (val1 > val2) {
        conditionBonus += 10;
      } else {
        conditionBonus -= 10;
      }
    }

    score = Math.min(100, Math.max(0, score + conditionBonus));

    results.push({
      archetype,
      archetypeName: ARCHETYPE_NAMES[archetype].ko,
      archetypeNameEn: ARCHETYPE_NAMES[archetype].en,
      score: formatScore(score),
      rank: 0,
    });
  }

  // 순위 정렬
  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => r.rank = i + 1);

  return results;
}

/** 신화 인물 매칭 */
export function matchFigure(
  motivation: UserMotivation,
  archetype: Archetype
): FigureMatch[] {
  const figures = FIGURE_PROFILES[archetype];
  const results: FigureMatch[] = [];

  for (const figure of figures) {
    const similarity = cosineSimilarity(motivation, figure.motivation);

    results.push({
      figure: figure.key,
      figureName: figure.name,
      figureNameEn: figure.nameEn,
      origin: figure.origin,
      similarity: formatScore(similarity * 100),
      rank: 0,
    });
  }

  results.sort((a, b) => b.similarity - a.similarity);
  results.forEach((r, i) => r.rank = i + 1);

  return results;
}

/** 레벨 판정 */
export function determineLevel(
  archetype: Archetype,
  figureKey: string,
  maturitySignals: string[]
): LevelResult {
  // 기본 Lv2 반환 (실제 구현에서는 마크다운 파싱 또는 신호 매칭)
  // 마크다운에서 레벨 정보를 읽어와야 정확한 판정 가능
  
  return {
    level: 2,
    levelName: LEVEL_NAMES[2].ko,
    confidence: 65,
    signalMatches: [],
    nextLevelHint: null,
  };
}

// ============================================
// 종합 싱크로율 계산 (Sync Calculation)
// ============================================

/** 전체 싱크로율 계산 */
export function calculateSyncRate(profile: UserProfile): SyncResult {
  // 1. 원형 매칭
  const archetypeMatches = matchArchetype(profile.motivation);
  const topArchetype = archetypeMatches[0];

  // 2. 인물 매칭
  const figureMatches = matchFigure(profile.motivation, topArchetype.archetype);
  const topFigure = figureMatches[0];

  // 3. 레벨 판정
  const levelResult = determineLevel(
    topArchetype.archetype,
    topFigure.figure,
    profile.maturitySignals
  );

  // 4. 종합 싱크로율
  // 원형점수 40% + 인물유사도 40% + 레벨신뢰도 20%
  const overallSync = formatScore(
    topArchetype.score * 0.4 +
    topFigure.similarity * 0.4 +
    levelResult.confidence * 0.2
  );

  return {
    archetype: topArchetype,
    figure: topFigure,
    level: levelResult,
    overallSync,
    allArchetypes: archetypeMatches,
    allFigures: figureMatches,
  };
}

// ============================================
// 마크다운 섹션 추출 (Section Extraction)
// ============================================

/** 인물 섹션 추출 */
export function extractFigureSection(
  markdown: string,
  figureName: string
): string | null {
  // 인물 섹션 시작: ## 신화 인물 N: 인물명
  const pattern = new RegExp(
    `## 신화 인물 \\d+: ${figureName}[\\s\\S]*?(?=## 신화 인물 \\d+:|## 원형 내 인물 비교표|$)`,
    'i'
  );
  
  const match = markdown.match(pattern);
  return match ? match[0].trim() : null;
}

/** 레벨 섹션 추출 */
export function extractLevelSection(
  markdown: string,
  figureName: string,
  level: MaturityLevel
): string | null {
  const figureSection = extractFigureSection(markdown, figureName);
  if (!figureSection) return null;

  const levelNames: Record<MaturityLevel, string> = {
    1: '그림자',
    2: '각성',
    3: '통합',
    4: '초월',
  };

  const levelPattern = new RegExp(
    `### Lv${level}: ${levelNames[level]}[\\s\\S]*?(?=### Lv\\d|### 레벨 진화|$)`,
    'i'
  );

  const match = figureSection.match(levelPattern);
  return match ? match[0].trim() : null;
}

// ============================================
// Export
// ============================================

export default {
  // 상수
  MOTIVE_SOURCES,
  IGNITION_CONDITIONS,
  ARCHETYPES,
  ARCHETYPE_NAMES,
  ARCHETYPE_WEIGHTS,
  FIGURE_PROFILES,
  LEVEL_NAMES,
  
  // 계산 함수
  matchArchetype,
  matchFigure,
  determineLevel,
  calculateSyncRate,
  
  // 유틸리티
  formatScore,
  cosineSimilarity,
  extractFigureSection,
  extractLevelSection,
};
