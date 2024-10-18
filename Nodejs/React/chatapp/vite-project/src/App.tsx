import { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import InputArea from "./components/InputArea";
import Chatlist from "./components/Chatlist";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const socket = io("http://localhost:3000", {transports:['websocket']});

  socket.on("takeMessage",(message)=>{
    if(typeof(message) == "string" ){
      const newMessages = [...messages, message];
      setMessages(newMessages)
    }
  })

  return (
    <>
      <div>
        <div>
          <Chatlist messages={messages} />
        </div>
        <div>
          <InputArea messages={messages} setMessages={setMessages} socket={socket} />
        </div>
      </div>
    </>
  );
}

export default App;
