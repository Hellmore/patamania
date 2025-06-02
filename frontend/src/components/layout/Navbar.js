import {Link} from 'react-router-dom';

// import Container from './Container';

import Contain from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navb from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "./Navbar.module.css";
import logo from "../img/Logo Patamania.png";
import shopchart from "../img/Shopping Cart.png";
import profile from "../img/Profile.png";
import { IoSearch } from "react-icons/io5";
import menu from "../img/menu.png";

import React, { useState } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

function Navbar() {
  const windowSize = useWindowSize();
  return (    
    <Navb collapseOnSelect className={styles.navbar} fixed='top' expand="lg">
      <Navb.Brand href="/">
        <img className={styles.logo} src={logo} alt="patamania" />
      </Navb.Brand>
    
      <Navb>
        <NavDropdown
          title={<img src={menu} className={styles.icon_menu}></img>}
          menuVariant="light"
          className={styles.custom_dropdown}
        >
          {/* Dropdown de Produtos (com subitens) */}
          <NavDropdown.ItemText className={styles.dropdown_header}>Produtos</NavDropdown.ItemText>
          {windowSize.width > 320 ? (
            <NavDropdown drop="end"> {/* "end" alinha o submenu à direita */}
              <NavDropdown.Item as={Link} to="/alimentos">Alimentos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/acessorios">Acessórios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/higiene">Higiene</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/farmacia">Farmácia Pet</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown drop="start"> {/* "end" alinha o submenu à direita */}
              <NavDropdown.Item as={Link} to="/alimentos">Alimentos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/acessorios">Acessórios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/higiene">Higiene</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/farmacia">Farmácia Pet</NavDropdown.Item>
            </NavDropdown>
          )}

          {/* Dropdown de Serviços (com subitens) */}
          <NavDropdown.ItemText className={styles.dropdown_header}>Serviços</NavDropdown.ItemText>
          <NavDropdown drop="end">
          <NavDropdown.Item as={Link} to="/banho_&_tosa">Banho e Tosa</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/consultas">Consultas Veterinárias</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/passeios">Passeios</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/hospedagem">Hospedagem</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown.Item as={Link} to="/promocoes">Promoções</NavDropdown.Item>
        </NavDropdown>
      </Navb>
        <div className={styles.search}>
        <div><IoSearch className={styles.icon_search}/></div>
          <div><input className={styles.barra_search} type="text" placeholder="Buscar produto" /></div>
        </div>
          <div className={styles.icons_right}>
          <div><Link to="/profile"><img className={styles.shop_cart} src={shopchart} alt="shopping cart" /></Link></div>
          <div><Link to="/login"><img className={styles.profile} src={profile} alt="profile" /></Link></div>
        </div>
      </Navb>
  );
};

export default Navbar;