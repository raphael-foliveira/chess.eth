import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { lichessAPI } from "../../services/lichessAPI";

export default function Board() {
  const initGame = new Chess();
  const [game, setGame] = useState(initGame);
  const [gameRaw, setGameRaw] = useState(initGame.fen());

  const fetchData = async () => {
    const response = await lichessAPI.get('/board/game/stream/50LUOnK3zZN74RVO');

    // if (response.)
    try  {
      const data = response.data;
      if (typeof(data) == "object") {
        const movesArray: string[] = data?.state?.moves.split(" ");
    
        const gameCopy = new Chess();
    
        for (const move of movesArray) {
          gameCopy.move(move);
        }
        setGame(gameCopy);
      } else if (typeof(data) == "string") {
        console.log('passed By string type');
        const data = JSON.parse(response.data.split('\n')[0]);
        const movesArray: string[] = data?.state?.moves.split(" ");
    
        const gameCopy = new Chess();
    
        for (const move of movesArray) {
          gameCopy.move(move);
        }
        setGame(gameCopy);
      }
    } catch (e) {
      console.log('error', e)
    } 

    setTimeout(() => {
      fetchData();
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGameRaw(game.fen());
  }, [game]);

  return (
    <div id="BoardContainer">
      <Chessboard
        id="BasicBoard"
        position={gameRaw}
        animationDuration={400}
        arePiecesDraggable={false}
      />
    </div>
  );
}
