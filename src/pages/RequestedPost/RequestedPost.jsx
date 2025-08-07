import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Card, ListGroup, Row, Col, Badge } from "react-bootstrap";
import { FaCommentDots } from "react-icons/fa";
import Avatar from "../../components/Avatar/Avatar.jsx";

const RequestedPost = () => {
    const [post, setPost] = useState(null);
    const { postId, userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/alertof/${postId}/${userId}`);
                const data = await response.json();
                setPost(data);
            } catch(error) {
                console.error("Ocurrió un error al obtener los datos de la solicitud", error);
            }
        }
        fetchData();
    }, [postId, userId]);

    return (
        <div className="py-16 mt-20  w-2/3 h-fit flex flex-col items-center">
          <Card
            style={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "aliceblue",
            color: "black",
            }}
            className="shadow-lg p-3"
          >
          <Row>
            <h2 className="text-xl self-center pb-4"><span className="font-semibold">{post?.requestedBy.userName}</span> Solicita un intercambio</h2>
            {/* Columna izquierda: Carrusel */}
            <Col md={6}>
              {post?.images && (
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
                          src={`http://localhost:5000${img.imageUrl}`}
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
                    className="mb-0 font-semibold"
                    style={{ fontSize: "1.25rem", color: "#d95d39" }}
                  >
                    {post?.description}
                  </Card.Title>
                </div>
                  <div>
                      <p className="text-slate-900 text-left m-0">{post?.lookingFor}</p>
                  </div>
                <div className="mb-2">
                  <Badge bg="warning" text="dark" color="black">
                    ⭐ Puntuación: {post?.rating || "N/A"}
                  </Badge>
                </div>

                <div className="text-slate-900">
                  <div className="flex items-center py-2"><FaCommentDots className="me-2" />{post?.comments.length}</div>
                  <p className="text-slate-400 text-left mx-0 mt-2 mb-0">Comentarios</p>
                </div>

                <ListGroup variant="flush" className="mb-2">
                  {post?.comments.slice(0, 5).map((c) => (
                    <ListGroup.Item
                      key={c._id}
                      style={{ backgroundColor: "#2a2a2a", color: "white" }}
                    >
                      {c.text}
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                {post?.comments?.length > 0 ? 
                  <div className="text-end mb-3">
                      <div className="w-80 flex items-center text-sm">
                          <Avatar user={post?.requestedBy._id}/>
                          <p className="m-0">
                            <span className="font-semibold">{post?.requestedBy.userName}</span> 
                            {post.comments.text}</p>
                      </div>
                      
                  </div>
                 : <p className="text-orange-300">No hay comentarios de la persona</p>
                } 

                <div className="flex justify-center gap-4 pt-4">
                  <button className="rounded-xl bg-slate-300 p-2 w-28 hover:shadow-lg">Rechazar</button>
                  <button className="rounded-xl bg-slate-300 p-2 w-28 hover:shadow-lg">Aceptar</button>
                </div>
              </Card.Body>
            </Col>
          </Row>
      </Card>
            <div></div>
        </div>

    );
};

export default RequestedPost;