import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';

// Estilização
import dayjs from 'dayjs';
import { SearchOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Flex, Spin, Dropdown } from 'antd';
import Highlighter from 'react-highlight-words';
import styles from './ListarUsuario.module.css';

export default function ListarUsuarios() {
    const { Column, ColumnGroup } = Table;
    const { user } = useAuth();
    const [users, setUsers]  = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    // Menu do botão ação
    const onMenuClick = e => {
        console.log('click', e);
    };

    const items = [
        {
            key: '1',
            icon: <EditFilled />,
            label: <Link className={styles.without_undeline} to="/edit_produto">Editar</Link>,
        },
        {
            key: '2',
            icon: <DeleteFilled />,
            label: <Link className={styles.without_undeline} to="/deletar_produto">Deletar</Link>,
        },
    ];
    const dataSource = users.map((user) => ({
        ...user,
        key: user.usuario_id,
        usuario_dataNascimento: user.usuario_dataNascimento
            ? dayjs(user.usuario_dataNascimento).format('DD/MM/YYYY')
            : '',
    }));
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/usuarios/lista',  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    
    if (loading) {
        return (
            <Flex align='center' gap='middle'>
                <Spin size="large" />
                <Spin />
            </Flex>
        )
    } if (error) return <div>Erro: {error}</div>;
    

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
            <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
                >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
                >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                    confirm({ closeDropdown: false });
                    setSearchText(selectedKeys[0]);
                    setSearchedColumn(dataIndex);
                }}
                >
                Filter
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
            }}
            >
                close
            </Button>
            </Space>
        </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
        onOpenChange(open) {
            if (open) {
            setTimeout(() => {
                var _a;
                return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
            }, 100);
            }
        },
    },
    render: text =>
        searchedColumn === dataIndex ? (
            <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
    });
    
    const columns = [
        Object.assign(
            {
                title:'ID',
                dataIndex: 'usuario_id',
                key: 'usuario_id',
                width: '6%',
            },
            getColumnSearchProps('usuario_id'), 
        ),
        Object.assign(
            {
                title: 'Nome',
                dataIndex: 'usuario_nome',
                key: 'usuario_nome',
                width: '20%',
            },
            getColumnSearchProps('usuario_nome')
        ),
        Object.assign(
            {
                title: 'Email',
                dataIndex: 'usuario_email',
                key: 'usuario_email',
                width: '30%',
            },
            getColumnSearchProps('usuario_email'),
        ),
        Object.assign(
            {
                title: 'Tipo',
                dataIndex: 'usuario_tipo',
                key: 'usuario_tipo',
                width: '12%',
            },
            getColumnSearchProps('usuario_tipo'),
        ),
        Object.assign(
            {
                title: 'Data de Nascimento',
                dataIndex: 'usuario_dataNascimento',
                key: 'usuario_dataNascimento',
                width: '15%',
            },
            getColumnSearchProps('usuario_dataNascimento'),
        ),
        Object.assign(
            {
                title: 'País',
                dataIndex: 'usuario_pais',
                key: 'usuario_pais',
                width: '12%',
            },
            getColumnSearchProps('usuario_pais'),
        ),
        Object.assign(
            {
                title: 'Ações',
                key: 'acoes',
                width: '20%',
                render:(_, record) => (
                            <Flex align="flex-start" gap="small" vertical>
                                <Dropdown.Button menu={{ items, onClick: onMenuClick }}>Ações</Dropdown.Button>
                            </Flex>
                        )
            },
        )
    ];

    return (
        <>
            <div className={styles.title}>
                <h3>Listagem de Usuários</h3>
            </div>
            <div className={styles.content}>
                <Table columns={columns} className={styles.table} dataSource={dataSource}>
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                            <a>Invite {record.lastName}</a>
                            <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </>
    )
};