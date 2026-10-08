import Navbar from "@/components/layout/Navbar";
import { Hero, Features, HowItWorks } from "@/components/landing/Landing";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.logoIcon}>L</div>
            <span>Lucida Analyzer</span>
          </div>
          <p>Simple text analysis, right in your browser.</p>
        </div>
      </footer>
    </main>
  );
}
