import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { toast } from 'sonner'

const NotificationPanel = ({ user, onClose }) => {
    const [notif, setNotif] = useState([]);
    const panelRef = useRef(); 

    useEffect(() => {
        const data = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${user._id}/notifications`);
                const notifData = await response.json();
                setNotif(notifData.notifications);
            } catch (error) {
                console.error("Error al obtener las notificaciones",error)
            }
        }
        data();

        const socket = io('/', {
            query: { userId: user._id }  // Se conecta el socket con el userId (necesario en el backend)
        });

        socket.on('new notification', notf => {
            setNotif((prev) => [...prev, notf]);
            toast.success("Tienes una nueva notificación", {description: `de ${notf.from.userName}`});
        });

        return () => {
            socket.disconnect();
        };
    }, [user._id]);


    // Detectar clic fuera del panel para cerrarlo
    useEffect(() => {
        function handleClickOutside(event) {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose(); // Llama a la función para cerrar el panel
            };
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={panelRef} className="flex w-96 absolute top-16 bg-zinc-900 text-slate-300 flex-col shadow-xl h-96 p-3 rounded-lg">
            <h2 className="pt-2 text-xl pl-2">Notificaciones</h2>
            {notif?.length > 0 && (
                <div className="mt-2 overflow-auto">{
                    notif.map((notf, index) => (
                        <Link key={index} to={`/request/${notf.postId._id}/${notf.from._id}`}>
                            <div className="flex items-center my-3">
                                <div className="self-start"><Avatar user={notf.from}/></div>
                                <div className="w-80">
                                    <p className="text-base text-left m-0 pl-2"><b>{notf.from.userName}</b> solicita un intercambio</p>
                                    <p className="text-slate-500 m-0 text-left pl-2 overflow-hidden text-ellipsis">Publicación: {notf.postId.description}</p>
                                </div>
                            </div>   
                        </Link>  
                    ))
                }
                </div>
            )}
        </div>
    )
}

export default NotificationPanel;