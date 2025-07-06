import React from "react";
import styles from "./AsideDer.module.css";

const AsideDer = () => {
  return (
    <aside className={styles.asideContainer}>
      {/* Taller o Actividad */}

      <div className={styles.card}>
        <h3>👩‍💻 Sobre esta app</h3>
        <p>
          UnaHur Anti-Social Net fue desarrollada por estudiantes de Interfaces
          de Usuario para simular una red social con propósito educativo.
        </p>
      </div>

      {/* Promos Cursos */}
      <div className={styles.card}>
        <h3>🚀 Promos Cursos Gratis</h3>
        <ul className={styles.list}>
          <li>
            <a
              href="https://www.argentinaprograma.gob.ar"
              target="_blank"
              rel="noreferrer"
            >
              Argentina Programa
            </a>
          </li>
          <li>
            <a
              href="https://www.argentina.gob.ar/codoacodo"
              target="_blank"
              rel="noreferrer"
            >
              Codo a Codo
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.card}>
        <h3>📚 Cursos de JavaScript</h3>
        <p>
          Aprovechá los cursos gratuitos de JavaScript y mejorá tus habilidades.
        </p>
        <a
          href="https://javascript.info/"
          target="_blank"
          rel="noreferrer"
          className={styles.button}
        >
          Más info
        </a>
      </div>

      <div className={styles.card}>
        <h3>📢 Noticias y eventos</h3>
        <p>
          No te pierdas las últimas novedades y actividades en la comunidad.
          Consultá nuestra agenda y mantenete actualizado.
        </p>
        <a
          href="https://unahur.edu.ar/noticias"
          target="_blank"
          rel="noreferrer"
          className={styles.button}
        >
          Ver más
        </a>
      </div>
    </aside>
  );
};

export default AsideDer;
