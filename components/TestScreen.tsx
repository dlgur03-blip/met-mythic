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
    hasSavedProgress,
    savedProgressInfo,
    start,
    resume,
    clearSavedProgress,
    selectOption,
  } = useTest({
    questions,
    onComplete,
    autoAdvance: true,  // 선택하면 자동으로 다음으로!
    autoAdvanceDelay: 300, // 0.3초 후 다음으로
    shuffle: true,
    version,
  });

  // 시간 포맷 (저장 시간용)
  const formatSavedTime = (isoString: string) => {
    const date = new Date(isoString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}/${day} ${hours}:${minutes.toString().padStart(2, '0')}`;
  };

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

          {/* 이어하기 UI */}
          {hasSavedProgress && savedProgressInfo && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💾</span>
                <span className="font-medium text-indigo-900">저장된 진행 상황</span>
              </div>
              <div className="text-sm text-indigo-700 mb-3">
                <p>{savedProgressInfo.answeredCount} / {savedProgressInfo.totalCount} 문항 완료</p>
                <p className="text-xs text-indigo-500 mt-1">
                  저장: {formatSavedTime(savedProgressInfo.savedAt)}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={resume}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium
                           hover:bg-indigo-700 transition-colors duration-200"
                >
                  🔄 이어하기
                </button>
                <button
                  onClick={() => {
                    if (confirm('저장된 진행 상황이 삭제됩니다. 처음부터 시작할까요?')) {
                      clearSavedProgress();
                      start();
                    }
                  }}
                  className="py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium
                           hover:bg-gray-300 transition-colors duration-200"
                >
                  🗑️
                </button>
              </div>
            </div>
          )}
          
          <button
            onClick={start}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-medium
                     hover:bg-indigo-700 transition-colors duration-200 shadow-lg
                     hover:shadow-xl active:scale-[0.98]"
          >
            {hasSavedProgress ? '처음부터 시작하기' : '검사 시작하기'}
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            {hasSavedProgress 
              ? '💡 중간에 종료해도 자동 저장됩니다'
              : '솔직하게 응답해 주세요. 정답은 없습니다.'}
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

  // 테스트 진행 화면 (다음 버튼 없이!)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      {/* 상단 정보 */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>💾 자동 저장</span>
          <span>⏱️ {formatTime(elapsedTime)}</span>
        </div>
        
        {/* 진행률 바 */}
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-gray-400 text-right">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* 문항 카드 - 클릭하면 바로 다음으로! */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedOptionId={selectedOptionId}
          onSelect={selectOption}
        />
      )}

      {/* 안내 문구 (다음 버튼 대신) */}
      <div className="max-w-2xl mx-auto mt-6 text-center">
        <p className="text-sm text-gray-400">
          💡 답변을 선택하면 자동으로 다음 문항으로 넘어갑니다
        </p>
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