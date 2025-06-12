import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import arrow_back from '../../img/arrow_back.svg';
import styles from './Profile.module.css';

function Profile() {
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

        if (authUser?.id) {
            fetchUserData();
        }
    }, [authUser]);

    const displayPassword = () => {
        return '*'.repeat(8); // Sempre mostra 8 asteriscos
    };

    if (loading) {
        return <div>Carregando dados do usuário...</div>;
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
                    <div className={styles.arrow_back}>
                        <Link to="/home_admin"><img src={arrow_back} alt="Voltar" /></Link>
                    </div>
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
                            <Link to="/profile_admin/edit"><button className={styles.button}>Editar dados</button></Link>
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