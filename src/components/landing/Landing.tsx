"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Landing.module.css';
import { useTypography } from '@/context/TypographyContext';
import { ArrowRight, Zap, Target, Sliders, Check, Play, Pause, RotateCcw, Sparkles, Clock } from 'lucide-react';

import { motion } from 'framer-motion';
import HeroVisualization from './HeroVisualization';
import { ProcessFlow } from './ProcessFlow';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.heroContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={styles.badge}>Cognitive Accessibility Reimagined</span>
        <h1>Read Smarter.<br />Not Harder.</h1>
        <p>
          Lucida is an adaptive reading system that optimizes typography in real-time
          to match your cognitive profile. Enhance focus, improve comprehension, and
          reduce reading fatigue.
        </p>
        <div className={styles.heroBtns}>
          <Link href="/app" className={styles.primaryBtn}>
            Start Reading <ArrowRight size={18} />
          </Link>
          <Link href="#features" className={styles.secondaryBtn}>
            How it works
          </Link>
        </div>
      </motion.div>
      <div className={styles.heroImage}>
        <HeroVisualization />
      </div>
    </section>
  );
}

function ReadingDemo() {
  const [sliderPos, setSliderPos] = useState(50);
  const { settings } = useTypography();

  return (
    <div className={styles.demo}>
      <div className={styles.demoControls}>
        <div className={styles.demoLabel}>Adaptive Spacing</div>
        <input 
          type="range" 
          value={sliderPos} 
          onChange={(e) => setSliderPos(parseInt(e.target.value))}
          className={styles.demoSlider}
        />
      </div>
      
      <div className={styles.demoContent} style={{
        letterSpacing: `${(sliderPos / 100) * 0.5}em`,
        wordSpacing: `${(sliderPos / 100) * 1}em`,
        lineHeight: 1.5 + (sliderPos / 100) * 1
      }}>
        <div className={styles.demoLine}>Information processing is the change of information in any manner detectable by an observer.</div>
        <div className={styles.demoLine}>As such, it is a process that describes everything that happens in the universe.</div>
        <div className={styles.demoLine}>Cognitive psychology sees the individual as a processor of information.</div>
      </div>
    </div>
  );
}

export function Features() {
  const features = [
    { title: "Dynamic Typography", desc: "Instantly adjust letter and word spacing to match your visual processing speed.", icon: <Sliders size={24} /> },
    { title: "Focus Engine", desc: "Highlight one word at a time to eliminate distractions and maintain fixation.", icon: <Target size={24} /> },
    { title: "Read-Aloud Sync", desc: "Synchronized audio and visual signals for maximum comprehension and retention.", icon: <Zap size={24} /> },
    { title: "Neurodiverse First", desc: "Built-in support for Dyslexia, ADHD, and other cognitive processing profiles.", icon: <Check size={24} /> }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.sectionHeader}>
        <h2>Engineered for Clarity</h2>
        <p>Tools designed to support neurodiverse readers and high-performance professionals.</p>
      </div>
      <motion.div 
        className={styles.featureGrid}
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {features.map((f, i) => (
          <motion.div key={i} className={styles.featureCard} variants={fadeInUp}>
            {f.icon}
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export { ProcessFlow as HowItWorks };

// Pricing removed per request

export function Roadmap() {
  const futureFeatures = [
    { title: "AI Summarization", desc: "Condense long articles into key takeaways instantly.", status: "Live Beta", icon: <Sparkles size={24} /> },
    { title: "Bionic Reading", desc: "Guide your eyes with bolded fixation points for 2x speed.", status: "Coming Soon", icon: <Zap size={24} /> },
    { title: "Smart Simplify", desc: "Translate complex jargon into plain English automatically.", status: "In Development", icon: <Target size={24} /> }
  ];

  return (
    <section className={styles.roadmap}>
      <div className={styles.sectionHeader}>
        <h2>The Future of Reading</h2>
        <p>We're building the most advanced cognitive assistance platform on the planet.</p>
      </div>
      <motion.div 
        className={styles.roadmapGrid}
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {futureFeatures.map((f, i) => (
          <motion.div key={i} className={styles.roadmapCard} variants={fadeInUp}>
            <div className={styles.status}>{f.status}</div>
            <div className={styles.roadmapIcon}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
