import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import { Button, Divider, notification, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';  
import styles from './EditUser.module.css';
import { Link } from 'react-router-dom';

export default function EditUSer() {
    const navigate = useNavigate();
    const { user: authUser } = useAuth();
    const [originalUserData, setOriginalUserData] = useState(null);  
    const [userData, setUserData] = useState(null);
    const { register, formState: { errors }, handleSubmit, getValues, setError, watch } = useForm();
    const [submitError, setSubmitError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    
    const tipo = watch('tipo');
    
    const { usuario_id } = useParams();

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/usuarios/buscar/${usuario_id}`, {
          headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOriginalUserData(response.data);
      setUserData(response.data);
            
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [usuario_id]);

if (loading) {
    return (
        <Flex className={styles.content} align='center' justify='center' gap='middle'>
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
    if (data.cargo !== userData.usuario_cargo) updateData.usuario_cargo = data.cargo;
    if (data.tipo !== userData.usuario_tipo) updateData.usuario_tipo = data.tipo;
    
    if (userData.usuario_tipo !== data.tipo && data.tipo === "CLIENTE") {
        data.cargo = null;    
    }

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
      `http://localhost:3001/usuarios/atualizar/${usuario_id}`,
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
      navigate('/listar_usuarios')
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
      <h1 className={styles.title}>Editar Usuário</h1>
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
                maxLength: {
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
              aria-label="tipo" 
              {...register('tipo', { required: 'Campo obrigatório' })} 
              className={styles.dados_info} 
              defaultValue={userData.usuario_tipo === "ADMIN" ? "ADMIN" : "CLIENTE"}
            >
                <option value="ADMIN">Administrador</option>
                <option value="CLIENTE">Cliente</option>
            </Form.Select>
            {errors.tipo && <span className={styles.error}>{errors.tipo.message}</span>}
          </Form.Group>

          {tipo === "ADMIN" && (
            <Form.Group>
                <Form.Label className={styles.label_dados} htmlFor="cargo">
                Cargo
                </Form.Label>
                <Form.Control
                className={styles.dados_info}
                defaultValue={userData.usuario_cargo || ''}
                {...register("cargo")}
                />
                {errors.cargo && <p className={styles.erro}>{errors.cargo.message}</p>}
            </Form.Group>
          )}

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

          <div className={styles.button}>
            <div className={styles.cancel_button}>
                <Link className={styles.cancel} to="/listar_usuarios" alt="Cancelar alteração">
                Cancelar
                </Link>
            </div>
            <input 
              className={styles.submit_button} 
              type="submit" 
              value={isSubmitting ? "Salvando..." : "Salvar"} 
              disabled={isSubmitting}
            />
          </div>
        </Form>
      ) : (
        <p>Carregando os dados...</p>
      )}
    </div>
    </Container>
  );
}