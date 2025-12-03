'use client';

import React, { useState } from 'react';

interface NicknameInputProps {
  onSubmit: (nickname: string) => void;
  onSkip: () => void;
  version: 'lite' | 'full';
}

export function NicknameInput({ onSubmit, onSkip, version }: NicknameInputProps) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (trimmed) {
      onSubmit(trimmed);
    } else {
      onSkip();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* 모달 */}
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
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
              className="w-full px-4 py-4 bg-gray-100 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 text-center text-lg font-medium
                       focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
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
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium
                     hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg text-lg"
          >
            {version === 'full' ? '🔮' : '⚡'} 검사 시작하기
          </button>
        </form>

        {/* 건너뛰기 */}
        <button
          onClick={onSkip}
          className="w-full mt-3 py-3 text-gray-500 hover:text-gray-700 transition-colors text-sm"
        >
          건너뛰기 (익명으로 진행)
        </button>

        {/* 안내 */}
        <p className="text-xs text-gray-400 text-center mt-4">
          실명, 닉네임, 직책 모두 가능해요<br />
          예: 김대리, 마케팅팀 A, 나
        </p>
      </div>
    </div>
  );
}

export default NicknameInput;