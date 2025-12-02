'use client';

import React from 'react';
import type { LiteResult } from '@/lib/lite_api';

interface ResultScreenProps {
  result: LiteResult;
  onRetry?: () => void;
  onViewFull?: () => void;
}

export function ResultScreen({ result, onRetry, onViewFull }: ResultScreenProps) {
  const motiveNames: Record<string, string> = {
    achievement: '성취', mastery: '통달', creation: '창조', recognition: '인정',
    connection: '연결', security: '안정', freedom: '자유', adventure: '모험',
  };

  const ignitionNames: Record<string, string> = {
    competition: '경쟁', complexity: '복잡성', deadline: '마감',
    audience: '관중', autonomy: '자율', crisis: '위기',
  };

  const levelDescriptions: Record<number, string> = {
    1: '그림자 - 동기를 탐색하는 단계',
    2: '각성 - 동기를 인식하는 단계',
    3: '통합 - 동기를 조화시키는 단계',
    4: '초월 - 동기를 자유롭게 다루는 단계',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* 헤더 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-5xl">⚔️</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {result.primaryArchetype.archetypeName}
          </h1>
          <p className="text-gray-500 mb-4">
            {result.primaryArchetype.archetypeNameEn}
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
            <span className="text-indigo-600 font-medium">
              {result.primaryFigure.figureName}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 text-sm">
              {result.primaryFigure.origin}
            </span>
          </div>
          
          <div className="mt-4">
            <div className="text-4xl font-bold text-indigo-600">
              {Math.round(result.primaryArchetype.score)}%
            </div>
            <div className="text-sm text-gray-500">싱크로율</div>
          </div>
        </div>

        {/* 동기 원천 Top 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🎯 핵심 동기
          </h2>
          <div className="space-y-3">
            {result.motiveScores.slice(0, 3).map((score, index) => (
              <div key={score.motive} className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                    index === 1 ? 'bg-gray-100 text-gray-600' : 
                    'bg-orange-50 text-orange-600'}
                `}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700">
                      {motiveNames[score.motive]}
                    </span>
                    <span className="text-gray-500">{score.score}점</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${score.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 점화 조건 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ⚡ 점화 조건
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {result.ignitionScores.slice(0, 4).map((score) => (
              <div 
                key={score.condition}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {score.score}
                </div>
                <div className="text-sm text-gray-600">
                  {ignitionNames[score.condition]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 성숙도 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🌱 성숙도
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold text-purple-600">
              Lv.{result.maturityLevel}
            </div>
            <div className="flex-1">
              <div className="text-gray-700 font-medium">
                {levelDescriptions[result.maturityLevel]}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                종합 점수: {result.maturityScore}점
              </div>
            </div>
          </div>
          
          {/* 레벨 게이지 */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(level => (
              <div 
                key={level}
                className={`
                  flex-1 h-3 rounded-full
                  ${level <= result.maturityLevel 
                    ? 'bg-purple-500' 
                    : 'bg-gray-200'}
                `}
              />
            ))}
          </div>
        </div>

        {/* 검증 상태 */}
        {!result.isValid && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 text-xl">⚠️</span>
              <div>
                <div className="font-medium text-yellow-700">응답 검증 알림</div>
                <div className="text-sm text-yellow-600 mt-1">
                  일부 응답에서 일관성이 낮게 나타났습니다. 
                  결과 해석 시 참고해 주세요.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lite 제한 안내 */}
        <div className="bg-indigo-50 rounded-xl p-4">
          <div className="text-sm text-indigo-700">
            <strong>Lite 버전</strong>입니다. Full 버전에서 다음을 추가로 확인할 수 있습니다:
          </div>
          <ul className="text-sm text-indigo-600 mt-2 space-y-1">
            {result.limitations.slice(0, 3).map((limit, i) => (
              <li key={i}>• {limit}</li>
            ))}
          </ul>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium
                       hover:bg-gray-50 transition-colors duration-200"
            >
              다시 검사하기
            </button>
          )}
          {onViewFull && (
            <button
              onClick={onViewFull}
              className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-medium
                       hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
            >
              Full 버전 보기
            </button>
          )}
        </div>

        {/* 완료 시간 */}
        <div className="text-center text-sm text-gray-400">
          검사 완료: {result.completedAt.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
