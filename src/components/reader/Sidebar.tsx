"use client";

import React, { useState, useEffect } from 'react';
import { useTypography, FontType, ThemeType } from '@/context/TypographyContext';
import styles from './Sidebar.module.css';
import { Settings, Save, Trash2, Clock, Play, Pause, RotateCcw, Target, Sparkles, BookOpen, Type, Palette, List } from 'lucide-react';

export default function Sidebar() {
  const { settings, updateSetting, presets, savePreset, loadPreset } = useTypography();
  const [presetName, setPresetName] = useState("");
  
  // Pomodoro State
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      setIsActive(false);
      alert("Focus session complete! Time for a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      savePreset(presetName.trim());
      setPresetName("");
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.studyFocus}>
        <div className={styles.sectionHeader}>
          <Target size={18} />
          <h4>Focus Session</h4>
        </div>
        <div className={styles.timerDisplay}>
          {formatTime(time)}
        </div>
        <div className={styles.timerControls}>
          <button onClick={() => setIsActive(!isActive)} className={styles.timerBtn}>
            {isActive ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={() => { setTime(25 * 60); setIsActive(false); }} className={styles.timerBtn}>
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Type size={18} />
          <h4>Typography</h4>
        </div>
        
        <div className={styles.controlGroup}>
          <label htmlFor="letter-spacing">Letter Spacing: {settings.letterSpacing}px</label>
          <input
            id="letter-spacing"
            type="range"
            min="-2"
            max="10"
            step="0.5"
            value={settings.letterSpacing}
            onChange={(e) => updateSetting('letterSpacing', parseFloat(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="word-spacing">Word Spacing: {settings.wordSpacing}px</label>
          <input
            id="word-spacing"
            type="range"
            min="0"
            max="20"
            value={settings.wordSpacing}
            onChange={(e) => updateSetting('wordSpacing', parseFloat(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="line-height">Line Height: {settings.lineHeight}</label>
          <input
            id="line-height"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="paragraph-spacing">Paragraph Spacing: {settings.paragraphSpacing}em</label>
          <input
            id="paragraph-spacing"
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={settings.paragraphSpacing}
            onChange={(e) => updateSetting('paragraphSpacing', parseFloat(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="reading-speed">WPM Target: {Math.round(60000 / settings.speed)} WPM</label>
          <input
            id="reading-speed"
            type="range"
            min="60"
            max="600"
            step="10"
            value={Math.round(60000 / settings.speed)}
            onChange={(e) => updateSetting('speed', Math.round(60000 / parseInt(e.target.value)))}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Settings size={18} />
          <h4>Font Family</h4>
        </div>
        <select 
          className={styles.fontSelect}
          value={settings.font}
          onChange={(e) => updateSetting('font', e.target.value as FontType)}
        >
          <option value="inter">Inter (Modern)</option>
          <option value="dyslexic">OpenDyslexic (Accessible)</option>
          <option value="lexend">Lexend (Readable)</option>
        </select>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Palette size={18} />
          <h4>Theme</h4>
        </div>
        <div className={styles.themeGrid}>
          {(['default', 'cream', 'blue', 'yellow', 'mint'] as ThemeType[]).map(t => (
            <button
              key={t}
              className={`${styles.themeBtn} ${styles[t]} ${settings.theme === t ? styles.active : ''}`}
              onClick={() => updateSetting('theme', t)}
              title={t}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Settings size={18} />
          <h4>Reading Aids</h4>
        </div>
        <div className={styles.aidGroup}>
          <div className={styles.aidItem}>
            <span>Focus Mode</span>
            <input 
              type="checkbox" 
              checked={settings.focusMode} 
              onChange={(e) => updateSetting('focusMode', e.target.checked)}
              className={styles.toggle}
            />
          </div>
          <div className={styles.aidItem}>
            <span>Reading Ruler</span>
            <input 
              type="checkbox" 
              checked={settings.readingRuler} 
              onChange={(e) => updateSetting('readingRuler', e.target.checked)}
              className={styles.toggle}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <List size={18} />
          <h4>Presets</h4>
        </div>
        <div className={styles.presetInput}>
          <input
            type="text"
            placeholder="Preset name..."
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
          />
          <button onClick={handleSavePreset} aria-label="Save Preset">
            <Save size={16} />
          </button>
        </div>
        <div className={styles.quickPresets}>
          <button 
            className={styles.presetItem}
            onClick={() => {
              updateSetting('lineHeight', 2);
              updateSetting('wordSpacing', 5);
              updateSetting('font', 'lexend');
            }}
          >
            Study Mode
          </button>
          <button 
            className={styles.presetItem}
            onClick={() => {
              updateSetting('lineHeight', 1.4);
              updateSetting('wordSpacing', 2);
              updateSetting('speed', 150);
            }}
          >
            Fast Mode
          </button>
        </div>
        <div className={styles.presetList}>
          {Object.keys(presets).map(name => (
            <button
              key={name}
              className={styles.presetItem}
              onClick={() => loadPreset(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
