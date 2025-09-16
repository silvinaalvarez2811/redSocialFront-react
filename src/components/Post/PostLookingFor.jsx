import React from "react";

function PostLookingFor({ lookingFor, maxChars = 100 }) {
  if (!lookingFor) return null;

  const truncated =
    lookingFor.length > maxChars
      ? lookingFor.slice(0, maxChars) + "..."
      : lookingFor;
  return (
    <div className="mb-2">
      <span className="font-bold mr-1">Estoy buscando:</span>
      <span>{truncated}</span>
    </div>
  );
}

export default PostLookingFor;
