import { useSelector } from "react-redux";

function Header() {
  const score = useSelector((state) => state.rock.score);

  return (
    <div>
      <div>
        <h1>Rock Paper Scissors</h1>
      </div>
      <div>
        <p>Score</p>
        <p>{score}</p>
      </div>
    </div>
  );
}

export default Header;
