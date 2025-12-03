/**
 * MET Mythic - 원형별 테마 데이터
 * HTML 보고서 스타일링에 사용
 */

export interface ArchetypeTheme {
  name: string;
  nameEn: string;
  emoji: string;
  primary: string;
  secondary: string;
  accent: string;
  bgGradient: string;
  bgDark: string;
  pattern: string;
  quote: string;
}

export const archetypeThemes: Record<string, ArchetypeTheme> = {
  conqueror: {
    name: '정복자',
    nameEn: 'Conqueror',
    emoji: '⚔️',
    primary: '#b71c1c',
    secondary: '#ffd700',
    accent: '#ff5722',
    bgGradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1010 50%, #b71c1c 100%)',
    bgDark: '#1a0a0a',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 87, 34, 0.08) 0%, transparent 40%)',
    quote: '정복은 힘이 아니라 의지다',
  },
  sage: {
    name: '현자',
    nameEn: 'Sage',
    emoji: '🧙‍♂️',
    primary: '#1a237e',
    secondary: '#c0c0c0',
    accent: '#7c4dff',
    bgGradient: 'linear-gradient(135deg, #0d1421 0%, #1a1a3e 50%, #1a237e 100%)',
    bgDark: '#0d1421',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(124, 77, 255, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(192, 192, 192, 0.08) 0%, transparent 40%)',
    quote: '지혜는 아는 것이 아니라 깨닫는 것이다',
  },
  creator: {
    name: '창조자',
    nameEn: 'Creator',
    emoji: '🎨',
    primary: '#6a1b9a',
    secondary: '#ff9800',
    accent: '#e91e63',
    bgGradient: 'linear-gradient(135deg, #1a0a1f 0%, #2d1a3d 50%, #6a1b9a 100%)',
    bgDark: '#1a0a1f',
    pattern: 'radial-gradient(circle at 25% 75%, rgba(255, 152, 0, 0.12) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(233, 30, 99, 0.08) 0%, transparent 40%)',
    quote: '창조는 무에서 유를 만드는 것이 아니라, 보이지 않던 것을 보이게 하는 것이다',
  },
  sovereign: {
    name: '군주',
    nameEn: 'Sovereign',
    emoji: '👑',
    primary: '#5d4037',
    secondary: '#ffd700',
    accent: '#9c27b0',
    bgGradient: 'linear-gradient(135deg, #1a1409 0%, #2d2418 50%, #5d4037 100%)',
    bgDark: '#1a1409',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 60%)',
    quote: '왕관의 무게를 아는 자만이 왕이 될 수 있다',
  },
  healer: {
    name: '치유자',
    nameEn: 'Healer',
    emoji: '🙏',
    primary: '#1b5e20',
    secondary: '#e8f5e9',
    accent: '#4caf50',
    bgGradient: 'linear-gradient(135deg, #0a1f0d 0%, #1a3d1f 50%, #1b5e20 100%)',
    bgDark: '#0a1f0d',
    pattern: 'radial-gradient(circle at 40% 60%, rgba(76, 175, 80, 0.12) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)',
    quote: '치유는 상처를 없애는 것이 아니라, 상처와 함께 살아가는 법을 찾는 것이다',
  },
  guardian: {
    name: '수호자',
    nameEn: 'Guardian',
    emoji: '🛡️',
    primary: '#0d47a1',
    secondary: '#90a4ae',
    accent: '#2196f3',
    bgGradient: 'linear-gradient(135deg, #050d1a 0%, #0a1f3d 50%, #0d47a1 100%)',
    bgDark: '#050d1a',
    pattern: 'radial-gradient(circle at 35% 65%, rgba(33, 150, 243, 0.12) 0%, transparent 50%)',
    quote: '진정한 수호는 지키는 것이 아니라, 지킬 가치가 있는 것을 만드는 것이다',
  },
  rebel: {
    name: '반역자',
    nameEn: 'Rebel',
    emoji: '🔥',
    primary: '#212121',
    secondary: '#f44336',
    accent: '#ff5722',
    bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #212121 100%)',
    bgDark: '#0a0a0a',
    pattern: 'radial-gradient(circle at 50% 80%, rgba(244, 67, 54, 0.15) 0%, transparent 50%), radial-gradient(circle at 30% 20%, rgba(255, 87, 34, 0.08) 0%, transparent 40%)',
    quote: '파괴 없이 창조는 없다. 저항 없이 자유는 없다.',
  },
  explorer: {
    name: '탐험가',
    nameEn: 'Explorer',
    emoji: '🧭',
    primary: '#006064',
    secondary: '#ff9800',
    accent: '#00bcd4',
    bgGradient: 'linear-gradient(135deg, #001a1c 0%, #003d42 50%, #006064 100%)',
    bgDark: '#001a1c',
    pattern: 'radial-gradient(circle at 20% 30%, rgba(255, 152, 0, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 188, 212, 0.08) 0%, transparent 40%)',
    quote: '여정의 끝은 새로운 여정의 시작이다',
  },
};

// 원형 영문명으로 테마 가져오기
export function getTheme(archetype: string): ArchetypeTheme {
  return archetypeThemes[archetype.toLowerCase()] || archetypeThemes.sage;
}

export default archetypeThemes;