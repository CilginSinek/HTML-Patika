import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../redux/speedSlice/speedSlice";

function Header() {
  const language = useSelector((state) => state.speed.language);
  const dispatch = useDispatch();
  return (
    <div className="header">
      <h1>Type Speed Test</h1>
      <div className="langDiv">
        <p>{language === "turkish" ? "Türkçe" : "English"}</p>
        <button onClick={() => dispatch(changeLanguage())}>
          {language === "turkish" ? "Change Language" : "Dili Değiştir"}
        </button>
      </div>
    </div>
  );
}

export default Header;
