'use client';

import React from 'react';
import type { Question } from '@/lib/types';
import { ChoiceOptions } from './options/ChoiceOptions';
import { LikertOptions } from './options/LikertOptions';
import { BipolarOptions } from './options/BipolarOptions';
import { ScenarioOptions } from './options/ScenarioOptions';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelect,
}: QuestionCardProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 문항 카드 */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* 문항 텍스트 */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {question.text}
        </h2>
        
        {/* 보조 텍스트 (시나리오용) */}
        {question.subtext && (
          <p className="text-gray-600 mb-6">
            {question.subtext}
          </p>
        )}

        {/* 옵션 렌더링 */}
        <div className="mt-8">
          {renderOptions(question, selectedOptionId, onSelect)}
        </div>
      </div>
    </div>
  );
}

function renderOptions(
  question: Question,
  selectedOptionId: string | null,
  onSelect: (optionId: string) => void
) {
  switch (question.type) {
    case 'choice':
      return (
        <ChoiceOptions
          options={question.options}
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      );
    case 'likert':
      return (
        <LikertOptions
          options={question.options}
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      );
    case 'bipolar':
      return (
        <BipolarOptions
          options={question.options}
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      );
    case 'scenario':
      return (
        <ScenarioOptions
          options={question.options}
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      );
    default:
      return (
        <ChoiceOptions
          options={question.options}
          selectedId={selectedOptionId}
          onSelect={onSelect}
        />
      );
  }
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    motive_source: '동기 원천',
    ignition: '점화 조건',
    direction: '방향',
    operating: '운영',
    energy: '에너지',
    conflict: '충돌',
    context: '상황',
    hidden: '숨겨진 동기',
    maturity: '성숙도',
    validation: '검증',
  };
  return labels[category] || category;
}

export default QuestionCard;