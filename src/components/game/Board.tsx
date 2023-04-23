import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { lichessAPI } from "../../services/lichessAPI";
import styles from "./Board.module.css";

interface BoardProps {
  gameId: string;
}

interface ResponseGameStreamLiChess {
  rated: boolean;
  white: {
    name: string;
    rating: string;
  };
  black: {
    name: string;
    rating: string;
  };
  state: {
    moves: string;
    status:
      | "created"
      | "started"
      | "aborted"
      | "mate"
      | "resign"
      | "stalemate"
      | "timeout"
      | "draw"
      | "outoftime"
      | "cheat"
      | "noStart"
      | "unknownFinish"
      | "variantEnd";
    winner?: "black" | "white";
  };
}

const Board: React.FC<BoardProps> = (props) => {
  const [gameRaw, setGameRaw] = useState(new Chess().fen());
  const [moves, setMoves] = useState([] as string[]);
  const [currentPlay, setCurrentPlay] = useState(-1); // -1 to current, 0 to start, n to n move
  const [loaded, setLoaded] = useState(false);
  const [gameData, setGameData] = useState({} as ResponseGameStreamLiChess);

  const fetchData = async () => {
    const response = await lichessAPI.get<ResponseGameStreamLiChess | string>(
      `/board/game/stream/${props.gameId}4RVO`
    ); // for any god reason, only works with 4RVO at the end

    const data = response.data;
    if (typeof data == "object") {
      setMoves(data?.state?.moves.split(" "));
      setGameData(data);
    } else if (typeof data == "string") {
      console.log("passed By string type");
      const data = JSON.parse(String(response.data).split("\n")[0]);
      setMoves(data?.state?.moves.split(" "));
      setGameData(data);
    }

    if (!loaded) setLoaded(true);

    setTimeout(() => {
      fetchData();
    }, 2000);
  };

  const checkThereareNotWinnersOrDraw = () => {
    const nonValidsStates = ["created", "started", "mate", "resign", "draw"];

    if (
      !gameData.state.winner &&
      !nonValidsStates.includes(gameData.state.status)
    )
      return true;

    return false;
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
          <div className={styles.userData}>
            <strong>{gameData.black.name} (black)</strong>
            <span>Rating: {gameData.black.rating}</span>
          </div>
          <div className={styles.chessboardArea}>
            {gameData.state.winner && currentPlay === -1 && (
              <strong className={styles.winner}>
                {gameData[gameData.state.winner].name} wins!
              </strong>
            )}

            {gameData.state.status === "draw" && currentPlay === -1 && (
              <strong className={styles.winner}>Draw!</strong>
            )}

            {checkThereareNotWinnersOrDraw() && currentPlay === -1 && (
              <strong className={styles.winner}>No winner!</strong>
            )}
            <Chessboard
              id="BasicBoard"
              position={gameRaw}
              animationDuration={400}
              arePiecesDraggable={false}
              boardWidth={350}
            />
          </div>
          <div className={styles.userData}>
            <strong>{gameData.white.name} (white)</strong>
            <span>Rating: {gameData.white.rating}</span>
          </div>
        </div>
      )}
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => changeCurrentPlay(0)}>
          &lt;&lt;
        </button>
        <button className={styles.button} onClick={previousMove}>
          &lt;
        </button>
        <button className={styles.button} onClick={nextMove}>
          &gt;
        </button>
        <button className={styles.button} onClick={() => changeCurrentPlay(-1)}>
          &gt;&gt;
        </button>
      </div>
    </>
  );
};

export default Board;
