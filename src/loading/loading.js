import styles from "./loading.module.css";

function Loading() {
    return (
        <div className={styles.center}>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
  <div className={styles.wave}></div>
</div>
    );
}

export default Loading;