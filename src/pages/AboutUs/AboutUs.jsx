import React from "react";
import styles from "./AboutUs.module.css";
import logo from "../../assets/logo-react.png"
import logo2 from "../../assets/logo-autenticacion.png"
import logo3 from "../../assets/logo-equipo.png"



const AboutUs = () => {
return (
    <section className={styles.about}>
        <h1>Sobre Nosotros</h1>
        <p>
        UnaHur Anti-Social Net es más que una red social, es el resultado de un proyecto académico 
        que combina creatividad,
        diseño y desarrollo web con propósito pedagógico.
        Esta aplicación fue creada como trabajo práctico integrador 
        en el marco de la materia Interfaces de Usuario en la Universidad Nacional de Hurlingham.
        Su objetivo principal es simular una red social funcional, permitiendo a personas usuarias registrarse,
        iniciar sesión, crear publicaciones, ver contenidos, interactuar con comentarios y navegar perfiles, 
        todo sobre una interfaz pensada para ser dinamica.</p>
        
    <div className= {styles.container}>
        <div className="container-1">
            <img src= {logo} className={styles.logo}/>
            <p>
                El desarrollo incluye tecnologías clave de React, useContext para manejar sesiones simuladas,
                react-router-dom para navegación entre rutas protegidas,
                fetch para el consumo de una API REST,
                el uso de formularios controlados para el manejo preciso de entradas del usuario.
            </p>
        </div>
        <div className="container-2">
            <img src= {logo2} className={styles.logo}/>    
            <p>
                La autenticación fue simplificada: se emplea una contraseña fija para facilitar la práctica del login
                y la protección de rutas sin depender de tokens JWT.
            </p>
        </div>
        <div className="container-3">
            <img src= {logo3} className={styles.logo}/>
            <p>
                Y aunque es una simulación, el enfoque fue real: trabajar como si se tratara de una aplicación en producción,
                colaborando en equipo y aplicando buenas prácticas.
            </p>
        </div>
    </div>
    </section>
);
};

export default AboutUs;