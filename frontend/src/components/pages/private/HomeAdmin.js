import styles from './HomeAdmin.module.css';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useState } from 'react';
import { ScheduleOutlined } from '@ant-design/icons';
import products from '../../img/products.svg';
import services from '../../img/services.svg';
import users from '../../img/users.svg';

const items = [
  {
    key: '1',
    icon: <img src={products} alt="Products" style={{ width: '16px', height: '16px' }} />,
    label: 'Gerenciar Produtos',
    children: [
      { key: '11', label: <Link className={styles.without_undeline} to="/cadastrar_produto">Cadastrar produtos</Link> },
      { key: '12', label: <Link className={styles.without_undeline} to="/listar_produtos">Listar produtos</Link> },
    ],
  },
  {
    key: '2',
    icon: <img src={services} alt="Services" style={{ width: '16px', height: '16px' }} />,
    label: 'Gerenciar Serviços',
    children: [
      { key: '21', label: <Link className={styles.without_undeline} to="/cadastrar_servico">Cadastrar serviços</Link> },
      { key: '22', label: <Link className={styles.without_undeline} to="/listar_servicos">Listar serviços</Link> },
    ],
  },
  {
    key: '3',
    icon: <img src={users} alt="Users" style={{ width: '16px', height: '16px' }} />,
    label: 'Gerenciar Usuários',
    children: [
      { key: '31', label: <Link className={styles.without_undeline} to="/listar_usuarios">Listar usuários</Link> },
    ],
  },
  {
    key: '4',
    icon: <ScheduleOutlined />,
    label: 'Gerenciar Agendamentos',
    children: [
      { key: '41', label: <Link className={styles.without_undeline} to="/listar_agendamentos">Listar agendamentos</Link> },
    ],
  },
];
const getLevelKeys = items1 => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

export default function HomeAdmin() {
    const [stateOpenKeys, setStateOpenKeys] = useState([]);
    const onOpenChange = openKeys => {
      const currentOpenKey = openKeys.find(key => stateOpenKeys.indexOf(key) === -1);
      // open
      if (currentOpenKey !== undefined) {
        const repeatIndex = openKeys
          .filter(key => key !== currentOpenKey)
          .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);
        setStateOpenKeys(
          openKeys
            // remove repeat key
            .filter((_, index) => index !== repeatIndex)
            // remove current level all child
            .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
        );
      } else {
        // close
        setStateOpenKeys(openKeys);
      }
    };

    return (
        <section className={styles.home_container}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <div className={styles.content}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            className={styles.menu}
            items={items}
          />
          </div>
        </section>
    )
}
