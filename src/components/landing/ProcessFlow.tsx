"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './Landing.module.css';

const steps = [
  { 
    number: "01", 
    title: "Paste Text", 
    desc: "Drop your document, article, or notes into the Lucida input system." 
  },
  { 
    number: "02", 
    title: "Customize", 
    desc: "Adjust spacing and fonts until the text feels effortless to read." 
  },
  { 
    number: "03", 
    title: "Focus Read", 
    desc: "Activate the highlight engine and read at your optimal pace." 
  }
];

export function ProcessFlow() {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const runSequence = async () => {
      if (isInView) {
        // Step 1
        setActiveStep(0);
        await controls.start(i => i === 0 ? "visible" : "hidden");
        
        // Step 2
        setActiveStep(1);
        await controls.start(i => i === 1 ? "visible" : i < 1 ? "visible" : "hidden");
        
        // Step 3
        setActiveStep(2);
        await controls.start("visible");
      }
    };
    
    runSequence();
  }, [isInView, controls]);

  const stepVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "circOut" }
    }
  };

  const connectorVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 0.8, ease: "easeInOut" } 
    }
  };

  return (
    <section className={styles.howItWorks} ref={ref}>
      <motion.div 
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>The Process</h2>
        <p>Three simple steps to transform your reading workflow.</p>
      </motion.div>
      
      <div className={styles.stepGrid}>
        {/* Connector Line (Animated from Step 1 to 3) */}
        <motion.div 
          className={styles.stepConnector}
          variants={connectorVariants}
          initial="hidden"
          animate={activeStep >= 1 ? "visible" : "hidden"}
          style={{ originX: 0 }}
        />
        
        <div className={styles.stepsWrapper}>
          {steps.map((s, i) => (
            <motion.div 
              key={i} 
              className={`${styles.stepCard} ${activeStep === i ? styles.stepActive : ''}`}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate={controls}
            >
              <div className={styles.stepNumber}>
                <motion.span
                  animate={activeStep === i ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {s.number}
                </motion.span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              
              {activeStep === i && (
                <motion.div 
                  className={styles.activeIndicator}
                  layoutId="indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
