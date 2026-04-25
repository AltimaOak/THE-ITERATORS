"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './ImmersiveHero.module.css';
import { ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`${className} ${styles.tiltWrapper}`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function ImmersiveHero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.backgroundBlobs}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.content}>
        <motion.div 
          className={styles.textSide}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.badge}>
            <Sparkles size={14} /> 
            <span>Evolved Reading Experience</span>
          </div>
          <h1>Transforming <span className={styles.gradientText}>Text</span> into Understanding.</h1>
          <p>
            Lucida AI uses spatial cognitive engines to reconstruct complex text into 
            immersive visual maps, summaries, and structured data.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link href="/app" className={styles.primaryCta}>
              Start Reading <ArrowRight size={18} />
            </Link>
            <Link href="#features" className={styles.secondaryCta}>
              Explore Tools
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <strong>12ms</strong>
              <span>Processing</span>
            </div>
            <div className={styles.statItem}>
              <strong>98%</strong>
              <span>Clarity</span>
            </div>
            <div className={styles.statItem}>
              <strong>10k+</strong>
              <span>Students</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.visualSide}>
          <TiltCard className={styles.mockupContainer}>
            <div className={styles.mockupGlass}>
              <div className={styles.mockupHeader}>
                <div className={styles.dots}><span/><span/><span/></div>
                <div className={styles.mockupTitle}>Lucida AI Workspace</div>
              </div>
              <div className={styles.mockupContent}>
                <div className={styles.mockupSidebar}>
                  <div className={styles.sideItem} />
                  <div className={styles.sideItem} />
                  <div className={styles.sideItem} />
                </div>
                <div className={styles.mockupReader}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonParagraph}>
                    <span style={{ width: '90%' }} />
                    <span style={{ width: '85%' }} />
                    <span style={{ width: '40%' }} />
                  </div>
                  <motion.div 
                    className={styles.floatingHighlight}
                    animate={{ x: [0, 100, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>
              {/* Floating Spatial Elements */}
              <motion.div 
                className={styles.spatialElement1}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <BookOpen size={20} /> Adaptive
              </motion.div>
              <motion.div 
                className={styles.spatialElement2}
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Layers size={20} /> Multi-View
              </motion.div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
