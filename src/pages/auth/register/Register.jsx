import { useRef } from "react";
import styles from "./Register.module.css";
import Card from "../../../components/card/Card";
import registerImg from "../../../assets/register1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const hasNumber = /[0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (passwordRef.current.value !== confirmPassRef.current.value) {
      toast.error("Passwords does not match.");
    } else if (!hasNumber) {
      toast.error("Password must contain at least one number.");
    } else if (!hasUpperCase) {
      toast.error("Password must contain at least one capital letter.");
    } else if (!hasSpecialChar) {
      toast.error("Password must contain at least one special letter");
    } else if (
      passwordRef.current.value === confirmPassRef.current.value &&
      hasNumber &&
      hasUpperCase &&
      hasSpecialChar
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Registration is Successful.");
          navigate("/login");
        })

        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={registerImg} alt="Login" width={400} />
        </div>
        <Card>
          <div className={styles.form}>
            <form onSubmit={registerUser}>
              <h2>Sign Up</h2>
              <input type="text" placeholder="Email" required ref={emailRef} />
              <input
                type="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                ref={confirmPassRef}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Sign up
              </button>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Register;
