"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import styles from './Landing.module.css';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    y: -12,
    scale: 1.02
  }
};

export function CTACards() {
  return (
    <section className={styles.ctaCards}>
      <div className={styles.sectionHeader}>
        <h2>Ready to analyze smarter?</h2>
        <p>Choose your entry point and start turning raw text into clear insight.</p>
      </div>
      
      <div className={styles.ctaGrid}>
        <Link href="/app" className={styles.ctaLink}>
          <motion.div 
            className={`${styles.card} ${styles.primaryCard}`}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <div className={styles.cardIcon}><BookOpen size={32} /></div>
            <div className={styles.cardContent}>
              <h3>Open Analyzer</h3>
              <p>Paste any article, notes, or draft and convert it into summaries, highlights, and structured insights.</p>
              <div className={styles.cardAction}>
                Launch Workspace <ArrowRight size={18} />
              </div>
            </div>
          </motion.div>
        </Link>

        <Link href="/signup" className={styles.ctaLink}>
          <motion.div 
            className={`${styles.card} ${styles.secondaryCard}`}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <div className={styles.cardIcon}><Sparkles size={32} /></div>
            <div className={styles.cardContent}>
              <h3>Create Account</h3>
              <p>Save your analysis presets, organize projects, and unlock the full AI toolkit for faster understanding.</p>
              <div className={styles.cardAction}>
                Join Lucida AI <ArrowRight size={18} />
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
