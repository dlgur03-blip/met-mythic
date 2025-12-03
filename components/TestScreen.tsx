'use client';

import React from 'react';
import type { Question, Answer } from '@/lib/types';
import { QuestionCard } from './QuestionCard';
import { useTest } from '@/hooks/useTest';

interface TestScreenProps {
  questions: Question[];
  version: 'lite' | 'full';
  onComplete: (answers: Answer[]) => void;
}

export function TestScreen({ questions, version, onComplete }: TestScreenProps) {
  const {
    status,
    currentIndex,
    currentQuestion,
    selectedOptionId,
    elapsedTime,
    start,
    selectOption,
    next,
  } = useTest({
    questions,
    onComplete,
    autoAdvance: false,  // 자동 넘김 끔
  });

  // 시작 화면
  if (status === 'ready') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🧭</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            MET Mythic
          </h1>
          <p className="text-gray-600 mb-6">
            동기 원형 검사 {version === 'lite' ? 'Lite' : 'Full'} 버전
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">문항 수</span>
              <span className="font-medium text-gray-900">{questions.length}문항</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">예상 시간</span>
              <span className="font-medium text-gray-900">
                {version === 'lite' ? '10-12분' : '25-30분'}
              </span>
            </div>
          </div>
          
          <button
            onClick={start}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-medium
                     hover:bg-indigo-700 transition-colors duration-200 shadow-lg
                     hover:shadow-xl active:scale-[0.98]"
          >
            검사 시작하기
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            솔직하게 응답해 주세요. 정답은 없습니다.
          </p>
        </div>
      </div>
    );
  }

  // 완료 화면 (로딩)
  if (status === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✨</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            검사 완료!
          </h2>
          <p className="text-gray-600 mb-6">
            결과를 분석하고 있습니다...
          </p>
          
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // 테스트 진행 화면
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      {/* 상단 정보 - 시간만 표시 */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-center text-sm text-gray-500">
          <span>⏱️ {formatTime(elapsedTime)}</span>
        </div>
      </div>

      {/* 문항 카드 */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedOptionId={selectedOptionId}
          onSelect={selectOption}
        />
      )}

      {/* 다음 버튼 */}
      <div className="max-w-2xl mx-auto mt-6">
        <button
          onClick={next}
          disabled={!selectedOptionId}
          className={`w-full py-4 rounded-xl font-medium transition-all duration-200
            ${selectedOptionId 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl active:scale-[0.98]' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {currentIndex < questions.length - 1 ? '다음' : '결과 보기'}
        </button>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default TestScreen;