import { useDisclosure } from "@mantine/hooks";
import App from "../App";
import { useEffect, useState } from "react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../styles/Navbar.module.css"

const AppShellComponent: React.FC = () => {
  const [opened, { toggle: toggleBurger }] = useDisclosure();
  const [navbarSmall, setNavbarSmall] = useState<boolean>(false);

  const navbarWidth = navbarSmall ? 62 : 260;

  const updateNavbarState = () => {
    if (window.innerWidth < 768) {
      setNavbarSmall(false);
    }
  };

  // USEEFFECTS
  useEffect(() => {
    updateNavbarState();
    window.addEventListener("resize", updateNavbarState);
    return () => {
      window.removeEventListener("resize", updateNavbarState);
    };
  }, []);

  return (
    <>
      <div>
        <div className={styles.mainHeader}>
          <Link to={"/"}>
            <p className={styles.logo}>Untitled. WebApp.</p>
          </Link>
        </div>
      </div>
      <div className={styles.belowHeader}>
        <div className={styles.navbar} style={{width: `${navbarWidth}px`}}>
          {navbarSmall ? (
            <div className={styles.collapseButton}
              onClick={() => setNavbarSmall(false)}
            >
              <IconLayoutSidebarLeftExpand />
            </div>
          ) : (
            <div className={styles.collapseButton}
              onClick={() => setNavbarSmall(true)}
            >
              <IconLayoutSidebarLeftCollapse />
            </div>
          )}
          <Navbar toggleBurger={toggleBurger} navbarSmall={navbarSmall} />
        </div>
        <div className={styles.content}>
        <App />
        </div>
      </div>
    </>
  );
};

export default AppShellComponent;
