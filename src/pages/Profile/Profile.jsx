import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postsResponse = await fetch(
          `/posts?userId=${user.id}`
        );
        if (!postsResponse.ok) {
          throw new Error("Error al obtener las publicaciones del usuario");
        }
        const postData = await postsResponse.json();

        //lista para agregar imagenes y comentarios de cada post
        const fullPosts = [];

        for (const post of postData) {
          //obtener imagenes - si no hay devuelve un arrray vacio
          const imgResponse = await fetch(
            `/postimages/post/${post.id}`
          );
          const imagesData = imgResponse.ok ? await imgResponse.json() : [];

          const commentResponse = await fetch(
            `/comments/post/${post.id}`
          );
          const commentData = commentResponse.ok
            ? await commentResponse.json()
            : [];

          fullPosts.push({
            ...post,
            images: imagesData,
            comments: commentData,
          });
        }

        setPosts(fullPosts);
      } catch (error) {
        console.error("Error al obtener las publicaciones", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [user.id]);

  return (
    <div className="container py-4 mt-14">
      <p>""</p>
      {loading ? (
        <p>Cargando publicaciones...</p>
      ) : posts.length === 0 ? (
        <p>No publicaste nada aún.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div
                className="card shadow-sm h-100 "
                style={{ maxWidth: "300px", margin: "0 auto" }}
              >
                {/* mostrar primera imagen si hay */}
                {post.images.length > 0 && (
                  <img
                    src={post.images[0].url}
                    alt="Imagen del post"
                    className="card-img-top"
                    style={{
                      height: "280px",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-center border rounded p-2 bg-light">
                    {post.description}
                  </h5>

                  {/*  mostrar tags si hay */}
                  {post.Tags?.length > 0 && (
                    <div className="mb-2">
                      {post.Tags.map((tag) => (
                        <span key={tag.id} className="badge bg-secondary me-1">
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {/*mostrar cantidad y texto de comentarios si hay*/}
                  <p className="card-text text-muted text-center">
                    {post.comments?.length || 0} comentario
                    {post.comments?.length !== 1 ? "s" : ""}
                  </p>
                  {post.comments.length > 0 && (
                    <div className="mb-2">
                      <p className="mb-1">
                        <strong>Comentarios:</strong>
                      </p>
                      <ul className="list-unstyled">
                        {post.comments.slice(0, 2).map((c) => (
                          <li key={c.id}> {c.content}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="d-flex justify-content-center">
                    <Link
                      to={`/post/${post.id}`}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-400 text-white rounded"
                      style={{ minWidth: "100px" }}
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
