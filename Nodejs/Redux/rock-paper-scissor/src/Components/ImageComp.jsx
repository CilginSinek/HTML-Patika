/* eslint-disable react/prop-types */
import rock from "../assets/rock.png";
import paper from "../assets/paper.png";
import scissor from "../assets/scissor.png";
function ImageComp({ input, callback }) {
  if (input === "rock") {
    return <img className="select" src={rock} id="rock" onClick={callback} />;
  } else if (input === "paper") {
    return <img className="select" src={paper} id="paper" onClick={callback} />;
  } else if (input === "scissor") {
    return (
      <img className="select" src={scissor} id="scissor" onClick={callback} />
    );
  }
}

export default ImageComp;
