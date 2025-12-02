'use client';

import React from 'react';
import type { QuestionOption } from '@/lib/types';

interface BipolarOptionsProps {
  options: QuestionOption[];
  selectedId: string | null;
  onSelect: (optionId: string) => void;
}

export function BipolarOptions({ options, selectedId, onSelect }: BipolarOptionsProps) {
  // 2개 옵션만 표시
  const [optionA, optionB] = options;

  return (
    <div className="space-y-4">
      {/* 양극 버튼 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 옵션 A */}
        <button
          onClick={() => onSelect(optionA.id)}
          className={`
            relative p-6 rounded-2xl text-center transition-all duration-300
            ${selectedId === optionA.id 
              ? 'bg-indigo-600 text-white shadow-xl scale-105' 
              : 'bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:shadow-lg'
            }
          `}
        >
          {selectedId === optionA.id && (
            <div className="absolute top-3 right-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <div className={`
            w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-xl font-bold
            ${selectedId === optionA.id 
              ? 'bg-white text-indigo-600' 
              : 'bg-indigo-100 text-indigo-600'
            }
          `}>
            A
          </div>
          <p className="font-medium leading-relaxed">
            {optionA.text}
          </p>
        </button>

        {/* VS 표시 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
            VS
          </div>
        </div>

        {/* 옵션 B */}
        <button
          onClick={() => onSelect(optionB.id)}
          className={`
            relative p-6 rounded-2xl text-center transition-all duration-300
            ${selectedId === optionB.id 
              ? 'bg-indigo-600 text-white shadow-xl scale-105' 
              : 'bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:shadow-lg'
            }
          `}
        >
          {selectedId === optionB.id && (
            <div className="absolute top-3 right-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <div className={`
            w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-xl font-bold
            ${selectedId === optionB.id 
              ? 'bg-white text-indigo-600' 
              : 'bg-indigo-100 text-indigo-600'
            }
          `}>
            B
          </div>
          <p className="font-medium leading-relaxed">
            {optionB.text}
          </p>
        </button>
      </div>

      {/* 중앙 VS 표시 */}
      <div className="flex items-center justify-center -mt-2">
        <div className="text-gray-400 font-medium text-sm">
          둘 중 더 가까운 쪽을 선택하세요
        </div>
      </div>
    </div>
  );
}

export default BipolarOptions;
