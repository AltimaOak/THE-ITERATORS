"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, User, LayoutDashboard, Sparkles } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const isApp = pathname.startsWith('/app');

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <div className={styles.iconCore} />
            <div className={styles.iconRing} />
          </div>
          <span className={styles.logoText}>Lucida</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
          <Link href="/app" className={isApp ? styles.active : ''}>Reader</Link>
          <Link href="/app/settings" className={pathname === '/app/settings' ? styles.active : ''}>Settings</Link>
        </div>

        <div className={styles.actions}>
          {isApp ? (
            <div className={styles.userProfile}>
              <div className={styles.avatar}>A</div>
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Login</Link>
              <Link href="/signup" className={styles.signupBtn}>Start Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
