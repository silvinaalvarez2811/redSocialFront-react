import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./NewPost.module.css";
import { IoImagesOutline } from "react-icons/io5";
import Avatar from "../../components/Avatar/Avatar";
import { FaCheckCircle } from "react-icons/fa";

const NewPost = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState("");

  useEffect(() => {
    const obtenerTags = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/tags");
        const data = await respuesta.json();
        setTags(data);
      } catch (error) {
        console.error("Error al traer tags:", error);
      }
    };
    obtenerTags();
  }, []);

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    if (!description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    // Limpio la URL nueva, y preparo la lista final de imágenes
    const urlLimpia = nuevaImagen.trim();
    let imagenesFinales = [...imageUrls];

    // Si la URL nueva no está vacía y no está ya en el array, la agrego
    if (urlLimpia !== "" && !imagenesFinales.includes(urlLimpia)) {
      imagenesFinales.push(urlLimpia);
    }

    // Limpio duplicados y URLs vacías
    const imagenesValidas = Array.from(
      new Set(imagenesFinales.filter(Boolean))
    );

    try {
      // Creo el post primero
      const resPost = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          userId: user.id,
          tagIds: selectedTags,
        }),
      });

      const nuevoPost = await resPost.json();

      // Envío cada imagen, una por una, pero sin repetir
      for (const url of imagenesValidas) {
        await fetch("http://localhost:3001/postimages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            postId: nuevoPost.id,
          }),
        });
      }

      navigate("/home");
    } catch (error) {
      console.error("Error al crear el post:", error);
      setError("Error al crear la publicación");
    }
  };

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    }
  };

  const agregarImagen = () => {
    const urlLimpia = nuevaImagen.trim();
    if (urlLimpia !== "" && !imageUrls.includes(urlLimpia)) {
      setImageUrls([...imageUrls, urlLimpia]);
      setNuevaImagen("");
    }
  };

  const eliminarImagen = (index) => {
    const nuevas = imageUrls.filter((_, i) => i !== index);
    setImageUrls(nuevas);
  };

  return (
    <div className={styles.borderWrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Avatar user={user} extraClass="avatarPost" />
          <h2 className={styles.title}>¿Qué estás pensando?</h2>
        </div>
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Descripción */}
          <div className={styles.formGroup}>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Agregar imágenes */}
          <div className={styles.formGroup}>
            <div className={styles.addImages}>
              <label className={styles.label}>
                <IoImagesOutline size={26} />
                Agregá tu foto
              </label>
            </div>
            <div className={styles.imageInputWrapper}>
              <input
                type="text"
                value={nuevaImagen}
                onChange={(e) => setNuevaImagen(e.target.value)}
                className={styles.input}
                placeholder="ej: https://miweb.com/imagen.jpg"
              />
              <button
                type="button"
                className={styles.addButton}
                onClick={agregarImagen}
              >
                Confirmar
              </button>
            </div>
          </div>

          {imageUrls.map((imagen, index) => (
            <div className={styles.imagenesGuardadas} key={imagen + index}>
              <FaCheckCircle size={30} />
              {"  "}
              <span>{imagen}</span>
            </div>
          ))}

          {/* Etiquetas */}
          <div className={styles.formGroup}>
            <div className={styles.tagsWrapper}>
              {tags.map((tag) => (
                <div key={tag.id} className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    value={tag.id}
                    onChange={handleTagChange}
                    className={styles.checkbox}
                    id={`tag-${tag.id}`}
                  />
                  <label
                    className={styles.checkboxLabel}
                    htmlFor={`tag-${tag.id}`}
                  >
                    #{tag.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Botón de enviar */}
          <button type="submit" className={styles.submitButton}>
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
