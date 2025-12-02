'use client';

import React, { useState } from 'react';
import type { FullResult } from '@/lib/full_api';

interface FullResultScreenProps {
  result: FullResult;
  onRetry?: () => void;
  onGenerateReport?: () => void;
}

type TabType = 'overview' | 'motives' | 'archetype' | 'energy' | 'hidden' | 'growth';

export function FullResultScreen({ result, onRetry, onGenerateReport }: FullResultScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const motiveNames: Record<string, string> = {
    achievement: '성취', mastery: '통달', creation: '창조', recognition: '인정',
    connection: '연결', security: '안정', freedom: '자유', adventure: '모험',
  };

  const ignitionNames: Record<string, string> = {
    competition: '경쟁', complexity: '복잡성', deadline: '마감',
    audience: '관중', autonomy: '자율', crisis: '위기',
  };

  const directionNames: Record<string, string> = {
    approach: '접근', avoidance: '회피',
  };

  const operationLabels: Record<string, { left: string; right: string }> = {
    rhythm: { left: '계획형', right: '즉흥형' },
    recharge: { left: '고독 충전', right: '사회적 충전' },
    release: { left: '지구력형', right: '폭발형' },
    recovery: { left: '빠른 회복', right: '느린 회복' },
  };

  const levelDescriptions: Record<number, { name: string; desc: string }> = {
    1: { name: '그림자', desc: '동기를 탐색하는 단계' },
    2: { name: '각성', desc: '동기를 인식하는 단계' },
    3: { name: '통합', desc: '동기를 조화시키는 단계' },
    4: { name: '초월', desc: '동기를 자유롭게 다루는 단계' },
  };

  const tabs: { key: TabType; label: string; emoji: string }[] = [
    { key: 'overview', label: '개요', emoji: '🎯' },
    { key: 'motives', label: '동기', emoji: '💫' },
    { key: 'archetype', label: '원형', emoji: '🏛️' },
    { key: 'energy', label: '에너지', emoji: '⚡' },
    { key: 'hidden', label: '숨겨진', emoji: '🌙' },
    { key: 'growth', label: '성장', emoji: '🌱' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 헤더 */}
      <div className="bg-black/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{result.primaryArchetype.emoji}</span>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {result.primaryArchetype.archetypeName}
                </h1>
                <p className="text-purple-300 text-sm">
                  {result.primaryFigure.figureName} · {result.primaryArchetype.score}% 싱크로
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">
                Lv.{result.maturity.level}
              </div>
              <div className="text-xs text-purple-300">
                {levelDescriptions[result.maturity.level].name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-black/20 backdrop-blur-sm sticky top-[72px] z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all
                  ${activeTab === tab.key 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'}
                `}
              >
                <span>{tab.emoji}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* 개요 탭 */}
        {activeTab === 'overview' && (
          <>
            {/* 원형 카드 */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-6xl">{result.primaryArchetype.emoji}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">
                {result.primaryArchetype.archetypeName}
              </h2>
              <p className="text-purple-300 mb-6">
                {result.primaryArchetype.archetypeNameEn}
              </p>
              
              <div className="flex justify-center gap-8 mb-6">
                <div>
                  <div className="text-4xl font-bold text-purple-400">
                    {Math.round(result.primaryArchetype.score)}%
                  </div>
                  <div className="text-sm text-purple-300">싱크로율</div>
                </div>
                <div className="w-px bg-purple-500/30" />
                <div>
                  <div className="text-4xl font-bold text-pink-400">
                    {result.primaryFigure.figureName}
                  </div>
                  <div className="text-sm text-purple-300">{result.primaryFigure.origin}</div>
                </div>
              </div>
              
              {/* 2위 원형 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                <span>{result.secondaryArchetype.emoji}</span>
                <span className="text-purple-200">
                  2위: {result.secondaryArchetype.archetypeName} ({result.secondaryArchetype.score}%)
                </span>
              </div>
            </div>

            {/* Top 3 동기 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">핵심 동기 Top 3</h3>
              <div className="space-y-4">
                {result.motiveScores.slice(0, 3).map((score, index) => (
                  <div key={score.motive} className="flex items-center gap-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                      ${index === 0 ? 'bg-yellow-500 text-yellow-900' : 
                        index === 1 ? 'bg-gray-400 text-gray-900' : 
                        'bg-orange-400 text-orange-900'}
                    `}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-white">
                          {motiveNames[score.motive]}
                        </span>
                        <span className="text-purple-300">{score.score}점</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${score.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 점화 조건 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">⚡ 점화 조건</h3>
              <div className="grid grid-cols-3 gap-3">
                {result.ignitionScores.slice(0, 6).map((score) => (
                  <div 
                    key={score.condition}
                    className="bg-white/10 rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {score.score}
                    </div>
                    <div className="text-xs text-purple-200">
                      {ignitionNames[score.condition]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 동기 탭 */}
        {activeTab === 'motives' && (
          <>
            {/* 전체 동기 점수 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">동기 원천 8가지</h3>
              <div className="space-y-4">
                {result.motiveScores.map((score) => (
                  <div key={score.motive}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium">
                        {score.rank}. {motiveNames[score.motive]}
                      </span>
                      <span className="text-purple-300">{score.score}점</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          score.rank <= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                          score.rank <= 4 ? 'bg-purple-500/70' :
                          'bg-purple-500/40'
                        }`}
                        style={{ width: `${score.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 방향 (접근 vs 회피) */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">동기 방향</h3>
              <div className="space-y-4">
                {result.directionScores.slice(0, 4).map((dir) => (
                  <div key={dir.motive}>
                    <div className="text-sm text-purple-200 mb-2">{motiveNames[dir.motive]}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400 w-12">접근</span>
                      <div className="flex-1 flex h-4 rounded-full overflow-hidden bg-white/10">
                        <div 
                          className="bg-green-500 transition-all"
                          style={{ width: `${dir.approach}%` }}
                        />
                        <div 
                          className="bg-red-500 transition-all"
                          style={{ width: `${dir.avoidance}%` }}
                        />
                      </div>
                      <span className="text-xs text-red-400 w-12 text-right">회피</span>
                    </div>
                    <div className="flex justify-between text-xs text-purple-300 mt-1">
                      <span>{dir.approach}%</span>
                      <span>{dir.avoidance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 운영 방식 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">운영 방식</h3>
              <div className="space-y-4">
                {result.operationScores.map((op) => {
                  const labels = operationLabels[op.axis];
                  return (
                    <div key={op.axis}>
                      <div className="flex justify-between text-xs text-purple-200 mb-2">
                        <span>{labels?.left || op.axis}</span>
                        <span>{labels?.right || ''}</span>
                      </div>
                      <div className="relative h-4 bg-white/10 rounded-full">
                        <div 
                          className="absolute top-0 h-4 w-4 bg-purple-500 rounded-full transform -translate-x-1/2 transition-all"
                          style={{ left: `${50 + op.score}%` }}
                        />
                        <div className="absolute top-0 left-1/2 h-4 w-0.5 bg-white/30" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* 원형 탭 */}
        {activeTab === 'archetype' && (
          <>
            {/* 전체 원형 순위 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">8개 원형 매칭</h3>
              <div className="space-y-3">
                {result.allArchetypes.map((arch) => (
                  <div 
                    key={arch.archetype}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      arch.rank === 1 ? 'bg-purple-500/30 ring-2 ring-purple-400' :
                      arch.rank === 2 ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${arch.rank === 1 ? 'bg-purple-500 text-white' :
                        arch.rank === 2 ? 'bg-white/20 text-white' :
                        'bg-white/10 text-purple-300'}
                    `}>
                      {arch.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{arch.archetypeName}</div>
                      <div className="text-xs text-purple-300">{arch.archetypeNameEn}</div>
                    </div>
                    <div className="text-purple-300 font-medium">
                      {arch.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 매칭 인물들 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {result.primaryArchetype.archetypeName}의 신화 인물
              </h3>
              <div className="space-y-3">
                {result.topFigures.map((fig, index) => (
                  <div 
                    key={fig.figure}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      index === 0 ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30' : 'bg-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">
                        {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{fig.figureName}</div>
                      <div className="text-xs text-purple-300">{fig.origin}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-300 font-bold">{fig.similarity}%</div>
                      <div className="text-xs text-purple-400">유사도</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 에너지 탭 */}
        {activeTab === 'energy' && (
          <>
            {/* 에너지 충전 요소 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">🔋 에너지 충전 요소</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(result.energy.fuel).map(([motive, score]) => (
                  <div 
                    key={motive}
                    className="bg-white/10 rounded-xl p-4"
                  >
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {score}
                    </div>
                    <div className="text-sm text-purple-200">
                      {motiveNames[motive] || motive}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 에너지 소모 요소 */}
            {Object.keys(result.energy.drain).length > 0 && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🪫 에너지 소모 요소</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(result.energy.drain).map(([drain, score]) => (
                    <div 
                      key={drain}
                      className="bg-white/10 rounded-xl p-4"
                    >
                      <div className="text-2xl font-bold text-red-400 mb-1">
                        {score}
                      </div>
                      <div className="text-sm text-purple-200">
                        {drain}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 몰입 패턴 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">🌊 몰입 패턴</h3>
              <div className="space-y-3">
                {Object.entries(result.energy.flowPatterns).map(([pattern, score]) => {
                  const patternNames: Record<string, string> = {
                    deepFocus: '깊은 몰입',
                    challenge: '도전 선호',
                    clarity: '명확성 선호',
                    feedback: '피드백 선호',
                    environment: '환경 민감도',
                  };
                  return (
                    <div key={pattern}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-200">{patternNames[pattern] || pattern}</span>
                        <span className="text-white">{score}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-cyan-500 h-2 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* 숨겨진 동기 탭 */}
        {activeTab === 'hidden' && (
          <>
            {/* 그림자 동기 */}
            {Object.keys(result.hiddenMotives.shadow).length > 0 && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">🌑 그림자 동기</h3>
                <p className="text-sm text-purple-300 mb-4">
                  인정하기 어렵지만 존재하는 욕구
                </p>
                <div className="space-y-3">
                  {Object.entries(result.hiddenMotives.shadow).map(([motive, score]) => (
                    <div key={motive} className="flex items-center gap-3">
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-purple-200">{motiveNames[motive] || motive}</span>
                          <span className="text-white">{score}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-purple-700 h-2 rounded-full"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 투사 */}
            {Object.keys(result.hiddenMotives.projection).length > 0 && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">🪞 투사</h3>
                <p className="text-sm text-purple-300 mb-4">
                  타인에게서 불편하게 느끼는 동기
                </p>
                <div className="space-y-3">
                  {Object.entries(result.hiddenMotives.projection).map(([motive, score]) => (
                    <div key={motive}>
                      <div className="flex justify-between mb-1">
                        <span className="text-purple-200">{motiveNames[motive] || motive}</span>
                        <span className="text-white">{score}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 보상 동기 */}
            {Object.keys(result.hiddenMotives.compensation).length > 0 && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">💫 보상 동기</h3>
                <p className="text-sm text-purple-300 mb-4">
                  과거 결핍을 채우려는 욕구
                </p>
                <div className="space-y-3">
                  {Object.entries(result.hiddenMotives.compensation).map(([comp, score]) => (
                    <div key={comp}>
                      <div className="flex justify-between mb-1">
                        <span className="text-purple-200">{comp}</span>
                        <span className="text-white">{score}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 동기 충돌 */}
            {result.conflicts.length > 0 && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">⚔️ 동기 충돌</h3>
                <p className="text-sm text-purple-300 mb-4">
                  내면에서 충돌하는 동기 쌍
                </p>
                <div className="space-y-4">
                  {result.conflicts.slice(0, 4).map((conflict, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">
                          {motiveNames[conflict.pair[0]]} vs {motiveNames[conflict.pair[1]]}
                        </span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          conflict.balanceRatio > 60 || conflict.balanceRatio < 40 
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {conflict.balanceRatio > 60 || conflict.balanceRatio < 40 ? '불균형' : '균형'}
                        </span>
                      </div>
                      <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                        <div 
                          className="bg-purple-500"
                          style={{ width: `${conflict.balanceRatio}%` }}
                        />
                        <div 
                          className="bg-pink-500"
                          style={{ width: `${100 - conflict.balanceRatio}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-purple-300 mt-1">
                        <span>{motiveNames[conflict.pair[0]]} {conflict.balanceRatio}%</span>
                        <span>{motiveNames[conflict.pair[1]]} {100 - conflict.balanceRatio}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* 성장 탭 */}
        {activeTab === 'growth' && (
          <>
            {/* 성숙도 상세 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">성숙도 분석</h3>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-purple-400 mb-2">
                  Lv.{result.maturity.level}
                </div>
                <div className="text-xl text-white mb-1">
                  {levelDescriptions[result.maturity.level].name}
                </div>
                <div className="text-purple-300">
                  {levelDescriptions[result.maturity.level].desc}
                </div>
              </div>
              
              {/* 레벨 프로그레스 */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4].map(level => (
                  <div 
                    key={level}
                    className={`flex-1 h-4 rounded-full ${
                      level <= result.maturity.level 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* 세부 점수 */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-purple-200">자각 (Awareness)</span>
                    <span className="text-white">{result.maturity.awareness}점</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${result.maturity.awareness}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-purple-200">통합 (Integration)</span>
                    <span className="text-white">{result.maturity.integration}점</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${result.maturity.integration}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-purple-200">성장 (Growth)</span>
                    <span className="text-white">{result.maturity.growth}점</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${result.maturity.growth}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 상황별 변화 */}
            {result.contextShifts.length > 0 && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">상황별 동기 변화</h3>
                <div className="space-y-4">
                  {result.contextShifts.map((ctx, index) => {
                    const contextNames: Record<string, string> = {
                      normal: '평상시',
                      pressure: '압박 상황',
                      growth: '성장 기회',
                      crisis: '위기 상황',
                    };
                    return (
                      <div key={index} className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">
                            {contextNames[ctx.context] || ctx.context}
                          </span>
                          <span className="text-purple-300">
                            주요: {motiveNames[ctx.dominantMotive]}
                          </span>
                        </div>
                        {Object.keys(ctx.motiveShift).length > 0 && (
                          <div className="text-sm text-purple-300">
                            변화: {Object.entries(ctx.motiveShift).map(([m, v]) => 
                              `${motiveNames[m]} ${v! > 0 ? '+' : ''}${v}`
                            ).join(', ')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 검증 결과 */}
            <div className={`rounded-2xl p-6 ${
              result.validation.isValid 
                ? 'bg-green-500/20' 
                : 'bg-yellow-500/20'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">
                  {result.validation.isValid ? '✅' : '⚠️'}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  응답 검증
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-purple-300">일관성</span>
                  <div className="text-white font-medium">{result.validation.consistency}점</div>
                </div>
                <div>
                  <span className="text-purple-300">정직성</span>
                  <div className="text-white font-medium">{result.validation.honesty}점</div>
                </div>
              </div>
              {result.validation.flags.length > 0 && (
                <div className="mt-3 text-sm text-yellow-300">
                  주의: {result.validation.flags.join(', ')}
                </div>
              )}
            </div>
          </>
        )}

        {/* 하단 버튼 */}
        <div className="space-y-3 pt-4">
          {onGenerateReport && (
            <button
              onClick={onGenerateReport}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium
                       hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              🤖 AI 상세 보고서 생성
            </button>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full py-4 bg-white/10 text-white rounded-xl font-medium
                       hover:bg-white/20 transition-all"
            >
              다시 검사하기
            </button>
          )}
        </div>

        {/* 완료 시간 */}
        <div className="text-center text-sm text-purple-400 pb-8">
          검사 완료: {result.completedAt.toLocaleString()} · 
          소요 시간: {Math.round(result.totalTimeMs / 60000)}분
        </div>
      </div>
    </div>
  );
}

export default FullResultScreen;
