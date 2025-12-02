'use client';

import React from 'react';
import type { QuestionOption } from '@/lib/types';

interface ScenarioOptionsProps {
  options: QuestionOption[];
  selectedId: string | null;
  onSelect: (optionId: string) => void;
}

export function ScenarioOptions({ options, selectedId, onSelect }: ScenarioOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = selectedId === option.id;
        
        // 시나리오용 이모지/아이콘
        const icons = ['🎯', '💡', '🤝', '🛡️'];
        
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`
              w-full p-5 rounded-xl text-left transition-all duration-200
              border-2 group
              ${isSelected 
                ? 'border-indigo-600 bg-indigo-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-start gap-4">
              {/* 아이콘 */}
              <span className={`
                text-2xl flex-shrink-0 transition-transform duration-200
                ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
              `}>
                {icons[index % icons.length]}
              </span>
              
              {/* 텍스트 */}
              <div className="flex-1">
                <p className={`
                  font-medium leading-relaxed
                  ${isSelected ? 'text-indigo-900' : 'text-gray-700'}
                `}>
                  {option.text}
                </p>
              </div>

              {/* 체크 표시 */}
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                transition-all duration-200
                ${isSelected 
                  ? 'bg-indigo-600 text-white' 
                  : 'border-2 border-gray-300 group-hover:border-indigo-300'
                }
              `}>
                {isSelected && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ScenarioOptions;
