import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import carusel1 from "../../assets/carusel1.jpg";
import carusel2 from "../../assets/carusel2.jpg";
import carusel3 from "../../assets/carusel3.jpg";
import styles from "./Login.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


const images = [carusel1, carusel2, carusel3];

const Login = () => {
  const [nickName, setnickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users");
      const usuarios = await response.json();
      const usuarioEncontrado = usuarios.find((u) => u.nickName === nickName);

      if (!usuarioEncontrado) {
        setError("El usuario no existe");
        return;
      }

      if (password !== "123456") {
        setError("Contraseña incorrecta");
        return;
      }

      setError("");
      login(usuarioEncontrado);
      navigate("/home");
    } catch (error) {
      console.error("Error al hacer login:", error);
      setError("Error del servidor. Intentá más tarde.");
    }
  };

  return (
    
    <div className= {styles ["login-container"]}>
      {/* Carrusel de fondo */}
      <div className={styles ["carousel-wrapper"]}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`${styles["carousel-img"]} ${index === currentIndex ? styles["active"] : ""}`}
          />
        ))}
      </div>

      {/* Formulario */}
      <div className={styles["login-overlay"]}>
        <div className={styles["login-form"]} >
          <h2 className="text-2xl font-bold mb-6 text-center">Inicio de sesión</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={nickName}
              onChange={(e) => setnickName(e.target.value)}
              required
              className={styles["login-input"]}
            />
            
            {/*para que oculte la contraseña*/}
          <div className={styles["password-wrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles["login-input"]}
            />
            <span
              className={styles["toggle-password"]}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaRegEyeSlash />}
            </span>
          </div>

            <button
              type="submit"
              class=" w-full bg-orange-600 hover:bg-yellow-700 transition py-3 rounded font-semibold">
              Ingresar
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}

          <p className={styles["register-link"]}>
            ¿No tenés cuenta?{" "}
            <Link to="/register">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;