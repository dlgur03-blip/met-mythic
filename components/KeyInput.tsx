'use client';

import React, { useState } from 'react';
import { validateAccessKey, useAccessKey, MASTER_KEY } from '@/lib/accessKey';

interface KeyInputProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function KeyInput({ onSuccess, onCancel }: KeyInputProps) {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!key.trim()) {
      setError('암호키를 입력해주세요.');
      return;
    }

    // 마스터키 체크
    if (key === MASTER_KEY) {
      onSuccess();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isValid = await validateAccessKey(key);
      
      if (!isValid) {
        setError('유효하지 않거나 이미 사용된 키입니다.');
        setLoading(false);
        return;
      }

      await useAccessKey(key);
      onSuccess();
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-2">🔮 Full 버전</h2>
        <p className="text-gray-400 text-sm mb-4">
          암호키를 입력해주세요.
        </p>
        
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="암호키 8자리"
          maxLength={8}
          className="w-full px-4 py-3 bg-slate-700 text-white text-center text-xl font-mono tracking-widest rounded-lg mb-2 outline-none focus:ring-2 focus:ring-purple-500 uppercase"
        />
        
        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? '확인 중...' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
}