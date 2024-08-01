import { useEffect } from "react";
import { io } from "socket.io-client";

import "./App.css";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:6352");

    socket.emit("join", { username: "shiv", roomId: Date.now() });

    socket.on("message", (message) => {
      console.log(message);
    });
  }, []);
  return <></>;
}

export default App;
