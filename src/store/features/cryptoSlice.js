import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { conf } from "../../conf/conf";

export const fetchCrypto = createAsyncThunk("fetchCrypto", async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${conf.gecko_api_key}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response?.json();
  return data;
});

export const fetchChartHisto = createAsyncThunk(
  "fetchChartHisto",
  async (url) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${conf.gecko_api_key}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response?.json();
    return data;
  }
);

export const fetchCryptoData = createAsyncThunk(
  "fetchCryptoData",
  async (url) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${conf.gecko_api_key}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response?.json();
    return data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    allCoin: [],
    currency: { name: "usd", symbol: "$" },
    isLoading: false,
    isError: false,
    displayAllCoin: [],
    cryptoData: null,
    chartHistoryData: null,
    receivedCopyData: [["Date", "Prices"]],
    logged: false,
  },
  reducers: {
    currencyConverter: (state, action) => {
      state.currency = action.payload;
    },
    displayCoin: (state, action) => {
      state.displayAllCoin = action.payload;
    },
    setReceivedCopyData: (state, action) => {
      state.receivedCopyData = action.payload;
    },
    setLogged: (state) => {
      state.logged = !state.logged;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCrypto?.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCrypto?.fulfilled, (state, action) => {
      state.allCoin = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchChartHisto?.fulfilled, (state, action) => {
      state.chartHistoryData = action.payload;
    });

    builder.addCase(fetchCryptoData?.fulfilled, (state, action) => {
      state.cryptoData = action.payload;
    });

    builder.addCase(fetchCrypto?.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const cryptoActions = cryptoSlice.actions;
export default cryptoSlice;
