import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setEnemy } from "../redux/rockSlice/rockSlice";
import { useDispatch } from "react-redux";
import ResultsButtons from "./ResultsButtons";
import ImageComp from "./ImageComp";

function Enemy() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.rock.userChoose);
  const Enemy = useSelector((state) => state.rock.enemyChoose);
  const result = useSelector((state) => state.rock.result);
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (Enemy.length === 0) {
      const timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds < 1) {
          dispatch(setEnemy());
          clearInterval(timer);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  });
  return (
    <div>
      <div className="fight">
        <div>
          <ImageComp input={selected} />
        </div>
        <div>
          <div>
            {seconds > 0 ? <p>{seconds}</p> : <ImageComp input={Enemy} />}
          </div>
        </div>
      </div>
      <div>{Enemy.length > 0 && <ResultsButtons result={result} />}</div>
    </div>
  );
}

export default Enemy;
