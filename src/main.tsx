import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/user/provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <App />
  </UserProvider>
);
