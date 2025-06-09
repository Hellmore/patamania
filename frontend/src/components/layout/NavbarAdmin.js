import {Link} from 'react-router-dom';
import { Outlet, useLocation } from "react-router-dom";

import Navb from 'react-bootstrap/Navbar';

import styles from "./NavbarAdmin.module.css";
import logo from "../img/Logo Patamania.png";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

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
  const location = useLocation();

  const rotasClaras = ['/home_admin'];
  const isRotaClara = rotasClaras.includes(location.pathname);

  return (    
    <Navb collapseOnSelect className={isRotaClara ? styles.produtoBackground : styles.defaultBackground} fixed='top' expand="lg">
      <Navb.Brand as={Link} to="/home_admin">
        <img className={styles.logo} src={logo} alt="patamania" />
        <span className={styles.title}>Dashboard</span>
      </Navb.Brand>
    
        <div className={styles.icons_right}>
           <Avatar className={styles.profile} size={44} icon={<UserOutlined />} />
        </div>
      </Navb>
  );
};

export default Navbar;