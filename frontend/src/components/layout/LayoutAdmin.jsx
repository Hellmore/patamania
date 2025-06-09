import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./NavbarAdmin";
import Container from "./Container";

import styles from "./LayoutNavbar.module.css";

export default function LayoutNavbarOnly() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Container>
          <Outlet/>
      </Container>
    </>
  );
}