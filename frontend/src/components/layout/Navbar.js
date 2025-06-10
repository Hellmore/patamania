import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';

import Navb from 'react-bootstrap/Navbar';
import { Dropdown, Space, Typography } from 'antd';

import styles from "./Navbar.module.css";
import logo from "../img/Logo Patamania.png";
import shopchart from "../img/Shopping Cart.png";
import profile_img from "../img/Profile.png";
import { IoSearch } from "react-icons/io5";
import menu from "../img/menu.png";

import React, { useState } from 'react';
import { Avatar, Button } from 'antd';

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

  const items = [
    {
      key: '1',
      label: 'Produtos',
      children: [
        {
          key: '1-1',
          label: <Link className={styles.without_undeline} to="/alimentos">Alimentos</Link>,
        },
        {
          key: '1-2',
          label: <Link className={styles.without_undeline} to="/acessorios">Acessórios</Link>,
        },
        {
          key: '1-3',
          label: <Link className={styles.without_undeline} to="/higiene">Higiene</Link>,
        },
        {
          key: '1-4',
          label: <Link className={styles.without_undeline} to="/farmacia">Farmácia Pet</Link>,
        },
      ],
    },
  {
    key: '2',
    label: 'Serviços',
    children: [
      {
        key: '2-1',
        label: <Link className={styles.without_undeline} to="/banho_&_tosa">Banho e Tosa</Link>,
      },
      {
        key: '2-2',
        label: <Link className={styles.without_undeline} to="/consultas">Consultas Veterinárias</Link>,
      },
      {
        key: '2-3',
        label: <Link className={styles.without_undeline} to="/passeios">Passeios</Link>,
      },
      {
        key: '2-4',
        label: <Link className={styles.without_undeline} to="/hospedagem">Hospedagem</Link>,
      },
    ],
  },
  {
    key: '3',
    label: <Link className={styles.without_undeline} to="/promocoes">Promoções</Link>,
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
          menu={{
            items,
            selectable: true,
            autoFocus: true,
            onClick: (e) => {
              if (e.key === '1') {
                e.domEvent.stopPropagation();
                e.domEvent.preventDefault();
              }
            },
          }}
        >
          <Typography.Link>
            <Space>
              <img src={menu} className={styles.icon_menu} />
            </Space>
          </Typography.Link>
        </Dropdown>
      </Navb>
        <div className={styles.search}>
        <div><IoSearch className={styles.icon_search}/></div>
          <div><input className={styles.barra_search} type="text" placeholder="Buscar produto" /></div>
        </div>
          <div className={styles.icons_right}>
            { user ? (
              <div className={styles.user_info}>
                <div><Link to="/profile"><img className={styles.shop_cart} src={shopchart} alt="shopping cart" /></Link></div>
                <div>
                  <Dropdown
                    className={styles.dropdown}
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