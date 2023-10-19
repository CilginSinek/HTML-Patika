import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stopTest } from "../redux/speedSlice/speedSlice";

function Timer() {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(60);
  const isStart = useSelector((state) => state.speed.isStart);

  useEffect(() => {
    if (isStart) {
      const timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds < 1) {
          dispatch(stopTest());
          clearInterval(timer);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      setSeconds(60);
    }
  }, [dispatch, isStart, seconds]);

  return (
    <div>
      <p>{seconds}</p>
    </div>
  );
}

export default Timer;
