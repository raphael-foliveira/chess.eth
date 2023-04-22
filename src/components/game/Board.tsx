import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

export default function Board() {
  const initGame = new Chess();
  const [game, setGame] = useState(initGame);

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
    console.log("running function 2");
    const movesArray: string[] = data.state.moves.split(" ");
    console.log(movesArray);

    const gameCopy = new Chess(game.fen());

    for (const move of movesArray) {
      gameCopy.move(move);
    }
    setGame(gameCopy);

    setTimeout(() => {
      fetchData();
    }, 5000);
  };

  useEffect(() => {
    fetchData();
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
