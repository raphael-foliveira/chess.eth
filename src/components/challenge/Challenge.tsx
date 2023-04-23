import { toast } from "react-toastify";
import { api } from "../../services/api";
import styles from "./Challenge.module.css";

interface ChallengeProps {
  opponentId: string;
  gameId: string;
}
export default function Challenge({opponentId, gameId}: ChallengeProps) {
  const createChallenge = async () => {
    try {
      const parsedData = {
        opponentId,
        gameId
      }
      console.log('parsedData', parsedData)
    //  api.post(, parsedData)
    } catch (err) {
      toast.error("Try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  }
  return (
    <div className={styles.challengeContainer}>
      <button type="button" onClick={createChallenge}>CHALLENGE ME!</button>
    </div>
  );
}
