import { useDispatch } from "react-redux";
import { resetGame, tryAgain } from "../redux/rockSlice/rockSlice";

// eslint-disable-next-line react/prop-types
function ResultsButtons({ result }) {
  const dispatch = useDispatch();
  if (result === "won") {
    return (
      <>
        <h3>You Won!</h3>
        <button onClick={() => dispatch(resetGame())}>Play Again</button>
      </>
    );
  } else if (result === "lose") {
    return (
      <>
        <h3>You Lost</h3>
        <button onClick={() => dispatch(resetGame())}>Play Again</button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => dispatch(tryAgain())}>Try Again</button>
      </>
    );
  }
}

export default ResultsButtons;
