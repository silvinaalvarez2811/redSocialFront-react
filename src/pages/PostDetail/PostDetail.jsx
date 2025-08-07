import Slider from "react-slick";

import { FaCommentDots } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Avatar from "../../components/Avatar/Avatar";
import { Card, ListGroup, Button, Row, Col, Badge } from "react-bootstrap";
import { toast } from 'sonner'


const PostDetail = () => {
  /* const { id } = useParams();*/
  const { user } = useContext(UserContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const postResponse = await fetch(`http://localhost:5000/posts/full/${postId}`);
        if (!postResponse.ok) {
          throw new Error("Error al cargar la publicacion");
        }
        const postData = await postResponse.json();
        setPost(postData);
        setComments(postData.comments || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleIntercambio = async () => {
    // Cambio los estilos del botón
    if (!user || !user._id) {
      setError("Debes iniciar seción para intercambiar");
    }
    const btn = document.getElementById("btn-exchange");
    btn.classList.remove("bg-amber-400");
    btn.classList.remove("hover:bg-yellow-500");
    btn.classList.add("bg-slate-400");
    // Toast para la notificación 
    toast.success("Notificación enviada", {description: `para ${post.userId.userName}`});
    
    try {
      await fetch(`http://localhost:5000/users/notify/${post.userId._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          from: user._id,
          date: Date(),
        }),
      });
    } catch (error) {
      console.error("Error al enviar la solicitud", error);
    }
  };

  const createComment = async (evento) => {
    evento.preventDefault();
    if (!newComment.trim()) return;
    if (!user || !user._id) {
      setError("Debes iniciar seción para comentar");
    }
    try {
      const response = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          userId: user._id,
          postId: postId,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al crear el comentario");
      }
      const createComment = await response.json();

      setComments([...comments, createComment]);
      setNewComment("");
    } catch (error) {
      setError("No se pudo agregar el comentario", error);
    }
  };
  if (loading) return <p>Cargando publicación...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card
        style={{
          width: "90%",
          maxWidth: "900px",
          backgroundColor: "aliceblue",
          color: "white",
        }}
        className="shadow-lg p-3"
      >
        <Row>
          {/* Columna izquierda: Carrusel */}
          <Col md={6}>
            {post.images?.length > 0 && (
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
                  {post.images.map((img, idx) => (
                    <div key={idx} className="d-flex justify-content-center">
                      <img
                        src={`http://localhost:5000/${img.imageUrl}`}
                        alt={`Imagen ${idx + 1}`}
                        className="img-fluid rounded shadow-sm"
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </Col>

          {/* Columna derecha: Información */}
          <Col md={6}>
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <Card.Title
                  className="mb-0 text-uppercase"
                  style={{ fontSize: "1.25rem", color: "#d95d39" }}
                >
                  {post.description}
                </Card.Title>
              </div>

              <small className="text-muted">
                {post.location || "Localidad desconocida"}
              </small>

              <div className="mb-2">
                <Badge bg="warning" text="dark" color="black">
                  ⭐ Puntuación: {post.rating || "N/A"}
                </Badge>
              </div>

              <div className="mb-3">
                <FaCommentDots className="me-2" />
                {comments.length} Comentarios
              </div>

              <ListGroup variant="flush" className="mb-2">
                {comments.slice(0, 5).map((c) => (
                  <ListGroup.Item
                    key={c._id}
                    style={{ backgroundColor: "#2a2a2a", color: "white" }}
                  >
                    {c.text}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {comments.length > 5 && (
                <div className="text-end mb-3">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowAll(true)}
                  >
                    Ver más comentarios
                  </Button>
                </div>
              )}

              {/* Formulario para nuevo comentario */}
              <form onSubmit={createComment}>
                <div
                  className="mb-3"
                  style={{ maxWidth: "500px", margin: "0 auto" }}
                >
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
                  <Avatar user={post.userId} extraClass="me-2" />
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

              {/* Botón de intercambio */}
              <div className="text-center mt-3">
                <button id="btn-exchange" className="bg-amber-400 rounded-xl py-2 px-3 hover:bg-yellow-500" onClick={() => handleIntercambio()}>
                  Solicitar Intercambio
                </button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PostDetail;
