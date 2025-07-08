import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import style from "../Register/Register.module.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError(""); // limpio error previo

    try {
      // get de users - trae todos
      const getUsers = await fetch("/users");
      const usuarios = await getUsers.json();
      //se busca si hay alguno igual al que se quiere registrar
      const existsUserName = usuarios.find(
        (user) => user.userName === userName
      );
      if (existsUserName) {
        setError("Es nombre de ususario ya existe.Elegí otro");
        return;
      }
      //si no existe, se registra
      const response = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email }),
      });

      if (!response.ok) {
        const dataError = await response.json();
        setError(dataError.error || "Error al registrar el usuario");
        return;
      }

      const nuevoUsuario = await response.json();

      login(nuevoUsuario); // guardo usuario en contexto y localStorage
      alert(`Te has registrado correctamente, ${nuevoUsuario.userName}`);
      navigate("/home");
    } catch (error) {
      console.error("Error en registro:", error);
      setError("Hubo un error al registrarte. Por favor, volvé a intentar");
    }
  };

  return (
    <div className={style["body-register"]}>
      <div className="min-h-screen flex items-center justify-center text-white px-4">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
          <p>Registrate para ver fotos de tus amigos</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-yellow-700 transition py-3 rounded font-semibold"
            >
              Registrarse
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
