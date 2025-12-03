/**
 * MET Mythic - HTML 보고서 생성기
 * AI 보고서를 예쁜 HTML로 변환
 */

import { getTheme, type ArchetypeTheme } from './archetypeThemes';
import type { FullResult } from './full_api';

interface HtmlReportData {
  archetype: string;
  archetypeName: string;
  figureName: string;
  figureOrigin: string;
  syncRate: number;
  level: number;
  levelName: string;
  motiveScores: Array<{ motive: string; name: string; score: number }>;
  ignitionScores: Array<{ condition: string; name: string; score: number }>;
  reportMarkdown: string;
}

// 동기 한글 이름
const MOTIVE_NAMES: Record<string, string> = {
  achievement: '성취',
  mastery: '통달',
  creation: '창조',
  recognition: '인정',
  connection: '연결',
  security: '안정',
  freedom: '자유',
  adventure: '모험',
};

// 점화조건 한글 이름
const IGNITION_NAMES: Record<string, string> = {
  competition: '경쟁',
  complexity: '복잡성',
  deadline: '마감',
  audience: '관중',
  autonomy: '자율',
  crisis: '위기',
};

// 마크다운 → HTML 변환 (간단한 버전)
function markdownToHtml(markdown: string): string {
  let html = markdown
    // 헤더
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // 볼드/이탤릭
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 인용
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    // 리스트
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
    // 수평선
    .replace(/^---$/gm, '<hr>')
    // 줄바꿈
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  // 연속된 li를 ul로 감싸기
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
  
  // 연속된 blockquote 합치기
  html = html.replace(/<\/blockquote><blockquote>/g, '<br>');
  
  return `<p>${html}</p>`;
}

