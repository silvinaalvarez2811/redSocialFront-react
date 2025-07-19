import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import styles from "./Post.module.css";
import Avatar from "../Avatar/Avatar";
import { FaCommentDots } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

const Post = ({ post, onExchangeSuccess }) => {
  const { user } = useContext(UserContext);
  const [postComplete, setPostComplete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchPostComplete = async () => {
      try {
        const res = await fetch(`/posts/full/${post._id}`);

        if (!res.ok) {
          throw new Error("Error al cargar el post completo");
        }
        const fullPost = await res.json();
        setPostComplete(fullPost);
      } catch (error) {
        console.error("Error en fetchs del post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostComplete();
  }, [post._id]);

  const createComment = async (evento) => {
    evento.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch("/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newComment,
          userId: user._id,
          postId: post._id,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al crear el comentario");
      }
      const createdComment = await response.json();

      const commentWithUser = {
        ...createdComment,
        userId: {
          _id: user._id,
          userName: user.userName,
        },
      };

      setPostComplete((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), commentWithUser],
      }));
      setNewComment("");
      setError("");
      setShowCommentForm(false);
    } catch (error) {
      console.error(error);
      setError("No se pudo agregar el comentario");
    }
  };

  const handleRequestExchange = async () => {
    try {
      const response = await fetch("/posts/requestExchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          requesterId: user._id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "error en el intercambio");
        return;
      }
      alert("¡Intercambio solicitado!");
      console.log("Status del post:", postComplete.status);
      if (typeof onExchangeSuccess === "function") {
        onExchangeSuccess();
      }
    } catch (error) {
      console.error("Error al solicitar el intercambio:", error);
    }
  };

  if (loading || !postComplete) return <p>Cargando post...</p>;

  return (
    <div className={styles.postCard}>
      <div className={styles.usuarioCard}>
        <Avatar user={postComplete.userId} extraClass="avatarPost" />
        <span className={styles.usuarioCard}>
          {postComplete.userId?.userName}
        </span>
      </div>

      {postComplete.images?.length > 0 && (
        <Slider
          {...{
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          }}
        >
          {postComplete.images.map((imagen, index) => (
            <div key={index} className={styles.cardImage}>
              <img
                src={imagen.imageUrl}
                className="card-img-top mb-2"
                alt={`Imagen ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      )}

      <div className={styles.cardBody}>
        <p className={styles.cardComments}>
          <FaCommentDots style={{ marginRight: "10px" }} />{" "}
          {postComplete.comments?.length || 0}
        </p>
        <h5 className={styles.cardTitle}>{postComplete.description}</h5>

        <div className={styles.cardLooking}>
          <p>
            <span
              style={{
                fontWeight: "bold",
                marginRight: "10px",
                fontFamily: "Lato",
              }}
            >
              Estoy buscando:
            </span>
            {postComplete.lookingFor}
          </p>
        </div>

        {postComplete.comments?.length > 0 && (
          <div>
            <ul className={styles.listComments}>
              {postComplete.comments.map((comentario) => (
                <li key={comentario._id} className={styles.comment}>
                  <em
                    style={{
                      fontWeight: "bold",
                      marginRight: "10px",
                      fontFamily: "Lato",
                    }}
                  >
                    {comentario.userId?.userName || "Anon"}
                  </em>
                  {comentario.text}{" "}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          {!showCommentForm && (
            <p
              style={{
                color: "white",
                cursor: "pointer",
                textDecoration: "none",
                background: "gray",
              }}
              onClick={() => setShowCommentForm(true)}
            >
              Haz clic aquí para comentar
            </p>
          )}

          {showCommentForm && (
            <form onSubmit={createComment}>
              <textarea
                id="comentario"
                className="form-control"
                style={{ height: "60px", width: "100%" }}
                value={newComment}
                onChange={(evento) => setNewComment(evento.target.value)}
                required
                rows={3}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#d95d39",
                  border: "none",
                  color: "white",
                  padding: "5px 10px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Enviar
              </button>

              <button
                type="button"
                style={{
                  backgroundColor: "gray",
                  border: "none",
                  color: "white",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={() => setShowCommentForm(false)}
              >
                Cancelar
              </button>
            </form>
          )}
        </div>
      </div>
      {/* Botón de intercambio */}
      <div className={styles.exchangeSection}>
        {postComplete.status === "available" ? (
          <button
            onClick={handleRequestExchange}
            className={styles.exchangeButton}
          >
            IINTERCAMBIAR
          </button>
        ) : postComplete.status === "engaged" ? (
          <button
            disabled
            className={styles.exchangeButton}
            style={{ cursor: "not-allowed", opacity: 0.6 }}
          >
            RESERVADO
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
