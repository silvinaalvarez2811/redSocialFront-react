import React from "react";
import { FaCommentDots } from "react-icons/fa";

function PostComment({ comments }) {
  const cantidad = comments?.length || 0;

  return (
    <div className="flex items-center gap-2 text-gris-oscuro-2 font-bold text-lg">
      <FaCommentDots size={35} />
      <span>{cantidad}</span>
    </div>
  );
}

export default PostComment;
