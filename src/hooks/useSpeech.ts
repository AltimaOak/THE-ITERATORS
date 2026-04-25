"use client";

import { useState, useCallback, useRef, useEffect } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  const speak = useCallback((text: string, onWord?: (index: number) => void) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utteranceRef.current = utterance;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        // Use a more precise boundary detection
        const textBefore = text.substring(0, event.charIndex);
        // Regex that matches how browsers typically count words for speech boundaries
        const wordMatch = textBefore.match(/\b(\w+)\b/g);
        const wordIndex = wordMatch ? wordMatch.length : 0;
        onWord?.(wordIndex);
      }
    };

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, [rate]);

  const pause = useCallback(() => {
    synthRef.current?.pause();
    setIsSpeaking(false);
  }, []);

  const resume = useCallback(() => {
    synthRef.current?.resume();
    setIsSpeaking(true);
  }, []);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, speak, pause, resume, stop, setRate, rate };
}
