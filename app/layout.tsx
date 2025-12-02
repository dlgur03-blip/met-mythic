import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MET Mythic - 동기 원형 검사',
  description: '당신의 동기 원형을 찾아드립니다. 8개의 신화 원형과 동기 프로파일 분석.',
  openGraph: {
    title: 'MET Mythic - 동기 원형 검사',
    description: '당신의 동기 원형을 찾아드립니다. 8개의 신화 원형과 동기 프로파일 분석.',
    images: ['/api/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MET Mythic - 동기 원형 검사',
    description: '당신의 동기 원형을 찾아드립니다.',
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}