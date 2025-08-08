import { useContext, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Header.module.css";
import { TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { toast } from 'sonner'

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifs, setNotifs] = useState([]);

  // Fetch de notificaciones
  useEffect(() => {
    let socket = null;
    if(user) {
      const data = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${user._id}/notifications`);
          const notifData = await response.json();
          setNotifs(notifData.notifications);
        } catch (error) {
          console.error("Error al obtener las notificaciones",error)
        }
      }

      const connectSocket =() => {
         const socket = io('/', {
          query: { userId: user._id }  // Se conecta el socket con el userId (necesario en el backend)
        });

        socket.on('new notification', notf => {  // Se fija si se envió una nueva notificación 
          setNotifs((prev) => [...prev, notf]);
          toast.success("Tienes una nueva notificación", {description: `de ${notf.from.userName}`});
        }); 

        return socket;
      }

      data();  
      socket = connectSocket();  
    }

    return () => {
      if(socket) socket.disconnect();
    };
  }, [user]);

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
          
        </div>
        
        {user ? (
          <div className="flex items-center gap-28">
            <button className={styles.bellNotif} onClick={handleToggleNotifications}><FaRegBell /></button>
            {showNotifications && <NotificationPanel notifs={notifs} onClose={() => setShowNotifications(false)}/>}

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
