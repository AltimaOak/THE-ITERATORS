"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypography } from '@/context/TypographyContext';
import { useHighlightEngine } from '@/hooks/useHighlightEngine';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useSpeech } from '@/hooks/useSpeech';
import ReadingRuler from './ReadingRuler';
import ReadingInsights from './ReadingInsights';
import styles from './Reader.module.css';
import { Play, Pause, RotateCcw, Sliders, Type, Palette, MousePointer2, Sparkles, X, ChevronRight, Loader2, Volume2, ChevronLeft, Layout, List, FileText, Table as TableIcon, GitBranch, Eye, HelpCircle, Share2, Check } from 'lucide-react';

type ViewMode = 'original' | 'summary' | 'bullets' | 'visual' | 'table' | 'explain';

export default function Reader() {
  const [inputText, setInputText] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('original');
  const [highlightMode, setHighlightMode] = useState<'auto' | 'manual'>('auto');
  const [aiData, setAiData] = useState<{
    summary?: string;
    bullets?: string[];
    table?: string[][];
    visual?: { type: 'flow' | 'cards', nodes: any[] };
    explanation?: { concept: string, context: string, significance: string };
  } | null>(null);
  
  const { settings, updateSetting } = useTypography();
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });
  const { isSpeaking, speak, stop, pause: pauseSpeech, resume: resumeSpeech } = useSpeech();
  
  // Tokenize text into paragraphs and words
  const tokenizedData = useMemo(() => {
    if (!inputText) return [];
    const cleanText = inputText.replace(/<[^>]*>?/gm, '').trim();
    const paragraphs = cleanText.split(/\n+/).filter(p => p.trim().length > 0);
    
    let globalWordIndex = 0;
    return paragraphs.map((p, pIdx) => {
      const words = p.split(/\s+/).filter(w => w.length > 0);
      const wordsWithGlobalIndex = words.map(w => ({
        text: w,
        index: globalWordIndex++
      }));
      return { id: pIdx, words: wordsWithGlobalIndex };
    });
  }, [inputText]);

  const totalWords = useMemo(() => {
    return tokenizedData.reduce((acc, p) => acc + p.words.length, 0);
  }, [tokenizedData]);

  const { currentIndex, isPlaying, start, pause, reset, jumpTo } = useHighlightEngine(totalWords, settings.speed);

  useKeyboardShortcuts(
    () => {
      if (highlightMode === 'auto') {
        isPlaying ? pause() : start();
      }
    },
    reset
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setAiData(null);
  };

  const handleAIAction = async (mode: ViewMode) => {
    if (!inputText || inputText.trim().length < 10) return;
    setIsSummarizing(true);
    setViewMode(mode);
    
    // Simulate AI Processing
    const processingTime = 1500 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    if (mode === 'summary') {
      setAiData(prev => ({ ...prev, summary: "This text explores the convergence of AI and human cognition through adaptive reading interfaces that prioritize focus and comprehension." }));
    } else if (mode === 'bullets') {
      setAiData(prev => ({ ...prev, bullets: ["Adaptive typography reduces load", "AI simplifies complex structures", "Multi-modal sync improves retention"] }));
    } else if (mode === 'table') {
      setAiData(prev => ({ ...prev, table: [["Feature", "Benefit"], ["Typography", "Focus"], ["AI Assist", "Understanding"], ["Visuals", "Retention"]] }));
    } else if (mode === 'visual') {
      setAiData(prev => ({ ...prev, visual: { 
        type: 'flow', 
        nodes: [{id: 1, text: 'Input'}, {id: 2, text: 'AI Analysis'}, {id: 3, text: 'Visualization'}] 
      }}));
    } else if (mode === 'explain') {
      setAiData(prev => ({ ...prev, explanation: {
        concept: "Adaptive Cognitive Scaffolding",
        context: "The intersection of neuropsychology and human-computer interaction.",
        significance: "By dynamically altering visual signals, we reduce the cognitive load required to translate symbols into meaning, facilitating deeper conceptual encoding."
      }}));
    }
    
    setIsSummarizing(false);
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      stop();
    } else {
      // Pause auto-highlighting to prevent conflicts
      if (isPlaying) pause();
      
      // Start speech which will drive the highlighting
      speak(inputText, (idx) => jumpTo(idx));
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 2000);
    });
  };

  const handleSelection = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setToolbarPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 50
      });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  // Ensure highlight engine pauses if speech starts from elsewhere
  useEffect(() => {
    if (isSpeaking && isPlaying) {
      pause();
    }
  }, [isSpeaking, isPlaying, pause]);

  return (
    <div className={styles.container}>
      <div className={styles.inputPane}>
        <div className={styles.paneHeader}>
          <h3>Input Text</h3>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Paste your text here..."
          value={inputText}
          onChange={handleTextChange}
        />
        
        <div className={styles.bottomControls}>
          <div className={styles.modeToggle}>
            <button 
              className={highlightMode === 'auto' ? styles.active : ''} 
              onClick={() => setHighlightMode('auto')}
            >
              Auto
            </button>
            <button 
              className={highlightMode === 'manual' ? styles.active : ''} 
              onClick={() => setHighlightMode('manual')}
            >
              Manual
            </button>
          </div>
        </div>
      </div>

      <div className={styles.displayPane}>
        <div className={styles.centeredColumn}>
          <div className={styles.paneHeader}>
            <div className={styles.headerTitle}>
              <h3>Lucida AI Reader</h3>
            </div>
            <div className={styles.controls}>
              {highlightMode === 'manual' && (
                <>
                  <button onClick={() => jumpTo(Math.max(0, currentIndex - 1))} className={styles.controlBtn}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => jumpTo(currentIndex + 1)} className={styles.controlBtn}>
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {highlightMode === 'auto' && (
                <button onClick={isPlaying ? pause : start} className={styles.controlBtn}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              )}
              <button onClick={handleReadAloud} className={`${styles.controlBtn} ${isSpeaking ? styles.active : ''}`}>
                <Volume2 size={18} />
              </button>
              <button onClick={handleShare} className={`${styles.controlBtn} ${isSharing ? styles.shareActive : ''}`}>
                {isSharing ? <Check size={18} /> : <Share2 size={18} />}
              </button>
              <button onClick={reset} className={styles.controlBtn}><RotateCcw size={18} /></button>
              <button 
                onClick={() => handleAIAction('summary')} 
                className={`${styles.aiBtn} ${isSummarizing ? styles.aiBtnLoading : ''}`}
                disabled={isSummarizing || !inputText}
              >
                <Sparkles size={18} />
                <span>AI toolkit</span>
              </button>
            </div>
          </div>

          <div className={styles.viewTabs}>
            <button className={viewMode === 'original' ? styles.activeTab : ''} onClick={() => setViewMode('original')}><Eye size={16} /> Original</button>
            <button className={viewMode === 'summary' ? styles.activeTab : ''} onClick={() => handleAIAction('summary')}><FileText size={16} /> Summary</button>
            <button className={viewMode === 'bullets' ? styles.activeTab : ''} onClick={() => handleAIAction('bullets')}><List size={16} /> Bullets</button>
            <button className={viewMode === 'visual' ? styles.activeTab : ''} onClick={() => handleAIAction('visual')}><GitBranch size={16} /> Visual</button>
            <button className={viewMode === 'table' ? styles.activeTab : ''} onClick={() => handleAIAction('table')}><TableIcon size={16} /> Table</button>
            <button className={viewMode === 'explain' ? styles.activeTab : ''} onClick={() => handleAIAction('explain')}><HelpCircle size={16} /> Explain</button>
          </div>

          <ReadingInsights wordCount={totalWords} currentIndex={currentIndex} isActive={isPlaying || isSpeaking} />
          
          <div 
            className={`${styles.content} reader-content ${settings.focusMode ? styles.focusMode : ''} ${styles.paperTexture}`}
            onMouseUp={handleSelection}
          >
            <ReadingRuler />
            
            {showToolbar && (
              <motion.div 
                className={styles.miniToolbar}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                style={{ top: toolbarPos.y, left: toolbarPos.x }}
              >
                <button onClick={() => handleAIAction('explain')} title="Explain Selection"><HelpCircle size={16} /></button>
                <button onClick={() => handleAIAction('summary')} title="Summarize Selection"><Sparkles size={16} /></button>
                <div className={styles.divider} />
                <button onClick={() => setShowToolbar(false)}><X size={16} /></button>
              </motion.div>
            )}
            {isSummarizing && (
              <div className={styles.aiLoading}>
                <Loader2 size={32} className={styles.spin} />
                <p>AI is transforming your text into understanding...</p>
              </div>
            )}

            {!isSummarizing && viewMode === 'summary' && aiData?.summary && (
              <div className={styles.outputView}>
                <h3>Concise Summary</h3>
                <p>{aiData.summary}</p>
              </div>
            )}

            {!isSummarizing && viewMode === 'bullets' && aiData?.bullets && (
              <div className={styles.outputView}>
                <h3>Key Takeaways</h3>
                <ul>{aiData.bullets.map((b, i) => <li key={i}><ChevronRight size={16}/>{b}</li>)}</ul>
              </div>
            )}

            {!isSummarizing && viewMode === 'table' && aiData?.table && (
              <div className={styles.tableView}>
                <table>
                  <thead>
                    <tr>{aiData.table[0].map((h, i) => <th key={i}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {aiData.table.slice(1).map((row, i) => (
                      <tr key={i}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!isSummarizing && viewMode === 'explain' && aiData?.explanation && (
              <div className={styles.explainView}>
                <div className={styles.explainSection}>
                  <div className={styles.explainLabel}>Core Concept</div>
                  <p>{aiData.explanation.concept}</p>
                </div>
                <div className={styles.explainSection}>
                  <div className={styles.explainLabel}>Contextual Layer</div>
                  <p>{aiData.explanation.context}</p>
                </div>
                <div className={styles.explainSection}>
                  <div className={styles.explainLabel}>Significance</div>
                  <p>{aiData.explanation.significance}</p>
                </div>
              </div>
            )}

            {!isSummarizing && viewMode === 'visual' && aiData?.visual && (
              <div className={styles.visualView}>
                {aiData.visual.nodes.map((n, i) => (
                  <React.Fragment key={n.id}>
                    <div className={styles.nodeCard}>{n.text}</div>
                    {i < (aiData.visual?.nodes.length || 0) - 1 && <div className={styles.connector}><ChevronRight /></div>}
                  </React.Fragment>
                ))}
              </div>
            )}

            {viewMode === 'original' && !isSummarizing && (
              tokenizedData.length === 0 ? (
                <div className={styles.placeholder}><MousePointer2 size={48} /><p>Start your reading journey here</p></div>
              ) : (
                tokenizedData.map(paragraph => {
                  const isParagraphActive = paragraph.words.some(w => w.index === currentIndex);
                  return (
                    <div key={paragraph.id} className={`reader-paragraph ${settings.focusMode && !isParagraphActive && currentIndex !== -1 ? 'dimmed' : ''}`}>
                      {paragraph.words.map(word => (
                        <span key={word.index} className={`reader-word ${currentIndex === word.index ? 'active' : ''}`} onClick={() => jumpTo(word.index)}>
                          {word.text}
                        </span>
                      ))}
                    </div>
                  );
                })
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
