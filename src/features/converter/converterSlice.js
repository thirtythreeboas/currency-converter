import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../APICall/getCurrencies';
import { current } from '@reduxjs/toolkit';

const initialState = {
  response: {},
  data: {
    amount: 0,
    codeOne: '',
    codeTwo: '',
    value: '¯\\_(ツ)_/¯'
  }
};

export const pressEnter = createAsyncThunk(
  'converter/fetchCurrencies',
  async (args, { getState }) => {
    const state = getState();
    return getData(state.converter.data.codeOne);
  }
);

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setResult: (state) => {
      const s = current(state);
      if (Object.keys(s.response).length === 0) return;
      let amount = parseInt(s.data.amount, 10);
      let rate = s.response.rates[s.data.codeTwo];
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
          value: '¯\\_(ツ)_/¯'
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
          value: '¯\\_(ツ)_/¯'
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(pressEnter.fulfilled, (state, action) => {
      return {
        ...state,
        response: action.payload,
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