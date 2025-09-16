const Avatar = ({ user, showUsername = false, extraClass = "" }) => {
  if (!user) return null;

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return firstInitial + lastInitial;
  };

  const initials = getInitials(user.firstName, user.lastName);

  const baseClasses =
    "rounded-full flex items-center justify-center font-bold text-sm";

  return (
    <div className={`flex items-center gap-2 p-0`}>
      {user.avatar ? (
        <img
          src={`http://localhost:5000${user.avatar}`}
          alt="Avatar"
          className={`${baseClasses} w-10 h-10 ${extraClass}`}
        />
      ) : (
        <div className={`${baseClasses} w-10 h-10 ${extraClass}`}>
          {initials}
        </div>
      )}

      {showUsername && (
        <span className="font-bold text-fondo-claro uppercase">
          {user.userName || `${user.firstName} ${user.lastName}`}
        </span>
      )}
    </div>
  );
};

export default Avatar;
