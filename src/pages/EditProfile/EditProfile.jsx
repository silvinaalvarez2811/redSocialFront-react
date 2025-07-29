import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import style from "../EditProfile/EditProfile.module.css";
import Avatar from "../../components/Avatar/Avatar.jsx"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({ userName: user.userName, bio: user.bio ? user.bio : "Ninguna", password: "", email: user.email, firstName: user.firstName, lastName: user.lastName, location: user.location });
  const [image, setImage] = useState([]);  
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleEditAvatar = async (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (userData.password.trim() !== "") {
      formData.append("password", userData.password);
    }

    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if(image) {
      formData.append("image", image);
    }

    try {
      await fetch(`http://localhost:5000/users/${user.id}`,{
        method: "PATCH",
        body: formData
      });
    } catch (error) {
      console.error("Error en la actualización:", error);
      setError("Hubo un error al modificar tus datos. Por favor, volvé a intentar");
    }
  };

  return (
      <div className="max-h-screen flex items-center text-gray-900 px-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-row gap-6">     
              <div className="max-w-96 bg-gray-100 py-4 px-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Editar perfil</h2>
                <p className="pb-8">Cualquier persona que pueda ver tu perfil podrá ver la información que agregues aquí.</p>
                <p className="text-sm text-left m-0 left-6 relative">Foto</p> 
                <div className="flex gap-8 items-center mb-4 ml-6">
                <Avatar user={user} extraClass="editAvatar"/>
                <label htmlFor="fileInput" className="px-3 py-2 h-10 bg-slate-200 rounded-lg hover:bg-slate-300">
                  Cambiar 
                </label>
                <input onChange={handleEditAvatar} id="fileInput" type="file" accept=".png, .jpg, .jpeg" multiple className="hidden"/>
                </div>
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
              </div>
              <div className="px-4 bg-gray-100 py-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Administración de la cuenta</h2>
                <p className="pb-8">Esta información no será visible en tu perfil</p>
                <p className="text-left font-bold">Tu cuenta</p>
                <div className="flex flex-col mt-2">
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
                <div className={style["password-wrapper"] + " flex flex-col mt-2"}>
                  <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña nueva"
                    value={userData.password}
                    onChange={handleChange}
                    className="h-14 px-4 pt-2 rounded-3xl bg-gray-100 placeholder-gray-900 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-1"
                  />
                  <span
                    className={style["toggle-password"]} onClick={() => setShowPassword((prev) => !prev)}> {showPassword ? <FaEye /> : <FaRegEyeSlash />}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-orange-600 hover:bg-yellow-700 transition w-5/6 py-2 px-4 mt-6 rounded font-semibold">Guardar</button>
            </div>
          </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
  );
};

export default EditProfile;
