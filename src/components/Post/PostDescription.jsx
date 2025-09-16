import React from "react";

function PostDescription({ description, maxChars = 100 }) {
  if (!description) return null;
  const truncated =
    description.length > maxChars
      ? description.slice(0, maxChars) + "..."
      : description;

  return (
    <p className=" text-wrap text-xl font-extrabold mb-1 uppercase ">
      {truncated}
    </p>
  );
}

export default PostDescription;
