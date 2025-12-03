import { NextRequest, NextResponse } from 'next/server';

// Resend API 설정 (환경변수에서만 읽음 - 절대 하드코딩 금지!)
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // API 키 확인
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { success: false, error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const { email, htmlContent, archetypeName, figureName } = await request.json();

    if (!email || !htmlContent) {
      return NextResponse.json(
        { success: false, error: '이메일과 보고서 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    // Resend API로 이메일 전송
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MET Mythic <onboarding@resend.dev>', // 나중에 커스텀 도메인으로 변경
        to: [email],
        subject: `🧭 MET Mythic 보고서 - ${archetypeName}: ${figureName}의 길`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #7c4dff;">🧭 MET Mythic</h1>
            <p>안녕하세요!</p>
            <p>요청하신 <strong>${archetypeName}: ${figureName}</strong> 보고서를 첨부파일로 보내드립니다.</p>
            <p>첨부된 HTML 파일을 다운로드하여 브라우저에서 열어보세요.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              본 메일은 MET Mythic에서 자동 발송되었습니다.<br>
              문의: contact@metmythic.com
            </p>
          </div>
        `,
        attachments: [
          {
            filename: `MET_Mythic_Report_${archetypeName}_${new Date().toISOString().split('T')[0]}.html`,
            content: Buffer.from(htmlContent).toString('base64'),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API Error:', errorData);
      return NextResponse.json(
        { success: false, error: '이메일 전송에 실패했습니다.' },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      messageId: data.id,
    });

  } catch (error) {
    console.error('Send Report Error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}