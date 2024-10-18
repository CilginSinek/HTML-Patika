import { useState } from "react";
import { Socket} from "socket.io-client";

const InputArea = ({messages, socket, setMessages}: {messages:string[],socket:Socket,setMessages:Function}): JSX.Element => {
  const [Message, SetMessage] = useState<string>("");
  console.log(messages)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (Message) {
          const newMessages = [...messages, Message]
          setMessages(newMessages);
          socket.emit("sendMessage",Message)
          SetMessage("");
        }
      }}
    >
      <input
        type="text"
        value={Message}
        onChange={(e) => {
          SetMessage(e.target.value);
        }}
      />
      <input type="submit" />
    </form>
  );
};

export default InputArea;
