import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UserHistory = () => {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/users/${user._id}/history`);
        const data = await res.json();
        setHistory(data.history);
      } catch (error) {
        console.error("Error al obtener historial", error);
      }
    };

    if (user?._id) fetchHistory();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Historial de intercambios</h2>
      {history.length === 0 ? (
        <p>No tenés intercambios todavía.</p>
      ) : (
        <ul className="list-group">
          {history.map((item, index) => (
            <li key={index} className="list-group-item">
              <p>
                <strong>ID Publicación:</strong> {item.postId}
              </p>
              <p>
                <strong>Intercambiaste con:</strong> {item.exchangedWith}
              </p>
              <p>
                <strong>Valoración:</strong>{" "}
                {item.isValued ? item.valuation : "Sin valorar"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserHistory;
