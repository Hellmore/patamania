import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";

import Navb from 'react-bootstrap/Navbar';

import styles from "./NavbarAdmin.module.css";
import logo from "../img/Logo Patamania.png";
import { Avatar, Button, Dropdown } from 'antd';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function redirectToHome() {
  window.location.href = '/';
}

function Navbar() {
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const [color, setColor] = useState(ColorList[0]);
  const location = useLocation();
  
  //Função para alterar a cor do avatar
  const changeColor = () => {
    const randomColor = ColorList[Math.floor(Math.random() * ColorList.length)];
    setColor(randomColor);
  };

  const { user, logout } = useAuth();

  const profile = [
    {
      key: '1',
      label: <Link className={styles.without_undeline} to="/profile">Perfil</Link>,
    },
    {
      key: '2',
      label: <Link className={styles.without_undeline} to="/profile/edit">Editar Perfil</Link>,
    },
    {
      key: '3',
      label: <Link className={styles.without_undeline} to="/profile/orders">Meus Pedidos</Link>,
    },
    {
      key: '4',
      label: <Button className={styles.logout_button} onClick={logout}>Sair</Button>,
    },
  ]


  const rotasClaras = ['/home_admin'];
  const isRotaClara = rotasClaras.includes(location.pathname);

  return (    
    <Navb collapseOnSelect className={isRotaClara ? styles.produtoBackground : styles.defaultBackground} fixed='top' expand="lg">
      <Navb.Brand as={Link} to="/home_admin">
        <img className={styles.logo} src={logo} alt="patamania" />
        <span className={styles.title}>Dashboard</span>
      </Navb.Brand>
    
        <div className={styles.icons_right}>
          { user ? (
            <Dropdown
              menu={{
              items: profile,
              selectable: true,
              autoFocus: true,
              }}
            >
              <Avatar 
                style={{ backgroundColor: color, cursor: 'pointer' }} 
                size={40} 
                onClick={changeColor}
              >
                {user.nome.charAt(0).toUpperCase()}
              </Avatar>
            </Dropdown>
          ) : (
            redirectToHome()
          )}
        </div>
      </Navb>
  );
};

export default Navbar;