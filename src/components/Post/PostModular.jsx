import { useEffect, useState } from "react";
import PostAvatar from "./PostAvatar";
import PostCarrousel from "./PostCarrousel";
import PostDescription from "./PostDescription";
import PostLookingFor from "./PostLookingFor";
import Location from "../Location/Location";
import PostComment from "./PostComment";

const PostModular = ({ post }) => {
  const [postComplete, setPostComplete] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !postComplete)
    return <p className="text-center mt-10">Cargando post...</p>;

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {/* Avatar */}

      <div className="absolute top-4 left-4 z-10 ">
        <PostAvatar user={postComplete.userId} />
      </div>

      {/* Carrusel de imágenes */}

      <PostCarrousel images={postComplete.images} />
      {/* Descripción y lookingFor*/}

      <div className="p-2 ">
        <PostDescription description={postComplete.description} />
        <PostLookingFor lookingFor={postComplete.lookingFor} />
      </div>
      {/* Ubicación y cantidad de comentarios */}
      <div className="flex justify-between items-center mt-2 p-3 flex-shrink-0">
        <Location location={postComplete.userId.location} />
        <PostComment count={postComplete.comments?.length || 0} />
      </div>
    </div>
  );
};

export default PostModular;
