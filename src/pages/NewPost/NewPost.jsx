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
  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const respTags = await fetch("/tags");
        if (!respTags.ok) {
          throw new Error("Error al cargar los tags disponibles");
          return;
        }
        const tagsData = await respTags.json();
        setTags(tagsData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          userId: user._id,
          tags: selectedTags,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al crear la publicación");
        return;
      }
      const dataPost = await response.json();
      navigate("/home");
    } catch (error) {
      console.error(error.message);
    }
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
              placeholder="Escribi tu publicación..."
              required
            ></textarea>
          </div>

          <div>
            {tags.map((tag) => (
              <label
                key={tag._id}
                style={{ marginRight: "10px", color: "white" }}
              >
                <input
                  type="checkbox"
                  value={tag._id}
                  onChange={(e) => {
                    //agrega el tag al array
                    if (e.target.checked) {
                      setSelectedTags([...selectedTags, tag._id]);
                    } else {
                      //elimina el tag del array
                      setSelectedTags(
                        selectedTags.filter((id) => id !== tag._id)
                      );
                    }
                  }}
                />
                #{tag.name}
              </label>
            ))}
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
