import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import styles from "./Auth.module.css";
import { canAuthenticate } from "./validations";
import { toast } from "react-toastify";

export const Auth = () => {
  const { isLoading, signIn } = useAuth();

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await canAuthenticate({
        token,
        email,
      });
    } catch (error) {
      toast.error("Invalid credentials", {
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

    await signIn({
      token,
      email,
    });
  };

  return (
    <div className={styles.container}>
      <h3>Sign in with your lichess account</h3>

      <form onSubmit={handleSubmit}>
        <div className={styles.challengeFormContainer}>
          <input
            title="token"
            type="text"
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your lichess token"
          />
          <input
            title="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your lichess email account"
          />
        </div>

        <button>{isLoading ? "..." : "Entrar"}</button>
      </form>
    </div>
  );
};
