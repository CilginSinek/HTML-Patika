import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAsyncText = createAsyncThunk("text/getAsyncText", async ({param,type})=>{
    console.log(param, type)
    const format = type ? "html" : "text";
    const texts = await fetch(`https://baconipsum.com/api/?type=all-meat&paras=${param}&format=${format}`)
      .then(response => response.text())
      .then(data => {
        return data.split('\n')
      })
    return texts
})
