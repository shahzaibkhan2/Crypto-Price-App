import { useRef, useState } from "react";
import styles from "./Login.module.css";
import { IoLogoGoogle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/card/Card";
import login from "../../../assets/login3.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useDispatch } from "react-redux";
import { cryptoActions } from "../../../store/features/cryptoSlice";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successful !");
        navigate("/");
        dispatch(cryptoActions.setLogged());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={login} alt="Login" width={400} />
        </div>
        <Card>
          <div className={styles.form}>
            <form onSubmit={loginUser}>
              <h2>Login</h2>
              <input type="text" placeholder="Email" required ref={emailRef} />
              <input
                type="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>Or</p>
            </form>
            <button className="--btn --btn-danger --btn-block --yellowGreenBtn">
              <IoLogoGoogle size={20} /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account ?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
