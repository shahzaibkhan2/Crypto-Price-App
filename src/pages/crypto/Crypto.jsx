import { useParams } from "react-router-dom";
import styles from "./Crypto.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChartHisto,
  fetchCryptoData,
} from "../../store/features/cryptoSlice";
import LineChart from "../../components/lineChart/LineChart";
import Loader from "../../components/loader/Loader";

const Crypto = () => {
  const { currency, cryptoData, chartHistoryData } = useSelector(
    (state) => state.crypto
  );

  const dispatch = useDispatch();
  const { cryptoId } = useParams();

  useEffect(() => {
    dispatch(
      fetchCryptoData(`https://api.coingecko.com/api/v3/coins/${cryptoId}`)
    );
  }, [currency]);

  useEffect(() => {
    dispatch(
      fetchChartHisto(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currency.name}&days=15&interval=daily`
      )
    );
  }, [currency]);

  useEffect(() => {
    fetchCryptoData();
  }, [currency]);

  if (cryptoData && chartHistoryData) {
    return (
      <div className={styles.crypto}>
        <div className={styles.crypto_name}>
          <img src={cryptoData?.image?.large} alt="coin-image" />
          <p>
            <b>
              {cryptoData?.name} ( {cryptoData?.symbol?.toUpperCase()} )
            </b>
          </p>
        </div>
        <div className={styles.crypto_chart}>
          <LineChart />
        </div>
        <div className={styles.crypto_info}>
          <ul>
            <li>Crypto Market Rank</li>
            <li>{cryptoData?.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Crypto Price</li>
            <li>
              {currency?.symbol}{" "}
              {cryptoData?.market_data?.current_price[
                currency?.name
              ]?.toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Crypto Market Cap</li>
            <li>
              {currency?.symbol}{" "}
              {cryptoData?.market_data?.market_cap[
                currency?.name
              ]?.toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hours High</li>
            <li>
              {currency?.symbol}{" "}
              {cryptoData?.market_data?.high_24h[
                currency?.name
              ]?.toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hours Low</li>
            <li>
              {currency?.symbol}{" "}
              {cryptoData?.market_data?.low_24h[
                currency?.name
              ]?.toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Crypto;
