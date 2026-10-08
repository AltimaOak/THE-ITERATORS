"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import LucidaLogo from './LucidaLogo';

export default function Navbar() {
  const pathname = usePathname();
  const isApp = pathname.startsWith('/app');

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <LucidaLogo />
          </div>
          <span className={styles.logoText}>Lucida Analyzer</span>
        </Link>

        <Link href="/#features" className={styles.infoLink}>
          What you get
        </Link>
        {!isApp && (
          <Link href="/app" className={styles.getStartedLink}>
            Get started
          </Link>
        )}

        {isApp && (
          <div className={styles.appProfile}>
            <div className={styles.statusDot} />
            <span>Live Workspace</span>
          </div>
        )}
      </div>
    </nav>
  );
}
