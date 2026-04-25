"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
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
          <span className={styles.logoText}>Lucida X</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={pathname === '/' ? styles.active : ''}>Overview</Link>
          <Link href="/app" className={isApp ? styles.active : ''}>Workspace</Link>
          <Link href="#features">Capabilities</Link>
        </div>

        <div className={styles.actions}>
          {isApp ? (
            <div className={styles.appProfile}>
              <div className={styles.statusDot} />
              <span>Live Workspace</span>
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.loginLink}>Login</Link>
              <Link href="/app" className={styles.launchBtn}>
                Launch App <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
