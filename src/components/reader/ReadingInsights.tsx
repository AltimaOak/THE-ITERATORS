"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useTypography } from '@/context/TypographyContext';
import styles from './Insights.module.css';
import { Zap, Clock, AlertCircle } from 'lucide-react';

interface Props {
  wordCount: number;
  currentIndex: number;
  isActive: boolean;
}

export default function ReadingInsights({ wordCount, currentIndex, isActive }: Props) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { settings, updateSetting } = useTypography();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      if (!startTime) setStartTime(Date.now());
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setStartTime(null);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  // Senior UX Fix: Show instantaneous WPM for visual feedback matching the slider
  const wpm = useMemo(() => {
    if (!isActive) return 0;
    return Math.round(60000 / settings.speed);
  }, [settings.speed, isActive]);

  const suggestions = useMemo(() => {
    const list = [];
    if (isActive && wpm < 150) {
      list.push({ 
        type: 'spacing', 
        text: 'Boost focus: Increase word spacing.',
        action: () => updateSetting('wordSpacing', 5)
      });
    }
    return list;
  }, [wpm, isActive, updateSetting]);

  return (
    <div className={styles.insights}>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Zap size={18} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Reading Speed</span>
            <span className={styles.statValue}>{wpm} <small>WPM</small></span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Clock size={18} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Session Time</span>
            <span className={styles.statValue}>
              {Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s
            </span>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className={styles.smartToast}>
          <AlertCircle size={14} />
          <span>{suggestions[0].text}</span>
          <button onClick={suggestions[0].action}>Apply</button>
        </div>
      )}
    </div>
  );
}
