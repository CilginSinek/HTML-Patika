import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TextArea() {
  const texts = useSelector((state) => state.speed.texts);
  const language = useSelector((state) => state.speed.language);
  const onText = useSelector((state) => state.speed.onText);
  const isCorrect = useSelector((state) => state.speed.isCorrect);

  const [stateTexts, setStateTexts] = useState(texts);

  useEffect(() => {
    setStateTexts(texts);
  }, [texts]);

  return (
    <div className="textsArea">
      {stateTexts.map((item) => (
        <div
          key={item.id}
          className={
            onText.id !== item.id
              ? "word"
              : isCorrect === true
              ? "word selectedWord"
              : "word selectedWord Wrong"
          }
        >
          <p>{language === "turkish" ? item.turkish : item.english}</p>
        </div>
      ))}
    </div>
  );
}

export default TextArea;
