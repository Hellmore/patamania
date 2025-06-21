import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

// Estilização
import { Breadcrumb, Layout, theme, Alert, Flex, Spin, Divider, message } from 'antd';
import arrow_back from '../../img/arrow_back.svg';
import styles from './Profile.module.css';

import AlertDelecao from './AlertDelecao';

function Profile() {
    const { user, logout } = useAuth();
    const { Header, Content, Footer } = Layout;
    const items = Array.from({ length: 15 }).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
    }));

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { user: authUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEndereco, setUserEndereco] = useState(null);

    const handleDelete = async (userId) => {
        setLoading(true);
        try {
        await axios.delete(`http://localhost:3001/usuarios/deletar/${userId}`, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        message.success('Conta deletada com sucesso!');
        logout(); // Chama a função de logout após a exclusão
        } catch (error) {
            message.error('Erro ao deletar a conta: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/usuarios/buscar/${authUser.id}`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUserData(response.data);
            
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchEnderecoData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/enderecos/buscar-por-user/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.data === null) {
                    setUserEndereco(null);
                } else {
                    setUserEndereco(response.data);
                }
            }  catch (error) {
                console.error('Erro ao buscar dados do endereço:', error);
                setUserEndereco(null);
            } finally {
                setLoading(false);
            }
        };

        if (authUser?.id) {
            fetchUserData();
            fetchEnderecoData();
        }
    }, [authUser]);

    const displayPassword = () => {
        return '*'.repeat(8); // Sempre mostra 8 asteriscos
    };

    if (loading) {
        return (
        <Flex className={styles.loading_content} align='center' gap='middle'>
            <Spin size="large" />
        </Flex>
        )
    } 

    if (!userData) {
        return <div>Não foi possível carregar os dados do usuário.</div>;
    }

    return (
        <Layout className={styles.layout}>
            <Content className={styles.content} style={{ padding: '0 48px' }}>
                <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[{ title: 'Dashboard' }, { title: 'Perfil' }]}
                />
                <div
                style={{
                    background: colorBgContainer,
                    minHeight: 280,
                    padding: 24,
                    borderRadius: borderRadiusLG,
                }}
                >
                    <div className={styles.arrow_back}><Link to={userData.usuario_tipo === "ADMIN" ? ("/home_admin") : ("/")}><img src={arrow_back} alt="" /></Link></div>
                    <h2>Seus Dados</h2>
                    {userData ? (
                        <div className={styles.userData}>
                            <p><strong>Nome:</strong> {userData.usuario_nome || 'Não informado'}</p>
                            <p><strong>Email:</strong> {userData.usuario_email || 'Não informado'}</p>
                            <p><strong>Tipo:</strong> {userData.usuario_tipo || 'Cliente'}</p>
                            <p><strong>Data de nascimento:</strong>
                                {userData.usuario_dataNascimento ? new Date(userData.usuario_dataNascimento).toLocaleDateString() : 'Não informada'}
                            </p>
                            <p><strong>Senha:</strong> {displayPassword()}</p>
                            <p><strong>País:</strong> {userData.usuario_pais || 'Não informado'}</p>
                            <p><strong>Data de cadastro:</strong> 
                                {userData.usuario_dataInscricao ? new Date(userData.usuario_dataInscricao).toLocaleDateString() : 'Não informada'}
                            </p>
                            {userData.usuario_tipo === 'CLIENTE' ? (
                                userEndereco ? (
                                    <div>
                                        <p><strong>Endereço:</strong> {userEndereco?.endereco_logradouro || 'Não informado'}</p>
                                        <p><strong>Número:</strong> {userEndereco?.endereco_numero || 'Não informado'}</p>
                                        <p><strong>Complemento:</strong> {userEndereco?.endereco_complemento || 'Não informado'}</p>
                                        <p><strong>Bairro:</strong> {userEndereco?.endereco_bairro || 'Não informado'}</p>
                                        <p><strong>Cidade:</strong> {userEndereco?.endereco_cidade || 'Não informado'}</p>
                                        <p><strong>Estado:</strong> {userEndereco?.endereco_estado || 'Não informado'}</p>
                                        <p><strong>CEP:</strong> {userEndereco?.endereco_cep || 'Não informado'}</p>
                                    </div>
                                ) : (
                                    <Alert message="Você ainda não possui nenhum endereço cadastrado!" className={styles.alert} type="warning" />
                                )
                            ) : (
                                <></>
                            )}
                            <Link to={`/profile/${authUser.id}/edit`}><button className={styles.button}>Editar dados</button></Link>
                            <Divider style={{ borderColor: '#2D6B6A' }}>Deleção de conta</Divider>
                            <Link to={`/profile/${authUser.id}/delete`} className={styles.btn_delete}>
                                 <AlertDelecao onConfirm={() => handleDelete(user.id)}/>
                            </Link>
                        </div>

                    ) : (
                        <p>Carregando dados...</p>
                    )}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Patamania ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}

export default Profile;