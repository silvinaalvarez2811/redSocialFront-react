/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Colores principales */
        "gris-oscuro": "#5d5c5c",
        "gris-oscuro-2": "#2f2f2f",
        "fondo-claro": "#e0e0e0",
        /* Colores secundarios*/
        "secundario-1": " #d95d39",
        "secundario-2": " #c94e4e",
      },
    },
  },
  plugins: [],
};
