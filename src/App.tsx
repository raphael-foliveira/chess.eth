import "./App.css";
import Challenge from "./components/challenge/Challenge";
import Board from "./components/game/Board";

function App() {
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
      <Challenge userName="Sashi" />
      <Board />
    </div>
  );
}

export default App;
