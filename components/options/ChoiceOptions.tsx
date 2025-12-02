'use client';

import React from 'react';
import type { QuestionOption } from '@/lib/types';

interface ChoiceOptionsProps {
  options: QuestionOption[];
  selectedId: string | null;
  onSelect: (optionId: string) => void;
}

export function ChoiceOptions({ options, selectedId, onSelect }: ChoiceOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = selectedId === option.id;
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`
              w-full p-4 rounded-xl text-left transition-all duration-200
              flex items-center gap-4 group
              ${isSelected 
                ? 'bg-indigo-600 text-white shadow-lg scale-[1.02]' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
              }
            `}
          >
            <span className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${isSelected 
                ? 'bg-white text-indigo-600' 
                : 'bg-gray-200 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
              }
            `}>
              {letter}
            </span>
            <span className="flex-1 font-medium">
              {option.text}
            </span>
            {isSelected && (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ChoiceOptions;
