import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

const initialState = {
  resp: {},
  data: {
    amount: 0,
    codeOne: '',
    codeTwo: '',
    value: 'mheh'
  }
};

export const pressEnter = createAsyncThunk(
  'converter/fetchCurrencies',
  async (args, { getState }) => {
    const state = getState();
    const link = `https://open.er-api.com/v6/latest/${state.converter.data.codeOne}`;
    const lelo = await fetch(link);
    const response = await lelo.json();
    return response;
  }
);

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setResult: (state) => {
      const s = current(state);
      if (Object.keys(s.resp).length === 0) return;
      let amount = parseInt(s.data.amount, 10);
      let rate = s.resp.rates[s.data.codeTwo];
      return {
        ...state,
        data: {
          ...state.data,
          value: amount * rate
        }
      }
    },
    assignOnChangeData: (state, action) => {
      const arr = action.payload.toUpperCase().split(' ');
      return {
        ...state,
        data: {
          ...state.data,
          amount: parseInt(action.payload),
          codeOne: arr[1],
          codeTwo: arr[3],
          value: 'mheh'
        }
      }
    },
    reset: (state) => {
      return {
        ...state,
        data: {
          ...state.data,
          amount: 0,
          codeOne: '',
          codeTwo: '',
          value: 'mheh'
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(pressEnter.fulfilled, (state, action) => {
      return {
        ...state,
        resp: action.payload,
      }
    })
  }
})

export const {
  setResult,
  assignOnChangeData,
  reset
 } = converterSlice.actions;
export const selectConverter = (state) => state.converter;
export default converterSlice.reducer;