import Navbar from "@/components/layout/Navbar";
import { Hero, Features, HowItWorks, Roadmap, CTACards } from "@/components/landing/Landing";
import { CTACards as InteractiveCTACards } from "@/components/landing/CTACards";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Roadmap />
      <InteractiveCTACards />
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.logoIcon}>L</div>
            <span>Lucida</span>
          </div>
          <p>© 2026 Lucida Adaptive Systems. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
