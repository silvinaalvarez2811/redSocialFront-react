import { createContext, useState, useEffect } from "react";
5;
//createContext - para crear el contexto que permite guardar globalmente info
//useEffect - para cargar info desde el localStorage si la hay

export const UserContext = createContext(null);

//se crea el componente que envuelve a app y que da acceso a los datos que se definan aca
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  //funcion para logear -  guarda en useState y en localstorage
  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("usuario", JSON.stringify(userObj));
  };
  //limpia el estado y el localstorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };
  //esto es lo que todos los componentes van a poder obtener
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

//Provider es una propiedad de createContext
//significa que el contexto UserContext va a prover los valores de user, login y logout
//que  todos los hijos que esten envueltos (wrap) por provider van a tener acceso
