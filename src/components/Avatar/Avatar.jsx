import styles from "./Avatar.module.css";

const Avatar = ({ user, extraClass = "" }) => {
  const getInitials = (name) => {
    if (!name) {
      return "";
    }
    // elimina espacios y divide en palabras (no caracteres)
    const nombres = name.trim().split(" ");
    if (nombres.length === 1) {
      // devuelve la primera letra en mayúscula
      return nombres[0][0].toUpperCase();
    } else {
      // devuelve la primera letra de la primera y segunda palabra
      return (nombres[0][0] + nombres[1][0]).toUpperCase();
    }
  };

  const initials = getInitials(user?.userName);

  return user?.avatar ? (
    <img
      src={`http://localhost:3000${user.avatar}`}
      alt="Avatar"
      className={`${styles.avatarImage}`}
      width={300}
      height={300}
    />
  ) : (
    <div className={`${styles.avatarInitials} ${styles[extraClass]}`}>{initials}</div>
  );
};

export default Avatar;