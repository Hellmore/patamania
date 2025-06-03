import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Container from "./Container";

import styles from "./LayoutNavbar.module.css";

export default function LayoutNavbarOnly() {
  const location = useLocation();

  const rotasClaras = ['/'];
  const isRotaClara = rotasClaras.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Container>
        <div className={isRotaClara ? styles.produtoBackground : styles.defaultBackground}>
          <Outlet/>
        </div>
      </Container>
    </>
  );
}