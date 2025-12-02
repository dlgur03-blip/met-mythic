import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 커스텀 컬러 (원형별)
        archetype: {
          conqueror: '#DC2626', // 정복자 - 빨강
          sage: '#2563EB',      // 현자 - 파랑
          creator: '#7C3AED',   // 창조자 - 보라
          sovereign: '#F59E0B', // 군주 - 금색
          healer: '#10B981',    // 치유자 - 초록
          guardian: '#6B7280',  // 수호자 - 회색
          rebel: '#EF4444',     // 반역자 - 진빨강
          explorer: '#06B6D4',  // 탐험가 - 청록
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
