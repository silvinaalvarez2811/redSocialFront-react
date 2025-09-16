import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import PostModular from "../../components/Post/PostModular";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerPosts = async () => {
    try {
      const respPost = await fetch("/posts/full");
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Crear nuevo post */}
        <div className="mb-6">
          <Link
            to="/newPost"
            className="flex justify-center items-center w-1/2 mt-20 gap-2 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <MdOutlinePostAdd size={25} />
            <span>¿Qué querés intercambiar?</span>
          </Link>
        </div>

        {/* Cargando */}
        {cargando ? (
          <p className="text-center text-gray-700 mt-10">
            Cargando publicaciones...
          </p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-700 mt-10">
            No hay publicaciones para mostrar
          </p>
        ) : (
          /* Grid de posts */
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} to={`/post/${post._id}`} className="block">
                <PostModular post={post} onExchangeSuccess={obtenerPosts} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
