import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import { SearchOutlined, EditFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Flex, Spin, Dropdown, message} from 'antd';
import Highlighter from 'react-highlight-words';
import styles from './ListarProdutos.module.css';
import AlertDelecao from './AlertDelecao';

export default function ListarProdutos() {
    const { Column, ColumnGroup } = Table;
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);  
    
    // Transformando os dados recebidos
    const processedData = dataSource.map((products) => ({
        ...products,
        key: products.produto_id,
        produto_validade: products.produto_validade
            ? dayjs(products.produto_validade).format('DD/MM/YYYY')
            : '',
    }));    

    const items = (record) => [
        {
            key: '1',
            icon: <EditFilled />,
            label: (
                <span onClick={() => navigate(`/edit_product/${record.produto_id}`)}>
                    Editar
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <AlertDelecao 
                    onConfirm={() => handleDelete(record.produto_id)}
                />
            ),
        },
    ];

    // Função para deletar produto
    const handleDelete = async (productID) => {
        setLoading(true);
        try {
        await axios.delete(`http://localhost:3001/produtos/deletar/${productID}`, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        message.success('Produto deletado com sucesso!');
        setDataSource(prev => prev.filter(products => products.produto_id !== productID));
        } catch (error) {
            message.error('Erro ao deletar produto: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

        useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/produtos/lista',  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                setDataSource(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <Flex className={styles.content} align='center' gap='middle'>
                <Spin size="large" />
            </Flex>
        )
    } 

    if (error) return <div>Erro: {error}</div>;

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
                Pesquisar
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
                >
                Resetar
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
                Filtrar
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
            }}
            >
                Fechar
            </Button>
            </Space>
        </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, rcord) =>
        rcord[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
                dataIndex: 'produto_id',
                key: 'produto_id',
                width: '0.5%',
            },
            getColumnSearchProps('produto_id'), 
        ),
        Object.assign(
            {
                title: 'Nome',
                dataIndex: 'produto_nome',
                key: 'produto_nome',
                width: '13%',
            },
            getColumnSearchProps('produto_nome')
        ),
        Object.assign(
            {
                title: 'Tipo',
                dataIndex: 'produto_tipo',
                key: 'produto_tipo',
                width: '7%',
            },
            getColumnSearchProps('produto_tipo'),
        ),
        Object.assign(
            {
                title: 'Tamanho',
                dataIndex: 'produto_tamanho',
                key: 'produto_tamanho',
                width: '5%',
            },
            getColumnSearchProps('produto_tamanho'),
        ),
        Object.assign(
            {
                title: 'Marca',
                dataIndex: 'produto_marca',
                key: 'produto_marca',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Lote',
                dataIndex: 'produto_lote',
                key: 'produto_lote',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Fabricante',
                dataIndex: 'produto_fabricante',
                key: 'produto_fabricante',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Origem',
                dataIndex: 'produto_origem',
                key: 'produto_origem',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Validade',
                dataIndex: 'produto_validade',
                key: 'produto_validade',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Código de Barras',
                dataIndex: 'produto_codigobarras',
                key: 'produto_codigobarras',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Estoque',
                dataIndex: 'produto_estoque',
                key: 'produto_estoque',
                width: '2%',
            },
        ),
        Object.assign(
            {
                title: 'Status',
                dataIndex: 'produto_status',
                key: 'produto_status',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Preço',
                dataIndex: 'produto_preco',
                key: 'produto_preco',
                width: '5%',
            },
        ),
        Object.assign(
            {
                title: 'Ações',
                key: 'acoes',
                width: '5%',
                render:(_, record) => (
                            <Flex align="flex-start" gap="small" vertical>
                            <Dropdown menu={{ items: items(record) }} trigger={['click']}>
                                <Button>Ações</Button>
                            </Dropdown>
                            </Flex>
                        )
            },
        )
    ];

    return (
        <>
            <div className={styles.title}>
                <h3>Listagem de Produtos</h3>
            </div>
            <div className={styles.content}>
                <Table 
                    columns={columns} 
                    className={styles.table} 
                    dataSource={processedData} 
                    rowKey="produto_id"
                    loading={loading}/>
            </div>
        </>
    );
}