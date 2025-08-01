import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import style from "../EditProfile/EditProfile.module.css";
import Avatar from "../../components/Avatar/Avatar.jsx"
import { FaRegEyeSlash, FaEye} from "react-icons/fa";
import { GoGear } from "react-icons/go";

const EditProfile = () => {
  const { user, reloadUser } = useContext(UserContext);
  const [userData, setUserData] = useState({ userName: user.userName, bio: user.bio, password: "", email: user.email, firstName: user.firstName, lastName: user.lastName, location: user.location });
  const [image, setImage] = useState([]);  
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl); // Elimino la url del preview creado (sólo elimina la referencia en memoria, pero no elimina lo que ya se muestra en el DOM(imagen actual en previewUrl))
    };
  }, [previewUrl]); 

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const formToSend = () => {
    const formData = new FormData();

    if (userData.password.trim() !== "") {
      formData.append("password", userData.password);
    }
    
    userData.bio ? formData.append("bio", userData.bio) : formData.append("bio", "Ninguna");

    formData.append("userName", userData.userName);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("location", userData.location);

    if(image) {
      formData.append("image", image);
    }

    return formData;
  };

  const handleEditAvatar = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    // URL.createObjectURL crea un string que contiene una URL blob apuntando al objeto pasado en el parámetro. Permite representar recursos en memoria como URL
    const imagePreview = URL.createObjectURL(file);// Genera la vista previa temporal con la imagen
    setPreviewUrl(imagePreview); 
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/users/${user._id}`,{
        method: "PATCH",
        body: formToSend()
      });

      await reloadUser(user._id); // Recargo UserContext con los datos cambiados
      setPreviewUrl(""); 
    } catch (error) {
      console.error("Error en la actualización:", error);
      setError("Hubo un error al modificar tus datos. Por favor, volvé a intentar");
    }
  };

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl mt-24 mb-6 text-left w-full"><GoGear size={26}/>Configuración</h1>
      <div className="flex mb-24 text-gray-900 px-4 md:items-center">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col items-center gap-6 max-w-md md:flex-row md:max-w-4xl md:items-stretch">     
              <div className="w-11/12 bg-gray-100 px-4 py-5 rounded-lg shadow-lg md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-left">Editar perfil</h2>
                <p className="pb-8 text-left m-0">Cualquier persona que pueda ver tu perfil podrá ver la información que agregues aquí.</p>
                <p className="text-sm text-left m-0 left-6 relative">Foto</p> 
                <div className="flex gap-8 items-center mb-4 ml-6">
                  {previewUrl ? <img className={`${style.avatarPreview}`} src={previewUrl} alt="Vista previa del avatar" width={80} height={80}/> : <Avatar user={user} extraClass="editAvatar"/>}
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
                    autoComplete="on"
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
                    id="firstname"
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
                    id="lastname"
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
              <div className="w-11/12 px-4 bg-gray-100 py-5 rounded-lg shadow-lg md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-left">Administración de la cuenta</h2>
                <p className="pb-8 text-left m-0">Esta información no será visible en tu perfil</p>
                <p className="text-left font-bold">Tu cuenta</p>
                <div className="flex flex-col mt-2">
                  <label className="absolute pl-7 pt-1 text-gray-400 text-sm" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="on"
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
              <button type="submit" className="bg-orange-600 hover:bg-yellow-700 transition w-5/6 py-2 px-4 mt-6 rounded font-semibold md:w-4/6">Guardar</button>
            </div>
          </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
    </div>
  );
};

export default EditProfile;
