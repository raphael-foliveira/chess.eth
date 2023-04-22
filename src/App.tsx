import React, { useState } from "react";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Challenge from "./components/challenge/Challenge";

import Board from "./components/game/Board";

function App() {
  const [user, setUser] = useState(undefined);
  const getUser =  (user: any) => {
    setUser(user)
  }
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
      <ToastContainer />
      <Challenge getUser={getUser} />
      {
        // user !== undefined && 
        <Board gameId="FRIZ2S2r" />
      }
    </div>
  );
}

export default App;
