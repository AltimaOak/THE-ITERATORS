"use client";

import React from 'react';
import { useTypography } from '@/context/TypographyContext';
import styles from './Settings.module.css';
import { Trash2, Shield, Eye, Keyboard } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSetting, presets, resetSettings } = useTypography();

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Manage your account and reading preferences</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Shield size={20} />
            <h3>General Settings</h3>
          </div>
          <div className={styles.card}>
            <div className={styles.item}>
              <div>
                <h4>Reset All Preferences</h4>
                <p>Restore typography and theme to default Apple-standard settings.</p>
              </div>
              <button onClick={resetSettings} className={styles.dangerBtn}>Reset</button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Eye size={20} />
            <h3>Accessibility</h3>
          </div>
          <div className={styles.card}>
            <div className={styles.item}>
              <div>
                <h4>Focus Mode</h4>
                <p>Dim everything except the active paragraph while reading.</p>
              </div>
              <input 
                type="checkbox" 
                className={styles.toggle} 
                checked={settings.focusMode}
                onChange={(e) => updateSetting('focusMode', e.target.checked)}
              />
            </div>
            <div className={styles.item}>
              <div>
                <h4>Reading Ruler</h4>
                <p>Enable a horizontal guide that follows your mouse cursor.</p>
              </div>
              <input 
                type="checkbox" 
                className={styles.toggle} 
                checked={settings.readingRuler}
                onChange={(e) => updateSetting('readingRuler', e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Trash2 size={20} />
            <h3>Manage Presets</h3>
          </div>
          <div className={styles.card}>
            {Object.keys(presets).length === 0 ? (
              <p className={styles.empty}>No custom presets saved yet.</p>
            ) : (
              Object.keys(presets).map(name => (
                <div key={name} className={styles.item}>
                  <span>{name}</span>
                  <button className={styles.textBtn}>Delete</button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Keyboard size={20} />
            <h3>Keyboard Shortcuts</h3>
          </div>
          <div className={styles.card}>
            <div className={styles.shortcut}>
              <span>Space</span>
              <span>Start / Pause Engine</span>
            </div>
            <div className={styles.shortcut}>
              <span>R</span>
              <span>Reset Engine</span>
            </div>
            <div className={styles.shortcut}>
              <span>T</span>
              <span>Switch Theme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
