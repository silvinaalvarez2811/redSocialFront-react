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
  //se usa con fondo de color y fondo blanco extraclass
  return (
    <div className={`${styles.avatar} ${styles[extraClass]}`}>
      {getInitials(user.nickName)}
    </div>
  );
};

export default Avatar;
