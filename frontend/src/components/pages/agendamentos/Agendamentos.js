import { useAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import styles from './Agendamentos.module.css';
import axios from 'axios';
import { Flex, Spin, Alert } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Card, message  } from 'antd';
import { Link } from 'react-router-dom';

import AlertCancel from './AlertCancel';

export default function Agendamentos() {
    const { Meta } = Card;
    const [agendamentos, setAgendamentos] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleCancel = async (agendamentoID) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:3001/agendamentos/cancelar/${agendamentoID}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            message.success('Agendamento cancelado com sucesso!');
            setAgendamentos(prev => prev.filter(agendamento => agendamento.agendamento_id !== agendamentoID));
        } catch (error) {
            message.error('Erro ao cancelar agendamento: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

     useEffect(() => {
        const fetchAgendamentos = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/agendamentos/buscar-por-user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                setAgendamentos(response.data.data || [] );
            }
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
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

    return (
        <div className={styles.container}>
            {agendamentos.length === 0 ? (
                <p>Nenhum agendamento encontrado.</p>
            ) : (
                agendamentos.map((agendamento) => {
                    const actions = [
                        <AlertCancel 
                            key="cancel"
                            onConfirm={() => handleCancel(agendamento.agendamento_id)}
                        />,
                    ];
                    
                    return agendamento.agendamento_status !== 'CANCELADO' ? (
                            <div key={agendamento.agendamento_id} className={styles.agendamentoItem}>
                                <Card
                                    style={{ width: 1000, justifyContent: 'center', marginBottom: '20px' }}
                                    loading={loading} 
                                    actions={actions}
                                >
                                    <Meta
                                        avatar={<Avatar 
                                            style={{ backgroundColor: user.cor || '#f56a00' }} 
                                            size={40}
                                        >
                                            {user.nome.charAt(0).toUpperCase()}
                                        </Avatar>}
                                        title={agendamento.nome_servico || 'Não especificado'}
                                    />
                                    <div className={styles.conteudo}>
                                        <p><strong>Nome do Pet:</strong> {agendamento.nome_pet || 'Não especificado'}</p>
                                        <p><strong>Data e hora:</strong> {
                                            agendamento.agendamento_datahora 
                                            ? new Date(agendamento.agendamento_datahora).toLocaleString() 
                                            : 'Não especificada'
                                        }</p>
                                        {agendamento.agendamento_status === 'CONFIRMADO' ? (
                                            <Alert message={agendamento.agendamento_status} type="success" />
                                        ) : agendamento.agendamento_status === 'PENDENTE' ? (
                                            <Alert message={agendamento.agendamento_status} type="warning" />
                                        ) : 'Não especificado'}
                                    </div>
                                </Card>
                                <hr />
                            </div>
                    ) : null; // Retorna null se o status for 'CANCELADO'
                })
            )}
        </div>
    );
}