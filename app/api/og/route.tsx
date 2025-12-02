import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 별 배경 효과 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.15) 0%, transparent 30%)',
          }}
        />
        
        {/* 원형 글로우 */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
            display: 'flex',
          }}
        />

        {/* 나침반 아이콘 */}
        <div
          style={{
            fontSize: '120px',
            marginBottom: '20px',
            display: 'flex',
            filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))',
          }}
        >
          🧭
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            display: 'flex',
            textShadow: '0 0 40px rgba(147, 51, 234, 0.8), 0 4px 12px rgba(0,0,0,0.5)',
            letterSpacing: '-2px',
          }}
        >
          MET Mythic
        </div>

        {/* 서브 타이틀 */}
        <div
          style={{
            fontSize: '28px',
            color: '#c4b5fd',
            display: 'flex',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          당신의 동기 원형을 찾아드립니다
        </div>

        {/* 하단 원형 아이콘들 */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            fontSize: '36px',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
          }}
        >
          <span>⚔️</span>
          <span>📚</span>
          <span>🎨</span>
          <span>👑</span>
          <span>💚</span>
          <span>🛡️</span>
          <span>🔥</span>
          <span>🧭</span>
        </div>

        {/* 장식 링 */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            border: '1px solid rgba(147, 51, 234, 0.15)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}