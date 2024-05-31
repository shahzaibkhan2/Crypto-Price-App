import { useEffect, useRef } from "react";
import Hero from "../../components/hero/Hero";
import styles from "./Home.module.css";
import { cryptoActions, fetchCrypto } from "../../store/features/cryptoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { currency, allCoin, displayAllCoin } = useSelector(
    (state) => state.crypto
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchCrypto(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
      )
    );
  }, [currency, dispatch]);

  useEffect(() => {
    dispatch(cryptoActions.displayCoin(allCoin));
  }, [allCoin]);
  return (
    <div className={styles.home}>
      <Hero />
      <div className={styles.crypto_table}>
        <div className={styles.table_layout}>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className={styles.market_cap}>Market Cap</p>
        </div>
        {displayAllCoin.slice(0, 15)?.map((coin, index) => (
          <Link
            to={`/crypto/${coin.id}`}
            key={index}
            className={styles.table_layout}
          >
            <p>{coin?.market_cap_rank}</p>
            <div className={styles.coins}>
              <img src={coin?.image} alt="coin-image" />
              <p>{coin?.name + " - " + coin?.symbol}</p>
            </div>
            <p>
              {currency?.symbol} {coin?.current_price.toLocaleString()}
            </p>
            <p
              className={
                coin?.price_change_percentage_24h > 0
                  ? styles.green
                  : styles.red
              }
            >
              {Math.floor(coin?.price_change_percentage_24h * 100) / 100}
            </p>
            <p className={styles.market_cap}>
              {currency.symbol} {coin?.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
