import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../redux/speedSlice/speedSlice";

function Results() {
  const Correctwords = useSelector((state) => state.speed.correctWords);
  const WrongWords = useSelector((state) => state.speed.wrongWords);
  const ResultKeydown = useSelector((state) => state.speed.resultKeyDown);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetGame());
  };
  return (
    <div>
      <h3>Results</h3>
      <p>
        Correct words:{Correctwords} | Wrong words:{WrongWords}{" "}
      </p>
      <p>Result Keydown:{ResultKeydown} </p>
      <button onClick={handleClick}>Try Again</button>
    </div>
  );
}

export default Results;
