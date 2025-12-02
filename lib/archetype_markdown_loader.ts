/**
 * MET Mythic v2.0 — Archetype Markdown Loader
 * 
 * 8개 원형 마크다운 파일을 로드하고 파싱
 * 경로: /public/archetypes/archetypes_[archetype].md
 */

import type { Archetype } from './types';

// ============================================
// 원형 마크다운 경로
// ============================================

const ARCHETYPE_MD_PATHS: Record<Archetype, string> = {
  conqueror: '/archetypes/archetypes_conqueror.md',
  sage: '/archetypes/archetypes_sage.md',
  creator: '/archetypes/archetypes_creator.md',
  sovereign: '/archetypes/archetypes_sovereign.md',
  healer: '/archetypes/archetypes_healer.md',
  guardian: '/archetypes/archetypes_guardian.md',
  rebel: '/archetypes/archetypes_rebel.md',
  explorer: '/archetypes/archetypes_explorer.md',
};

// ============================================
// 마크다운 로더 (클라이언트)
// ============================================

/**
 * 원형 마크다운 파일 로드 (클라이언트 사이드)
 */
export async function loadArchetypeMarkdown(archetype: Archetype): Promise<string> {
  const path = ARCHETYPE_MD_PATHS[archetype];
  
  if (!path) {
    throw new Error(`Unknown archetype: ${archetype}`);
  }
  
  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`Failed to load archetype markdown: ${response.status}`);
    }
    
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error(`Error loading archetype markdown for ${archetype}:`, error);
    throw error;
  }
}

/**
 * 모든 원형 마크다운 로드 (캐싱용)
 */
export async function loadAllArchetypeMarkdowns(): Promise<Record<Archetype, string>> {
  const archetypes: Archetype[] = [
    'conqueror', 'sage', 'creator', 'sovereign',
    'healer', 'guardian', 'rebel', 'explorer'
  ];
  
  const results: Record<Archetype, string> = {} as Record<Archetype, string>;
  
  await Promise.all(
    archetypes.map(async (archetype) => {
      results[archetype] = await loadArchetypeMarkdown(archetype);
    })
  );
  
  return results;
}

// ============================================
// 마크다운 로더 (서버 사이드 - Node.js)
// ============================================

/**
 * 원형 마크다운 파일 로드 (서버 사이드)
 * Next.js API Route에서 사용
 */
export async function loadArchetypeMarkdownServer(archetype: Archetype): Promise<string> {
  // 동적 import로 fs 모듈 로드 (서버에서만)
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const filePath = path.join(process.cwd(), 'public', 'archetypes', `archetypes_${archetype}.md`);
  
  try {
    const markdown = await fs.readFile(filePath, 'utf-8');
    return markdown;
  } catch (error) {
    console.error(`Error loading archetype markdown from server for ${archetype}:`, error);
    throw error;
  }
}

// ============================================
// 마크다운 파서 유틸리티
// ============================================

/**
 * 마크다운에서 특정 섹션 추출
 */
export function extractSection(markdown: string, sectionTitle: string): string | null {
  const lines = markdown.split('\n');
  let inSection = false;
  let sectionLevel = 0;
  const sectionLines: string[] = [];
  
  for (const line of lines) {
    // 섹션 시작 감지
    const headerMatch = line.match(/^(#{1,4})\s+(.+)$/);
    
    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2].trim();
      
      if (title.includes(sectionTitle)) {
        inSection = true;
        sectionLevel = level;
        sectionLines.push(line);
        continue;
      }
      
      // 같거나 상위 레벨 헤더 만나면 종료
      if (inSection && level <= sectionLevel) {
        break;
      }
    }
    
    if (inSection) {
      sectionLines.push(line);
    }
  }
  
  return sectionLines.length > 0 ? sectionLines.join('\n') : null;
}

/**
 * 마크다운에서 신화 인물 섹션 추출
 */
export function extractFigureSection(markdown: string, figureName: string): string | null {
  return extractSection(markdown, figureName);
}

/**
 * 마크다운에서 레벨 섹션 추출
 */
export function extractLevelSection(markdown: string, level: 1 | 2 | 3 | 4): string | null {
  const levelNames: Record<number, string> = {
    1: 'Lv1',
    2: 'Lv2',
    3: 'Lv3',
    4: 'Lv4',
  };
  return extractSection(markdown, levelNames[level]);
}

/**
 * 마크다운 메타데이터 추출
 */
export function extractMetadata(markdown: string): {
  title?: string;
  version?: string;
  lastUpdated?: string;
} {
  const titleMatch = markdown.match(/^#\s+(.+)/m);
  const versionMatch = markdown.match(/\*\*Version\*\*:\s*(.+)/);
  const dateMatch = markdown.match(/\*\*Last Updated\*\*:\s*(.+)/);
  
  return {
    title: titleMatch?.[1]?.trim(),
    version: versionMatch?.[1]?.trim(),
    lastUpdated: dateMatch?.[1]?.trim(),
  };
}

// ============================================
// 원형 정보 헬퍼
// ============================================

export const ARCHETYPE_INFO: Record<Archetype, {
  name: string;
  nameEn: string;
  emoji: string;
  coreMotives: string[];
}> = {
  conqueror: {
    name: '정복자',
    nameEn: 'The Conqueror',
    emoji: '⚔️',
    coreMotives: ['achievement', 'freedom', 'recognition'],
  },
  sage: {
    name: '현자',
    nameEn: 'The Sage',
    emoji: '📚',
    coreMotives: ['mastery', 'creation', 'achievement'],
  },
  creator: {
    name: '창조자',
    nameEn: 'The Creator',
    emoji: '🎨',
    coreMotives: ['creation', 'mastery', 'freedom'],
  },
  sovereign: {
    name: '군주',
    nameEn: 'The Sovereign',
    emoji: '👑',
    coreMotives: ['recognition', 'achievement', 'security'],
  },
  healer: {
    name: '치유자',
    nameEn: 'The Healer',
    emoji: '💚',
    coreMotives: ['connection', 'security', 'creation'],
  },
  guardian: {
    name: '수호자',
    nameEn: 'The Guardian',
    emoji: '🛡️',
    coreMotives: ['security', 'connection', 'achievement'],
  },
  rebel: {
    name: '반역자',
    nameEn: 'The Rebel',
    emoji: '🔥',
    coreMotives: ['freedom', 'creation', 'adventure'],
  },
  explorer: {
    name: '탐험가',
    nameEn: 'The Explorer',
    emoji: '🧭',
    coreMotives: ['adventure', 'freedom', 'mastery'],
  },
};

export default {
  loadArchetypeMarkdown,
  loadAllArchetypeMarkdowns,
  loadArchetypeMarkdownServer,
  extractSection,
  extractFigureSection,
  extractLevelSection,
  extractMetadata,
  ARCHETYPE_INFO,
  ARCHETYPE_MD_PATHS,
};
