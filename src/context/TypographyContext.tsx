"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type FontType = 'inter' | 'dyslexic' | 'lexend';
export type ThemeType = 'default' | 'cream' | 'blue' | 'yellow' | 'mint';

interface TypographySettings {
  letterSpacing: number;
  wordSpacing: number;
  lineHeight: number;
  paragraphSpacing: number;
  font: FontType;
  theme: ThemeType;
  speed: number;
  focusMode: boolean;
  readingRuler: boolean;
}

interface TypographyContextType {
  settings: TypographySettings;
  updateSetting: (key: keyof TypographySettings, value: any) => void;
  resetSettings: () => void;
  presets: Record<string, TypographySettings>;
  savePreset: (name: string) => void;
  loadPreset: (name: string) => void;
}

const defaultSettings: TypographySettings = {
  letterSpacing: 0,
  wordSpacing: 0,
  lineHeight: 1.6,
  paragraphSpacing: 2,
  font: 'inter',
  theme: 'default',
  speed: 250,
  focusMode: false,
  readingRuler: false,
};

const TypographyContext = createContext<TypographyContextType | undefined>(undefined);

export function TypographyProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<TypographySettings>(defaultSettings);
  const [presets, setPresets] = useState<Record<string, TypographySettings>>({});
  const rafRef = useRef<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('lucida-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    const savedPresets = localStorage.getItem('lucida-presets');
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets));
    }
  }, []);

  // Apply settings to CSS Variables with requestAnimationFrame
  const applySettings = useCallback((newSettings: TypographySettings) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const root = document.documentElement;
      root.style.setProperty('--letter-spacing', `${newSettings.letterSpacing}px`);
      root.style.setProperty('--word-spacing', `${newSettings.wordSpacing}px`);
      root.style.setProperty('--line-height', `${newSettings.lineHeight}`);
      root.style.setProperty('--paragraph-spacing', `${newSettings.paragraphSpacing}em`);
      
      const fontMap: Record<FontType, string> = {
        inter: 'var(--font-inter)',
        dyslexic: 'var(--font-dyslexic)',
        lexend: 'var(--font-lexend)',
      };
      root.style.setProperty('--current-font', fontMap[newSettings.font]);
      
      root.setAttribute('data-theme', newSettings.theme);
      
      // Update URL hash for sharing
      const params = new URLSearchParams();
      Object.entries(newSettings).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params.set(key, value.toString());
        }
      });
      window.history.replaceState(null, '', `#${params.toString()}`);
      
      localStorage.setItem('lucida-settings', JSON.stringify(newSettings));
    });
  }, []);

  // Load from URL hash if present
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const params = new URLSearchParams(hash);
      const newSettings: Partial<TypographySettings> = {};
      params.forEach((value, key) => {
        if (key === 'font') newSettings.font = value as FontType;
        else if (key === 'theme') newSettings.theme = value as ThemeType;
        else if (key === 'focusMode' || key === 'readingRuler') newSettings[key] = value === 'true';
        else newSettings[key as keyof TypographySettings] = parseFloat(value) as any;
      });
      setSettings(prev => ({ ...prev, ...newSettings }));
    }
  }, []);

  useEffect(() => {
    applySettings(settings);
  }, [settings, applySettings]);

  const updateSetting = useCallback((key: keyof TypographySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const savePreset = useCallback((name: string) => {
    setPresets(prev => {
      const newPresets = { ...prev, [name]: settings };
      localStorage.setItem('lucida-presets', JSON.stringify(newPresets));
      return newPresets;
    });
  }, [settings]);

  const loadPreset = useCallback((name: string) => {
    if (presets[name]) {
      setSettings(presets[name]);
    }
  }, [presets]);

  return (
    <TypographyContext.Provider value={{ settings, updateSetting, resetSettings, presets, savePreset, loadPreset }}>
      {children}
    </TypographyContext.Provider>
  );
}

export function useTypography() {
  const context = useContext(TypographyContext);
  if (context === undefined) {
    throw new Error('useTypography must be used within a TypographyProvider');
  }
  return context;
}
