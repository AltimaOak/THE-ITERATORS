"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Landing.module.css';
import { useTypography } from '@/context/TypographyContext';
import { ArrowRight, Zap, Target, Sliders, Check, Play, Pause, RotateCcw, Sparkles, Clock, Layers, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';

import ImmersiveHero, { TiltCard } from './ImmersiveHero';
import { ProcessFlow } from './ProcessFlow';
import { CTACards as InteractiveCTACards } from './CTACards';

export { ImmersiveHero as Hero };

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

export function Features() {
  const features = [
    { 
      title: "Dynamic Typography", 
      desc: "Instantly adjust letter and word spacing to match your visual processing speed.", 
      icon: <Sliders size={24} />,
      color: 'var(--accent-sky)'
    },
    { 
      title: "Focus Engine", 
      desc: "Highlight one word at a time to eliminate distractions and maintain fixation.", 
      icon: <Target size={24} />,
      color: 'var(--accent-coral)'
    },
    { 
      title: "Read-Aloud Sync", 
      desc: "Synchronized audio and visual signals for maximum comprehension and retention.", 
      icon: <Zap size={24} />,
      color: 'var(--accent-amber)'
    },
    { 
      title: "Neurodiverse First", 
      desc: "Built-in support for Dyslexia, ADHD, and other cognitive processing profiles.", 
      icon: <Check size={24} />,
      color: 'var(--accent-mint)'
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>Core Capabilities</div>
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
          <TiltCard key={i} className={styles.featureCardWrapper}>
            <motion.div className={styles.featureCard} variants={fadeInUp}>
              <div className={styles.featureIcon} style={{ background: f.color + '22', color: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          </TiltCard>
        ))}
      </motion.div>
    </section>
  );
}

export { ProcessFlow as HowItWorks };

export function Roadmap() {
  const futureFeatures = [
    { title: "AI Summarization", desc: "Condense long articles into key takeaways instantly.", status: "Live Beta", icon: <Sparkles size={24} /> },
    { title: "Bionic Reading", desc: "Guide your eyes with bolded fixation points for 2x speed.", status: "Coming Soon", icon: <Zap size={24} /> },
    { title: "Smart Simplify", desc: "Translate complex jargon into plain English automatically.", status: "In Development", icon: <Target size={24} /> }
  ];

  return (
    <section className={styles.roadmap}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>Upcoming</div>
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
