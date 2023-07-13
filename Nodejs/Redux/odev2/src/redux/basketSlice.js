import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    activeBasket: [],
    initialMoney: 100000000000,
    currentMoney: 100000000000,
    bills:0,
  },
  reducers: {
    setBasket: (state, active) => {
      if(active.payload.number==='') return
      if (active.payload.number === 0 || active.payload.number === '0') {
        if (
          state.activeBasket.filter((item) => item.name === active.payload.name)
            .length
        ) {
          state.activeBasket = state.activeBasket.filter(
            (item) => item.name !== active.payload.name
          );
        }
      } else {
        if (
          state.activeBasket.filter((item) => item.name === active.payload.name)
            .length === 0
        ) {
          state.activeBasket.push({
            name: active.payload.name,
            number: active.payload.number,
            price: active.payload.price,
          });
        } else {
          const Id = state.activeBasket.findIndex(
            (item) => item.name === active.payload.name
          );
          state.activeBasket[Id].number = active.payload.number;
        }
      }
    },
    setMoneyConfig:(state)=>{
      state.bills=0
      if (state.activeBasket.length) {
        state.activeBasket.map(
          (item) => (state.bills += (parseInt(item.number) * item.price))
        );
      }
      state.currentMoney = state.initialMoney - state.bills;
    }
  },
});

export const { setBasket, setMoneyConfig } = basketSlice.actions;
export default basketSlice.reducer;
