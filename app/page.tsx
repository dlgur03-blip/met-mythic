'use client';

import React, { useState, useEffect } from 'react';
import { TestScreen, ResultScreen, FullResultScreen, ReportViewer } from '@/components';
import { AdminPanel } from '@/components/AdminPanel';
import { KeyInput } from '@/components/KeyInput';
import { NicknameInput } from '@/components';
import { getLiteQuestions, calculateLiteScores } from '@/lib/lite_api';
import { getFullQuestions, calculateFullScores } from '@/lib/full_api';
import type { Answer } from '@/lib/types';
import type { LiteResult } from '@/lib/lite_api';
import type { FullResult } from '@/lib/full_api';

type AppState = 'home' | 'testing' | 'result' | 'report';
type TestVersion = 'lite' | 'full';

// localStorage 키
const KEY_STORAGE = 'met-mythic-access';
const NICKNAME_STORAGE = 'met-mythic-nickname';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('home');
  const [testVersion, setTestVersion] = useState<TestVersion>('lite');
  const [liteResult, setLiteResult] = useState<LiteResult | null>(null);
  const [fullResult, setFullResult] = useState<FullResult | null>(null);
  
  // 관리자 & 암호키 & 닉네임 상태
  const [showAdmin, setShowAdmin] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [compassClicks, setCompassClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isKeyVerified, setIsKeyVerified] = useState(false);
  const [nickname, setNickname] = useState<string>('');
  const [pendingVersion, setPendingVersion] = useState<TestVersion>('lite');
  
  // 🆕 테스트 모드 상태
  const [isTestMode, setIsTestMode] = useState(false);
  const [testDescription, setTestDescription] = useState<string>('');

  const liteData = getLiteQuestions();
  const fullData = getFullQuestions();

  // 페이지 로드 시 저장된 데이터 확인
  useEffect(() => {
    try {
      // 암호키 확인
      const savedKey = localStorage.getItem(KEY_STORAGE);
      if (savedKey) {
        setIsKeyVerified(true);
      }
      
      // 닉네임 확인
      const savedNickname = localStorage.getItem(NICKNAME_STORAGE);
      if (savedNickname) {
        setNickname(savedNickname);
      }
    } catch (e) {
      console.error('Failed to load saved data:', e);
    }
  }, []);

  // 나침반 클릭 핸들러 (5번 연속 클릭 감지)
  const handleCompassClick = () => {
    const now = Date.now();
    
    if (now - lastClickTime < 1000) {
      const newClicks = compassClicks + 1;
      setCompassClicks(newClicks);
      
      if (newClicks >= 5) {
        setShowAdmin(true);
        setCompassClicks(0);
      }
    } else {
      setCompassClicks(1);
    }
    
    setLastClickTime(now);
  };

  const handleStartTest = (version: TestVersion) => {
    setPendingVersion(version);
    
    if (version === 'full' && !isKeyVerified) {
      // Full 버전인데 암호키 미인증 → 암호키 먼저
      setShowKeyInput(true);
    } else {
      // 닉네임 입력으로 이동
      setShowNicknameInput(true);
    }
  };

  // 암호키 인증 성공
  const handleKeySuccess = () => {
    try {
      localStorage.setItem(KEY_STORAGE, JSON.stringify({
        verified: true,
        timestamp: new Date().toISOString(),
      }));
    } catch (e) {
      console.error('Failed to save key verification:', e);
    }
    
    setIsKeyVerified(true);
    setShowKeyInput(false);
    // 암호키 인증 후 닉네임 입력으로
    setShowNicknameInput(true);
  };

  // 닉네임 입력 완료
  const handleNicknameSubmit = (inputNickname: string) => {
    setNickname(inputNickname);
    
    // localStorage에 저장
    try {
      localStorage.setItem(NICKNAME_STORAGE, inputNickname);
    } catch (e) {
      console.error('Failed to save nickname:', e);
    }
    
    setShowNicknameInput(false);
    setTestVersion(pendingVersion);
    setIsTestMode(false);  // 일반 모드
    setAppState('testing');
  };

  // 닉네임 건너뛰기
  const handleNicknameSkip = () => {
    setNickname('');
    setShowNicknameInput(false);
    setTestVersion(pendingVersion);
    setIsTestMode(false);  // 일반 모드
    setAppState('testing');
  };

  // 🆕 테스트 모드 완료 핸들러
  const handleTestComplete = (result: FullResult, description: string) => {
    setFullResult(result);
    setTestVersion('full');
    setIsTestMode(true);
    setTestDescription(description);
    setShowNicknameInput(false);
    setAppState('result');
  };

  const handleComplete = (answers: Answer[]) => {
    if (testVersion === 'lite') {
      const result = calculateLiteScores(answers);
      // nickname 추가
      (result as any).nickname = nickname || undefined;
      setLiteResult(result);
    } else {
      const result = calculateFullScores(answers);
      // nickname 추가
      result.nickname = nickname || undefined;
      setFullResult(result);
    }
    setIsTestMode(false);  // 실제 테스트는 테스트 모드 아님
    setAppState('result');
  };

  const handleRetry = () => {
    setLiteResult(null);
    setFullResult(null);
    setIsTestMode(false);
    setTestDescription('');
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
        {/* 상단 네비게이션 */}
        <nav className="fixed top-0 left-0 right-0 z-40 p-4">
          <div className="max-w-lg mx-auto flex justify-end">
            <a 
              href="/about"
              className="px-4 py-2 bg-white/10 backdrop-blur text-white/80 rounded-lg text-sm hover:bg-white/20 transition-colors"
            >
              ✨ 소개
            </a>
          </div>
        </nav>
        
        {/* 관리자 패널 */}
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        
        {/* 암호키 입력 */}
        {showKeyInput && (
          <KeyInput 
            onSuccess={handleKeySuccess} 
            onCancel={() => setShowKeyInput(false)} 
          />
        )}

        {/* 닉네임 입력 - 🆕 onTestComplete 추가 */}
        {showNicknameInput && (
          <NicknameInput
            version={pendingVersion}
            onSubmit={handleNicknameSubmit}
            onSkip={handleNicknameSkip}
            onTestComplete={handleTestComplete}
          />
        )}

        <div className="max-w-lg w-full">
          {/* 로고 */}
          <div className="text-center mb-8">
            <div 
              onClick={handleCompassClick}
              className="w-24 h-24 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-6 cursor-pointer select-none hover:bg-white/15 transition-colors"
            >
              <span className="text-5xl">🧭</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              MET Mythic
            </h1>
            <p className="text-indigo-200">
              당신의 동기 원형을 찾아드립니다
            </p>
            
            {/* 닉네임 표시 */}
            {nickname && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                <span className="text-sm text-indigo-200">👤 {nickname}</span>
                <button
                  onClick={() => {
                    setNickname('');
                    localStorage.removeItem(NICKNAME_STORAGE);
                  }}
                  className="text-indigo-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            )}
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
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
            >
              {/* 잠금/해제 아이콘 */}
              <div className="absolute top-3 right-3">
                <span className="text-white/60 text-lg">
                  {isKeyVerified ? '🔓' : '🔒'}
                </span>
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔮</span>
                    <h3 className="text-xl font-bold text-white">Full 버전</h3>
                    {isKeyVerified && (
                      <span className="px-2 py-0.5 bg-green-500/30 text-green-200 text-xs rounded-full">
                        인증됨 ✓
                      </span>
                    )}
                    {!isKeyVerified && (
                      <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                        상세 분석
                      </span>
                    )}
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
                <div className="font-medium text-white mb-1">
                  Full {isKeyVerified ? '🔓' : '🔒'}
                </div>
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
    // 🆕 테스트 모드 배너
    const TestModeBanner = isTestMode ? (
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black py-2 px-4 text-center font-medium">
        {testDescription}
        <button 
          onClick={handleRetry}
          className="ml-4 px-3 py-1 bg-black/20 rounded text-sm hover:bg-black/30"
        >
          홈으로
        </button>
      </div>
    ) : null;

    if (testVersion === 'lite' && liteResult) {
      return (
        <>
          {TestModeBanner}
          <div className={isTestMode ? 'pt-12' : ''}>
            <ResultScreen
              result={liteResult}
              onRetry={handleRetry}
              onViewFull={() => handleStartTest('full')}
            />
          </div>
        </>
      );
    }
    
    if (testVersion === 'full' && fullResult) {
      return (
        <>
          {TestModeBanner}
          <div className={isTestMode ? 'pt-12' : ''}>
            <FullResultScreen
              result={fullResult}
              onRetry={handleRetry}
              onGenerateReport={handleGenerateReport}
            />
          </div>
        </>
      );
    }
  }

  // AI 보고서 화면
  if (appState === 'report' && fullResult) {
    // 🆕 테스트 모드 배너
    const TestModeBanner = isTestMode ? (
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black py-2 px-4 text-center font-medium">
        {testDescription}
      </div>
    ) : null;

    return (
      <>
        {TestModeBanner}
        <div className={isTestMode ? 'pt-12' : ''}>
          <ReportViewer
            result={fullResult}
            onBack={handleBackFromReport}
          />
        </div>
      </>
    );
  }

  return null;
}