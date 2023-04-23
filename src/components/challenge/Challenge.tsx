import styles from "./Challenge.module.css";

interface ChallengeProps {}
export default function Challenge({}: ChallengeProps) {
  return (
    <div className={styles.challengeContainer}>
      <button type="submit">CHALLENGE ME!</button>
    </div>
  );
}
