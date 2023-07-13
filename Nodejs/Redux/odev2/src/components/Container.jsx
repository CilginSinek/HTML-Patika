import Bills from "./Bills";
import Head from "./Head";
import Menu from "./Menu";
import './style.css'

function Container() {
  return (
    <div className="container">
      <Head />
      <Menu />
      <Bills />
    </div>
  );
}

export default Container;
