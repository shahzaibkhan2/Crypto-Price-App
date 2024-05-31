import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./features/cryptoSlice";

const mainStore = configureStore({
  reducer: {
    crypto: cryptoSlice.reducer,
  },
});

export default mainStore;
