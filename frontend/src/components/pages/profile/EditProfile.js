import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Flex, Spin } from 'antd';
import { Link } from 'react-router-dom';

import styles from './EditProfile.module.css';
import arrow_back from '../../img/arrow_back.svg';

function EditProfile() {
  const navigate = useNavigate();
  const [originalUserData, setOriginalUserData] = useState(null);  
  const [userData, setUserData] = useState(null);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const [userEndereco, setUserEndereco] = useState(null);
  const { user } = useAuth();

  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

    useEffect(() => {
      const fetchEndereco = async () => {
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
        } catch (error) {
          console.error('Não foi possível procurar o endereço do usuário!');
          setUserEndereco(null);
        } finally {
          setLoading(false);
        }
      };
    const fetchUser = async () => {
      try {
      const response = await axios.get(`http://localhost:3001/usuarios/buscar/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOriginalUserData(response.data);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
    };
    fetchUser();
    if(user?.id) {
      fetchEndereco();
    }
  }, [user.id]);
  
  if (loading) {
    return (
      <Flex className={styles.content} align='center' gap='middle'>
          <Spin size="large" />
      </Flex>
      )
    } 

  const displayPassword = () => {
    return '*'.repeat(8); // Sempre mostra 8 asteriscos
  };

  const maxDate = eighteenYearsAgo.toISOString().split('T')[0]; // formato yyyy-mm-dd

const onSubmit = async (data) => {
  setIsSubmitting(true);
  
  try {
    const updateData = {};
    
    // Verifica e adiciona apenas campos alterados
    if (data.name !== userData.usuario_nome) updateData.usuario_nome = data.name;
    if (data.email !== userData.usuario_email) updateData.usuario_email = data.email;
    if (data.pais !== userData.usuario_pais) updateData.usuario_pais = data.pais;
    
    // Tratamento especial para data
    const formattedDate = data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : null;
    if (formattedDate !== (userData.usuario_dataNascimento?.split('T')[0] || null)) {
      updateData.usuario_dataNascimento = formattedDate;
    }
    
    // Tratamento especial para senha
    if (data.password && data.password !== '********') {
      updateData.usuario_senha = data.password;
    }
    
    // Se não há nada para atualizar
    if (Object.keys(updateData).length === 0) {
      alert('Nenhuma alteração foi feita');
      setIsSubmitting(false);
      return;
    }
    
    const response = await axios.put(
      `http://localhost:3001/usuarios/${user.id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.success) {
      // Atualiza os dados locais com a resposta do servidor
      setUserData(prev => ({
        ...prev,
        ...updateData
      }));
      alert(response.data.message);
      navigate('/profile')
    } else {
      throw new Error(response.data.message || 'Erro ao atualizar');
    }
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    alert(error.response?.data?.message || error.message || 'Erro ao atualizar dados');
  } finally {
    setIsSubmitting(false);
  }
};
  // Valida se a data de nascimento tem idade maior ou igual a 18
  const validateAge = (value) => {
    if (!value) return false; // required já trata, mas double check
    const birthDate = new Date(value);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 || "Você deve ser maior de 18 anos";
  };

  return (
    <Container fluid className={styles.background}>
    <div className={styles.content}>
      <div className={styles.arrow_back}><Link to={userData.usuario_tipo === "ADMIN" ? ("/home_admin") : ("/")}><img src={arrow_back} alt="" /></Link></div>
      <h1 className={styles.title}>Editar perfil</h1>
      { userData ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label className={styles.label_dados} htmlFor="nome">
              Nome
            </Form.Label>
            <Form.Control
              className={styles.dados_info}
              autoComplete="off"
              defaultValue={userData.usuario_nome || ''}
              {...register("name", {
                required: "Campo obrigatório",
                validate: (value) =>
                  value.trim() !== "" || "O campo não pode conter apenas espaços.",
              })}
              />
              {errors.name && <p className={styles.erro}>{errors.name.message}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.label_dados} htmlFor="email">
              Email
            </Form.Label>
            <Form.Control
              onChange={() => setErrorMessage('')}
              className={styles.dados_info}
              type="email"
              defaultValue={userData.usuario_email || ''}
              autoComplete='off'
              {...register("email", {
                required: "Campo obrigatório",
                maxLenght: {
                  value: 100,
                  message: "Máximo 100 caracteres"
                }
              })}
            />
            {errors.email && <p className={styles.erro}>{errors.email.message}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.label_dados}>Tipo</Form.Label>
            <Form.Select 
              className={styles.dados_info} 
              defaultValue={userData.usuario_tipo || ''}
              {...register('usuario_tipo', { required: 'Campo obrigatório' })} 
            >
              <option value="ADMIN">ADMIN</option>
              <option value="CLIENTE">CLIENTE</option>
            </Form.Select>
            {errors.usuario_tipo && <p className={styles.erro}>{errors.usuario_tipo.message}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.label_dados}>Data de nascimento</Form.Label>
            <Form.Control 
              className={styles.dados_info} 
              type="date"
              defaultValue={userData.usuario_dataNascimento ? new Date(userData.usuario_dataNascimento).toISOString().split('T')[0] : ''}
              max={maxDate}
              autoComplete="off"
              {...register("birthDate", { required: "Campo obrigatório", validate: validateAge })}
            />
            {errors.birthDate && <p className={styles.erro}>{errors.birthDate.message}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.label_dados}>Senha</Form.Label>
            <Form.Control
              className={styles.dados_info}
              type="password"
              placeholder={displayPassword()}
              autoComplete="off"
              {...register("password")}
            />
            {errors.password && <p className={styles.erro}>{errors.password.message}</p>}
          </Form.Group>        
              
          <Form.Group>
            <Form.Label className={styles.label_dados} htmlFor="pais">
              País
            </Form.Label>
            <Form.Control
              defaultValue={userData.usuario_pais || ''}
              className={styles.dados_info}
              autoComplete="off"
              {...register("pais", {
                required: "Campo obrigatório",
                validate: (value) =>
                  value.trim() !== "" || "O campo não pode conter apenas espaços.",
              })}
              />
              {errors.pais && <p className={styles.erro}>{errors.pais.message}</p>}
          </Form.Group>
            
          { userData.usuario_tipo === 'CLIENTE' ? (
            userEndereco ? (
              <div>
                  <Link to={`/profile/${user.id}/address`} className={styles.button} style={{textDecoration:"none", color:"#00008B", fontWeight:500}}>Alterar Endereço</Link>
              </div>
          ) : (
              <div>
                  <Link to={`/cadastrar_endereco`} className={styles.button} style={{textDecoration:"none", color:"#00008B", fontWeight:500}}>Cadastrar Endereço</Link>
              </div>
          )
         ) : (
            <></>
          )
          }
          <div className={styles}>
            <input 
              className={styles.submit_button} 
              type="submit" 
              value={isSubmitting ? "Salvando..." : "Salvar"} 
              disabled={isSubmitting}
            />
          </div>
        </Form>
      ) : (
        <div className={styles.content} loading={loading}></div>
      )}
    </div>
    </Container>
  );
}

export default EditProfile;