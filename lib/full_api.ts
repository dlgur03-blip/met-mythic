/**
 * MET Mythic v5.0 — Full Version API (Maximum Enhancement)
 * 
 * 🔥 추가된 인물 관련 강화:
 * - #9 그림자 원형
 * - #11 인물 클러스터
 * - #12 반대 인물 매칭 (하위 5명)
 * - #13 인물 조합 분석
 * - #14 성장 경로 인물
 * - #15 인물별 조언
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
  type MetacognitionScore,
  type ResponseTimeScore,
  type ReliabilityScore,
  type ConfidenceMap,
  type UniquenessScore,
  type ExtremePatternAnalysis,
  type MotiveDevelopmentStage,
  type ConflictMap,
  type ConsistencyBreakdown,
  type ConfidenceInterval,
  type MotiveEvolutionPrediction,
  type DevelopmentSuggestion,
  type ReverseItemValidation,
  type MotiveCorrelationValidation,
  type SocialDesirabilityCorrection,
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
// 초기화
// ============================================

let isInitialized = false;

export function initFullVersion(): void {
  if (!isInitialized) {
    initQuestionMap(ALL_QUESTIONS);
    isInitialized = true;
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ============================================
// 원형 데이터
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

// 🆕 #9 그림자 원형 매핑
const SHADOW_ARCHETYPES: Record<Archetype, {
  shadow: Archetype;
  description: string;
  risk: string;
}> = {
  conqueror: { 
    shadow: 'healer', 
    description: '정복자의 그림자는 치유자입니다. 타인과의 연결, 취약함의 수용을 억압합니다.',
    risk: '관계에서의 고립, 번아웃'
  },
  sage: { 
    shadow: 'rebel', 
    description: '현자의 그림자는 반역자입니다. 자발성, 감정적 자유를 억압합니다.',
    risk: '지식에 갇힌 삶, 감정적 단절'
  },
  creator: { 
    shadow: 'guardian', 
    description: '창조자의 그림자는 수호자입니다. 안정, 현실적 기반을 억압합니다.',
    risk: '불안정한 삶, 완성 못함'
  },
  sovereign: { 
    shadow: 'explorer', 
    description: '군주의 그림자는 탐험가입니다. 모험, 새로운 가능성 탐색을 억압합니다.',
    risk: '권위주의, 정체'
  },
  healer: { 
    shadow: 'conqueror', 
    description: '치유자의 그림자는 정복자입니다. 자기 주장, 개인적 성취를 억압합니다.',
    risk: '자기 희생, 경계 부족'
  },
  guardian: { 
    shadow: 'creator', 
    description: '수호자의 그림자는 창조자입니다. 혁신, 변화에 대한 수용을 억압합니다.',
    risk: '경직성, 변화 저항'
  },
  rebel: { 
    shadow: 'sage', 
    description: '반역자의 그림자는 현자입니다. 체계, 깊이 있는 지식을 억압합니다.',
    risk: '무질서, 표면적 삶'
  },
  explorer: { 
    shadow: 'sovereign', 
    description: '탐험가의 그림자는 군주입니다. 정착, 책임감을 억압합니다.',
    risk: '뿌리 없음, 관계 불안정'
  },
};

// 🆕 #11 인물 클러스터
const FIGURE_CLUSTERS: Record<string, {
  name: string;
  description: string;
  members: string[];
}> = {
  warriors: {
    name: '전사들',
    description: '목표를 향해 직접 행동하는 인물들',
    members: ['napoleon', 'alexander', 'genghis', 'caesar', 'ares', 'guan_yu', 'durga']
  },
  seekers: {
    name: '탐구자들',
    description: '지식과 진리를 추구하는 인물들',
    members: ['zhuge', 'athena', 'gandalf', 'thoth', 'odin_sage', 'saraswati', 'xuanzang']
  },
  makers: {
    name: '창조자들',
    description: '새로운 것을 만들어내는 인물들',
    members: ['hephaestus', 'daedalus', 'nuwa', 'brahma', 'ptah', 'izanagi']
  },
  rulers: {
    name: '지배자들',
    description: '질서와 권위를 세우는 인물들',
    members: ['zeus', 'jade_emperor', 'odin_king', 'ra', 'indra', 'amaterasu']
  },
  healers: {
    name: '치유자들',
    description: '타인을 돌보고 치유하는 인물들',
    members: ['guanyin', 'asclepius', 'brigid', 'dian_cecht', 'eir', 'yakushi']
  },
  protectors: {
    name: '수호자들',
    description: '지키고 보호하는 인물들',
    members: ['heimdall', 'hestia', 'jizo', 'anubis', 'zhong_kui']
  },
  rebels: {
    name: '반역자들',
    description: '기존 질서에 도전하는 인물들',
    members: ['prometheus', 'loki', 'sun_wukong', 'maui', 'eris', 'lucifer']
  },
  wanderers: {
    name: '방랑자들',
    description: '새로운 세계를 탐험하는 인물들',
    members: ['odysseus', 'gilgamesh', 'hermes', 'marco_polo', 'ibn_battuta']
  },
};

const ARCHETYPE_WEIGHTS: Record<Archetype, Partial<Record<MotiveSource, number>>> = {
  conqueror: { achievement: 0.42, freedom: 0.23, mastery: 0.18, recognition: 0.17 },
  sage:      { mastery: 0.44, achievement: 0.19, creation: 0.21, connection: 0.16 },
  creator:   { creation: 0.45, mastery: 0.24, freedom: 0.18, recognition: 0.13 },
  sovereign: { recognition: 0.39, achievement: 0.26, security: 0.20, connection: 0.15 },
  healer:    { connection: 0.45, security: 0.24, creation: 0.16, mastery: 0.15 },
  guardian:  { security: 0.45, connection: 0.24, achievement: 0.17, mastery: 0.14 },
  rebel:     { freedom: 0.44, creation: 0.24, adventure: 0.21, achievement: 0.11 },
  explorer:  { adventure: 0.45, freedom: 0.24, mastery: 0.19, creation: 0.12 },
};

const ARCHETYPE_CONDITIONS: Record<Archetype, {
  primary?: { motive: MotiveSource; min: number };
  secondary?: { motive: MotiveSource; min: number };
  exclude?: { motive: MotiveSource; max: number };
}> = {
  conqueror: { primary: { motive: 'achievement', min: 65 }, exclude: { motive: 'security', max: 50 } },
  sage:      { primary: { motive: 'mastery', min: 65 }, secondary: { motive: 'creation', min: 50 } },
  creator:   { primary: { motive: 'creation', min: 65 }, secondary: { motive: 'freedom', min: 50 } },
  sovereign: { primary: { motive: 'recognition', min: 60 }, secondary: { motive: 'achievement', min: 55 } },
  healer:    { primary: { motive: 'connection', min: 65 }, secondary: { motive: 'security', min: 50 } },
  guardian:  { primary: { motive: 'security', min: 65 }, secondary: { motive: 'connection', min: 55 } },
  rebel:     { primary: { motive: 'freedom', min: 70 }, exclude: { motive: 'security', max: 40 } },
  explorer:  { primary: { motive: 'adventure', min: 65 }, secondary: { motive: 'freedom', min: 55 } },
};

// 신화 인물 프로필 (48명)
const FIGURE_PROFILES: Record<Archetype, Array<{
  key: string;
  name: string;
  nameEn: string;
  origin: string;
  motivation: Record<MotiveSource, number>;
  traits: string[];
  shadowAspect: string;
  // 🆕 #15 인물별 조언
  strengthAdvice: string;
  shadowAdvice: string;
  growthPath: string;
}>> = {
  conqueror: [
    { key: 'napoleon', name: '나폴레옹', nameEn: 'Napoleon', origin: '프랑스',
      motivation: { achievement: 0.94, freedom: 0.68, mastery: 0.82, recognition: 0.87, connection: 0.38, security: 0.28, creation: 0.52, adventure: 0.73 },
      traits: ['전략적', '야망적', '카리스마'], shadowAspect: '통제욕',
      strengthAdvice: '전략적 사고와 결단력을 활용해 큰 목표를 세우세요.',
      shadowAdvice: '통제하려는 욕구가 관계를 해칠 수 있습니다. 위임하는 법을 배우세요.',
      growthPath: '제갈량(현자)의 지혜를 배워 전략에 깊이를 더하세요.' },
    { key: 'alexander', name: '알렉산더', nameEn: 'Alexander', origin: '그리스',
      motivation: { achievement: 0.96, adventure: 0.92, freedom: 0.76, recognition: 0.78, mastery: 0.68, connection: 0.48, creation: 0.42, security: 0.18 },
      traits: ['대담함', '비전', '정복욕'], shadowAspect: '과대망상',
      strengthAdvice: '대담한 비전을 세우고 다른 사람들을 영감시키세요.',
      shadowAdvice: '끝없는 확장은 번아웃으로 이어집니다. 멈출 줄도 알아야 합니다.',
      growthPath: '오디세우스(탐험가)처럼 귀향의 가치도 알게 되세요.' },
    { key: 'genghis', name: '칭기즈칸', nameEn: 'Genghis Khan', origin: '몽골',
      motivation: { achievement: 0.93, freedom: 0.88, adventure: 0.82, recognition: 0.68, mastery: 0.63, security: 0.52, connection: 0.43, creation: 0.28 },
      traits: ['무자비함', '효율성', '통합력'], shadowAspect: '파괴성',
      strengthAdvice: '효율성과 통합력으로 분산된 자원을 하나로 모으세요.',
      shadowAdvice: '목적이 수단을 정당화하지 않습니다. 파괴 후엔 건설도 필요합니다.',
      growthPath: '헤스티아(수호자)의 따뜻함으로 차가운 효율성의 균형을 잡으세요.' },
    { key: 'caesar', name: '율리우스 카이사르', nameEn: 'Julius Caesar', origin: '로마',
      motivation: { achievement: 0.88, recognition: 0.92, mastery: 0.77, freedom: 0.63, connection: 0.57, adventure: 0.58, security: 0.42, creation: 0.33 },
      traits: ['정치력', '웅변', '결단력'], shadowAspect: '권력욕',
      strengthAdvice: '정치적 감각과 웅변으로 사람들을 설득하세요.',
      shadowAdvice: '권력에 대한 집착은 배신을 부릅니다. 신뢰를 쌓으세요.',
      growthPath: '관음(치유자)의 자비로 권력의 외로움을 달래세요.' },
    { key: 'ares', name: '아레스', nameEn: 'Ares', origin: '그리스 신화',
      motivation: { achievement: 0.88, freedom: 0.82, adventure: 0.87, recognition: 0.68, mastery: 0.58, connection: 0.28, security: 0.18, creation: 0.23 },
      traits: ['용맹', '충동성', '전투력'], shadowAspect: '폭력성',
      strengthAdvice: '용기와 추진력으로 어려운 상황을 돌파하세요.',
      shadowAdvice: '충동적 행동은 후회를 남깁니다. 전투 전 숨을 고르세요.',
      growthPath: '아테나(현자)의 지략을 배워 힘에 지혜를 더하세요.' },
    { key: 'guan_yu', name: '관우', nameEn: 'Guan Yu', origin: '중국',
      motivation: { achievement: 0.83, mastery: 0.92, connection: 0.77, recognition: 0.68, security: 0.62, freedom: 0.53, adventure: 0.48, creation: 0.28 },
      traits: ['의리', '충성', '무예'], shadowAspect: '고집',
      strengthAdvice: '의리와 충성으로 깊은 신뢰를 쌓으세요.',
      shadowAdvice: '고집이 유연성을 막습니다. 때론 물러설 줄도 알아야 합니다.',
      growthPath: '손오공(반역자)의 유연함을 배워 강직함에 변화를 더하세요.' },
  ],
  sage: [
    { key: 'zhuge', name: '제갈량', nameEn: 'Zhuge Liang', origin: '중국',
      motivation: { mastery: 0.96, achievement: 0.78, connection: 0.72, creation: 0.77, recognition: 0.58, security: 0.57, freedom: 0.43, adventure: 0.38 },
      traits: ['지략', '선견지명', '충성'], shadowAspect: '과도한 계산',
      strengthAdvice: '전략적 사고로 복잡한 문제를 해결하세요.',
      shadowAdvice: '모든 것을 계산하려 하면 자발성을 잃습니다.',
      growthPath: '마우이(반역자)의 장난기로 엄격함에 여유를 더하세요.' },
    { key: 'athena', name: '아테나', nameEn: 'Athena', origin: '그리스 신화',
      motivation: { mastery: 0.92, achievement: 0.73, creation: 0.82, recognition: 0.63, security: 0.62, connection: 0.53, freedom: 0.48, adventure: 0.43 },
      traits: ['지혜', '전략', '정의'], shadowAspect: '냉정함',
      strengthAdvice: '지혜와 정의감으로 공정한 판단을 내리세요.',
      shadowAdvice: '냉정함이 관계를 멀게 합니다. 때론 감정도 중요합니다.',
      growthPath: '브리짓(치유자)의 따뜻함으로 지혜에 온기를 더하세요.' },
    { key: 'gandalf', name: '간달프', nameEn: 'Gandalf', origin: '판타지',
      motivation: { mastery: 0.88, connection: 0.77, freedom: 0.72, adventure: 0.67, creation: 0.58, achievement: 0.53, security: 0.38, recognition: 0.43 },
      traits: ['인도자', '희생정신', '신비'], shadowAspect: '은둔',
      strengthAdvice: '인도자로서 다른 이들의 성장을 도우세요.',
      shadowAdvice: '은둔은 때로 회피입니다. 직접 개입해야 할 때도 있습니다.',
      growthPath: '프로메테우스(반역자)처럼 직접 행동하는 용기를 배우세요.' },
    { key: 'thoth', name: '토트', nameEn: 'Thoth', origin: '이집트 신화',
      motivation: { mastery: 0.97, creation: 0.87, achievement: 0.63, recognition: 0.58, security: 0.57, connection: 0.48, freedom: 0.43, adventure: 0.33 },
      traits: ['기록', '마법', '지식'], shadowAspect: '고립',
      strengthAdvice: '지식을 기록하고 전달하는 역할을 맡으세요.',
      shadowAdvice: '지식에 빠져 세상과 단절되지 않도록 하세요.',
      growthPath: '헤르메스(탐험가)처럼 세상 속으로 들어가세요.' },
    { key: 'odin_sage', name: '오딘', nameEn: 'Odin', origin: '북유럽 신화',
      motivation: { mastery: 0.92, achievement: 0.78, freedom: 0.77, adventure: 0.72, recognition: 0.63, creation: 0.58, security: 0.38, connection: 0.48 },
      traits: ['희생', '탐구', '예언'], shadowAspect: '집착',
      strengthAdvice: '지식을 위해 기꺼이 희생하는 자세를 유지하세요.',
      shadowAdvice: '지식에 대한 집착이 중요한 것을 놓치게 합니다.',
      growthPath: '헤스티아(수호자)의 평온함으로 탐구의 갈증을 달래세요.' },
    { key: 'saraswati', name: '사라스와티', nameEn: 'Saraswati', origin: '인도 신화',
      motivation: { mastery: 0.94, creation: 0.92, connection: 0.67, recognition: 0.53, achievement: 0.48, security: 0.48, freedom: 0.57, adventure: 0.38 },
      traits: ['예술', '학문', '순수'], shadowAspect: '현실도피',
      strengthAdvice: '예술과 학문으로 아름다움을 세상에 전하세요.',
      shadowAdvice: '이상에 빠져 현실을 도피하지 마세요.',
      growthPath: '두르가(수호자)의 실천력으로 이상을 현실로 만드세요.' },
  ],
  creator: [
    { key: 'hephaestus', name: '헤파이스토스', nameEn: 'Hephaestus', origin: '그리스 신화',
      motivation: { creation: 0.97, mastery: 0.92, achievement: 0.58, security: 0.57, recognition: 0.48, connection: 0.43, freedom: 0.48, adventure: 0.28 },
      traits: ['장인정신', '인내', '혁신'], shadowAspect: '고독',
      strengthAdvice: '장인정신으로 탁월한 작품을 만들어내세요.',
      shadowAdvice: '작업실에 갇히지 마세요. 사람들과의 교류도 필요합니다.',
      growthPath: '관음(치유자)의 연결로 고독을 달래세요.' },
    { key: 'daedalus', name: '다이달로스', nameEn: 'Daedalus', origin: '그리스 신화',
      motivation: { creation: 0.96, mastery: 0.87, freedom: 0.72, achievement: 0.63, adventure: 0.57, recognition: 0.48, connection: 0.43, security: 0.38 },
      traits: ['발명', '천재성', '비극'], shadowAspect: '오만',
      strengthAdvice: '혁신적 발명으로 불가능을 가능하게 만드세요.',
      shadowAdvice: '창조의 오만함이 비극을 부릅니다. 겸손을 잃지 마세요.',
      growthPath: '지장보살(수호자)의 겸손으로 천재성을 다스리세요.' },
    { key: 'nuwa', name: '여와', nameEn: 'Nüwa', origin: '중국 신화',
      motivation: { creation: 0.94, connection: 0.82, security: 0.72, mastery: 0.67, achievement: 0.53, recognition: 0.48, freedom: 0.43, adventure: 0.33 },
      traits: ['모성', '복원', '희생'], shadowAspect: '과보호',
      strengthAdvice: '창조와 복원으로 세상을 더 나은 곳으로 만드세요.',
      shadowAdvice: '과보호는 성장을 막습니다. 때론 내버려두는 것도 사랑입니다.',
      growthPath: '로키(반역자)의 변화 수용으로 보호 본능의 균형을 잡으세요.' },
    { key: 'brahma', name: '브라흐마', nameEn: 'Brahma', origin: '인도 신화',
      motivation: { creation: 0.96, mastery: 0.82, recognition: 0.67, achievement: 0.58, connection: 0.57, security: 0.53, freedom: 0.48, adventure: 0.38 },
      traits: ['창조', '질서', '지식'], shadowAspect: '무관심',
      strengthAdvice: '큰 그림을 보고 새로운 질서를 창조하세요.',
      shadowAdvice: '창조 후 무관심해지지 마세요. 돌봄도 창조의 일부입니다.',
      growthPath: '에이르(치유자)의 돌봄으로 창조에 따뜻함을 더하세요.' },
    { key: 'ptah', name: '프타', nameEn: 'Ptah', origin: '이집트 신화',
      motivation: { creation: 0.94, mastery: 0.87, achievement: 0.62, security: 0.58, recognition: 0.57, connection: 0.48, freedom: 0.43, adventure: 0.28 },
      traits: ['건축', '언어창조', '장인'], shadowAspect: '완벽주의',
      strengthAdvice: '말과 생각으로 현실을 창조하세요.',
      shadowAdvice: '완벽주의가 완성을 막습니다. 불완전함도 받아들이세요.',
      growthPath: '마우이(반역자)의 즉흥성으로 완벽주의를 완화하세요.' },
    { key: 'izanagi', name: '이자나기', nameEn: 'Izanagi', origin: '일본 신화',
      motivation: { creation: 0.88, connection: 0.77, security: 0.67, mastery: 0.62, achievement: 0.57, recognition: 0.48, freedom: 0.48, adventure: 0.47 },
      traits: ['시작', '정화', '책임'], shadowAspect: '상실감',
      strengthAdvice: '새로운 시작을 두려워하지 마세요.',
      shadowAdvice: '과거의 상실에 갇히지 마세요. 앞으로 나아가야 합니다.',
      growthPath: '길가메시(탐험가)처럼 상실을 성장의 동력으로 만드세요.' },
  ],
  sovereign: [
    { key: 'zeus', name: '제우스', nameEn: 'Zeus', origin: '그리스 신화',
      motivation: { recognition: 0.96, achievement: 0.87, freedom: 0.72, security: 0.67, mastery: 0.58, connection: 0.57, adventure: 0.48, creation: 0.38 },
      traits: ['권위', '정의', '힘'], shadowAspect: '독선',
      strengthAdvice: '정의로운 리더십으로 질서를 세우세요.',
      shadowAdvice: '독선은 반발을 부릅니다. 다른 목소리에도 귀 기울이세요.',
      growthPath: '헤르메스(탐험가)의 유연함으로 권위에 소통을 더하세요.' },
    { key: 'jade_emperor', name: '옥황상제', nameEn: 'Jade Emperor', origin: '중국 신화',
      motivation: { recognition: 0.92, security: 0.87, achievement: 0.77, mastery: 0.67, connection: 0.62, creation: 0.43, freedom: 0.38, adventure: 0.28 },
      traits: ['질서', '공정', '인내'], shadowAspect: '관료주의',
      strengthAdvice: '공정한 질서로 모든 것이 제자리를 찾게 하세요.',
      shadowAdvice: '관료주의는 생명력을 죽입니다. 융통성을 가지세요.',
      growthPath: '손오공(반역자)의 활력으로 관료주의를 깨세요.' },
    { key: 'odin_king', name: '오딘', nameEn: 'Odin', origin: '북유럽 신화',
      motivation: { recognition: 0.87, mastery: 0.92, achievement: 0.82, freedom: 0.72, adventure: 0.67, security: 0.57, creation: 0.48, connection: 0.43 },
      traits: ['지혜', '전쟁', '마법'], shadowAspect: '기만',
      strengthAdvice: '지혜로운 리더십과 전략으로 이끄세요.',
      shadowAdvice: '기만은 신뢰를 무너뜨립니다. 솔직함이 더 강합니다.',
      growthPath: '헤스티아(수호자)의 진실함으로 기만의 유혹을 이기세요.' },
    { key: 'ra', name: '라', nameEn: 'Ra', origin: '이집트 신화',
      motivation: { recognition: 0.94, achievement: 0.82, security: 0.77, mastery: 0.72, creation: 0.62, connection: 0.48, freedom: 0.43, adventure: 0.38 },
      traits: ['태양', '창조', '질서'], shadowAspect: '노쇠',
      strengthAdvice: '빛처럼 존재감으로 어둠을 밝히세요.',
      shadowAdvice: '영원히 정점에 있을 수 없습니다. 물러날 때를 아세요.',
      growthPath: '아누비스(수호자)처럼 전환을 자연스럽게 받아들이세요.' },
    { key: 'indra', name: '인드라', nameEn: 'Indra', origin: '인도 신화',
      motivation: { recognition: 0.88, achievement: 0.87, adventure: 0.72, freedom: 0.67, mastery: 0.62, security: 0.57, connection: 0.43, creation: 0.38 },
      traits: ['전사', '비', '용기'], shadowAspect: '방탕',
      strengthAdvice: '용기와 힘으로 장애물을 제거하세요.',
      shadowAdvice: '승리 후의 방탕은 몰락의 시작입니다. 절제하세요.',
      growthPath: '삼장법사(탐험가)의 절제로 힘을 다스리세요.' },
    { key: 'amaterasu', name: '아마테라스', nameEn: 'Amaterasu', origin: '일본 신화',
      motivation: { recognition: 0.87, connection: 0.77, security: 0.82, creation: 0.67, achievement: 0.58, mastery: 0.57, freedom: 0.43, adventure: 0.33 },
      traits: ['빛', '조화', '은혜'], shadowAspect: '은둔',
      strengthAdvice: '빛과 따뜻함으로 주변을 밝히세요.',
      shadowAdvice: '상처받으면 숨고 싶지만, 세상은 당신의 빛이 필요합니다.',
      growthPath: '프로메테우스(반역자)처럼 어둠 속에서도 빛을 나누세요.' },
  ],
  healer: [
    { key: 'guanyin', name: '관음', nameEn: 'Guanyin', origin: '동아시아',
      motivation: { connection: 0.97, security: 0.82, creation: 0.62, mastery: 0.57, recognition: 0.43, achievement: 0.38, freedom: 0.48, adventure: 0.28 },
      traits: ['자비', '구원', '무조건적 사랑'], shadowAspect: '자기희생',
      strengthAdvice: '무조건적 자비로 고통받는 이들을 돌보세요.',
      shadowAdvice: '자기를 완전히 잊으면 결국 아무도 돌볼 수 없게 됩니다.',
      growthPath: '나폴레옹(정복자)의 자기 주장으로 균형을 잡으세요.' },
    { key: 'asclepius', name: '아스클레피오스', nameEn: 'Asclepius', origin: '그리스 신화',
      motivation: { connection: 0.88, mastery: 0.87, achievement: 0.67, security: 0.62, recognition: 0.57, creation: 0.48, freedom: 0.38, adventure: 0.33 },
      traits: ['의술', '재생', '헌신'], shadowAspect: '한계 무시',
      strengthAdvice: '치유의 기술을 갈고닦아 고통을 덜어주세요.',
      shadowAdvice: '죽음까지 거스르려 하면 안 됩니다. 한계를 인정하세요.',
      growthPath: '아누비스(수호자)처럼 삶과 죽음의 균형을 받아들이세요.' },
    { key: 'brigid', name: '브리짓', nameEn: 'Brigid', origin: '켈트 신화',
      motivation: { connection: 0.87, creation: 0.82, security: 0.72, mastery: 0.67, recognition: 0.57, achievement: 0.48, freedom: 0.48, adventure: 0.38 },
      traits: ['불', '시', '치유'], shadowAspect: '소진',
      strengthAdvice: '창조적 에너지로 치유하고 영감을 주세요.',
      shadowAdvice: '끊임없이 주면 소진됩니다. 자신도 충전하세요.',
      growthPath: '헤스티아(수호자)의 평온함으로 에너지를 회복하세요.' },
    { key: 'dian_cecht', name: '디안 케트', nameEn: 'Dian Cecht', origin: '켈트 신화',
      motivation: { connection: 0.83, mastery: 0.92, achievement: 0.72, security: 0.67, creation: 0.62, recognition: 0.57, freedom: 0.38, adventure: 0.33 },
      traits: ['의술', '완벽주의', '질투'], shadowAspect: '시기',
      strengthAdvice: '완벽한 치유 기술로 불가능을 가능하게 만드세요.',
      shadowAdvice: '다른 이의 성공을 시기하지 마세요. 당신만의 길이 있습니다.',
      growthPath: '사라스와티(현자)의 순수함으로 시기를 정화하세요.' },
    { key: 'eir', name: '에이르', nameEn: 'Eir', origin: '북유럽 신화',
      motivation: { connection: 0.92, security: 0.77, mastery: 0.72, achievement: 0.53, creation: 0.48, recognition: 0.43, freedom: 0.48, adventure: 0.38 },
      traits: ['치유', '평화', '보호'], shadowAspect: '무력감',
      strengthAdvice: '조용한 치유로 평화를 가져오세요.',
      shadowAdvice: '모든 것을 고칠 수 없다는 무력감에 빠지지 마세요.',
      growthPath: '두르가(수호자)의 행동력으로 무력감을 이기세요.' },
    { key: 'yakushi', name: '약사여래', nameEn: 'Yakushi Nyorai', origin: '불교',
      motivation: { connection: 0.96, security: 0.82, mastery: 0.72, creation: 0.57, achievement: 0.43, recognition: 0.38, freedom: 0.43, adventure: 0.28 },
      traits: ['치유', '서원', '빛'], shadowAspect: '초월적 무관심',
      strengthAdvice: '깊은 자비심으로 근본적 치유를 추구하세요.',
      shadowAdvice: '초월이 무관심이 되지 않도록 하세요. 현실의 고통도 느끼세요.',
      growthPath: '관우(정복자)의 의리로 초월에 땅의 따뜻함을 더하세요.' },
  ],
  guardian: [
    { key: 'heimdall', name: '헤임달', nameEn: 'Heimdall', origin: '북유럽 신화',
      motivation: { security: 0.96, achievement: 0.72, mastery: 0.77, connection: 0.67, recognition: 0.57, freedom: 0.38, creation: 0.33, adventure: 0.43 },
      traits: ['경계', '충성', '예지'], shadowAspect: '편집증',
      strengthAdvice: '경계와 예지로 위험을 미리 감지하세요.',
      shadowAdvice: '모든 것을 의심하면 지칩니다. 신뢰할 줄도 알아야 합니다.',
      growthPath: '간달프(현자)의 신뢰로 경계심에 여유를 더하세요.' },
    { key: 'hestia', name: '헤스티아', nameEn: 'Hestia', origin: '그리스 신화',
      motivation: { security: 0.92, connection: 0.87, creation: 0.57, mastery: 0.48, achievement: 0.38, recognition: 0.33, freedom: 0.38, adventure: 0.23 },
      traits: ['가정', '온기', '순수'], shadowAspect: '수동성',
      strengthAdvice: '따뜻한 안식처를 만들어 사람들을 쉬게 하세요.',
      shadowAdvice: '수동적으로 기다리기만 하면 변화가 없습니다.',
      growthPath: '프로메테우스(반역자)의 행동력으로 변화를 만드세요.' },
    { key: 'jizo', name: '지장보살', nameEn: 'Jizo', origin: '불교',
      motivation: { security: 0.87, connection: 0.96, mastery: 0.62, creation: 0.48, achievement: 0.38, recognition: 0.33, freedom: 0.38, adventure: 0.28 },
      traits: ['보호', '구원', '인내'], shadowAspect: '과도한 책임감',
      strengthAdvice: '약한 이들을 보호하고 인도하세요.',
      shadowAdvice: '모든 것을 책임지려 하면 무너집니다. 나눠야 합니다.',
      growthPath: '로키(반역자)의 가벼움으로 책임감의 무게를 덜세요.' },
    { key: 'anubis', name: '아누비스', nameEn: 'Anubis', origin: '이집트 신화',
      motivation: { security: 0.94, mastery: 0.82, connection: 0.62, achievement: 0.57, recognition: 0.48, creation: 0.38, freedom: 0.33, adventure: 0.43 },
      traits: ['인도자', '심판', '의식'], shadowAspect: '냉담',
      strengthAdvice: '전환의 시기에 안내자가 되세요.',
      shadowAdvice: '냉담함은 보호막이지만 고립을 부릅니다.',
      growthPath: '브리짓(치유자)의 따뜻함으로 냉담함을 녹이세요.' },
    { key: 'zhong_kui', name: '종규', nameEn: 'Zhong Kui', origin: '중국',
      motivation: { security: 0.88, achievement: 0.77, connection: 0.62, recognition: 0.67, mastery: 0.57, freedom: 0.43, creation: 0.33, adventure: 0.38 },
      traits: ['축귀', '정의', '희생'], shadowAspect: '분노',
      strengthAdvice: '정의감으로 악을 물리치세요.',
      shadowAdvice: '분노에 사로잡히면 보호자가 아닌 파괴자가 됩니다.',
      growthPath: '관음(치유자)의 자비로 분노를 정화하세요.' },
    { key: 'durga', name: '두르가', nameEn: 'Durga', origin: '인도 신화',
      motivation: { security: 0.87, achievement: 0.87, connection: 0.72, mastery: 0.67, recognition: 0.62, freedom: 0.57, creation: 0.48, adventure: 0.48 },
      traits: ['전사', '모성', '정의'], shadowAspect: '파괴성',
      strengthAdvice: '보호를 위한 전투에서 물러서지 마세요.',
      shadowAdvice: '파괴가 목적이 되면 안 됩니다. 보호가 먼저입니다.',
      growthPath: '여와(창조자)의 복원력으로 파괴 후 건설을 배우세요.' },
  ],
  rebel: [
    { key: 'prometheus', name: '프로메테우스', nameEn: 'Prometheus', origin: '그리스 신화',
      motivation: { freedom: 0.97, creation: 0.87, connection: 0.77, mastery: 0.67, achievement: 0.62, recognition: 0.57, adventure: 0.72, security: 0.13 },
      traits: ['희생', '혁명', '선견'], shadowAspect: '고통',
      strengthAdvice: '다른 이들의 자유를 위해 기꺼이 희생하세요.',
      shadowAdvice: '고통을 즐기지 마세요. 순교자 콤플렉스를 경계하세요.',
      growthPath: '아마테라스(군주)의 빛으로 어둠에서 벗어나세요.' },
    { key: 'loki', name: '로키', nameEn: 'Loki', origin: '북유럽 신화',
      motivation: { freedom: 0.96, creation: 0.82, adventure: 0.87, mastery: 0.62, recognition: 0.67, achievement: 0.57, connection: 0.43, security: 0.18 },
      traits: ['속임', '변화', '혼돈'], shadowAspect: '배신',
      strengthAdvice: '변화의 촉매가 되어 정체를 깨세요.',
      shadowAdvice: '속임이 습관이 되면 신뢰를 모두 잃습니다.',
      growthPath: '관우(정복자)의 의리로 변덕에 중심을 잡으세요.' },
    { key: 'sun_wukong', name: '손오공', nameEn: 'Sun Wukong', origin: '중국',
      motivation: { freedom: 0.97, adventure: 0.96, achievement: 0.82, mastery: 0.77, recognition: 0.72, creation: 0.57, connection: 0.62, security: 0.13 },
      traits: ['반항', '성장', '충성'], shadowAspect: '오만',
      strengthAdvice: '자유롭고 대담하게 한계에 도전하세요.',
      shadowAdvice: '오만함이 하늘을 찌르면 반드시 내려옵니다.',
      growthPath: '삼장법사(탐험가)의 인내로 오만함을 다스리세요.' },
    { key: 'maui', name: '마우이', nameEn: 'Maui', origin: '폴리네시아',
      motivation: { freedom: 0.92, adventure: 0.92, creation: 0.77, achievement: 0.82, recognition: 0.77, connection: 0.67, mastery: 0.62, security: 0.23 },
      traits: ['속임', '영웅', '장난'], shadowAspect: '인정욕구',
      strengthAdvice: '장난기와 창의력으로 불가능을 가능하게 만드세요.',
      shadowAdvice: '인정받으려는 욕구가 너무 강하면 진정성을 잃습니다.',
      growthPath: '토트(현자)의 지혜로 인정욕구를 승화시키세요.' },
    { key: 'eris', name: '에리스', nameEn: 'Eris', origin: '그리스 신화',
      motivation: { freedom: 0.94, creation: 0.67, adventure: 0.77, recognition: 0.82, achievement: 0.62, mastery: 0.48, connection: 0.33, security: 0.13 },
      traits: ['불화', '진실', '촉매'], shadowAspect: '파괴',
      strengthAdvice: '진실을 드러내어 위선을 깨세요.',
      shadowAdvice: '불화 자체가 목적이 되면 모든 것이 무너집니다.',
      growthPath: '헤스티아(수호자)의 조화로 불화에 균형을 더하세요.' },
    { key: 'lucifer', name: '루시퍼', nameEn: 'Lucifer', origin: '기독교',
      motivation: { freedom: 0.98, recognition: 0.87, achievement: 0.77, mastery: 0.67, creation: 0.57, adventure: 0.52, connection: 0.23, security: 0.08 },
      traits: ['빛', '자유의지', '반역'], shadowAspect: '교만',
      strengthAdvice: '자유의지의 가치를 일깨워주세요.',
      shadowAdvice: '교만은 가장 밝은 빛도 어둠으로 만듭니다.',
      growthPath: '지장보살(수호자)의 겸손으로 교만을 다스리세요.' },
  ],
  explorer: [
    { key: 'odysseus', name: '오디세우스', nameEn: 'Odysseus', origin: '그리스 신화',
      motivation: { adventure: 0.92, mastery: 0.87, achievement: 0.77, freedom: 0.72, connection: 0.82, security: 0.57, recognition: 0.62, creation: 0.38 },
      traits: ['지략', '인내', '귀향'], shadowAspect: '방황',
      strengthAdvice: '지략으로 어떤 상황에서도 살아남으세요.',
      shadowAdvice: '목적 없는 방황은 삶을 소모합니다. 귀향을 잊지 마세요.',
      growthPath: '헤스티아(수호자)의 정착으로 방황에 쉼터를 만드세요.' },
    { key: 'gilgamesh', name: '길가메시', nameEn: 'Gilgamesh', origin: '메소포타미아',
      motivation: { adventure: 0.92, achievement: 0.92, mastery: 0.72, freedom: 0.67, connection: 0.77, recognition: 0.82, creation: 0.43, security: 0.33 },
      traits: ['불멸추구', '우정', '성장'], shadowAspect: '죽음 공포',
      strengthAdvice: '위대한 업적을 추구하며 한계를 시험하세요.',
      shadowAdvice: '죽음을 피할 수 없습니다. 현재의 삶을 살아가세요.',
      growthPath: '아누비스(수호자)의 수용으로 죽음 공포를 넘어서세요.' },
    { key: 'xuanzang', name: '삼장법사', nameEn: 'Xuanzang', origin: '중국',
      motivation: { adventure: 0.82, mastery: 0.92, connection: 0.72, achievement: 0.72, freedom: 0.52, recognition: 0.48, creation: 0.57, security: 0.43 },
      traits: ['신앙', '인내', '지식'], shadowAspect: '순진함',
      strengthAdvice: '굳은 신념으로 어떤 시련도 견뎌내세요.',
      shadowAdvice: '순진함은 위험을 부릅니다. 현실 감각도 필요합니다.',
      growthPath: '제갈량(현자)의 현실 감각으로 순진함에 지혜를 더하세요.' },
    { key: 'hermes', name: '헤르메스', nameEn: 'Hermes', origin: '그리스 신화',
      motivation: { adventure: 0.92, freedom: 0.87, mastery: 0.67, connection: 0.62, achievement: 0.57, creation: 0.52, recognition: 0.48, security: 0.28 },
      traits: ['전령', '속임', '교역'], shadowAspect: '불안정',
      strengthAdvice: '경계를 넘나들며 연결의 다리가 되세요.',
      shadowAdvice: '어디에도 속하지 않으면 정체성이 흔들립니다.',
      growthPath: '헤임달(수호자)의 뿌리로 불안정함에 중심을 잡으세요.' },
    { key: 'marco_polo', name: '마르코 폴로', nameEn: 'Marco Polo', origin: '베네치아',
      motivation: { adventure: 0.97, achievement: 0.82, mastery: 0.67, freedom: 0.77, recognition: 0.72, creation: 0.57, connection: 0.52, security: 0.23 },
      traits: ['기록', '교역', '호기심'], shadowAspect: '과장',
      strengthAdvice: '새로운 세계를 탐험하고 기록으로 남기세요.',
      shadowAdvice: '과장은 신뢰를 떨어뜨립니다. 사실 그대로도 충분합니다.',
      growthPath: '토트(현자)의 정확함으로 과장을 정제하세요.' },
    { key: 'ibn_battuta', name: '이븐 바투타', nameEn: 'Ibn Battuta', origin: '모로코',
      motivation: { adventure: 0.96, mastery: 0.77, connection: 0.72, freedom: 0.82, achievement: 0.67, recognition: 0.57, creation: 0.43, security: 0.28 },
      traits: ['기록', '신앙', '인내'], shadowAspect: '뿌리없음',
      strengthAdvice: '끝없는 여행으로 세상의 다양성을 경험하세요.',
      shadowAdvice: '뿌리 없는 삶은 외롭습니다. 마음의 고향을 만드세요.',
      growthPath: '옥황상제(군주)의 질서로 방황에 중심을 잡으세요.' },
  ],
};

// ============================================
// 유사도 계산 (스케일링 없음)
// ============================================

const MOTIVE_LIST: MotiveSource[] = [
  'achievement', 'mastery', 'creation', 'recognition',
  'connection', 'security', 'freedom', 'adventure'
];

function cosineSimilarity(user: Record<string, number>, figure: Record<string, number>): number {
  let dot = 0, userMag = 0, figureMag = 0;
  for (const m of MOTIVE_LIST) {
    const u = (user[m] || 0) / 100;
    const f = figure[m] || 0;
    dot += u * f;
    userMag += u * u;
    figureMag += f * f;
  }
  const mag = Math.sqrt(userMag) * Math.sqrt(figureMag);
  return mag > 0 ? dot / mag : 0;
}

function euclideanSimilarity(user: Record<string, number>, figure: Record<string, number>): number {
  let sumSq = 0;
  for (const m of MOTIVE_LIST) {
    const u = (user[m] || 0) / 100;
    const f = figure[m] || 0;
    sumSq += Math.pow(u - f, 2);
  }
  const dist = Math.sqrt(sumSq);
  const maxDist = Math.sqrt(MOTIVE_LIST.length);
  return Math.max(0, 1 - (dist / maxDist));
}

function rankCorrelation(user: Record<string, number>, figure: Record<string, number>): number {
  const userRanked = MOTIVE_LIST.map(m => ({ m, v: user[m] || 0 })).sort((a, b) => b.v - a.v).map((x, i) => ({ ...x, r: i + 1 }));
  const figureRanked = MOTIVE_LIST.map(m => ({ m, v: (figure[m] || 0) * 100 })).sort((a, b) => b.v - a.v).map((x, i) => ({ ...x, r: i + 1 }));
  let sumD2 = 0;
  for (const m of MOTIVE_LIST) {
    const ur = userRanked.find(x => x.m === m)?.r || 0;
    const fr = figureRanked.find(x => x.m === m)?.r || 0;
    sumD2 += Math.pow(ur - fr, 2);
  }
  const n = MOTIVE_LIST.length;
  const rho = 1 - (6 * sumD2) / (n * (n * n - 1));
  return (rho + 1) / 2;
}

function shapeSimilarity(user: Record<string, number>, figure: Record<string, number>): number {
  const userVals = MOTIVE_LIST.map(m => (user[m] || 0) / 100);
  const figureVals = MOTIVE_LIST.map(m => figure[m] || 0);
  const userMean = userVals.reduce((a, b) => a + b, 0) / userVals.length;
  const figureMean = figureVals.reduce((a, b) => a + b, 0) / figureVals.length;
  const userStd = Math.sqrt(userVals.reduce((s, v) => s + Math.pow(v - userMean, 2), 0) / userVals.length);
  const figureStd = Math.sqrt(figureVals.reduce((s, v) => s + Math.pow(v - figureMean, 2), 0) / figureVals.length);
  const stdDiff = Math.abs(userStd - figureStd);
  return Math.max(0, 1 - stdDiff * 3);
}

function calculateSimilarity(user: UserMotivation, figure: Record<string, number>): number {
  const cosine = cosineSimilarity(user as any, figure);
  const euclidean = euclideanSimilarity(user as any, figure);
  const rank = rankCorrelation(user as any, figure);
  const shape = shapeSimilarity(user as any, figure);
  const combined = cosine * 0.35 + euclidean * 0.25 + rank * 0.25 + shape * 0.15;
  return round2(combined * 100);
}

// ============================================
// 🆕 확장된 인물 매칭 타입
// ============================================

export interface FigureMatchExtended extends FigureMatch {
  archetype: Archetype;
  archetypeName: string;
  traits: string[];
  shadowAspect: string;
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  gap: number;
  // 🆕 #15 조언
  strengthAdvice: string;
  shadowAdvice: string;
  growthPath: string;
}

export interface ArchetypeMatchExtended extends ArchetypeMatch {
  emoji: string;
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  gap: number;
  // 🆕 #9 그림자 원형
  shadowArchetype: Archetype;
  shadowDescription: string;
  shadowRisk: string;
}

// 🆕 #13 인물 조합 분석
export interface FigureCombinationAnalysis {
  topFigures: FigureMatchExtended[];
  commonTraits: string[];
  uniqueTraits: string[];
  combinedStrengths: string[];
  potentialConflicts: string[];
  overallPattern: string;
}

// 🆕 #14 성장 경로 인물
export interface GrowthPathFigure {
  currentFigure: FigureMatchExtended;
  growthTarget: FigureMatchExtended;
  pathDescription: string;
  steps: string[];
}

// ============================================
// 매칭 함수들
// ============================================

function matchArchetypes(motivation: UserMotivation): ArchetypeMatchExtended[] {
  const results: ArchetypeMatchExtended[] = [];

  for (const archetype of ARCHETYPES) {
    let score = 0;
    const weights = ARCHETYPE_WEIGHTS[archetype];
    const conditions = ARCHETYPE_CONDITIONS[archetype];

    for (const [motive, weight] of Object.entries(weights)) {
      const userValue = motivation[motive as MotiveSource] || 0;
      score += (userValue / 100) * (weight as number) * 100;
    }

    let bonus = 0;
    if (conditions.primary) {
      const val = motivation[conditions.primary.motive] || 0;
      const diff = val - conditions.primary.min;
      if (diff >= 0) bonus += 8 + (diff * 0.12);
      else bonus -= 15 + (Math.abs(diff) * 0.2);
    }
    if (conditions.secondary) {
      const val = motivation[conditions.secondary.motive] || 0;
      if (val >= conditions.secondary.min) bonus += 4;
      else bonus -= 6;
    }
    if (conditions.exclude) {
      const val = motivation[conditions.exclude.motive] || 0;
      const diff = val - conditions.exclude.max;
      if (diff > 0) bonus -= 12 + (diff * 0.25);
      else bonus += 3;
    }

    score = Math.max(0, Math.min(100, score + bonus));

    let grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
    if (score >= 85) grade = 'S';
    else if (score >= 70) grade = 'A';
    else if (score >= 55) grade = 'B';
    else if (score >= 40) grade = 'C';
    else if (score >= 25) grade = 'D';
    else grade = 'F';

    const shadow = SHADOW_ARCHETYPES[archetype];

    results.push({
      archetype,
      archetypeName: ARCHETYPE_NAMES[archetype].ko,
      archetypeNameEn: ARCHETYPE_NAMES[archetype].en,
      emoji: ARCHETYPE_NAMES[archetype].emoji,
      score: round2(score),
      rank: 0,
      grade,
      gap: 0,
      shadowArchetype: shadow.shadow,
      shadowDescription: shadow.description,
      shadowRisk: shadow.risk
    });
  }

  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => {
    r.rank = i + 1;
    r.gap = round2(results[0].score - r.score);
  });

  return results;
}

function matchAllFigures(motivation: UserMotivation): FigureMatchExtended[] {
  const results: FigureMatchExtended[] = [];

  for (const archetype of ARCHETYPES) {
    const figures = FIGURE_PROFILES[archetype];
    for (const figure of figures) {
      const similarity = calculateSimilarity(motivation, figure.motivation);
      
      let grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
      if (similarity >= 80) grade = 'S';
      else if (similarity >= 65) grade = 'A';
      else if (similarity >= 50) grade = 'B';
      else if (similarity >= 35) grade = 'C';
      else if (similarity >= 20) grade = 'D';
      else grade = 'F';

      results.push({
        figure: figure.key,
        figureName: figure.name,
        figureNameEn: figure.nameEn,
        origin: figure.origin,
        similarity: round2(similarity),
        rank: 0,
        archetype,
        archetypeName: ARCHETYPE_NAMES[archetype].ko,
        traits: figure.traits,
        shadowAspect: figure.shadowAspect,
        grade,
        gap: 0,
        strengthAdvice: figure.strengthAdvice,
        shadowAdvice: figure.shadowAdvice,
        growthPath: figure.growthPath
      });
    }
  }

  results.sort((a, b) => b.similarity - a.similarity);
  results.forEach((r, i) => {
    r.rank = i + 1;
    r.gap = round2(results[0].similarity - r.similarity);
  });

  return results;
}

// 🆕 #12 반대 인물 매칭 (하위 5명)
function getOppositeFigures(allFigures: FigureMatchExtended[]): FigureMatchExtended[] {
  return allFigures.slice(-5).reverse();
}

// 🆕 #13 인물 조합 분석
function analyzeFigureCombination(topFigures: FigureMatchExtended[]): FigureCombinationAnalysis {
  const top3 = topFigures.slice(0, 3);
  
  // 공통 특성 찾기
  const allTraits = top3.flatMap(f => f.traits);
  const traitCounts = new Map<string, number>();
  for (const trait of allTraits) {
    traitCounts.set(trait, (traitCounts.get(trait) || 0) + 1);
  }
  
  const commonTraits = [...traitCounts.entries()]
    .filter(([, count]) => count >= 2)
    .map(([trait]) => trait);
  
  const uniqueTraits = [...new Set(allTraits)]
    .filter(t => !commonTraits.includes(t));
  
  // 강점 조합
  const combinedStrengths = top3.map(f => f.strengthAdvice.split(' ')[0]);
  
  // 잠재적 갈등
  const shadows = top3.map(f => f.shadowAspect);
  const potentialConflicts = shadows.length > 1 
    ? [`${shadows[0]}와 ${shadows[1]} 사이의 긴장`]
    : [];
  
  // 전체 패턴
  const archetypes = [...new Set(top3.map(f => f.archetypeName))];
  const overallPattern = archetypes.length === 1 
    ? `일관된 ${archetypes[0]} 패턴`
    : `${archetypes.join(' + ')} 조합`;
  
  return {
    topFigures: top3,
    commonTraits,
    uniqueTraits,
    combinedStrengths,
    potentialConflicts,
    overallPattern
  };
}

// 🆕 #14 성장 경로 인물
function findGrowthPathFigure(
  primaryFigure: FigureMatchExtended,
  allFigures: FigureMatchExtended[],
  shadowArchetype: Archetype
): GrowthPathFigure {
  // 그림자 원형에서 가장 높은 인물 찾기
  const shadowFigures = allFigures.filter(f => f.archetype === shadowArchetype);
  const growthTarget = shadowFigures[0] || allFigures[5];
  
  return {
    currentFigure: primaryFigure,
    growthTarget,
    pathDescription: `${primaryFigure.figureName}에서 ${growthTarget.figureName}의 특성 통합하기`,
    steps: [
      `${primaryFigure.shadowAspect}를 인식하고 수용하기`,
      `${growthTarget.traits[0]} 특성 작은 것부터 연습하기`,
      `${primaryFigure.figureName}의 강점을 유지하면서 ${growthTarget.figureName}의 관점 추가하기`
    ]
  };
}

// 🆕 #11 인물이 속한 클러스터 찾기
function findFigureCluster(figureKey: string): { cluster: string; members: string[] } | null {
  for (const [clusterKey, cluster] of Object.entries(FIGURE_CLUSTERS)) {
    if (cluster.members.includes(figureKey)) {
      return { cluster: cluster.name, members: cluster.members };
    }
  }
  return null;
}

// ============================================
// Full 버전 결과 타입
// ============================================

export interface FullResult {
  version: 'full';
  questionCount: number;
  nickname?: string;

  motiveScores: MotiveScore[];
  ignitionScores: IgnitionScore[];
  directionScores: DirectionScore[];
  operationScores: OperationScore[];
  
  primaryArchetype: ArchetypeMatchExtended;
  secondaryArchetype: ArchetypeMatchExtended;
  allArchetypes: ArchetypeMatchExtended[];
  
  primaryFigure: FigureMatchExtended;
  topFigures: FigureMatchExtended[];
  allFigures: FigureMatchExtended[];
  archetypeFigures: FigureMatchExtended[];
  
  // 🆕 v5 추가
  oppositeFigures: FigureMatchExtended[];
  figureCombination: FigureCombinationAnalysis;
  growthPath: GrowthPathFigure;
  primaryFigureCluster: { cluster: string; members: string[] } | null;
  
  energy: EnergyScore;
  conflicts: ConflictScore[];
  contextShifts: ContextScore[];
  hiddenMotives: HiddenMotiveScore;
  maturity: MaturityScore;
  validation: ValidationScore;
  
  responseTimeScore: ResponseTimeScore;
  reliabilityScore: ReliabilityScore;
  confidenceMap: ConfidenceMap;
  metacognition: MetacognitionScore;
  uniqueness: UniquenessScore;
  
  // 🆕 v5 추가 from question_scorer
  extremePatterns: ExtremePatternAnalysis;
  motiveDevelopment: MotiveDevelopmentStage[];
  conflictMap: ConflictMap;
  consistencyBreakdown: ConsistencyBreakdown;
  confidenceIntervals: ConfidenceInterval[];
  motiveEvolution: MotiveEvolutionPrediction;
  developmentSuggestions: DevelopmentSuggestion[];
  reverseItemValidation: ReverseItemValidation;
  correlationValidation: MotiveCorrelationValidation;
  socialDesirabilityCorrection: SocialDesirabilityCorrection;
  
  completedAt: Date;
  totalTimeMs: number;
}

// ============================================
// Full 버전 점수 계산
// ============================================

export function calculateFullScores(answers: Answer[]): FullResult {
  initFullVersion();
  
  const allScores = calculateAllScores(answers);
  
  const motivation: UserMotivation = {} as UserMotivation;
  for (const score of allScores.motive) {
    motivation[score.motive] = score.score;
  }
  
  const archetypeMatches = matchArchetypes(motivation);
  const allFigures = matchAllFigures(motivation);
  const archetypeFigures = allFigures.filter(f => f.archetype === archetypeMatches[0].archetype);
  
  // 🆕 추가 분석
  const oppositeFigures = getOppositeFigures(allFigures);
  const figureCombination = analyzeFigureCombination(allFigures.slice(0, 5));
  const growthPath = findGrowthPathFigure(
    allFigures[0], 
    allFigures, 
    archetypeMatches[0].shadowArchetype
  );
  const primaryFigureCluster = findFigureCluster(allFigures[0].figure);
  
  const totalTimeMs = answers.reduce((sum, a) => sum + a.responseTimeMs, 0);
  
  return {
    version: 'full',
    questionCount: answers.length,
    
    motiveScores: allScores.motive,
    ignitionScores: allScores.ignition,
    directionScores: allScores.direction,
    operationScores: allScores.operation,
    
    primaryArchetype: archetypeMatches[0],
    secondaryArchetype: archetypeMatches[1],
    allArchetypes: archetypeMatches,
    
    primaryFigure: allFigures[0],
    topFigures: allFigures.slice(0, 5),
    allFigures,
    archetypeFigures,
    
    oppositeFigures,
    figureCombination,
    growthPath,
    primaryFigureCluster,
    
    energy: allScores.energy,
    conflicts: allScores.conflict,
    contextShifts: allScores.context,
    hiddenMotives: allScores.hidden,
    maturity: allScores.maturity,
    validation: allScores.validation,
    
    responseTimeScore: allScores.responseTimeScore,
    reliabilityScore: allScores.reliabilityScore,
    confidenceMap: allScores.confidenceMap,
    metacognition: allScores.metacognition,
    uniqueness: allScores.uniqueness,
    
    extremePatterns: allScores.extremePatterns,
    motiveDevelopment: allScores.motiveDevelopment,
    conflictMap: allScores.conflictMap,
    consistencyBreakdown: allScores.consistencyBreakdown,
    confidenceIntervals: allScores.confidenceIntervals,
    motiveEvolution: allScores.motiveEvolution,
    developmentSuggestions: allScores.developmentSuggestions,
    reverseItemValidation: allScores.reverseItemValidation,
    correlationValidation: allScores.correlationValidation,
    socialDesirabilityCorrection: allScores.socialDesirabilityCorrection,
    
    completedAt: new Date(),
    totalTimeMs,
  };
}

// ============================================
// Exports
// ============================================

export function getFullQuestions() {
  return { questions: ALL_QUESTIONS, stats: QUESTION_STATS, estimatedTime: '25-30분' };
}

export function getArchetypeInfo(archetype: Archetype) {
  return {
    ...ARCHETYPE_NAMES[archetype],
    weights: ARCHETYPE_WEIGHTS[archetype],
    conditions: ARCHETYPE_CONDITIONS[archetype],
    figures: FIGURE_PROFILES[archetype],
    shadow: SHADOW_ARCHETYPES[archetype]
  };
}

export function getAllArchetypeNames() { return ARCHETYPE_NAMES; }
export function getShadowArchetypes() { return SHADOW_ARCHETYPES; }
export function getFigureClusters() { return FIGURE_CLUSTERS; }

export function getFigureDetails(figureKey: string) {
  for (const archetype of ARCHETYPES) {
    const figure = FIGURE_PROFILES[archetype].find(f => f.key === figureKey);
    if (figure) return { ...figure, archetype, archetypeName: ARCHETYPE_NAMES[archetype].ko };
  }
  return null;
}

export default {
  initFullVersion,
  calculateFullScores,
  getFullQuestions,
  getArchetypeInfo,
  getAllArchetypeNames,
  getFigureDetails,
  getShadowArchetypes,
  getFigureClusters,
  matchAllFigures,
  getOppositeFigures,
  analyzeFigureCombination,
  findGrowthPathFigure,
};