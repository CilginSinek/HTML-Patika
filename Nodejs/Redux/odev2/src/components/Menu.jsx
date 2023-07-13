import items from "../datas/datas.json";
import MenuItem from "./MenuItem";

function Menu() {
  return (
    <div className="menu">
      {items.items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  );
}

export default Menu;
