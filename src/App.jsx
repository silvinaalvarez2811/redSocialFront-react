import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import NewPost from "./pages/NewPost/NewPost";
import RutaProtegida from "./components/RutaProtegida";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import styles from "./App.module.css";

function App() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "").toLowerCase();
  const rutasSinHeader = ["/login", "/register"];
  const rutasSinFooter = ["/login", "/register"];

  return (
    <div className={styles.appContainer}>
      {!rutasSinHeader.includes(path) && <Header />}

      <main className={styles.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*Rutas Protegidas*/}
          <Route
            path="/"
            element={
              <RutaProtegida>
                <Home />
              </RutaProtegida>
            }
          />
          <Route
            path="/profile"
            element={
              <RutaProtegida>
                <Profile />
              </RutaProtegida>
            }
          />
          <Route
            path="/newPost"
            element={
              <RutaProtegida>
                <NewPost />
              </RutaProtegida>
            }
          />

          <Route
            path="/about-us"
            element={
              <RutaProtegida>
                <AboutUs />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!rutasSinFooter.includes(path) && <Footer />}
    </div>
  );
}

export default App;
