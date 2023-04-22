import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { lichessAPI } from "../../services/lichessAPI";
import styles from "./Board.module.css";

export default function Board() {
  const [gameRaw, setGameRaw] = useState(new Chess().fen());
  const [moves, setMoves] = useState([] as string[]);
  const [currentPlay, setCurrentPlay] = useState(-1); // -1 to current, 0 to start, n to n move
  const [loaded, setLoaded] = useState(false);

  const fetchData = async () => {
    const response = await lichessAPI.get("/board/game/stream/FRIZ2S2r4RVO");

    try {
      const data = response.data;
      if (typeof data == "object") {
        setMoves(data?.state?.moves.split(" "));
      } else if (typeof data == "string") {
        console.log("passed By string type");
        const data = JSON.parse(response.data.split("\n")[0]);
        setMoves(data?.state?.moves.split(" "));
      }
    } catch (e) {
      console.log("error", e);
    }

    if (!loaded) setLoaded(true);

    setTimeout(() => {
      fetchData();
    }, 2000);
  };

  const changeCurrentPlay = (newValue: number) => {
    setCurrentPlay(newValue);
  };

  const previousMove = () => {
    if (currentPlay == 0) return;
    if (currentPlay < 0) return changeCurrentPlay(moves.length - 1);
    if (currentPlay > 0 && currentPlay <= moves.length)
      return changeCurrentPlay(currentPlay - 1);
    changeCurrentPlay(moves.length - 1);
  };

  const nextMove = () => {
    if (currentPlay < 0) return;
    if (currentPlay + 1 >= moves.length) return changeCurrentPlay(-1);
    if (currentPlay >= 0) return changeCurrentPlay(currentPlay + 1);

    changeCurrentPlay(-1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentPlay == -1 || currentPlay >= moves.length) {
      const gameCopy = new Chess();

      for (const move of moves) {
        gameCopy.move(move);
      }

      setGameRaw(gameCopy.fen());
    } else {
      const gameCopy = new Chess();

      for (let i = 0; i < currentPlay; i++) {
        gameCopy.move(moves[i]);
      }

      setGameRaw(gameCopy.fen());
    }
  }, [moves, currentPlay]);

  return (
    <>
      {loaded && (
        <div className={styles.chessboardContainer}>
          <Chessboard
            id="BasicBoard"
            position={gameRaw}
            animationDuration={400}
            arePiecesDraggable={false}
            boardWidth={350}
          />
        </div>
      )}
      <div className="buttons-area">
        <button onClick={() => changeCurrentPlay(0)}>|&lt;&lt;</button>
        <button onClick={previousMove}>&lt;</button>
        <button onClick={nextMove}>&gt;</button>
        <button onClick={() => changeCurrentPlay(-1)}>&gt;&gt;|</button>
      </div>
    </>
  );
}
