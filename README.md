# UNAHUR ANTI-SOCIAL NET

![Logo Unahur Anti Social Net](./public/antisocial-logo1.png)

Una red social desarrollada como trabajo práctico de la materia **Interfaces de Usuario** en la Tecnicatura en Programación de la UNAHUR.  
Permite registrarse, iniciar sesión (simulada), ver publicaciones, crear nuevas, comentar y visualizar el perfil de usuario.

---

## ⚠️ Importante sobre el backend

Este proyecto consume una API externa provista como “caja negra” para simular el comportamiento de una red social.  
Para facilitar las pruebas, el repositorio incluye una copia del archivo `seed.js` dentro de la carpeta `/backend-utils/` del frontend. EL archivo `seed.js` no puede ser ejecutado desde el frontend, pero se incluye como referencia para facilitar el proceso de prueba.

- Copiar el archivo en la carpeta del backend donde está package.json

---

## 📌 Descripción general

Los usuarios pueden interactuar con publicaciones que incluyen imágenes, etiquetas y comentarios.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Context API
- Bootstrap
- Fetch API
- CSS Modules

---

## 🧭 Flujo del usuario

1.  Si el usuario está logueado ingresa directamente a Home
2.  Si no está logueado, ingresa con login simulado (con contraseña fija `123456`)
3.  Caso contrario debe registrarse
4.  Accede al Home con el feed de publicaciones
5.  Puede:
    - Ver detalles de cada publicación
    - Comentar publicaciones
    - Crear nuevas publicaciones (con imágenes y etiquetas)
    - Ver su perfil con sus publicaciones propias

---

## ℹ️ Requisitos

- Node.js instalado (versión recomendada: 16 o superior)
- npm (viene incluido con Node.js)

---

## 📂 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/silvinaalvarez2811/CIU--frontend.git
cd CIU--frontend
```

### 2. Instalar dependencias

      npm install

### 3. Ejecutar el proyecto

      npm run dev

## 🔌 Conexión con el Backend

Este frontend consume una API externa desarrollada por el docente.
La API permite manejar usuarios, publicaciones, imágenes, comentarios y etiquetas.

## URL base del backend

http://localhost:3001

## Pasos para iniciar el backend

### 1-Clonar el repositorio del backend:

      git clone https://github.com/lucasfigarola/backend-api.git
      cd backend-api

### 2-Instalar dependencias:

      npm install

### 3-Poblar la base de datos con datos de ejemplo:

      - Copiar el archivo `seed.js` desde `/backend-utils/` hacia la raíz del backend (junto a `package.json`)
      - Luego, desde esa carpeta, ejecutarlo con:

      node seed.js

### 4-Iniciar el servidor:

      npm start

## 👥 Autores

Grupo **Sev.js**  
Trabajo realizado por estudiantes de la Tecnicatura en Programación – UNAHUR

- Elizabeth Contti
- Silvina Alvarez
