import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Flex, Spin } from 'antd';
import { Link } from 'react-router-dom';

import styles from './EditEndereco.module.css';
import arrow_back from '../../img/arrow_back.svg';

export default function EditEndereco() {
    const navigate = useNavigate();
    const [originalEnderecoData, setOriginalEnderecoData] = useState(null);  
    const [enderecoData, setEnderecoData] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCadastrar, setIsCadastrar] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchEndereco = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/enderecos/buscar-por-user/${user.id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setOriginalEnderecoData(response.data);
        setEnderecoData(response.data);
        setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    } finally {
      setLoading(false);
    }
};
fetchEndereco();
}, [user.id]);

if (loading) {
    return (
      <Flex className={styles.content} align='center' gap='middle'>
          <Spin size="large" />
      </Flex>
    )
} 

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
      const updateData = {};
      
      // Verifica e adiciona apenas campos alterados
      if (data.usuario_id !== enderecoData.usuario_id) updateData.usuario_id = user.id;
      if (data.logradouro !== enderecoData.endereco_logradouro) updateData.endereco_logradouro = data.logradouro;
      if (data.numero !== enderecoData.endereco_numero) updateData.endereco_numero = data.numero;
      if (data.complemento !== enderecoData.endereco_complemento) updateData.endereco_complemento = data.complemento;
      if (data.bairro !== enderecoData.endereco_bairro) updateData.endereco_bairro = data.bairro;
      if (data.cidade !== enderecoData.endereco_cidade) updateData.endereco_cidade = data.cidade;
      if (data.estado !== enderecoData.endereco_estado) updateData.endereco_estado = data.estado;
      if (data.cep !== enderecoData.endereco_cep) updateData.endereco_cep = data.cep;

      console.log("Dados enviados para atualização:", updateData); 

      if (Object.keys(updateData).length === 0) {
          alert('Nenhuma alteração foi feita');
          setIsSubmitting(false);
          return;
      }
      
      const response = await axios.put(
          `http://localhost:3001/enderecos/${user.id}`,
          updateData,
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json'
              }
          }
      );
      
      if (response.data.success) {
          setEnderecoData(prev => ({
              ...prev,
              ...updateData
          }));
          alert('Endereço atualizado com sucesso!');
          navigate(`/profile/${user.id}/edit`);
      } else {
          throw new Error(response.data.message || 'Erro ao atualizar');
      }   
  } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      alert(error.response?.data?.message || 'Erro ao atualizar endereço');
  } finally {
      setIsSubmitting(false);
  }
};

  return (
    <Container fluid className={styles.background}>
      <div className={styles.content}>
        <div className={styles.arrow_back}>
          <Link to="/profile"><img src={arrow_back} alt="" /></Link>
        </div>
        <h1 className={styles.title}>Formulário de endereço</h1>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Campos do formulário (mantidos como no seu código original) */}
          <Form.Group>
            <Form.Label className={styles.label_dados} htmlFor="logradouro">
              Logradouro {!enderecoData && <span style={{ color: 'red' }}>*</span>}
            </Form.Label>
            <Form.Control
              className={styles.dados_info}
              autoComplete="off"
              defaultValue={enderecoData?.endereco_logradouro || ''}
              {...register("logradouro", {
                required: !enderecoData ? "Campo obrigatório" : false,
                validate: (value) => value.trim() !== "" || "O campo não pode conter apenas espaços."
              })}
            />
            {errors.logradouro && <p className={styles.erro}>{errors.logradouro.message}</p>}
          </Form.Group>

            <Form.Group>
                <Form.Label className={styles.label_dados} htmlFor="numero">
                Número
                </Form.Label>
                <Form.Control
                    className={styles.dados_info}
                    type="number"
                    defaultValue={enderecoData?.endereco_numero || ''}
                    autoComplete='off'
                    min={0}
                    {...register("numero", {
                        required: !enderecoData ? "Campo obrigatório" : false})}
                />
                {errors.numero && <p className={styles.erro}>{errors.numero.message}</p>}
            </Form.Group>

            <Form.Group>
                <Form.Label className={styles.label_dados} htmlFor="complemento">
                Complemento
                </Form.Label>
                <Form.Control
                    className={styles.dados_info}
                    autoComplete="off"
                    defaultValue={enderecoData?.endereco_complemento || ''}
                    {...register("complemento", {
                        required: !enderecoData ? "Campo obrigatório" : false})}
                />
                {errors.complemento && <p className={styles.erro}>{errors.complemento.message}</p>}
            </Form.Group>

            <Form.Group>
                <Form.Label className={styles.label_dados} htmlFor="bairro">
                Bairro
                </Form.Label>
                <Form.Control
                className={styles.dados_info}
                autoComplete="off"
                defaultValue={enderecoData?.endereco_bairro || ''}
                {...register("bairro", {
                        required: !enderecoData ? "Campo obrigatório" : false})}
                />
                {errors.bairro && <p className={styles.erro}>{errors.bairro.message}</p>}
            </Form.Group>

            <Form.Group>
                <Form.Label className={styles.label_dados} htmlFor="cidade">
                Cidade
                </Form.Label>
                <Form.Control
                className={styles.dados_info}
                autoComplete="off"
                defaultValue={enderecoData?.endereco_cidade || ''}
                {...register("cidade", {
                        required: !enderecoData ? "Campo obrigatório" : false})}
                />
                {errors.cidade && <p className={styles.erro}>{errors.cidade.message}</p>}
            </Form.Group>       
                
            <Form.Group>
                <Form.Label className={styles.label_dados} htmlFor="estado">
                Estado
                </Form.Label>
                <Form.Control
                className={styles.dados_info}
                autoComplete="off"
                defaultValue={enderecoData?.endereco_estado || ''}
                {...register("estado", {
                        required: !enderecoData ? "Campo obrigatório" : false})}
                />
                {errors.estado && <p className={styles.erro}>{errors.estado.message}</p>}
            </Form.Group>   

            <Form.Group>
                <Form.Label className={styles.label_dados} htmlFor="cep">
                CEP
                </Form.Label>
                <Form.Control
                className={styles.dados_info}
                autoComplete="off"
                defaultValue={enderecoData?.endereco_cep|| ''}
                {...register("cep", {
                        required: !enderecoData ? "Campo obrigatório" : false})}
                />
                {errors.cep && <p className={styles.erro}>{errors.cep.message}</p>}
            </Form.Group>  
                
          <div className={styles}>
            <input 
              className={styles.submit_button} 
              type="submit" 
              value={
                isSubmitting ? "Salvando..." : 
                isCadastrar ? "Cadastrando..." : 
                enderecoData ? "Salvar" : "Cadastrar"
              } 
              disabled={isSubmitting || isCadastrar}
            />
          </div>
        </Form>
      </div>
    </Container>
  );
}