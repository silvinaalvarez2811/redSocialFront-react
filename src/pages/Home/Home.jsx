import React from "react";
import styles from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Post from "../../components/Post/Post";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Usuarios recibidos:", data);
        setUsers(data);
      })
      .catch((err) => console.error("Error al conectar con el backend:", err));
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.userName} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

/*useEffect(() => {
    const obtenerPosts = async () => {
      try {
        const respPost = await fetch("http://localhost:3001/posts");
        const dataPost = await respPost.json();
        setPosts(dataPost);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        setCargando(false);
      }
    };
    obtenerPosts();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.asideLeft}>
          <AsideIzq />
        </aside>

        <section className={styles.mainContent}>
          <div className={styles.createPost}>
            <Link to="/newPost" className={styles.navigate}>
              <MdOutlinePostAdd size={25} /> ¿Qué estás pensando?
            </Link>
          </div>

          {cargando ? (
            <p className={styles.textCenter}>Cargando publicaciones...</p>
          ) : posts.length === 0 ? (
            <p className={styles.textCenter}>
              No hay publicaciones para mostrar
            </p>
          ) : (
            <div className={styles.row}>
              {posts.map((post) => (
                <div key={post.id} className={styles.rowPost}>
                  <Post post={post} />
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className={styles.asideRight}>
          <AsideDer />
        </aside>
      </div>
    </div>
  );
};
*/
export default Home;
