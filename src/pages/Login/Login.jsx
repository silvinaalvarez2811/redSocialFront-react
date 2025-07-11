import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Login.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      const response = await fetch("/users");
      const usuarios = await response.json();
      const usuarioEncontrado = usuarios.find((u) => u.userName === userName);

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
    <div className={styles["login-container"]}>
      {/* Formulario */}
      <div className={styles["login-overlay"]}>
        <div className={styles["login-form"]}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Inicio de sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
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
              className=" w-full bg-orange-600 hover:bg-yellow-700 transition py-3 rounded font-semibold"
            >
              Ingresar
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}

          <p className={styles["register-link"]}>
            ¿No tenés cuenta? <Link to="/register">Registrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
