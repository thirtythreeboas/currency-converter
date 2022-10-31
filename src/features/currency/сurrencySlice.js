import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../APICall/getCurrencies';
import currs from '../../currencies/currs.json';
import langs from '../../currencies/langs.json';

const initialState = {
  rates: {},
  defalutOption: 'Russian Ruble',
  currecnyCode: 'RUB',
  amount: 1
};

export const getCurrencies = createAsyncThunk(
  'сurrency/fetchCurrencies',
    async (args, { getState }) => {
      const state = getState();
      return getData(state.currency.currecnyCode);
  }
);

export const сurrencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurr: (state, action) => {
      return {
        ...state,
        currecnyCode: action.payload[0],
        defalutOption: action.payload[1]
      }
    },
    setLang: (state) => {
      const userLang = navigator.language || navigator.userLanguage;
      const currLang = Object.keys(langs).find(e =>  e.includes(userLang));
      const getCodeAndLang = Object.entries(currs).filter(e => e[1] === langs[currLang]);
      const arr = getCodeAndLang[0];
      return {
        ...state,
        currecnyCode: arr[0],
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
export const selectCurrency = (state) => state.currency;
export default сurrencySlice.reducer;