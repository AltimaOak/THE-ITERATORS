"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Reader from '@/components/reader/Reader';
import Sidebar from '@/components/reader/Sidebar';
import styles from './App.module.css';

export default function AppPage() {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.readerWrapper}>
          <Reader />
        </div>
      </div>
    </div>
  );
}
