import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PostDetail.module.css";
import { FaCommentDots } from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Post from "../../components/Post/Post";
import Avatar from "../../components/Avatar/Avatar";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //traer el post
        const postResponse = await fetch(`http://localhost:3001/posts/${id}`);
        if (!postResponse.ok) {
          throw new Error("Error al cargar comentarios");
        }
        const postData = await postResponse.json();
        setPost(postData);
        //traer las imagenes
        const imagesResponse = await fetch(
          `http://localhost:3001/postimages/post/${id}`
        );
        if (!imagesResponse) {
          throw new Error("Error al cargar las imagenes");
        }
        const imagesData = await imagesResponse.json();
        setImages(imagesData);

        //traer comentarios
        const commentsResponse = await fetch(
          `http://localhost:3001/comments/post/${id}`
        );
        if (!commentsResponse.ok) {
          throw new Error("Error al cargar los comentarios");
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  // crear comentario POST comments
  const createComment = async (evento) => {
    evento.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          userId: user.id,
          postId: id,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al crear el comentario");
      }
      const createComment = await response.json();

      setComments([...comments, createComment]);
      setNewComment("");
    } catch (error) {
      setError("No se pudo agregar el comentario");
    }
  };
  if (loading) return <p>Cargando publicación...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.postDetailWrapper}>
      <div
        className="container mt-5 mb-6"
        style={{
          backgroundColor: "black",
          borderRadius: "1rem",
          padding: "3rem",
          maxWidth: "700px",
          paddingTop: "30px",
        }}
      >
        {/* Descripción */}
        <div className=" rounded p-3 mb-1 d-flex align-items-center gap-3">
          <Avatar user={post.User} extraClass="avatarPost" />
          <p
            className="text-white mb-0 text-uppercase"
            style={{ fontSize: "1.25rem", fontWeight: "500" }}
          >
            {post.description}
          </p>
        </div>

        {/* Tags */}
        {post.Tags?.length > 0 && (
          <div className=" mt-2 mb-4 text-center">
            {post.Tags.map((tag) => (
              <span
                key={tag.id}
                className="me-2 text-white fw-semibold"
                style={{ fontSize: "1.1rem" }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Carrusel */}
        {images.length > 0 && (
          <div
            className="mb-4"
            style={{
              maxWidth: "600px",
              width: "100%",
              maxHeight: "400px",
              margin: "0 auto",
            }}
          >
            <Slider
              dots={true}
              infinite={false}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={true}
            >
              {images.map((img, idx) => (
                <div key={idx} className="d-flex justify-content-center">
                  <img
                    src={img.url}
                    alt={`Imagen ${idx + 1}`}
                    className="img-fluid rounded shadow-sm"
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}

        {/* Comentarios */}
        <h4
          className="text-center text-white mb-3 d-flex
          justify-content-center align-items-center fs-4"
          style={{ paddingTop: "2rem" }}
        >
          <FaCommentDots className="me-2" style={{ fontSize: "1.8rem" }} />{" "}
          {comments.length}
        </h4>
        {comments.length > 0 && (
          <ul
            className="list-group mb-4"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            {comments.map((c) => (
              <li key={c.id} className="list-group-item">
                {c.content}
              </li>
            ))}
          </ul>
        )}

        {/* Formulario para nuevo comentario */}
        <form onSubmit={createComment}>
          <div className="mb-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <label htmlFor="comentario" className="form-label text-white">
              Agregar comentario
            </label>
            <textarea
              id="comentario"
              className="form-control"
              style={{ height: "60px" }}
              value={newComment}
              onChange={(evento) => setNewComment(evento.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              type="submit"
              className="btn btn-warning px-4"
              style={{
                backgroundColor: "#d95d39",
                borderColor: "#d95d39",
              }}
            >
              Comentar
            </button>
            <button
              type="button"
              className="btn btn-warning px-4"
              style={{
                backgroundColor: "#d95d39",
                borderColor: "#d95d39",
              }}
              onClick={() => navigate("/home")}
            >
              Terminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
