import "./App.css";
import { useSelector } from "react-redux";
import Choose from "./Components/Choose";
import Enemy from "./Components/Enemy";
import Header from "./Components/Header";

function App() {
  const selected = useSelector((state) => state.rock.userChoose);
  console.log(selected);

  return (
    <>
      <Header />
      {selected.length === 0 ? <Choose /> : <Enemy />}
    </>
  );
}

export default App;
