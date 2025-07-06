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
          <h4>UnaHur Anti-Social Net</h4>
        </div>
        <div className="footer-links">
          <NavLink to="/about-us">Sobre Nosotros</NavLink>
          <a href="https://github.com/silvinaalvarez2811" target="_blank">
            Git Silvina
          </a>
          <a href="https://github.com/elicontti" target="_blank">
            {" "}
            Git Elizabeth
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
