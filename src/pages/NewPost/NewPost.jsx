import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./NewPost.module.css";
import { IoImagesOutline } from "react-icons/io5";
import Avatar from "../../components/Avatar/Avatar";

const NewPost = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [image, setImage] = useState([]);

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImage((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }
    if (!lookingFor.trim()) {
      setError("Describir lo que buscas es obligatorio");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("lookingFor", lookingFor);
    formData.append("userId", user._id);
    formData.append("status", "available");

    image.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear la publicación");
      }
      const dataPost = await response.json();
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      setError("Error al crear la publicación");
    }
  };

  return (
    <div className={styles.borderWrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Avatar user={user} extraClass="avatarPost" />
          <h2 className={styles.title}>¿Qué querés intecambiar?</h2>
        </div>
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={styles.formGroup}>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describi tu prenda..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              className={styles.textarea}
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              placeholder="Contanos lo que estás buscando..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.addImages}>
              <label className={styles.label}>
                <IoImagesOutline size={26} />
                Agregá tu foto
              </label>
            </div>

            <div className={styles.imageInputWrapper}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className={styles.imageInput}
              />
            </div>

            {image.length > 0 && (
              <div>
                {image.map((file, index) => (
                  <p key={index} className={styles.imageName}>
                    {file.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
