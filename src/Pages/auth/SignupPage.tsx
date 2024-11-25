import { Link } from "react-router-dom";
import SignupForm from "../../Components/SignupForm";
import background from "../../assets/background.jpg";
import styles from "../../styles/Auth.module.css"

type SignupPageProps = {};

const SignupPage = ({}: SignupPageProps) => {
  return (
    <>
      <div className={styles.authPage}>
        <div className={styles.authFormDiv}>
          <div>
            <p className={styles.logo}>Untitled. WebApp.</p>
          </div>
          <SignupForm />
          <div>
            <p className={styles.footerText}>Already have an account? <Link className={styles.footerLink}
              to="/login"
            >Log in!
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

export default SignupPage;
