import { configureStore } from '@reduxjs/toolkit';
import сurrencyReducer from '../features/currency/сurrencySlice';
import converterReducer from '../features/converter/converterSlice';

export const store = configureStore({
  reducer: {
    currency: сurrencyReducer,
    converter: converterReducer
  },
});

