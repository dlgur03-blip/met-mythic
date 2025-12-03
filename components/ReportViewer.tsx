'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { Question, Answer } from '@/lib/types';

export type TestStatus = 'ready' | 'testing' | 'completed' | 'error';

// localStorage 키
const STORAGE_KEY = 'met-mythic-progress';

interface SavedProgress {
  answers: Answer[];
  currentIndex: number;
  elapsedTime: number;
  questionOrder: string[];
  version: 'lite' | 'full';
  savedAt: string;
}

interface UseTestOptions {
  questions: Question[];
  onComplete?: (answers: Answer[]) => void;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  shuffle?: boolean;
  version?: 'lite' | 'full';
}

interface UseTestReturn {
  status: TestStatus;
  currentIndex: number;
  currentQuestion: Question | null;
  answers: Answer[];
  selectedOptionId: string | null;
  progress: number;
  remainingQuestions: number;
  elapsedTime: number;
  hasSavedProgress: boolean;
  savedProgressInfo: { answeredCount: number; totalCount: number; savedAt: string } | null;
  start: () => void;
  resume: () => void;
  clearSavedProgress: () => void;
  selectOption: (optionId: string) => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  reset: () => void;
}

// Fisher-Yates 셔플
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
  autoAdvanceDelay = 300,
  shuffle = true,
  version = 'full',
}: UseTestOptions): UseTestReturn {
  const [status, setStatus] = useState<TestStatus>('ready');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionOrder, setQuestionOrder] = useState<string[]>([]);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [savedProgressInfo, setSavedProgressInfo] = useState<{ answeredCount: number; totalCount: number; savedAt: string } | null>(null);
  
  const questionStartTime = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 저장된 진행 상황 확인
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: SavedProgress = JSON.parse(saved);
        if (data.version === version && data.answers.length > 0) {
          setHasSavedProgress(true);
          setSavedProgressInfo({
            answeredCount: data.answers.length,
            totalCount: questions.length,
            savedAt: data.savedAt,
          });
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error('Failed to load saved progress:', e);
    }
  }, [version, questions.length]);

  // 질문 순서
  const shuffledQuestions = useMemo(() => {
    if (questionOrder.length > 0) {
      return questionOrder
        .map(id => questions.find(q => q.id === id))
        .filter((q): q is Question => q !== undefined);
    }
    if (shuffle) {
      return shuffleArray(questions);
    }
    return questions;
  }, [questions, shuffle, questionOrder]);

  const currentQuestion = status === 'testing' ? shuffledQuestions[currentIndex] : null;
  const progress = shuffledQuestions.length > 0 ? (answers.length / shuffledQuestions.length) * 100 : 0;
  const remainingQuestions = shuffledQuestions.length - answers.length;

  // 진행 상황 저장
  const saveProgress = useCallback((
    newAnswers: Answer[],
    newIndex: number,
    newElapsedTime: number,
    order: string[]
  ) => {
    try {
      const data: SavedProgress = {
        answers: newAnswers,
        currentIndex: newIndex,
        elapsedTime: newElapsedTime,
        questionOrder: order,
        version,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [version]);

  const clearSavedProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedProgress(false);
      setSavedProgressInfo(null);
    } catch (e) {
      console.error('Failed to clear saved progress:', e);
    }
  }, []);

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

  // 새로 시작
  const start = useCallback(() => {
    clearSavedProgress();
    
    const newOrder = shuffle 
      ? shuffleArray(questions).map(q => q.id)
      : questions.map(q => q.id);
    
    setQuestionOrder(newOrder);
    setStatus('testing');
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setElapsedTime(0);
    questionStartTime.current = Date.now();
    
    saveProgress([], 0, 0, newOrder);
  }, [shuffle, questions, clearSavedProgress, saveProgress]);

  // 이어하기
  const resume = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        start();
        return;
      }
      
      const data: SavedProgress = JSON.parse(saved);
      
      setQuestionOrder(data.questionOrder);
      setAnswers(data.answers);
      setCurrentIndex(data.currentIndex);
      setElapsedTime(data.elapsedTime);
      setStatus('testing');
      setHasSavedProgress(false);
      
      const currentQId = data.questionOrder[data.currentIndex];
      const prevAnswer = data.answers.find(a => a.questionId === currentQId);
      setSelectedOptionId(prevAnswer?.optionId || null);
      
      questionStartTime.current = Date.now();
    } catch (e) {
      console.error('Failed to resume:', e);
      start();
    }
  }, [start]);

  // 옵션 선택 (자동 다음으로 넘어감)
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
    
    const newAnswers = (() => {
      const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
      if (existingIndex >= 0) {
        const updated = [...answers];
        updated[existingIndex] = answer;
        return updated;
      }
      return [...answers, answer];
    })();
    
    setAnswers(newAnswers);
    
    const order = questionOrder.length > 0 
      ? questionOrder 
      : shuffledQuestions.map(q => q.id);
    saveProgress(newAnswers, currentIndex, elapsedTime, order);

    // 자동 다음 문항
    if (autoAdvance) {
      setTimeout(() => {
        if (currentIndex < shuffledQuestions.length - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          setSelectedOptionId(null);
          questionStartTime.current = Date.now();
          saveProgress(newAnswers, nextIndex, elapsedTime, order);
        } else {
          setStatus('completed');
          clearSavedProgress();
          onComplete?.(newAnswers);
        }
      }, autoAdvanceDelay);
    }
  }, [status, currentQuestion, currentIndex, shuffledQuestions, autoAdvance, autoAdvanceDelay, answers, onComplete, questionOrder, elapsedTime, saveProgress, clearSavedProgress]);

  const next = useCallback(() => {
    if (currentIndex < shuffledQuestions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedOptionId(null);
      questionStartTime.current = Date.now();
      
      const order = questionOrder.length > 0 
        ? questionOrder 
        : shuffledQuestions.map(q => q.id);
      saveProgress(answers, nextIndex, elapsedTime, order);
    } else if (selectedOptionId) {
      setStatus('completed');
      clearSavedProgress();
      onComplete?.(answers);
    }
  }, [currentIndex, shuffledQuestions, selectedOptionId, answers, onComplete, questionOrder, elapsedTime, saveProgress, clearSavedProgress]);

  const previous = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      
      const prevAnswer = answers.find(a => a.questionId === shuffledQuestions[prevIndex]?.id);
      setSelectedOptionId(prevAnswer?.optionId || null);
      questionStartTime.current = Date.now();
      
      const order = questionOrder.length > 0 
        ? questionOrder 
        : shuffledQuestions.map(q => q.id);
      saveProgress(answers, prevIndex, elapsedTime, order);
    }
  }, [currentIndex, answers, shuffledQuestions, questionOrder, elapsedTime, saveProgress]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < shuffledQuestions.length) {
      setCurrentIndex(index);
      const answer = answers.find(a => a.questionId === shuffledQuestions[index]?.id);
      setSelectedOptionId(answer?.optionId || null);
      questionStartTime.current = Date.now();
      
      const order = questionOrder.length > 0 
        ? questionOrder 
        : shuffledQuestions.map(q => q.id);
      saveProgress(answers, index, elapsedTime, order);
    }
  }, [shuffledQuestions, answers, questionOrder, elapsedTime, saveProgress]);

  const reset = useCallback(() => {
    setStatus('ready');
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setElapsedTime(0);
    setQuestionOrder([]);
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
    hasSavedProgress,
    savedProgressInfo,
    start,
    resume,
    clearSavedProgress,
    selectOption,
    next,
    previous,
    goTo,
    reset,
  };
}

export default useTest;