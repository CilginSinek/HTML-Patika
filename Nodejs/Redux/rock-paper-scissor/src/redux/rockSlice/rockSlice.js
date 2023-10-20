import { createSlice } from "@reduxjs/toolkit";

export const rockSlice = createSlice({
  name: "rock",
  initialState: {
    userChoose: "",
    score: 0,
    enemyChoose: "",
    result: "",
  },
  reducers: {
    setChoose: (state, action) => {
      state.userChoose = action.payload;
    },
    setEnemy: (state) => {
      let enemyChoose;
      const randomSayi = Math.floor(Math.random() * 3) + 1;
      switch (randomSayi) {
        case 1:
          enemyChoose = "rock";
          break;
        case 2:
          enemyChoose = "paper";
          break;
        case 3:
          enemyChoose = "scissor";
          break;
      }
      state.enemyChoose = enemyChoose;
      if (state.userChoose === "rock") {
        if (state.enemyChoose === "paper") {
          state.score -= 1;
        } else if (state.enemyChoose === "scissor") {
          state.score += 1;
        }
      } else if (state.userChoose === "paper") {
        if (state.enemyChoose === "scissor") {
          state.score -= 1;
        } else if (state.enemyChoose === "rock") {
          state.score += 1;
        }
      } else {
        if (state.enemyChoose === "rock") {
          state.score -= 1;
        } else if (state.enemyChoose === "paper") {
          state.score += 1;
        }
      }

      if (state.score === 3) {
        state.result = "won";
      } else if (state.score === -3) {
        state.result = "lose";
      }
    },
    tryAgain: (state) => {
      state.userChoose = "";
      state.enemyChoose = "";
    },
    resetGame: (state) => {
      state.userChoose = "";
      state.enemyChoose = "";
      state.score = 0;
      state.result = "";
    },
  },
});
export const { setChoose, setEnemy, tryAgain, resetGame } = rockSlice.actions;
export default rockSlice.reducer;
