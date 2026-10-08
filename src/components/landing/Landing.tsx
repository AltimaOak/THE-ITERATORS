import Link from "next/link";
import { ArrowRight, FileText, ListChecks, Tags } from "lucide-react";
import styles from "./Landing.module.css";
import HeroVisualization from "./HeroVisualization";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>Make reading feel manageable</span>
        <h1>Long text,<br />made clearer.</h1>
        <p>
          Paste in something you need to read. Get a short summary, the main
          points, and a quick overview—without signing up.
        </p>
        <div className={styles.heroBtns}>
          <Link href="/app" className={styles.primaryBtn}>
            Try it with your text <ArrowRight size={18} />
          </Link>
          <Link href="#how-it-works" className={styles.secondaryBtn}>
            See how it works
          </Link>
        </div>
        <p className={styles.heroNote}>Free to try · Your text stays in your browser</p>
      </div>
      <div className={styles.heroImage}>
        <HeroVisualization />
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Add your text",
      description: "Paste text into the workspace. Nothing to upload or format.",
    },
    {
      number: "02",
      title: "Run an analysis",
      description: "Get an extractive summary, key sentences, topics, and stats.",
    },
    {
      number: "03",
      title: "Explore the results",
      description: "Switch between views, then go back to the source whenever you like.",
    },
  ];

  return (
    <section id="how-it-works" className={styles.howItWorks}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>How to use it</span>
        <h2>Start in three simple steps</h2>
      </div>
      <div className={styles.stepGrid}>
        {steps.map((step) => (
          <article className={styles.stepCard} key={step.number}>
            <span className={styles.stepNumber}>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Features() {
  const features = [
    {
      title: "A quick summary",
      description: "A short selection of the most informative sentences from your text.",
      icon: <FileText size={20} />,
    },
    {
      title: "Key sentences",
      description: "See the sentences that carry the most repeated ideas and terms.",
      icon: <ListChecks size={20} />,
    },
    {
      title: "Topics and stats",
      description: "Check common terms, word count, paragraph count, and reading time.",
      icon: <Tags size={20} />,
    },
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>What you get</span>
        <h2>Useful detail, without the noise.</h2>
      </div>
      <div className={styles.featureGrid}>
        {features.map((feature) => (
          <article className={styles.featureCard} key={feature.title}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
      <p className={styles.privacyNote}>Your text stays on your device while it is analyzed.</p>
    </section>
  );
}
