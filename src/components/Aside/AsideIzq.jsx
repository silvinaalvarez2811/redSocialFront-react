import React from "react";
import styles from "./AsideIzq.module.css";

const AsideIzq = () => {
  return (
    <aside className={styles.asideContainer}>
      <div className={styles.cardInscription}>
        <img
          src="/imagenesSimuladas/estudiantes.jpg"
          alt="Inscripción UNAHUR"
          className={styles.cardImage}
        />
        <div className={styles.cardText}>
          <h3>INSCRIPCIÓN 2° CUATRIMESTRE.</h3>
          <div className={styles.text}>
            <p>
              ¡Ya podés inscribirte a materias para el segundo cuatrimestre
              2025!
            </p>
            <p>
              Entrá al{" "}
              <a
                href="https://servicios.unahur.edu.ar/unahur3w/inscripciones"
                target="_blank"
                rel="noreferrer"
              >
                SIU Guaraní
              </a>{" "}
              y completá tu inscripción.
            </p>

            <p>Fechas clave:</p>
            <ul>
              <li> Ingreso: 1 al 10 de julio</li>
              <li>Regulares: 5 al 15 de julio</li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideIzq;
