import styles from "./Challenge.module.css";

export default function Challenge({ userName }: { userName: string }) {
  return (
    <div className={styles.challengeContainer}>
      <h3>Challenge {userName}</h3>

      <button>CHALLENGE</button>
    </div>
  );
}
