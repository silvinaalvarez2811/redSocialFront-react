import Avatar from "../Avatar/Avatar";

function PostAvatar({ user }) {
  if (!user) return null;

  return (
    <div className="bg-gris-oscuro-2 p-2 rounded-full inline-flex intems-center">
      <Avatar
        user={user}
        showUsername={true}
        extraClass="text-gris-oscuro-2 bg-fondo-claro p-1 rounded-full"
      />
    </div>
  );
}

export default PostAvatar;
