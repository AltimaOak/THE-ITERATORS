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
        <h2>Ready to transform your reading?</h2>
        <p>Choose your entry point and start reading with clarity today.</p>
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
              <h3>Open Reader</h3>
              <p>Experience the most advanced adaptive typography system. Perfect for articles, books, and long-form content.</p>
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
              <p>Save your presets, sync across devices, and unlock the full AI toolkit. Join 10k+ focused readers.</p>
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
