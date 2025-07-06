import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Post.module.css";
import Avatar from "../Avatar/Avatar";
import { FaCommentDots } from "react-icons/fa";

const Post = ({ post }) => {
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //traer imagenes
        const imagesResponse = await fetch(
          `http://localhost:3001/postimages/post/${post.id}`
        );
        if (!imagesResponse.ok) {
          throw new Error("Error al cargar las imagenes");
        }
        const imagesdata = await imagesResponse.json();
        setImages(imagesdata);

        //obtener comentarios
        const commentsResponse = await fetch(
          `http://localhost:3001/comments/post/${post.id}`
        );
        if (!commentsResponse.ok) {
          throw new Error("Error al cargar los comentarios");
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        setLoading(false);
      } catch (error) {
        console.error("Error en fetchs del post:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [post.id]);

  return (
    <div className={styles.postCard}>
      <div className={styles.usuarioCard}>
        <Avatar user={post.User} extraClass="avatarPost" />
        <span className={styles.usuarioCard}>{post.User?.nickName}</span>
      </div>
      {images.length > 0 && (
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
          {images.map((imagen, index) => (
            <div key={index} className={styles.cardImage}>
              <img
                src={imagen.url}
                className="card-img-top mb-2"
                alt={`Imagen ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      )}

      <div className={styles.cardBody}>
        <p className={styles.cardComments}>
          <FaCommentDots style={{ marginRight: "10px" }} /> {comments.length}{" "}
        </p>
        <h5 className={styles.cardTitle}>{post.description}</h5>
        {post.Tags && post.Tags.length > 0 && (
          <div className={styles.cardTags}>
            {post.Tags.map((tag) => (
              <span key={tag.id} className={styles.cardText}>
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {comments.length > 0 && (
          <div>
            <ul className={styles.listComments}>
              {comments.map((comentario) => (
                <li key={comentario.id} className={styles.comment}>
                  <em
                    style={{
                      fontWeight: "bold",
                      marginRight: "10px",
                      fontFamily: "Lato",
                    }}
                  >
                    {comentario.User?.nickName || "Anon"}
                  </em>
                  {comentario.content}{" "}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link to={`/post/${post.id}`} className={styles.navigate}>
          Añade un comentario
        </Link>
      </div>
    </div>
  );
};

export default Post;
