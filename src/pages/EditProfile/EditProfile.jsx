import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
import style from "../EditProfile/EditProfile.module.css";
import Avatar from "../../components/Avatar/Avatar.jsx"
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({ userName: user.userName, bio: user.bio ? user.bio : "", email: user.email, password: "", firstName: user.firstName, lastName: user.lastName, location: user.location });
  const [password, setPassword] = useState("");
  const [image, setImage] = useState([]);  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target.id)
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleEditAvatar = async (e) => {
    try {
        setImage(e.target.files[0]);
        const formData = new FormData();
        formData.append("image", image);

        await fetch(`http://localhost:5000/users/${user.id}/avatar`, {
            method: 'PUT',
            body: formData
        });
    } catch(err) {
        console.error("Error en el cambio de avatar", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // limpio error previo

    console.log(userData)

    if (password.trim() !== "") {
      userData.password = password;
    }

    try {
      await fetch(`http://localhost:5000/users/${user.id}`,{
        method: "PATCH",
        body: userData
      });
    } catch (error) {
      console.error("Error en la actualización:", error);
      setError("Hubo un error al modificar tus datos. Por favor, volvé a intentar");
    }
  };

  return (
      <div className="max-h-screen flex items-center text-gray-900 px-4">
        <div className="max-w-lg w-full bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Editar perfil</h2>
          <p>Cualquier persona que pueda ver tu perfil podrá ver la información que agregues aquí.</p>
          <p className="text-sm text-left m-0 left-6 relative">Foto</p>
          <div className="flex gap-8 items-center mb-4 ml-6">
                  <Avatar user={user} extraClass="editAvatar"/>
              <form onSubmit={handleEditAvatar} encType="multipart/form-data">
                  <label htmlFor="fileInput" type="submit" className="px-3 py-2 h-10 bg-slate-200 rounded-lg hover:bg-slate-300">
                      Cambiar 
                  </label>
                  <input id="fileInput" type="file" accept=".png, .jpg, .jpeg" multiple className="hidden"/>
              </form>
          </div>
              
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="flex flex-col mx-2">
              <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="userName">Nombre de usuario</label>
              <input
                id="userName"
                type="text"
                placeholder="Nombre de usuario"
                value={userData.userName}
                onChange={handleChange}
                required
                className="h-14 px-4 pt-2 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1"
              />
            </div>
            <div className="flex flex-col my-2 mx-2 rounded-t-3xl">
              <label className="absolute ml-2 py-1 px-3 text-gray-400 text-sm bg-slate-200 rounded-3xl" htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  type="textarea"
                  placeholder="Escribe algo sobre tí"
                  value={userData.bio}
                  onChange={handleChange}
                  required
                  maxLength={5000}
                  minLength={1}
                  className={style["textarea"] + ` h-24 p-4 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1`}
                />
            </div>
            <div className="flex flex-col mx-2 rounded-t-3xl">
              <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="firstname">Nombre</label>
              <input
                id="firstName"
                type="text"
                placeholder="Nombre"
                value={userData.firstName}
                onChange={handleChange}
                required
                className="h-14 px-4 pt-2 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1"
              />
            </div>
            <div className="flex flex-col mx-2 mt-2 rounded-t-3xl">
              <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="lastname">Apellido</label>
              <input
                id="lastName"
                type="text"
                placeholder="Apellido"
                value={userData.lastName}
                onChange={handleChange}
                required
                className="h-14 px-4 pt-2 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1"
              />
            </div>
            <div className="flex flex-col mx-2 mt-1 rounded-t-3xl">
              <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="location">Ubicación</label>
              <input
                id="location"
                type="text"
                placeholder="Ubicación"
                value={userData.location}
                onChange={handleChange}
                required
                list="ubicaciones-posibles"
                className="h-14 px-4 pt-2 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1"
              />
              <datalist id="ubicaciones-posibles">
                  <option value="Ciudad de Buenos Aires"></option>
                  <option value="Provincia de Buenos Aires"></option>
                  <option value="Córdoba"></option>
                  <option value="Rosario"></option>
                  <option value="Mendoza"></option>
                  <option value="San Miguel de Tucumán"></option>
              </datalist>
            </div>
            <div className="flex flex-col mx-2 mt-2">
                    <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="email">Email</label>
                    <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    className="h-14 px-4 pt-2 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1"
                    />
                </div>
                <div className="flex flex-col mx-2 mt-2">
                    <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="password">Contraseña</label>
                    <input
                    id="password"
                    type="password"
                    placeholder="Contraseña nueva"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    className="h-14 px-4 pt-2 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1"
                    />
            </div>
            <button type="submit" className="bg-orange-600 hover:bg-yellow-700 transition py-3 rounded font-semibold">Guardar</button>
          </form>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
  );
};

export default EditProfile;
