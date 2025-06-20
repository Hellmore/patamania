import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../context/AuthContext';
import axios, { HttpStatusCode } from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Flex, Spin } from 'antd';
import { Link } from 'react-router-dom';

import styles from './EditEndereco.module.css';
import arrow_back from '../../img/arrow_back.svg';

export default function CadastrarEndereco() {
   const navigate = useNavigate();
    const [enderecoData, setEnderecoData] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
        try {
            const response = await axios.post(`http://localhost:3001/enderecos/cadastro`, 
            {
                endereco_logradouro: data.logradouro,
                endereco_numero: data.numero, 
                endereco_complemento: data.complemento, 
                endereco_bairro: data.bairro,
                endereco_cidade: data.cidade,
                endereco_estado: data.estado,
                endereco_cep: data.cep,
                usuario_id: user.id
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === HttpStatusCode.Created) {
            alert("Endereço cadastrado com sucesso");
            navigate('/profile');
        } else {
            throw new Error(response.data?.message || 'Resposta inválida');
        }
    } catch (error) {
      console.error('Erro ao cadastrar endereço:', error);
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
              placeholder='Ex: Rua das Flores, 123'
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
                    placeholder='Ex: 123'
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
                    placeholder='Ex: Apto 101, Bloco B'
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
                placeholder='Ex: Vila Industrial'
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
                placeholder='Ex: São Paulo'
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
                placeholder='Ex: SP'
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
                placeholder='Ex: 12345-678'
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
                isSubmitting ? "Salvando..." : "Salvar"
              } 
            />
          </div>
        </Form>
      </div>
    </Container>
    )
}