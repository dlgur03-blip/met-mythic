'use client';

import React from 'react';
import type { QuestionOption } from '@/lib/types';

interface LikertOptionsProps {
  options: QuestionOption[];
  selectedId: string | null;
  onSelect: (optionId: string) => void;
}

export function LikertOptions({ options, selectedId, onSelect }: LikertOptionsProps) {
  // 리커트 척도 라벨 (5점)
  const labels = [
    { short: '1', full: '전혀 그렇지 않다' },
    { short: '2', full: '그렇지 않다' },
    { short: '3', full: '보통이다' },
    { short: '4', full: '그렇다' },
    { short: '5', full: '매우 그렇다' },
  ];

  return (
    <div className="space-y-6">
      {/* 모바일: 세로 버튼 */}
      <div className="sm:hidden space-y-2">
        {options.map((option, index) => {
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`
                w-full p-3 rounded-lg text-center transition-all duration-200
                ${isSelected 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {/* 데스크톱: 가로 척도 */}
      <div className="hidden sm:block">
        {/* 라벨 */}
        <div className="flex justify-between mb-4 px-2">
          <span className="text-sm text-gray-500">전혀 그렇지 않다</span>
          <span className="text-sm text-gray-500">매우 그렇다</span>
        </div>

        {/* 척도 버튼들 */}
        <div className="flex justify-between gap-2">
          {options.map((option, index) => {
            const isSelected = selectedId === option.id;
            const sizes = ['w-12 h-12', 'w-14 h-14', 'w-16 h-16', 'w-14 h-14', 'w-12 h-12'];
            
            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`
                  ${sizes[index]} rounded-full flex items-center justify-center
                  font-bold transition-all duration-200
                  ${isSelected 
                    ? 'bg-indigo-600 text-white scale-110 shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
                  }
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* 선택된 라벨 표시 */}
        {selectedId && (
          <div className="text-center mt-4">
            <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
              {options.find(o => o.id === selectedId)?.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikertOptions;
