import { useDispatch, useSelector } from "react-redux";
import { resetGame, setChoose } from "../redux/rockSlice/rockSlice";
import ImageComp from "./ImageComp";

function Choose() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.rock.score);
  const handleClick = (e) => {
    dispatch(setChoose(e.target.id));
  };
  return (
    <div>
      <div className="choose">
        <div>
          <ImageComp input={"rock"} callback={handleClick} />
        </div>
        <div>
          <ImageComp input={"paper"} callback={handleClick} />
        </div>
        <div>
          <ImageComp input={"scissor"} callback={handleClick} />
        </div>
      </div>
      {score !== 0 && (
        <button onClick={() => dispatch(resetGame())}>Reset Game</button>
      )}
    </div>
  );
}

export default Choose;
