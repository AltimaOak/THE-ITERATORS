"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useTypography } from '@/context/TypographyContext';
import { useHighlightEngine } from '@/hooks/useHighlightEngine';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useSpeech } from '@/hooks/useSpeech';
import ReadingRuler from './ReadingRuler';
import ReadingInsights from './ReadingInsights';
import styles from './Reader.module.css';
import { Play, Pause, RotateCcw, MousePointer2, Volume2, ChevronLeft, ChevronRight, List, FileText, Table as TableIcon, GitBranch, Eye, Share2, Check } from 'lucide-react';
import { analyzeText, type TextAnalysis } from '@/lib/textAnalysis';

type ViewMode = 'original' | 'summary' | 'bullets' | 'visual' | 'table';

const sampleText =
  "Community gardens bring neighbors together while making better use of empty spaces. " +
  "In one local survey, residents said gardens gave them fresh produce and a place to meet. " +
  "The gardens also helped children learn where food comes from. " +
  "However, volunteers noted that reliable water access and shared maintenance plans are important for keeping a garden healthy.";

export default function Reader() {
  const [inputText, setInputText] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('original');
  const [highlightMode, setHighlightMode] = useState<'auto' | 'manual'>('auto');
  const [analysis, setAnalysis] = useState<TextAnalysis | null>(null);
  
  const { settings } = useTypography();
  const { isSpeaking, speak, stop } = useSpeech();
  
  // Tokenize text into paragraphs and words
  const tokenizedData = useMemo(() => {
    if (!inputText) return [];
    const cleanText = inputText.trim();
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
        if (isPlaying) {
          pause();
        } else {
          start();
        }
      }
    },
    reset
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setAnalysis(null);
    setViewMode('original');
  };

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setAnalysis(analyzeText(inputText));
    setViewMode('summary');
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
          <h3>Your text</h3>
          <span className={styles.wordCount}>{totalWords.toLocaleString()} words</span>
        </div>
        <p className={styles.inputHelp}>
          Paste an article, email, or notes below. We’ll pick out the main ideas.
        </p>
        <textarea
          className={styles.textarea}
          aria-label="Text to analyze"
          placeholder="Tap here and paste your text..."
          value={inputText}
          onChange={handleTextChange}
        />
        {!inputText.trim() && (
          <button
            type="button"
            className={styles.sampleBtn}
            onClick={() => {
              setInputText(sampleText);
              setAnalysis(analyzeText(sampleText));
              setViewMode('summary');
            }}
          >
            Try with an example
          </button>
        )}
        
        <div className={styles.bottomControls}>
          <div className={styles.readingHelp}>
            <span>Word-by-word reading</span>
            <span className={styles.modeToggle}>
            <button
              type="button"
              aria-pressed={highlightMode === 'auto'}
              title="Highlight each word automatically"
              className={highlightMode === 'auto' ? styles.active : ''}
              onClick={() => setHighlightMode('auto')}
            >
              Follow along
            </button>
            <button
              type="button"
              aria-pressed={highlightMode === 'manual'}
              title="Move through the text one word at a time"
              className={highlightMode === 'manual' ? styles.active : ''}
              onClick={() => setHighlightMode('manual')}
            >
              One word at a time
            </button>
            </span>
          </div>
          <button
            type="button"
            className={styles.analyzeBtn}
            onClick={handleAnalyze}
            disabled={!inputText.trim()}
          >
            Find the main ideas
          </button>
        </div>
      </div>

      <div className={styles.displayPane}>
        <div className={styles.centeredColumn}>
          <div className={styles.paneHeader}>
            <div className={styles.headerTitle}>
              <h3>{viewMode === 'original' ? 'Read your text' : 'Your results'}</h3>
            </div>
            <div className={styles.controls}>
              {highlightMode === 'manual' && (
                <>
                  <button aria-label="Previous word" onClick={() => jumpTo(Math.max(0, currentIndex - 1))} className={styles.controlBtn}>
                    <ChevronLeft size={18} />
                  </button>
                  <button aria-label="Next word" onClick={() => jumpTo(currentIndex + 1)} className={styles.controlBtn}>
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {highlightMode === 'auto' && (
                <button aria-label={isPlaying ? "Pause reading" : "Start reading"} onClick={isPlaying ? pause : start} className={styles.controlBtn}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              )}
              <button aria-label={isSpeaking ? "Stop reading aloud" : "Read aloud"} onClick={handleReadAloud} className={`${styles.controlBtn} ${isSpeaking ? styles.active : ''}`}>
                <Volume2 size={18} />
              </button>
              <button title="Copy a link to these reading settings" aria-label={isSharing ? "Settings link copied" : "Copy settings link"} onClick={handleShare} className={`${styles.controlBtn} ${isSharing ? styles.shareActive : ''}`}>
                {isSharing ? <Check size={18} /> : <Share2 size={18} />}
              </button>
              <button title="Start reading from the beginning" aria-label="Reset reading position" onClick={reset} className={styles.controlBtn}><RotateCcw size={18} /></button>
            </div>
          </div>

          <div className={styles.viewTabs}>
            <button aria-pressed={viewMode === 'original'} className={viewMode === 'original' ? styles.activeTab : ''} onClick={() => setViewMode('original')}><Eye size={16} /> Your text</button>
            <button aria-pressed={viewMode === 'summary'} className={viewMode === 'summary' ? styles.activeTab : ''} onClick={() => setViewMode('summary')} disabled={!analysis}><FileText size={16} /> In short</button>
            <button aria-pressed={viewMode === 'bullets'} className={viewMode === 'bullets' ? styles.activeTab : ''} onClick={() => setViewMode('bullets')} disabled={!analysis}><List size={16} /> Main points</button>
            <button aria-pressed={viewMode === 'visual'} className={viewMode === 'visual' ? styles.activeTab : ''} onClick={() => setViewMode('visual')} disabled={!analysis}><GitBranch size={16} /> Frequent words</button>
            <button aria-pressed={viewMode === 'table'} className={viewMode === 'table' ? styles.activeTab : ''} onClick={() => setViewMode('table')} disabled={!analysis}><TableIcon size={16} /> Text details</button>
          </div>

          {viewMode === 'original' && <ReadingInsights wordCount={totalWords} currentIndex={currentIndex} isActive={isPlaying || isSpeaking} />}
          
          <div 
            className={`${styles.content} reader-content ${settings.focusMode ? styles.focusMode : ''} ${styles.paperTexture}`}
          >
            <ReadingRuler />
            
            {viewMode === 'summary' && analysis && (
              <div className={styles.outputView}>
                <h3>In short</h3>
                <p>{analysis.summary || "There is not enough sentence-level text to create a summary."}</p>
                <p className={styles.methodNote}>A shorter version made from sentences in your text.</p>
              </div>
            )}

            {viewMode === 'bullets' && analysis && (
              <div className={styles.outputView}>
                <h3>Main points</h3>
                <ul>{analysis.keyPoints.map((point, i) => <li key={`${i}-${point}`}>{point}</li>)}</ul>
                <p className={styles.methodNote}>These sentences include words that appear often in your text.</p>
              </div>
            )}

            {viewMode === 'table' && analysis && (
              <div className={styles.tableView}>
                <table>
                  <tbody>
                    {analysis.stats.map(({ label, value }) => (
                      <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === 'visual' && analysis && (
              <div className={styles.visualView}>
                {analysis.topics.map(({ term, count }) => (
                  <div className={styles.topicChip} key={term}>
                    {term}<span>{count}</span>
                  </div>
                ))}
                {!analysis.topics.length && <p>No recurring topics found in this text.</p>}
              </div>
            )}

            {viewMode === 'original' && (
              tokenizedData.length === 0 ? (
                <div className={styles.placeholder}>
                  <MousePointer2 size={32} />
                  <p>Your text will appear here</p>
                  <span>Paste your text on the left, then choose “Find the main ideas”.</span>
                </div>
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
