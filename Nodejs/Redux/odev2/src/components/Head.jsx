
import { useSelector } from "react-redux"
import { moneynumb } from "../util"


function Head() {
  const currentMoney = useSelector((state)=>state.basket.currentMoney)

  return (
    <div className="header" >
        <div className="header-text">
          <img className="bill-gates" src="https://neal.fun/spend/billgates.jpg" alt="bill gates" />
          <h3>
              Spend Bill Gates Money
          </h3>
        </div>
        <div className="head-money" >
          {moneynumb(currentMoney)}$
        </div>
    </div>
  )
}

export default Head