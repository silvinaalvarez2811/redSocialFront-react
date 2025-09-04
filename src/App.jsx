import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import NewPost from "./pages/NewPost/NewPost";
import PostDetail from "./pages/PostDetail/PostDetail";
import RutaProtegida from "./components/RutaProtegida";
import Header from "./components/Header/Header";
import UserHistory from "./pages/UserHistory/UserHistory";
import RequestedPost from "./pages/RequestedPost/RequestedPost.jsx"
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import styles from "./App.module.css";
import EditProfile from './pages/EditProfile/EditProfile';
import { Toaster } from 'sonner'

function App() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "").toLowerCase();
  const rutasSinHeader = ["/login", "/register"];
  const rutasSinFooter = ["/login", "/register"];

  return (
  <>
    <Toaster position='top-right' />
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
            path="/post/:postId"
            element={
              <RutaProtegida>
                <PostDetail />
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
          <Route
            path="/history"
            element={
              <RutaProtegida>
                <UserHistory />
              </RutaProtegida>
            }
          />
          <Route
            path="edit-profile"
            element={
              <RutaProtegida>
                <EditProfile />
              </RutaProtegida>
            }
          />
            <Route
              path="/request/:postId/:userId"
              element={
                <RutaProtegida>
                  <RequestedPost />
                </RutaProtegida>
              }
            />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!rutasSinFooter.includes(path) && <Footer />}
    </div>
  </>
    
  );
}

export default App;
