import { useRef } from "react";
import styles from "./Hero.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cryptoActions } from "../../store/features/cryptoSlice";

const Hero = () => {
  const { allCoin } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin?.filter((coin) => {
      return coin?.name
        ?.toLowerCase()
        ?.includes(inputRef.current.value.toLowerCase());
    });
    dispatch(cryptoActions.displayCoin(coins));
  };

  const inputHandler = () => {
    if (inputRef.current.value === "") {
      dispatch(cryptoActions.displayCoin(allCoin));
    }
  };
  return (
    <div className={styles.hero}>
      <h1>
        Biggest <br /> Marketplace For Crypto
      </h1>
      <p>
        Welcome to the world's most biggest and largest marketplace for crypto.
        Sign Up or Login with us to explore Crypto.
      </p>
      <form onSubmit={searchHandler}>
        <input
          onChange={inputHandler}
          ref={inputRef}
          type="text"
          placeholder="Search crypto here..."
          list="coinlist"
        />

        <datalist id="coinlist">
          {allCoin?.map((coin, index) => (
            <option key={index} value={coin.name} />
          ))}
        </datalist>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Hero;
