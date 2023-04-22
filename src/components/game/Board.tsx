import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

export default function Board() {
  const initGame = new Chess();
  const [game, setGame] = useState(initGame);

  const movePiece = (move: string) => {
    const gameCopy = new Chess(game.fen());
    gameCopy.move(move);
    setGame(gameCopy);
  };
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
    const data = await response.json();
    const movesArray: string[] = data.state.moves.split(" ");
    movesArray.forEach((move) => {
      movePiece(move);
    });
  };

  useEffect(() => {
    setInterval(fetchData, 5000);
  }, []);

  return (
    <div id="BoardContainer">
      <Chessboard
        id="BasicBoard"
        position={game.fen()}
        animationDuration={0}
        arePiecesDraggable={false}
      />
    </div>
  );
}
