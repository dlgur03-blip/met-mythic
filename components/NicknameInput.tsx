'use client';

import React, { useState } from 'react';
import { 
  isTestNickname, 
  parseTestType, 
  generateDummyAnswers, 
  getTestDescription 
} from '@/lib/test-utils';
import { calculateFullScores } from '@/lib/full_api';
import type { FullResult } from '@/lib/full_api';

interface NicknameInputProps {
  onSubmit: (nickname: string) => void;
  onSkip: () => void;
  version: 'lite' | 'full';
  // 🆕 테스트 모드 완료 콜백
  onTestComplete?: (result: FullResult, testDescription: string) => void;
}

export function NicknameInput({ onSubmit, onSkip, version, onTestComplete }: NicknameInputProps) {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    
    if (!trimmed) {
      onSkip();
      return;
    }
    
    // 🔥 테스트 모드 체크
    if (isTestNickname(trimmed)) {
      setIsLoading(true);
      
      try {
        const testType = parseTestType(trimmed);
        const description = getTestDescription(testType);
        
        // 더미 답변 생성
        const dummyAnswers = generateDummyAnswers(testType);
        
        // 점수 계산
        const results = calculateFullScores(dummyAnswers);
        
        // 닉네임 추가
        results.nickname = trimmed;
        
        // 콘솔에 테스트 정보 출력 (개발용)
        console.log('🧪 Test Mode:', description);
        console.log('📊 Results:', results);
        
        // 콜백으로 결과 전달
        if (onTestComplete) {
          onTestComplete(results, description);
        }
      } catch (error) {
        console.error('Test mode error:', error);
        setIsLoading(false);
      }
      return;
    }
    
    // 일반 닉네임은 기존 로직
    onSubmit(trimmed);
  };

  // 테스트 버튼 클릭 핸들러
  const handleTestClick = (testNickname: string) => {
    setNickname(testNickname);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* 모달 */}
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* 아이콘 */}
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">👤</span>
        </div>

        {/* 제목 */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          검사 시작 전에
        </h2>
        <p className="text-gray-600 text-center mb-6">
          결과에 표시될 이름을 입력하세요
        </p>

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="이름 또는 닉네임"
              maxLength={20}
              disabled={isLoading}
              className="w-full px-4 py-4 bg-gray-100 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 text-center text-lg font-medium
                       focus:outline-none focus:border-indigo-500 focus:bg-white transition-all
                       disabled:opacity-50"
              autoFocus
            />
          </div>

          {/* 예시 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 mb-2">💡 이렇게 사용돼요</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 결과: "<strong>{nickname || '홍길동'}</strong>님의 동기 원형은..."</li>
              <li>• 보고서: "<strong>{nickname || '홍길동'}</strong>의 성취 동기 분석"</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium
                     hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg text-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                테스트 생성 중...
              </span>
            ) : (
              <>{version === 'full' ? '🔮' : '⚡'} 검사 시작하기</>
            )}
          </button>
        </form>

        {/* 건너뛰기 */}
        <button
          onClick={onSkip}
          disabled={isLoading}
          className="w-full mt-3 py-3 text-gray-500 hover:text-gray-700 transition-colors text-sm
                   disabled:opacity-50"
        >
          건너뛰기 (익명으로 진행)
        </button>

        {/* 안내 */}
        <p className="text-xs text-gray-400 text-center mt-4">
          실명, 닉네임, 직책 모두 가능해요<br />
          예: 김대리, 마케팅팀 A, 나
        </p>

        {/* 🔥 개발자 테스트 모드 (development 환경에서만 표시) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="font-bold text-yellow-800 mb-2 text-sm">🧪 개발자 테스트 모드</p>
            <p className="text-xs text-yellow-700 mb-3">클릭 → 자동입력 → 시작 버튼</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '🎲 랜덤', value: 'test' },
                { label: '⚔️ 정복자', value: 'test-정복자' },
                { label: '📚 현자', value: 'test-현자' },
                { label: '🔥 반역자', value: 'test-반역자' },
                { label: '🧭 탐험가', value: 'test-탐험가' },
                { label: '💚 치유자', value: 'test-치유자' },
                { label: '⚡ 빠른응답', value: 'test-fast' },
                { label: '🐢 느린응답', value: 'test-slow' },
                { label: '😴 무성의', value: 'test-무성의' },
                { label: '📊 극단값', value: 'test-극단' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleTestClick(opt.value)}
                  className="px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NicknameInput;