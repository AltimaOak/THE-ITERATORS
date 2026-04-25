"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Sparkles, Layout, Table as TableIcon, GitBranch, Zap, Check } from 'lucide-react';
import styles from './HeroVisualization.module.css';

const particleVariants = {
  animate: {
    x: [0, 60],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const nodeVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }),
  hover: { 
    y: -5,
    boxShadow: "0 20px 40px rgba(56, 189, 248, 0.12)",
    transition: { duration: 0.3 }
  }
};

export default function HeroVisualization() {
  return (
    <div className={styles.visualization}>
      {/* Abstract Background Grid */}
      <div className={styles.gridOverlay} />
      
      <div className={styles.flowWrapper}>
        <div className={styles.flowContainer}>
          {/* Step 1: Input */}
          <motion.div 
            className={styles.node}
            variants={nodeVariants}
            custom={0}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <div className={styles.nodeTag}>Step 01</div>
            <div className={styles.nodeIcon}><FileText size={24} /></div>
            <div className={styles.nodeLabel}>Input Content</div>
            <div className={styles.nodePreview}>
              <div className={styles.skeletonLine} style={{ width: '90%' }} />
              <div className={styles.skeletonLine} style={{ width: '70%' }} />
              <div className={styles.skeletonLine} style={{ width: '40%' }} />
            </div>
          </motion.div>

          {/* Connector 1 with Particles */}
          <div className={styles.connector}>
            <svg width="60" height="2" viewBox="0 0 60 2">
              <line x1="0" y1="1" x2="60" y2="1" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
              <motion.circle cx="0" cy="1" r="2" fill="var(--accent)" variants={particleVariants} animate="animate" />
            </svg>
          </div>

          {/* Step 2: Engine */}
          <motion.div 
            className={`${styles.node} ${styles.engineNode}`}
            variants={nodeVariants}
            custom={1}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <div className={styles.nodeTag} style={{ color: 'var(--accent)' }}>Processing</div>
            <div className={styles.engineCore}>
              <motion.div 
                className={styles.pulse}
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className={styles.orbit}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <Cpu size={32} />
            </div>
            <div className={styles.nodeLabel}>AI Cognitive Engine</div>
            <div className={styles.statusBadge}>
              <Zap size={10} /> Active
            </div>
          </motion.div>

          {/* Connector 2 with Particles */}
          <div className={styles.connector}>
            <svg width="60" height="2" viewBox="0 0 60 2">
              <line x1="0" y1="1" x2="60" y2="1" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
              <motion.circle cx="0" cy="1" r="2" fill="var(--accent)" variants={particleVariants} animate="animate" />
            </svg>
          </div>

          {/* Step 3: Output */}
          <div className={styles.outputColumn}>
            <motion.div 
              className={styles.outputItem}
              variants={nodeVariants}
              custom={2}
              initial="initial"
              animate="animate"
              whileHover={{ x: 5 }}
            >
              <div className={styles.outputIcon}><Sparkles size={14} /></div>
              <span>Smart Summary</span>
            </motion.div>
            <motion.div 
              className={styles.outputItem}
              variants={nodeVariants}
              custom={2.2}
              initial="initial"
              animate="animate"
              whileHover={{ x: 5 }}
            >
              <div className={styles.outputIcon}><GitBranch size={14} /></div>
              <span>Concept Maps</span>
            </motion.div>
            <motion.div 
              className={styles.outputItem}
              variants={nodeVariants}
              custom={2.4}
              initial="initial"
              animate="animate"
              whileHover={{ x: 5 }}
            >
              <div className={styles.outputIcon}><TableIcon size={14} /></div>
              <span>Data Extraction</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modern Floating Elements */}
      <motion.div 
        className={styles.floatingTag}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '20%', left: '10%' }}
      >
        <Check size={12} /> Adaptive
      </motion.div>
      <motion.div 
        className={styles.floatingTag}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ bottom: '20%', right: '10%' }}
      >
        <Zap size={12} /> Fast
      </motion.div>
    </div>
  );
}
