/**
 * MET Mythic v2.0 — 원형 마크다운 로더
 * 
 * 8개 원형 마크다운 파일을 로드하고 섹션을 추출합니다.
 */

import { Archetype } from './types';

// 원형별 마크다운 파일명
const ARCHETYPE_FILES: Record<Archetype, string> = {
  conqueror: 'archetypes_conqueror.md',
  sage: 'archetypes_sage.md',
  creator: 'archetypes_creator.md',
  sovereign: 'archetypes_sovereign.md',
  healer: 'archetypes_healer.md',
  guardian: 'archetypes_guardian.md',
  rebel: 'archetypes_rebel.md',
  explorer: 'archetypes_explorer.md',
};

/**
 * 원형 마크다운 전체 로드
 * @param archetype 원형 키
 * @returns 마크다운 전체 내용
 */
export async function loadArchetypeMarkdown(archetype: Archetype): Promise<string> {
  const filename = ARCHETYPE_FILES[archetype];
  
  // Node.js 환경 (서버)
  if (typeof window === 'undefined') {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'public', 'archetypes', filename);
    
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      console.error(`Failed to load archetype markdown: ${filename}`, error);
      return '';
    }
  }
  
  // 브라우저 환경 (클라이언트)
  try {
    const response = await fetch(`/archetypes/${filename}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch archetype markdown: ${filename}`, error);
    return '';
  }
}

/**
 * 인물 섹션 추출
 */
export function extractFigureSection(
  markdown: string,
  figureName: string
): string | null {
  // ## 신화 인물 N: 인물명 패턴
  const escaped = figureName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `## 신화 인물 \\d+: ${escaped}[\\s\\S]*?(?=## 신화 인물 \\d+:|## 원형 내 인물 비교표|---\\s*$|$)`,
    'i'
  );
  
  const match = markdown.match(pattern);
  return match ? match[0].trim() : null;
}

/**
 * 레벨 섹션 추출
 */
export function extractLevelSection(
  markdown: string,
  figureName: string,
  level: 1 | 2 | 3 | 4
): string | null {
  const figureSection = extractFigureSection(markdown, figureName);
  if (!figureSection) return null;

  const levelNames: Record<number, string> = {
    1: '그림자',
    2: '각성',
    3: '통합',
    4: '초월',
  };

  const levelPattern = new RegExp(
    `### Lv${level}: ${levelNames[level]}[\\s\\S]*?(?=### Lv\\d|### 레벨|### 진화|---\\s*$|$)`,
    'i'
  );

  const match = figureSection.match(levelPattern);
  return match ? match[0].trim() : null;
}

/**
 * 비교표 섹션 추출
 */
export function extractComparisonTable(markdown: string): string | null {
  const pattern = /## 원형 내 인물 비교표[\s\S]*?(?=## |---\s*$|$)/;
  const match = markdown.match(pattern);
  return match ? match[0].trim() : null;
}

/**
 * 보고서용 컨텍스트 조합
 */
export async function buildReportContext(
  archetype: Archetype,
  figureName: string,
  level: 1 | 2 | 3 | 4
): Promise<{
  fullMarkdown: string;
  figureSection: string;
  levelSection: string;
  comparisonTable: string;
}> {
  const fullMarkdown = await loadArchetypeMarkdown(archetype);
  
  return {
    fullMarkdown,
    figureSection: extractFigureSection(fullMarkdown, figureName) || '',
    levelSection: extractLevelSection(fullMarkdown, figureName, level) || '',
    comparisonTable: extractComparisonTable(fullMarkdown) || '',
  };
}

export default {
  loadArchetypeMarkdown,
  extractFigureSection,
  extractLevelSection,
  extractComparisonTable,
  buildReportContext,
};
