import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import background from "../../assets/background.jpg";
import styles from "../../styles/Auth.module.css";

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  return (
    <>
      <div className={styles.authPage}>
        <div className={styles.authFormDiv}>
          <div>
            <p className={styles.logo}>Untitled. WebApp.</p>
          </div>
          <LoginForm />
          <div>
            <p className={styles.footerText}>Don't have an account? <Link className={styles.footerLink}
              to="/signup"
            >Sign up!
            </Link></p>
          </div>
        </div>
        <div className={styles.bgImageDiv}>
          <img className={styles.bgImage} src={background} alt="" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
