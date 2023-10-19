import { createSlice } from "@reduxjs/toolkit";
import getElements from "./dataArr";

const textArr = getElements(20);

export const speedSlice = createSlice({
  name: "speed",
  initialState: {
    texts: textArr,
    onText: textArr[0],
    isStart: false,
    isCorrect: true,
    language: "turkish",
    correctWords: 0,
    wrongWords: 0,
    resultKeyDown: 0,
    isOver: false,
  },
  reducers: {
    goNextWord: (state, action) => {
      const LocalWordIndex = state.texts.findIndex(
        (item) => item.id === action.payload.stateWord.id
      );
      console.log(LocalWordIndex);

      if (state.onText[state.language] === action.payload.text) {
        state.correctWords += 1;
      } else {
        state.wrongWords += 1;
      }

      if (LocalWordIndex + 2 <= state.texts.length) {
        console.log("segs");
        state.onText = state.texts[LocalWordIndex + 1];
        state.isCorrect = true;
      } else {
        console.log("sex");
        const newTextArr = getElements(20);
        state.texts = newTextArr;
        state.onText = newTextArr[0];
      }
    },
    startTest: (state) => {
      state.isStart = true;
      state.resultKeyDown = 0;
      state.isOver = false;
    },
    stopTest: (state) => {
      state.isStart = false;
      state.isOver = true;
    },
    setIsCorret: (state, action) => {
      state.isCorrect = action.payload;
    },
    changeLanguage: (state) => {
      const textArr = getElements(30);
      state.texts = textArr;
      state.onText = [0];
      state.isStart = false;
      state.isCorrect = true;
      state.correctWords = 0;
      state.wrongWords = 0;
      state.resultKeyDown = 0;
      state.isOver = false;

      state.language = state.language === "turkish" ? "english" : "turkish";
    },
    resetGame: (state) => {
      const textArr = getElements(30);
      state.texts = textArr;
      state.onText = [0];
      state.isStart = false;
      state.isCorrect = true;
      state.correctWords = 0;
      state.wrongWords = 0;
      state.resultKeyDown = 0;
      state.isOver = false;
    },
  },
});

export const {
  goNextWord,
  startTest,
  stopTest,
  setIsCorret,
  changeLanguage,
  resetGame,
} = speedSlice.actions;
export default speedSlice.reducer;
