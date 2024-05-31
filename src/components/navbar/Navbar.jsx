import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import { cryptoActions } from "../../store/features/cryptoSlice";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.crypto);

  const logoutHandler = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        console.log("Logged out");
        dispatch(cryptoActions.setLogged());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        dispatch(cryptoActions.currencyConverter({ name: "usd", symbol: "$" }));
        break;
      }
      case "eur": {
        dispatch(cryptoActions.currencyConverter({ name: "eur", symbol: "€" }));
        break;
      }
      case "pkr": {
        dispatch(
          cryptoActions.currencyConverter({ name: "aud", symbol: "Rs." })
        );
        break;
      }
      default: {
        dispatch(cryptoActions.currencyConverter({ name: "usd", symbol: "$" }));
        break;
      }
    }
  };
  return (
    <header className={styles.navbar}>
      <Link to="/">
        <h2>
          <span>Crypto</span> Cave
        </h2>
      </Link>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Blog</li>
        <li>Features</li>
        <li>Pricing</li>
      </ul>
      <div className={styles.right_nav}>
        <select onClick={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="pkr">PAK</option>
        </select>
        <Link to="/login">
          <button onClick={logged ? logoutHandler : undefined}>
            {logged ? "Logout" : "Login"}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