// HTML 보고서 생성
export function generateHtmlReport(
  fullResult: FullResult,
  reportMarkdown: string
): string {
  const theme = getTheme(fullResult.primaryArchetype.archetype);
  
  const data: HtmlReportData = {
    archetype: fullResult.primaryArchetype.archetype,
    archetypeName: fullResult.primaryArchetype.archetypeName,
    figureName: fullResult.primaryFigure.figureName,
    figureOrigin: fullResult.primaryFigure.origin,
    syncRate: fullResult.primaryArchetype.score,
    level: fullResult.maturity.level,
    levelName: getLevelName(fullResult.primaryArchetype.archetype, fullResult.maturity.level),
    motiveScores: fullResult.motiveScores.map(m => ({
      motive: m.motive,
      name: MOTIVE_NAMES[m.motive] || m.motive,
      score: m.score,
    })),
    ignitionScores: fullResult.ignitionScores.map(i => ({
      condition: i.condition,
      name: IGNITION_NAMES[i.condition] || i.condition,
      score: i.score,
    })),
    reportMarkdown,
  };

  const reportHtml = markdownToHtml(reportMarkdown);
  const now = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MET Mythic Report - ${data.archetypeName}: ${data.figureName}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${theme.primary};
      --secondary: ${theme.secondary};
      --accent: ${theme.accent};
      --bg-dark: ${theme.bgDark};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Noto Sans KR', sans-serif;
      background: ${theme.bgGradient};
      color: #e0e0e0;
      line-height: 1.8;
      min-height: 100vh;
    }

    .pattern-overlay {
      position: fixed;
      inset: 0;
      background: ${theme.pattern};
      pointer-events: none;
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* 헤더 */
    .header {
      text-align: center;
      margin-bottom: 48px;
      padding: 40px;
      background: linear-gradient(180deg, ${theme.primary}33 0%, transparent 100%);
      border-radius: 24px;
      border: 1px solid ${theme.secondary}22;
    }

    .header-logo {
      font-size: 14px;
      letter-spacing: 4px;
      color: ${theme.secondary};
      margin-bottom: 16px;
    }

    .header-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 36px;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
      text-shadow: 0 0 40px ${theme.accent}66;
    }

    .header-subtitle {
      font-size: 18px;
      color: ${theme.secondary};
    }

    /* 인물 카드 */
    .figure-card {
      background: linear-gradient(180deg, ${theme.primary}22 0%, ${theme.bgDark}88 100%);
      border: 2px solid ${theme.secondary}33;
      border-radius: 24px;
      padding: 40px;
      margin-bottom: 40px;
      display: flex;
      gap: 32px;
      align-items: center;
      box-shadow: 0 0 60px ${theme.accent}22;
    }

    .figure-image {
      width: 160px;
      height: 200px;
      background: linear-gradient(180deg, ${theme.primary}44 0%, ${theme.accent}22 100%);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 2px solid ${theme.secondary}44;
      flex-shrink: 0;
    }

    .figure-emoji {
      font-size: 72px;
      margin-bottom: 8px;
      filter: drop-shadow(0 0 20px ${theme.accent});
    }

    .figure-placeholder {
      font-size: 12px;
      color: ${theme.secondary}88;
    }

    .figure-info {
      flex: 1;
    }

    .figure-name {
      font-family: 'Noto Serif KR', serif;
      font-size: 32px;
      font-weight: 700;
      color: white;
      margin-bottom: 4px;
    }

    .figure-origin {
      font-size: 14px;
      color: ${theme.secondary};
      margin-bottom: 16px;
    }

    .archetype-badge {
      display: inline-block;
      padding: 8px 20px;
      background: ${theme.accent}22;
      border: 1px solid ${theme.accent}66;
      border-radius: 30px;
      font-size: 14px;
      color: ${theme.accent};
      margin-bottom: 16px;
    }

    .sync-rate {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .sync-label {
      font-size: 14px;
      color: ${theme.secondary};
    }

    .sync-value {
      font-size: 42px;
      font-weight: 700;
      color: ${theme.accent};
      text-shadow: 0 0 30px ${theme.accent}66;
    }

    .sync-unit {
      font-size: 18px;
      color: ${theme.accent};
    }

    /* 레벨 */
    .level-section {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid ${theme.secondary}22;
    }

    .level-dots {
      display: flex;
      gap: 8px;
    }

    .level-dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
    }

    .level-dot.active {
      background: ${theme.accent};
      color: white;
    }

    .level-dot.inactive {
      background: transparent;
      border: 2px solid ${theme.secondary}44;
      color: ${theme.secondary}66;
    }

    .level-name {
      font-size: 14px;
      color: ${theme.secondary};
    }

    /* 차트 섹션 */
    .charts-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 40px;
    }

    .chart-card {
      background: ${theme.bgDark}cc;
      border: 1px solid ${theme.secondary}22;
      border-radius: 20px;
      padding: 24px;
    }

    .chart-title {
      font-size: 16px;
      font-weight: 500;
      color: ${theme.secondary};
      margin-bottom: 16px;
      text-align: center;
    }

    .chart-container {
      position: relative;
      height: 280px;
    }

    /* 인용문 */
    .quote-section {
      text-align: center;
      padding: 32px;
      margin-bottom: 40px;
      background: ${theme.primary}11;
      border-left: 4px solid ${theme.accent};
      border-radius: 0 16px 16px 0;
    }

    .quote-text {
      font-family: 'Noto Serif KR', serif;
      font-size: 20px;
      font-style: italic;
      color: ${theme.secondary};
    }

    /* 본문 */
    .report-content {
      background: ${theme.bgDark}cc;
      border: 1px solid ${theme.secondary}22;
      border-radius: 24px;
      padding: 48px;
    }

    .report-content h1 {
      font-family: 'Noto Serif KR', serif;
      font-size: 28px;
      color: white;
      margin: 48px 0 24px 0;
      padding-bottom: 12px;
      border-bottom: 2px solid ${theme.accent}44;
    }

    .report-content h1:first-child {
      margin-top: 0;
    }

    .report-content h2 {
      font-size: 22px;
      color: ${theme.accent};
      margin: 36px 0 16px 0;
    }

    .report-content h3 {
      font-size: 18px;
      color: ${theme.secondary};
      margin: 24px 0 12px 0;
    }

    .report-content p {
      margin-bottom: 16px;
      color: #d0d0d0;
    }

    .report-content blockquote {
      background: ${theme.primary}22;
      border-left: 4px solid ${theme.accent};
      padding: 16px 24px;
      margin: 24px 0;
      border-radius: 0 12px 12px 0;
      font-style: italic;
      color: ${theme.secondary};
    }

    .report-content ul {
      margin: 16px 0;
      padding-left: 24px;
    }

    .report-content li {
      margin-bottom: 8px;
      color: #d0d0d0;
    }

    .report-content hr {
      border: none;
      height: 1px;
      background: ${theme.secondary}33;
      margin: 32px 0;
    }

    .report-content strong {
      color: ${theme.accent};
    }

    /* 푸터 */
    .footer {
      text-align: center;
      margin-top: 48px;
      padding: 32px;
      border-top: 1px solid ${theme.secondary}22;
    }

    .footer-logo {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .footer-text {
      font-size: 14px;
      color: ${theme.secondary}88;
    }

    .footer-date {
      font-size: 12px;
      color: ${theme.secondary}66;
      margin-top: 8px;
    }

    /* 반응형 */
    @media (max-width: 768px) {
      .figure-card {
        flex-direction: column;
        text-align: center;
      }

      .charts-section {
        grid-template-columns: 1fr;
      }

      .header-title {
        font-size: 28px;
      }

      .figure-name {
        font-size: 24px;
      }

      .sync-value {
        font-size: 32px;
      }
    }

    /* 프린트 스타일 */
    @media print {
      body {
        background: white;
        color: #333;
      }

      .pattern-overlay {
        display: none;
      }

      .container {
        max-width: 100%;
      }

      .report-content {
        background: white;
        border: 1px solid #ddd;
      }
    }
  </style>
</head>
<body>
  <div class="pattern-overlay"></div>
  
  <div class="container">
    <!-- 헤더 -->
    <header class="header">
      <div class="header-logo">🧭 MET MYTHIC REPORT</div>
      <h1 class="header-title">${data.archetypeName}: ${data.figureName}의 길</h1>
      <p class="header-subtitle">${theme.quote}</p>
    </header>

    <!-- 인물 카드 -->
    <section class="figure-card">
      <div class="figure-image">
        <span class="figure-emoji">${theme.emoji}</span>
        <span class="figure-placeholder">이미지 준비 중</span>
      </div>
      <div class="figure-info">
        <h2 class="figure-name">${data.figureName}</h2>
        <p class="figure-origin">${data.figureOrigin}</p>
        <span class="archetype-badge">${theme.emoji} ${data.archetypeName} • THE ${data.archetype.toUpperCase()}</span>
        <div class="sync-rate">
          <span class="sync-label">싱크로율</span>
          <span class="sync-value">${data.syncRate.toFixed(1)}</span>
          <span class="sync-unit">%</span>
        </div>
        <div class="level-section">
          <div class="level-dots">
            ${[1, 2, 3, 4].map(lv => `
              <div class="level-dot ${lv <= data.level ? 'active' : 'inactive'}">${lv}</div>
            `).join('')}
          </div>
          <span class="level-name">Lv.${data.level} — ${data.levelName}</span>
        </div>
      </div>
    </section>

    <!-- 차트 섹션 -->
    <section class="charts-section">
      <div class="chart-card">
        <h3 class="chart-title">🎯 동기 프로파일</h3>
        <div class="chart-container">
          <canvas id="motiveChart"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">🔥 점화 조건</h3>
        <div class="chart-container">
          <canvas id="ignitionChart"></canvas>
        </div>
      </div>
    </section>

    <!-- 인용문 -->
    <section class="quote-section">
      <p class="quote-text">"${theme.quote}"</p>
    </section>

    <!-- 본문 -->
    <article class="report-content">
      ${reportHtml}
    </article>

    <!-- 푸터 -->
    <footer class="footer">
      <div class="footer-logo">🧭</div>
      <p class="footer-text">MET Mythic — 당신의 동기 원형을 찾아드립니다</p>
      <p class="footer-date">생성일: ${now}</p>
    </footer>
  </div>

  <script>
    // 동기 레이더 차트
    const motiveCtx = document.getElementById('motiveChart').getContext('2d');
    new Chart(motiveCtx, {
      type: 'radar',
      data: {
        labels: ${JSON.stringify(data.motiveScores.map(m => m.name))},
        datasets: [{
          label: '동기 점수',
          data: ${JSON.stringify(data.motiveScores.map(m => m.score))},
          backgroundColor: '${theme.accent}33',
          borderColor: '${theme.accent}',
          borderWidth: 2,
          pointBackgroundColor: '${theme.accent}',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '${theme.accent}',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: '${theme.secondary}88',
              backdropColor: 'transparent',
            },
            grid: {
              color: '${theme.secondary}22',
            },
            angleLines: {
              color: '${theme.secondary}22',
            },
            pointLabels: {
              color: '${theme.secondary}',
              font: {
                size: 12,
                family: "'Noto Sans KR', sans-serif",
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // 점화조건 레이더 차트
    const ignitionCtx = document.getElementById('ignitionChart').getContext('2d');
    new Chart(ignitionCtx, {
      type: 'radar',
      data: {
        labels: ${JSON.stringify(data.ignitionScores.map(i => i.name))},
        datasets: [{
          label: '점화 점수',
          data: ${JSON.stringify(data.ignitionScores.map(i => i.score))},
          backgroundColor: '${theme.secondary}33',
          borderColor: '${theme.secondary}',
          borderWidth: 2,
          pointBackgroundColor: '${theme.secondary}',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '${theme.secondary}',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: '${theme.secondary}88',
              backdropColor: 'transparent',
            },
            grid: {
              color: '${theme.secondary}22',
            },
            angleLines: {
              color: '${theme.secondary}22',
            },
            pointLabels: {
              color: '${theme.secondary}',
              font: {
                size: 12,
                family: "'Noto Sans KR', sans-serif",
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  </script>
</body>
</html>`;
}

// 레벨 이름 가져오기
function getLevelName(archetype: string, level: number): string {
  const levelNames: Record<string, Record<number, string>> = {
    conqueror: { 1: '맹목적 파괴자', 2: '야망의 전사', 3: '전략적 정복자', 4: '승패를 초월한 자' },
    sage: { 1: '은둔하는 천재', 2: '삼고초려의 군사', 3: '출사표의 승상', 4: '영원한 지략가' },
    creator: { 1: '불완전한 창작자', 2: '기술의 연마자', 3: '걸작의 장인', 4: '창조의 화신' },
    sovereign: { 1: '힘에 취한 자', 2: '왕좌의 수호자', 3: '현명한 통치자', 4: '영원한 군주' },
    healer: { 1: '상처받은 치유자', 2: '공감의 손길', 3: '치유의 대가', 4: '자비의 화신' },
    guardian: { 1: '과잉 보호자', 2: '충실한 파수꾼', 3: '현명한 수호자', 4: '영원한 방패' },
    rebel: { 1: '무분별한 파괴자', 2: '대의의 반역자', 3: '변혁의 선구자', 4: '자유의 화신' },
    explorer: { 1: '도피하는 방랑자', 2: '목적의 탐험가', 3: '지혜로운 모험가', 4: '영원한 여행자' },
  };
  return levelNames[archetype.toLowerCase()]?.[level] || `레벨 ${level}`;
}

// HTML 파일 다운로드 트리거
export function downloadHtmlReport(
  fullResult: FullResult,
  reportMarkdown: string,
  filename?: string
): void {
  const html = generateHtmlReport(fullResult, reportMarkdown);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `MET_Mythic_Report_${fullResult.primaryArchetype.archetypeName}_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default { generateHtmlReport, downloadHtmlReport };