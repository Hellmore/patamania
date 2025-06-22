import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Navb from 'react-bootstrap/Navbar';
import { Dropdown, Space, Typography, Avatar, Button } from 'antd';

import styles from "./Navbar.module.css";
import logo from "../img/Logo Patamania.png";
import shopchart from "../img/Shopping Cart.png";
import profile_img from "../img/Profile.png";
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
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const [color, setColor] = useState(ColorList[0]);

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
      label: <Link className={styles.without_undeline} to={user?.id ? `/profile/${user.id}/edit` : "#"} >Editar Perfil</Link>,
    },
    {
      key: '3',
      label: <Link className={styles.without_undeline} to="/agendamentos">Agendamentos</Link>,
    },
    {
      key: '4',
      label: <Link className={styles.without_undeline} to="/profile/animais">Meus Animais</Link>,
    },
        {
      key: '5',
      label: <Link className={styles.without_undeline} to="/profile/orders">Meus Pedidos</Link>,
    },
    {
      key: '6',
      label: <Button className={styles.logout_button} onClick={logout}>Sair</Button>,
    },
  ];

  const items = [
    {
      key: '1',
      label: <Link className={styles.without_undeline} to="/alimentos">Produtos</Link>,
    },
    {
      key: '2',
      label: 'Serviços',
      children: [
        {
          key: '2-1',
          label: <Link className={styles.without_undeline} to="/agendamentos/banho-e-tosa">Banho e Tosa</Link>,
        },
        {
          key: '2-2',
          label: <Link className={styles.without_undeline} to="/agendamentos/consulta-veterinaria">Consultas Veterinárias</Link>,
        },
        {
          key: '2-3',
          label: <Link className={styles.without_undeline} to="/agendamentos/passeio">Passeios</Link>,
        },
        {
          key: '2-4',
          label: <Link className={styles.without_undeline} to="/agendamentos/hospedagem">Hospedagem</Link>,
        },
      ],
    },
  ];

  const location = useLocation();
  const rotasClaras = ['/'];
  const isRotaClara = rotasClaras.includes(location.pathname);

  return (    
    <Navb collapseOnSelect className={isRotaClara ? styles.produtoBackground : styles.defaultBackground} fixed='top' expand="lg">
      <Navb.Brand as={Link} to="/">
        <img className={styles.logo} src={logo} alt="patamania" />
      </Navb.Brand>
      
      <Navb>
        <Dropdown
          menu={{ items }}
        >
          <Typography.Link>
            <Space>
              <img src={menu} className={styles.icon_menu} />
            </Space>
          </Typography.Link>
        </Dropdown>
      </Navb>

      <div className={styles.icons_right}>
        { user ? (
          <div className={styles.user_info}>
            <div><Link to="/carrinho"><img className={styles.shop_cart} src={shopchart} alt="shopping cart" /></Link></div>
            <div>
              <Dropdown
                className={styles.dropdown}
                menu={{ items: profile }}
              >
                <Avatar 
                  style={{ backgroundColor: color, cursor: 'pointer' }} 
                  size={40} 
                  onClick={changeColor}
                >
                  {user.nome.charAt(0).toUpperCase()}
                </Avatar>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div><Link to="/login"><img className={styles.profile} src={profile_img} alt="profile" /></Link></div>
        )}         
      </div>
    </Navb>
  );
};

export default Navbar;
