import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Header.module.css";
import { TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import Avatar from "../Avatar/Avatar";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import { FaRegBell } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  }

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
            to="/history"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Historial
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Sobre Nosotros
          </NavLink>
          <div className="notif-section">
            <button className={styles.bellNotif} onClick={handleToggleNotifications}><FaRegBell /></button>
            {(user && showNotifications) && <NotificationPanel user={user} onClose={() => setShowNotifications(false)}/>}
          </div>
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
