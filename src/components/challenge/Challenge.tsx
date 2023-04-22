import styles from "./Challenge.module.css";

export default function Challenge({ userName }: { userName: string }) {
  return (
    <div className={styles.challengeContainer}>
      <h3>Challenge {userName}</h3>

      <a href="https://lichess.org/u9GSkAnF" target="_blank">
        <button>CHALLENGE</button>
      </a>
    </div>
  );
}
