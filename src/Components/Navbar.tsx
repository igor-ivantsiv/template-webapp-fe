import { Link, useLocation } from "react-router-dom";
import {
  IconBrandRedhat,
  IconHome,
  IconLogin2,
  IconLogout2,
  IconUserHeart,
  IconUserPlus,
} from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Button } from "@mantine/core";
import styles from "../styles/Navbar.module.css";

interface NavbarProps {
  toggleBurger: () => void;
  navbarSmall: boolean;
}

const Navbar = ({ toggleBurger, navbarSmall }: NavbarProps) => {
  const location = useLocation();
  const { isAuthenticated, handleLogout } = useContext(SessionContext) || {
    isAuthenticated: false,
    handleLogout: () => {},
  };

  const logoutHandler = () => {
    handleLogout();
    toggleBurger();
  };

  useEffect(() => {
    console.log("URL changed!", location.pathname);
  }, [location]);

  return (
    <>
      <div className={styles.navbarMenu}>
        {navbarSmall ? (
          <>
            <Link
              className={location.pathname === "/" ? styles.active : ""}
              onClick={() => toggleBurger()}
              to="/"
            >
              <div className={styles.menuItem}>
                <IconHome size={30} />
              </div>
            </Link>
            <Link
              className={location.pathname === "/todos" ? styles.active : ""}
              onClick={() => toggleBurger()}
              to="/todos"
            >
              <div className={styles.menuItem}>
                <IconBrandRedhat size={30} />
              </div>
            </Link>
            <Link               className={location.pathname === "/about" ? styles.active : ""} onClick={() => toggleBurger()} to="/about">
              <div className={styles.menuItem}>
                <IconUserHeart size={30} />
              </div>
            </Link>
            {!isAuthenticated && (
              <>
                <Link               className={location.pathname === "/signup" ? styles.active : ""} onClick={() => toggleBurger()} to="/signup">
                  <div className={styles.menuItem}>
                    <IconUserPlus size={30} />
                  </div>
                </Link>
                <Link               className={location.pathname === "/login" ? styles.active : ""} onClick={() => toggleBurger()} to="/login">
                  <div className={styles.menuItem}>
                    <IconLogin2 size={30} />
                  </div>
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link               className={location.pathname === "/" ? styles.active : ""} onClick={() => toggleBurger()} to="/">
              <div className={styles.menuItem}>
                <IconHome size={30} />
                <p className={styles.menuText}>Home</p>
              </div>
            </Link>
            <Link               className={location.pathname === "/todos" ? styles.active : ""} onClick={() => toggleBurger()} to="/todos">
              <div className={styles.menuItem}>
                <IconBrandRedhat size={30} />
                <p className={styles.menuText}>My todos</p>
              </div>
            </Link>
            <Link               className={location.pathname === "/about" ? styles.active : ""} onClick={() => toggleBurger()} to="/about">
              <div className={styles.menuItem}>
                <IconUserHeart size={30} />
                <p className={styles.menuText}>About us</p>
              </div>
            </Link>
            {!isAuthenticated && (
              <>
                <Link               className={location.pathname === "/signup" ? styles.active : ""} onClick={() => toggleBurger()} to="/signup">
                  <div className={styles.menuItem}>
                    <IconUserPlus size={30} />
                    <p className={styles.menuText}>Signup</p>
                  </div>
                </Link>
                <Link               className={location.pathname === "/login" ? styles.active : ""} onClick={() => toggleBurger()} to="/login">
                  <div className={styles.menuItem}>
                    <IconLogin2 size={30} />
                    <p className={styles.menuText}>Login</p>
                  </div>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <Button
                leftSection={<IconLogout2 size={26} />}
                size="compact-lg"
                onClick={logoutHandler}
              >
                Log out
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
