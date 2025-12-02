'use client';

import React, { useState } from 'react';
import { TestScreen, ResultScreen, FullResultScreen, ReportViewer } from '@/components';
import { getLiteQuestions, calculateLiteScores } from '@/lib/lite_api';
import { getFullQuestions, calculateFullScores } from '@/lib/full_api';
import type { Answer } from '@/lib/types';
import type { LiteResult } from '@/lib/lite_api';
import type { FullResult } from '@/lib/full_api';

type AppState = 'home' | 'testing' | 'result' | 'report';
type TestVersion = 'lite' | 'full';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('home');
  const [testVersion, setTestVersion] = useState<TestVersion>('lite');
  const [liteResult, setLiteResult] = useState<LiteResult | null>(null);
  const [fullResult, setFullResult] = useState<FullResult | null>(null);

  const liteData = getLiteQuestions();
  const fullData = getFullQuestions();

  const handleStartTest = (version: TestVersion) => {
    setTestVersion(version);
    setAppState('testing');
  };

  const handleComplete = (answers: Answer[]) => {
    if (testVersion === 'lite') {
      const result = calculateLiteScores(answers);
      setLiteResult(result);
    } else {
      const result = calculateFullScores(answers);
      setFullResult(result);
    }
    setAppState('result');
  };

  const handleRetry = () => {
    setLiteResult(null);
    setFullResult(null);
    setAppState('home');
  };

  const handleGenerateReport = () => {
    if (fullResult) {
      setAppState('report');
    }
  };

  const handleBackFromReport = () => {
    setAppState('result');
  };

  // 홈 화면
  if (appState === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* 로고 */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🧭</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              MET Mythic
            </h1>
            <p className="text-indigo-200">
              당신의 동기 원형을 찾아드립니다
            </p>
          </div>

          {/* 버전 선택 카드 */}
          <div className="space-y-4">
            {/* Lite 버전 */}
            <button
              onClick={() => handleStartTest('lite')}
              className="w-full bg-white rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⚡</span>
                    <h3 className="text-xl font-bold text-gray-900">Lite 버전</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    빠르게 나의 동기 원형을 파악합니다
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>📝 {liteData.stats.total}문항</span>
                    <span>⏱️ {liteData.estimatedTime}</span>
                  </div>
                </div>
                <div className="text-indigo-600 group-hover:translate-x-1 transition-transform text-xl">
                  →
                </div>
              </div>
            </button>

            {/* Full 버전 */}
            <button
              onClick={() => handleStartTest('full')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔮</span>
                    <h3 className="text-xl font-bold text-white">Full 버전</h3>
                    <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                      상세 분석
                    </span>
                  </div>
                  <p className="text-purple-100 text-sm mb-3">
                    깊이 있는 분석과 숨겨진 동기까지 탐색
                  </p>
                  <div className="flex gap-4 text-sm text-purple-200">
                    <span>📝 {fullData.stats.total}문항</span>
                    <span>⏱️ {fullData.estimatedTime}</span>
                  </div>
                </div>
                <div className="text-white group-hover:translate-x-1 transition-transform text-xl">
                  →
                </div>
              </div>
            </button>
          </div>

          {/* 버전 비교 */}
          <div className="mt-6 bg-white/5 backdrop-blur rounded-xl p-4">
            <h4 className="text-sm font-medium text-white mb-3">버전 비교</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-indigo-200">
                <div className="font-medium text-white mb-1">Lite</div>
                <ul className="space-y-1 text-xs">
                  <li>✓ 동기 원천 분석</li>
                  <li>✓ 원형 매칭</li>
                  <li>✓ 점화 조건</li>
                  <li>✓ 성숙도 레벨</li>
                </ul>
              </div>
              <div className="text-purple-200">
                <div className="font-medium text-white mb-1">Full</div>
                <ul className="space-y-1 text-xs">
                  <li>✓ Lite 포함 전부</li>
                  <li>✓ 숨겨진 동기</li>
                  <li>✓ 동기 충돌 분석</li>
                  <li>✓ 상황별 변화</li>
                  <li>✓ 에너지 패턴</li>
                  <li>✓ <strong>AI 2만자 보고서</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className="mt-6 text-center text-sm text-indigo-200/60">
            <p>8개의 동기 원천과 8개의 신화 원형을 분석합니다</p>
            <p className="mt-1">정답은 없습니다. 솔직하게 응답해 주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  // 테스트 화면
  if (appState === 'testing') {
    const questions = testVersion === 'lite' ? liteData.questions : fullData.questions;
    
    return (
      <TestScreen
        questions={questions}
        version={testVersion}
        onComplete={handleComplete}
      />
    );
  }

  // 결과 화면
  if (appState === 'result') {
    if (testVersion === 'lite' && liteResult) {
      return (
        <ResultScreen
          result={liteResult}
          onRetry={handleRetry}
          onViewFull={() => handleStartTest('full')}
        />
      );
    }
    
    if (testVersion === 'full' && fullResult) {
      return (
        <FullResultScreen
          result={fullResult}
          onRetry={handleRetry}
          onGenerateReport={handleGenerateReport}
        />
      );
    }
  }

  // AI 보고서 화면
  if (appState === 'report' && fullResult) {
    return (
      <ReportViewer
        result={fullResult}
        onBack={handleBackFromReport}
      />
    );
  }

  return null;
}
