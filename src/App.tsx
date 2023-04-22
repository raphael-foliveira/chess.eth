import { useState } from "react";
import "./App.css";
import Challenge from "./components/challenge/Challenge";
import Board from "./components/game/Board";

function App() {
  const [username, setUsername] = useState('TeamWinner')
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Challenge userName={username} />
      <Board />
    </div>
  );
}

export default App;
