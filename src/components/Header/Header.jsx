import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Header.module.css";
import { TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import Avatar from "../Avatar/Avatar";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <div className={styles.navCenter}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <AiFillHome style={{ marginRight: "0.5rem" }} size={25} />
            Inicio
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Perfil
          </NavLink>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Sobre Nosotros
          </NavLink>
        </div>
        {user ? (
          <div className={styles.navText}>
            <span className={styles.hideOnMobile}>Hola, {user.userName}</span>
            {user && (
              <div className={styles.hideOnMobile}>
                <Avatar user={user} />
              </div>
            )}
            <button onClick={handleLogout} className={styles.logoutButton}>
              <TbLogout size={27} color="white" />
            </button>
          </div>
        ) : (
          <NavLink to="/login" className={styles.navLink}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
