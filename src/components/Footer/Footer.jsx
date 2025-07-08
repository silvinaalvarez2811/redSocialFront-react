<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>;
import style from "./Footer.module.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className="footer-top">
          <h4>Red Social</h4>
        </div>
        <div className="footer-links">
          <NavLink to="/about-us">Sobre Nosotros</NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
