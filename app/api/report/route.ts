/**
 * MET Mythic v2.0 — AI Report Generation API
 * 
 * POST /api/report
 * Gemini 2.5 Pro를 사용하여 2만자 상세 보고서 생성
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  convertToSyncResult,
  convertToUserProfile,
  buildReportPrompt,
  type ReportRequest,
  type ReportResponse,
} from '@/lib/report_generator';
import type { Archetype } from '@/lib/types';

// ============================================
// 환경 변수 (하드코딩 금지!)
// ============================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';

// ============================================
// 프롬프트 및 마크다운 로더
// ============================================

async function loadReportPrompt(): Promise<string> {
  const promptPath = path.join(process.cwd(), 'prompts', 'report_prompt_final.md');
  try {
    const prompt = await fs.readFile(promptPath, 'utf-8');
    return prompt;
  } catch (error) {
    console.error('Failed to load report prompt:', error);
    throw new Error('Report prompt file not found');
  }
}

async function loadArchetypeMarkdown(archetype: string): Promise<string> {
  const mdPath = path.join(process.cwd(), 'public', 'archetypes', `archetypes_${archetype}.md`);
  try {
    const markdown = await fs.readFile(mdPath, 'utf-8');
    return markdown;
  } catch (error) {
    console.error(`Failed to load archetype markdown for ${archetype}:`, error);
    throw new Error(`Archetype markdown not found: ${archetype}`);
  }
}

// ============================================
// Gemini API 호출
// ============================================

async function callGeminiAPI(prompt: string): Promise<{ text: string; tokensUsed: number }> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 60000,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Gemini API error:', response.status, errorData);
    throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  
  // Gemini 응답 구조에서 텍스트 추출
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const tokensUsed = (data.usageMetadata?.promptTokenCount || 0) + (data.usageMetadata?.candidatesTokenCount || 0);
  
  return { text, tokensUsed };
}

// ============================================
// POST Handler
// ============================================

export async function POST(request: NextRequest): Promise<NextResponse<ReportResponse>> {
  try {
    // 0. API 키 확인 (가장 먼저!)
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { success: false, error: 'AI service is not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    // 1. 요청 파싱
    const body = await request.json() as ReportRequest;
    const { fullResult } = body;

    if (!fullResult) {
      return NextResponse.json(
        { success: false, error: 'fullResult is required' },
        { status: 400 }
      );
    }

    // 2. 데이터 변환
    const syncResult = convertToSyncResult(fullResult);
    const userProfile = convertToUserProfile(fullResult);
    const archetype = fullResult.primaryArchetype.archetype as Archetype;

    // 3. 프롬프트 및 마크다운 로드
    const [reportPrompt, archetypeMarkdown] = await Promise.all([
      loadReportPrompt(),
      loadArchetypeMarkdown(archetype),
    ]);

    // 4. 최종 프롬프트 조합
    const finalPrompt = buildReportPrompt({
      syncResult,
      userProfile,
      archetypeMarkdown,
      reportPrompt,
    });

    // 5. Gemini API 호출
    const { text: report, tokensUsed } = await callGeminiAPI(finalPrompt);

    // 6. 응답 반환
    return NextResponse.json({
      success: true,
      report,
      tokensUsed,
    });

  } catch (error) {
    console.error('Report generation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// ============================================
// GET Handler (상태 확인용 + 환경변수 체크)
// ============================================

export async function GET(): Promise<NextResponse> {
  const isConfigured = !!GEMINI_API_KEY;
  
  return NextResponse.json({
    status: isConfigured ? 'ok' : 'error',
    configured: isConfigured,
    model: 'Gemini 2.5 Pro',
    maxTokens: 60000,
    message: isConfigured 
      ? 'AI 보고서 생성 API가 준비되었습니다.' 
      : '⚠️ GEMINI_API_KEY가 설정되지 않았습니다. Vercel 환경변수를 확인하세요.',
  });
}