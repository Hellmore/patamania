import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import { SearchOutlined, EditFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Flex, Spin, Dropdown, message} from 'antd';
import Highlighter from 'react-highlight-words';
import styles from './ListarAgendamentos.module.css';

export default function ListarAgendamentos() {
    const { Column, ColumnGroup } = Table;
    const { user } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);  
    
    // Transformando os dados recebidos
    const processedData = dataSource.map((agendamentos) => ({
        ...agendamentos,
        key: agendamentos.agendamento_id,
    }));    

     useEffect(() => {
    const fetchAgendamentos = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/agendamentos/lista`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                setAgendamentos(response.data.data);
                setDataSource(response.data.data); // Atualiza dataSource também
            }
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchAgendamentos();
}, [user.id]);

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
                dataIndex: 'agendamento_id',
                key: 'agendamento_id',
                width: '0.5%',
            },
        ),
        Object.assign(
            {
                title: 'Nome do animal',
                dataIndex: 'nome_pet',
                key: 'nome_pet',
                width: '13%',
            },
        ),
        Object.assign(
            {
                title: 'Nome do tutor',
                dataIndex: 'nome_tutor',
                key: 'nome_tutor',
                width: '13%',
            },
            getColumnSearchProps('nome_tutor')
        ),
        Object.assign(
            {
                title: 'Nome do Serviço',
                dataIndex: 'nome_servico',
                key: 'nome_servico',
                width: '7%',
            },
        ),
        Object.assign(
            {
                title: 'Status',
                dataIndex: 'agendamento_status',
                key: 'agendamento_status',
                width: '5%',
            },
            getColumnSearchProps('agendamento_status'),
        ),
        Object.assign(
            {
                title: 'Data e Hora',
                dataIndex: 'agendamento_datahora',
                key: 'agendamento_datahora',
                width: '5%',
            },
        ),
    ];

    return (
        <>
            <div className={styles.title}>
                <h3>Listagem de Agendamentos</h3>
            </div>
            <div className={styles.content}>
                <Table 
                    columns={columns} 
                    className={styles.table} 
                    dataSource={processedData} 
                    rowKey="agendamento_id"
                    loading={loading}/>
            </div>
        </>
    );
}