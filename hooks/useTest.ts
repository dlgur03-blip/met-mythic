'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { Question, Answer } from '@/lib/types';

export type TestStatus = 'ready' | 'testing' | 'completed' | 'error';

interface UseTestOptions {
  questions: Question[];
  onComplete?: (answers: Answer[]) => void;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  shuffle?: boolean; // 질문 섞기 옵션 추가
}

interface UseTestReturn {
  // 상태
  status: TestStatus;
  currentIndex: number;
  currentQuestion: Question | null;
  answers: Answer[];
  selectedOptionId: string | null;
  
  // 진행률
  progress: number;
  remainingQuestions: number;
  elapsedTime: number;
  
  // 액션
  start: () => void;
  selectOption: (optionId: string) => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  reset: () => void;
}

// Fisher-Yates 셔플 알고리즘
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useTest({
  questions,
  onComplete,
  autoAdvance = true,
  autoAdvanceDelay = 500,
  shuffle = true, // 기본값: 섞기 활성화
}: UseTestOptions): UseTestReturn {
  const [status, setStatus] = useState<TestStatus>('ready');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const questionStartTime = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 질문 섞기 (컴포넌트 마운트 시 한 번만 섞음)
  const shuffledQuestions = useMemo(() => {
    if (shuffle) {
      return shuffleArray(questions);
    }
    return questions;
  }, [questions, shuffle]);

  // 현재 문항 (섞인 질문 사용)
  const currentQuestion = status === 'testing' ? shuffledQuestions[currentIndex] : null;
  
  // 진행률
  const progress = shuffledQuestions.length > 0 ? (answers.length / shuffledQuestions.length) * 100 : 0;
  const remainingQuestions = shuffledQuestions.length - answers.length;

  // 타이머
  useEffect(() => {
    if (status === 'testing') {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  // 시작
  const start = useCallback(() => {
    setStatus('testing');
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setElapsedTime(0);
    questionStartTime.current = Date.now();
  }, []);

  // 옵션 선택
  const selectOption = useCallback((optionId: string) => {
    if (status !== 'testing' || !currentQuestion) return;
    
    setSelectedOptionId(optionId);
    
    const responseTimeMs = Date.now() - questionStartTime.current;
    const selectedOption = currentQuestion.options.find(o => o.id === optionId);
    
    if (!selectedOption) return;
    
    const answer: Answer = {
      questionId: currentQuestion.id,
      optionId,
      value: selectedOption.value,
      responseTimeMs,
      timestamp: new Date(),
    };
    
    // 기존 응답 업데이트 또는 추가
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = answer;
        return updated;
      }
      return [...prev, answer];
    });

    // 자동 다음 문항
    if (autoAdvance) {
      setTimeout(() => {
        if (currentIndex < shuffledQuestions.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOptionId(null);
          questionStartTime.current = Date.now();
        } else {
          // 마지막 문항 완료
          setStatus('completed');
          onComplete?.(answers.concat(answer));
        }
      }, autoAdvanceDelay);
    }
  }, [status, currentQuestion, currentIndex, shuffledQuestions.length, autoAdvance, autoAdvanceDelay, answers, onComplete]);

  // 다음 문항
  const next = useCallback(() => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      questionStartTime.current = Date.now();
    } else if (selectedOptionId) {
      setStatus('completed');
      onComplete?.(answers);
    }
  }, [currentIndex, shuffledQuestions.length, selectedOptionId, answers, onComplete]);

  // 이전 문항
  const previous = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      // 이전 응답 로드
      const prevAnswer = answers.find(a => a.questionId === shuffledQuestions[currentIndex - 1]?.id);
      setSelectedOptionId(prevAnswer?.optionId || null);
      questionStartTime.current = Date.now();
    }
  }, [currentIndex, answers, shuffledQuestions]);

  // 특정 문항으로 이동
  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < shuffledQuestions.length) {
      setCurrentIndex(index);
      const answer = answers.find(a => a.questionId === shuffledQuestions[index]?.id);
      setSelectedOptionId(answer?.optionId || null);
      questionStartTime.current = Date.now();
    }
  }, [shuffledQuestions, answers]);

  // 리셋
  const reset = useCallback(() => {
    setStatus('ready');
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setElapsedTime(0);
  }, []);

  return {
    status,
    currentIndex,
    currentQuestion,
    answers,
    selectedOptionId,
    progress,
    remainingQuestions,
    elapsedTime,
    start,
    selectOption,
    next,
    previous,
    goTo,
    reset,
  };
}

export default useTest;