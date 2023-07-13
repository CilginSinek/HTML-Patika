import { useSelector } from "react-redux"
import { moneynumb } from "../util";

function Bills() {
  const basket = useSelector((state)=>state.basket.activeBasket)
  const bills = useSelector((state)=>state.basket.bills)

  if(!basket.length)return null;

  return (
    <div>
      <h1 className="receipt" >Your Receipt</h1>
      <div>
        {basket.map((item,index)=>
          <div className="bill-item" key={index}>
            <div>
              <h3>{item.name}</h3>           
            </div>
            <div className="bill-money" >
              <strong>
                {item.number}X
              </strong>
              <p>{moneynumb(item.price)}$</p>
            </div>
          </div>
        )}
      </div>
      <hr/>
      <div className="bill-total" >
        <h2>Total</h2>
        <p>{moneynumb(bills)}</p>
      </div>
    </div>
  )
}

export default Bills