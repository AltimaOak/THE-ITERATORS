import styles from "./HeroVisualization.module.css";

export default function HeroVisualization() {
  return (
    <div className={styles.visualization} aria-label="Example text analysis preview">
      <div className={styles.previewHeader}>
        <span>Here’s what you’ll get</span>
        <span className={styles.previewTag}>Example</span>
      </div>
      <div className={styles.sourceCard}>
        <span className={styles.label}>ORIGINAL TEXT</span>
        <p>
          A neighborhood started a community garden. Residents grew fresh food,
          met their neighbors, and helped children learn how food is grown.
        </p>
      </div>
      <div className={styles.resultCard}>
        <div className={styles.resultHeading}>
          <span className={styles.label}>IN SHORT</span>
        </div>
        <p>
          The garden provides fresh food, brings neighbors together, and gives
          children a place to learn.
        </p>
      </div>
      <div className={styles.topicRow}>
        <span className={styles.label}>WORDS THAT COME UP</span>
        <div className={styles.topicList}>
          <span>cycling</span>
          <span>streets</span>
          <span>traffic</span>
        </div>
      </div>
    </div>
  );
}
