"use client";

import { useEffect } from 'react';
import { useTypography, ThemeType } from '@/context/TypographyContext';

export function useKeyboardShortcuts(onTogglePlay?: () => void, onReset?: () => void) {
  const { settings, updateSetting } = useTypography();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        onTogglePlay?.();
      }

      if (e.key.toLowerCase() === 'r') {
        onReset?.();
      }

      if (e.key.toLowerCase() === 't') {
        const themes: ThemeType[] = ['default', 'cream', 'blue', 'yellow', 'mint'];
        const nextIdx = (themes.indexOf(settings.theme) + 1) % themes.length;
        updateSetting('theme', themes[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.theme, updateSetting, onTogglePlay, onReset]);
}
