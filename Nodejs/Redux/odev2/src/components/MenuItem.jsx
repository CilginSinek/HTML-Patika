/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { setMoneyConfig, setBasket } from "../redux/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { moneynumb } from "../util";

function MenuItem({ item }) {
  const [inputValue, setInputValue] = useState(0);
  const currentMoney = useSelector((state)=>state.basket.currentMoney)

  const dispatch = useDispatch();

  const getMax=(current, price)=>{
    if(current>price){
      return(Math.floor(current/price))
    }else{
      return 0
    }
  }

  useEffect(() => {
    const newItem = {...item, number: parseInt(inputValue)}
    dispatch(setBasket(newItem))
    dispatch(setMoneyConfig())
  }, [dispatch, inputValue,item]);

  return (
    <div className="menuItem">
      <img className="item-img" src={item.img} alt={item.name} />
      <div>
        <h5>{item.name}</h5>
        <p>{moneynumb(item.price)}$</p>
      </div>
      <div className="item-control" >
        <button
          className="item-buy"
          onClick={(e) => {
            if (!e.target.attributes.disabled) {
              setInputValue(parseInt(inputValue) + 1);
            }
          }}
          disabled={currentMoney < item.price}
        >
          Buy
        </button>
        <input
          className="item-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="number"
          max={getMax(currentMoney,item.price)}
          min={0}
        />
        <button
          className="item-sell"
          onClick={(e) => {
            if (!e.target.attributes.disabled) {
              setInputValue(parseInt(inputValue) - 1);
            }
          }}
          disabled={inputValue === 0}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
