import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "./Container";

export default function LayoutDefault() {
  return (
    <>
      <Navbar />
      <Container customClass="min-height">
        <Outlet/>
      </Container>
      <Footer />
    </>
  );
}