import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Markdown from "react-markdown";

function MarkDownArea() {
  const reduxText = useSelector((state) => state.text.text);
  const [text, setText] = useState(reduxText);

  useEffect(() => {
    setText(reduxText);
  }, [reduxText]);
  
  return (
    <div className="card">
      <Markdown>{text}</Markdown>
    </div>
  );
}

export default MarkDownArea;
