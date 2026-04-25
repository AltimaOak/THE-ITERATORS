"use client";

import React, { useEffect, useState } from 'react';
import { useTypography } from '@/context/TypographyContext';
import styles from './ReadingRuler.module.css';

export default function ReadingRuler() {
  const { settings } = useTypography();
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (!settings.readingRuler) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingRuler]);

  if (!settings.readingRuler) return null;

  return (
    <div 
      className={styles.ruler} 
      style={{ transform: `translateY(${mouseY}px)` }}
    />
  );
}
