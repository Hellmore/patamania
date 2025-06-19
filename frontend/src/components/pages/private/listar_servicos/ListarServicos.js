import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import styles from './ListarServicos.module.css';
import dayjs from 'dayjs';
import { SearchOutlined, EditFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Flex, Spin, Dropdown, message} from 'antd';
import Highlighter from 'react-highlight-words';
import AlertDelecao from './AlertDelecao';

export default function ListarServicos () {
    const { Column, ColumnGroup } = Table;
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);  



    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
        }).format(preco);
    };

    const formatarDuracao = (minutos) => {
        const hours = Math.floor(minutos / 60);
        const mins = minutos % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;  
    };  
    
    const items = (record) => [
        {
            key: '1',
            icon: <EditFilled />,
            label: (
                <span onClick={() => navigate(`/edit_service/${record.servico_id}`)}>
                    Editar
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <AlertDelecao 
                    onConfirm={() => handleDelete(record.servico_id)}
                />
            ),
        },
    ];
    
    // Função para deletar serviço
    const handleDelete = async (serviceID) => {
        setLoading(true);
        try {
        await axios.delete(`http://localhost:3001/servicos/${serviceID}`, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
            
        message.success('Serviço deletado com sucesso!');
        setDataSource(prev => prev.filter(services => services.servico_id !== serviceID));
        } catch (error) {
            message.error('Erro ao deletar serviço: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:3001/servicos/listar-com-responsaveis-e-criador', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        
            const processedData = response.data.map(service => ({
                ...service,
                key: service.servico_id,
                servico_duracao: formatarDuracao(service.servico_duracao),
                servico_preco: formatarPreco(service.servico_preco),
                servico_taxa: formatarPreco(service.servico_taxa)
            }));
            
            setDataSource(processedData);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchServices();
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
                    dataIndex: 'servico_id',
                    key: 'servico_id',
                    width: '0.5%',
                },
                getColumnSearchProps('servico_id'), 
            ),
            Object.assign(
                {
                    title: 'Nome',
                    dataIndex: 'servico_nome',
                    key: 'servico_nome',
                    width: '10%',
                },
                getColumnSearchProps('servico_nome')
            ),
            Object.assign(
                {
                    title: 'Categoria',
                    dataIndex: 'servico_categoria',
                    key: 'servico_categoria',
                    width: '7%',
                },
                getColumnSearchProps('servico_categoria'),
            ),
            Object.assign(
                {
                    title: 'Descrição',
                    dataIndex: 'servico_descricao',
                    key: 'servico_descricao',
                    width: '10%',
                },
                getColumnSearchProps('servico_descricao'),
            ),
            Object.assign(
                {
                    title: 'Profissional Responsável',
                    dataIndex: 'profissional_nome',
                    key: 'profissional_nome',
                    width: '5%',
                    render: (text, record) => (
                        <span>
                        {text || 'Não atribuído'} (ID: {record.servico_profissionalresponsavel})
                        </span>
                    ),
                },
            ),
            Object.assign(
                {
                    title: 'Duração',
                    dataIndex: 'servico_duracao',
                    key: 'servico_duracao',
                    width: '5%',
                },
            ),
            Object.assign(
                {
                    title: 'Preço',
                    dataIndex: 'servico_preco',
                    key: 'servico_preco',
                    width: '5%',
                },
            ),
            Object.assign(
                {
                    title: 'Taxa',
                    dataIndex: 'servico_taxa',
                    key: 'servico_taxa',
                    width: '5%',
                },
            ),
            Object.assign(
                {
                    title: 'Disponibilidade',
                    dataIndex: 'servico_disponibilidade',
                    key: 'servico_disponibilidade',
                    width: '5%',
                },
            ),
            Object.assign(
                {
                    title: 'Criador por',
                    dataIndex: 'criador_nome',
                    key: 'criador_nome',
                    width: '5%',
                    render: (text, record) => (
                        <span>
                        {text} (ID: {record.servico_responsavelagendamento})
                        </span>
                    ),
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
                    <h3>Listagem de Serviços</h3>
                </div>
                <div className={styles.content}>
                    <Table 
                        columns={columns} 
                        className={styles.table} 
                        dataSource={dataSource} 
                        rowKey="servico_id"
                        loading={loading}/>
                </div>
            </>
    )
};