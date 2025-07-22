import React from "react";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerPosts = async () => {
    try {
      const respPost = await fetch("http://localhost:3000/posts");
      const dataPost = await respPost.json();

      const filteredPost = await dataPost.filter(
        (post) => post.status !== "completed"
      );
      setPosts(filteredPost);
    } catch (error) {
      console.error("Error al obtener los posts:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPosts();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <section className={styles.mainContent}>
          <div className={styles.createPost}>
            <Link to="/newPost" className={styles.navigate}>
              <MdOutlinePostAdd size={25} /> ¿Qué querés intercambiar?
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
                <div key={post._id} className={styles.rowPost}>
                  <Post post={post} onExchangeSuccess={obtenerPosts} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
