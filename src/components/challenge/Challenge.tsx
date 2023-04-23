import { toast } from "react-toastify";
import { api } from "../../services/api";
import styles from "./Challenge.module.css";
import { useUser } from "../../hooks/useUser";
import { ChallengeModel } from "../../models/challenges/ChallengeModel";
import { useState } from "react";

interface ChallengeProps {
  gameId: string;
}
export default function Challenge({ gameId }: ChallengeProps) {
  const { setChallenge, opponent } = useUser();

  const [isLoading, setLoading] = useState(false);

  const createChallenge = async () => {
    try {
      setLoading(true);
      const { data } = await api.post<ChallengeModel>("/challenges", {
        opponentId: opponent.id,
        gameId,
      });

      setChallenge(data);

      window.open(`https://lichess.org/${gameId}`);

      toast.success("Challenge created, enjoy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className={styles.challengeContainer}>
      <button type="button" onClick={createChallenge}>
        {isLoading ? "..." : "CHALLENGE ME!"}
      </button>
    </div>
  );
}
