'use client';

import React, { useState, useEffect } from 'react';
import { 
  ADMIN_PASSWORD, 
  createAccessKey, 
  getAllAccessKeys, 
  deleteAccessKey,
  type AccessKey 
} from '@/lib/accessKey';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  // 암호키 목록 로드
  const loadKeys = async () => {
    setLoading(true);
    try {
      const allKeys = await getAllAccessKeys();
      setKeys(allKeys.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Failed to load keys:', error);
    }
    setLoading(false);
  };

  // 로그인
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadKeys();
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // 새 암호키 발급
  const handleCreateKey = async () => {
    setLoading(true);
    try {
      const key = await createAccessKey();
      setNewKey(key);
      await loadKeys();
    } catch (error) {
      console.error('Failed to create key:', error);
      alert('키 생성에 실패했습니다.');
    }
    setLoading(false);
  };

  // 암호키 삭제
  const handleDeleteKey = async (key: string) => {
    if (!confirm(`정말 삭제하시겠습니까?\n${key}`)) return;
    
    try {
      await deleteAccessKey(key);
      await loadKeys();
    } catch (error) {
      console.error('Failed to delete key:', error);
    }
  };

  // 키 복사
  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    alert('복사되었습니다!');
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold text-white mb-4">🔐 관리자 인증</h2>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="비밀번호 입력"
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg mb-4 outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500"
            >
              취소
            </button>
            <button
              onClick={handleLogin}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 관리자 패널
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">🔑 암호키 관리</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* 새 키 발급 */}
        <button
          onClick={handleCreateKey}
          disabled={loading}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 mb-4 disabled:opacity-50"
        >
          {loading ? '생성 중...' : '+ 새 암호키 발급'}
        </button>

        {/* 새로 생성된 키 표시 */}
        {newKey && (
          <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 mb-4">
            <p className="text-green-400 text-sm mb-2">새 암호키가 생성되었습니다!</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xl font-mono text-white bg-slate-700 px-3 py-2 rounded">
                {newKey}
              </code>
              <button
                onClick={() => copyKey(newKey)}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                복사
              </button>
            </div>
          </div>
        )}

        {/* 키 목록 */}
        <div className="flex-1 overflow-y-auto">
          <p className="text-gray-400 text-sm mb-2">
            총 {keys.length}개 ({keys.filter(k => !k.used).length}개 사용 가능)
          </p>
          
          {keys.length === 0 ? (
            <p className="text-gray-500 text-center py-8">발급된 키가 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {keys.map((keyData) => (
                <div
                  key={keyData.key}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    keyData.used ? 'bg-slate-700/50' : 'bg-slate-700'
                  }`}
                >
                  <div>
                    <code className={`font-mono ${keyData.used ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {keyData.key}
                    </code>
                    <p className="text-xs text-gray-500">
                      {keyData.createdAt.toLocaleDateString()}
                      {keyData.used && ' · 사용됨'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!keyData.used && (
                      <button
                        onClick={() => copyKey(keyData.key)}
                        className="px-2 py-1 bg-slate-600 text-white text-sm rounded hover:bg-slate-500"
                      >
                        복사
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteKey(keyData.key)}
                      className="px-2 py-1 bg-red-600/50 text-red-300 text-sm rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}