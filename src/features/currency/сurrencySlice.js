import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import currs from '../../currencies/currs.json';
import langs from '../../currencies/langs.json';

const initialState = {
  rates: {},
  defalutOption: 'Russian Ruble',
  code: 'RUB',
  amount: 1
};

export const getCurrencies = createAsyncThunk(
  'сurrency/fetchCurrencies',
  async (args, { getState }) => {
    const state = getState();
    const currs = `https://open.er-api.com/v6/latest/${state.currency.code}`;
    const response = await fetch(currs);
    const data = await response.json();
    return data;
  }
);

export const сurrencySlice = createSlice({
  name: 'сurrency',
  initialState,
  reducers: {
    changeCurr: (state, action) => {
      return {
        ...state,
        code: action.payload[0],
        defalutOption: action.payload[1]
      }
    },
    setLang: (state) => {
      const userLang = navigator.language || navigator.userLanguage;
      const currLang = Object.keys(langs).find(e =>  e.includes(userLang));
      const getCurr = Object.entries(currs).filter(e => e[1] === langs[currLang]);
      const arr = getCurr[0];
      return {
        ...state,
        code: arr[0],
        defalutOption: arr[1]
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      return {
        ...state,
        rates: action.payload
      }
    })
  }
});

export const { changeCurr, setLang } = сurrencySlice.actions;
export const selectCurrency = state => state.сurrency;
export default сurrencySlice.reducer;