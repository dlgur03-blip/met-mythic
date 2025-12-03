'use client';

import React, { useState } from 'react';
import type { FullResult } from '@/lib/full_api';
import type { ReportResponse } from '@/lib/report_generator';
import { generateHtmlReport } from '@/lib/htmlReportGenerator';
import { EmailModal } from './EmailModal';

interface ReportViewerProps {
  result: FullResult;
  onBack: () => void;
}

type ViewState = 'idle' | 'loading' | 'success' | 'error';

export function ReportViewer({ result, onBack }: ReportViewerProps) {
  const [viewState, setViewState] = useState<ViewState>('idle');
  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [tokensUsed, setTokensUsed] = useState<number>(0);
  
  // 이메일 모달 상태
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const generateReport = async () => {
    setViewState('loading');
    setError('');

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullResult: result }),
      });

      const data: ReportResponse = await response.json();

      if (data.success && data.report) {
        setReport(data.report);
        setTokensUsed(data.tokensUsed || 0);
        setViewState('success');
      } else {
        setError(data.error || '보고서 생성에 실패했습니다.');
        setViewState('error');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      setViewState('error');
    }
  };

  // 마크다운을 HTML로 변환 (개선된 버전)
  const renderMarkdown = (md: string) => {
    let html = md
      // 헤더
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-6 pb-2 border-b border-purple-500/30">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-12 mb-8">$1</h1>')
      // 굵게
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-purple-300">$1</strong>')
      // 이탤릭
      .replace(/\*(.+?)\*/g, '<em class="italic text-purple-200">$1</em>')
      // 인용문
      .replace(/^>\s*(.+)$/gm, '<blockquote class="border-l-4 border-purple-500 pl-4 my-4 text-purple-200 italic">$1</blockquote>')
      // 구분선
      .replace(/^---$/gm, '<hr class="my-8 border-purple-500/30">')
      // 코드 블록
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/30 rounded-lg p-4 my-4 overflow-x-auto text-sm text-purple-100"><code>$1</code></pre>')
      // 인라인 코드
      .replace(/`(.+?)`/g, '<code class="bg-black/30 px-2 py-1 rounded text-purple-200">$1</code>')
      // 테이블 (간단한 변환)
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        const isHeader = cells.some(c => c.includes('---'));
        if (isHeader) return '';
        return `<tr class="border-b border-purple-500/20">${cells.map(c => `<td class="px-4 py-2 text-purple-100">${c.trim()}</td>`).join('')}</tr>`;
      })
      // 리스트
      .replace(/^- (.+)$/gm, '<li class="ml-4 text-purple-100">• $1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-purple-100">$1. $2</li>')
      // 줄바꿈
      .replace(/\n\n/g, '</p><p class="my-4 text-purple-100 leading-relaxed">')
      .replace(/\n/g, '<br>');

    return `<div class="prose-custom"><p class="my-4 text-purple-100 leading-relaxed">${html}</p></div>`;
  };

  // 이메일 전송
  const handleEmailSubmit = async (email: string) => {
    setIsEmailSending(true);
    
    try {
      // HTML 보고서 생성
      const htmlContent = generateHtmlReport(result, report);
      
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          htmlContent,
          archetypeName: result.primaryArchetype.archetypeName,
          figureName: result.primaryFigure.figureName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setEmailSent(true);
        setIsEmailModalOpen(false);
        // 3초 후 성공 메시지 숨김
        setTimeout(() => setEmailSent(false), 5000);
      } else {
        throw new Error(data.error || '이메일 전송 실패');
      }
    } catch (err) {
      console.error('Email send error:', err);
      throw err;
    } finally {
      setIsEmailSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 헤더 */}
      <div className="bg-black/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
            >
              <span>←</span>
              <span>결과로 돌아가기</span>
            </button>
            
            {viewState === 'success' && (
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors text-sm flex items-center gap-2"
              >
                <span>📧</span>
                <span>이메일로 받기</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 이메일 전송 성공 알림 */}
      {emailSent && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          ✅ 이메일이 전송되었습니다! 받은편지함을 확인해주세요.
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 시작 전 상태 */}
        {viewState === 'idle' && (
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📜</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              AI 상세 보고서 생성
            </h2>
            
            <p className="text-purple-200 mb-6 max-w-md mx-auto">
              당신의 검사 결과를 바탕으로 2만자 내외의 상세한 분석 보고서를 생성합니다.
              신화적 서술과 함께 깊이 있는 인사이트를 제공합니다.
            </p>
            
            <div className="bg-white/5 rounded-xl p-4 mb-6 text-left max-w-sm mx-auto">
              <h3 className="text-sm font-medium text-white mb-2">보고서 포함 내용:</h3>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>✓ 원형 상세 분석</li>
                <li>✓ 신화 인물 매칭 해설</li>
                <li>✓ 8개 동기 심층 분석</li>
                <li>✓ 점화 조건 및 에너지 패턴</li>
                <li>✓ 숨겨진 동기 탐구</li>
                <li>✓ 성장 방향 및 처방</li>
                <li>✓ 검증 가능한 예측</li>
              </ul>
            </div>
            
            <button
              onClick={generateReport}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium
                       hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg text-lg"
            >
              🤖 보고서 생성 시작
            </button>
            
            <p className="text-xs text-purple-400 mt-4">
              생성에 약 30초~1분 정도 소요됩니다
            </p>
          </div>
        )}

        {/* 로딩 상태 */}
        {viewState === 'loading' && (
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-5xl">🔮</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              보고서 생성 중...
            </h2>
            
            <p className="text-purple-200 mb-6">
              당신의 동기 데이터를 분석하고 있습니다.
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="animate-spin w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full" />
            </div>
            
            <div className="text-sm text-purple-300 space-y-2">
              <p>✓ 동기 프로파일 분석 완료</p>
              <p>✓ 원형 마크다운 로드 완료</p>
              <p className="animate-pulse">→ AI가 보고서를 작성 중...</p>
            </div>
          </div>
        )}

        {/* 에러 상태 */}
        {viewState === 'error' && (
          <div className="bg-red-500/20 backdrop-blur rounded-3xl p-8 text-center">
            <div className="w-24 h-24 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">⚠️</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              보고서 생성 실패
            </h2>
            
            <p className="text-red-200 mb-6">
              {error}
            </p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setViewState('idle')}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
              >
                다시 시도
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
              >
                결과로 돌아가기
              </button>
            </div>
          </div>
        )}

        {/* 성공 상태 - 보고서 표시 */}
        {viewState === 'success' && (
          <div className="space-y-6">
            {/* 보고서 메타 정보 */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  MET Mythic AI 보고서
                </h2>
                <p className="text-sm text-purple-300">
                  {result.primaryArchetype.archetypeName} · {result.primaryFigure.figureName}
                </p>
              </div>
              <div className="text-right text-sm text-purple-300">
                <p>{report.length.toLocaleString()}자</p>
                {tokensUsed > 0 && <p>{tokensUsed.toLocaleString()} tokens</p>}
              </div>
            </div>

            {/* 보고서 본문 */}
            <div 
              className="bg-white/5 backdrop-blur rounded-2xl p-8"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(report) }}
            />

            {/* 하단 이메일 버튼 (큰 버튼) */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium
                         hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg text-lg flex items-center gap-3"
              >
                <span className="text-2xl">📧</span>
                <div className="text-left">
                  <div>이메일로 보고서 받기</div>
                  <div className="text-xs text-purple-200">예쁜 HTML 보고서를 이메일로 보내드려요</div>
                </div>
              </button>
            </div>
            
            {/* 안내 문구 */}
            <p className="text-center text-sm text-purple-400">
              💡 카카오톡 등 인앱 브라우저에서는 이메일로 받으시면 편해요!
            </p>
          </div>
        )}
      </div>

      {/* 이메일 모달 */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
        isLoading={isEmailSending}
      />
    </div>
  );
}

export default ReportViewer;