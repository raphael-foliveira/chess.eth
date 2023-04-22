import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [game, setGame] = useState(new Chess());

  const movePieces = (moves: string[]) => {
    const gameCopy = new Chess(game.fen());
    moves.forEach((move) => {
      gameCopy.move(move);
    });
    setGame(gameCopy);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://lichess.org/api/board/game/stream/izOTDUBw4Rvo",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer lip_sbywVZGnBYMbA4SFfZTl",
          },
        }
      );
      console.log("running function");
      return await response.json();
    };

    fetchData().then((data) => {
      const movesArray: string[] = data.state.moves.split(" ");
      movePieces(movesArray);
    });
  }, []);

  return (
    <div id="BoardContainer">
      <Chessboard
        id="BasicBoard"
        position={game.fen()}
        animationDuration={200}
        arePiecesDraggable={false}
      />
    </div>
  );
}

export default App;
