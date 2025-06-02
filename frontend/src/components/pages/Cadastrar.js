import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import axios, { AxiosHeaders, HttpStatusCode } from 'axios';
import { useNavigate } from "react-router-dom";

import logo_google from '../img/google.png'
import logo_patamania from '../img/Logo Patamania + nome.png'
import arrow_back from '../img/arrow_back.png';

import styles from './Cadastrar.module.css'

function Cadastrar() {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, getValues, setError } = useForm();
  const [submitError, setSubmitError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcula a data máxima para nascimento para ter 18 anos ou mais
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = eighteenYearsAgo.toISOString().split('T')[0]; // formato yyyy-mm-dd
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3001/usuarios/cadastro', 
      {
        usuario_nome: data.name,
        usuario_email: data.email,
        usuario_dataNascimento: data.birthDate,
        usuario_senha: data.password
      }, {
      headers: {
        'Content-Type': 'application/json' //Para enviar no backends
      }
    }
    );

    
    if (response.status === HttpStatusCode.Created) {
      alert("usuário cadastrado com sucesso");
      navigate('/');
    } else {
      throw new Error(response.data?.message || 'Resposta inválida');
    }

    } catch (error) {
        console.log("Erro completo:", error); // Inspecione o erro no console
        
        if (error.response) {
          // Erro com resposta do servidor (4xx/5xx)
          if (error.response.status === 409) {
            setError('email', {
              type: 'manual',
              message: 'E-mail já cadastrado'
            });
          } else {
            setSubmitError(error.response.data?.message || 'Erro no servidor');
          }
        } else if (error.request) {
          // A requisição foi feita mas não houve resposta
          setSubmitError('Sem resposta do servidor');
        } else {
          // Erro ao configurar a requisição
          setSubmitError('Erro ao enviar dados');
        }
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

  const validatePassword = (value) => {
    const { password } = getValues(); //obtém valor do campo da senha
    return password === value || "As senhas não coincidem";
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_cadastro}>
          <div className={styles.arrow_back}>
            <Link to="/"><img src={arrow_back} alt="Voltar" /></Link>
          </div>

          <div className={styles.part_login}>
            <h1 className={styles.title_login}>Cadastrar</h1>
            <div className={styles.social_list}>
              <div className={styles.image}><img src={logo_google} alt="Google" /></div>
            </div>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='formCadastroNome'>
              <Form.Label className={styles.label_dados}>Nome<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                className={styles.dados_info}
                placeholder="nome"
                autoComplete="off"
                {...register("name", {
                  required: "Campo obrigatório",
                  validate: (value) =>
                    value.trim() !== "" || "O campo nome não pode conter apenas espaços.",
                })}
              />
              {errors.name && <p className={styles.erro}>{errors.name.message}</p>}
            </Form.Group>

            <Form.Group controlId='formCadastroEmail'>
              <Form.Label className={styles.label_dados}>E-mail<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                onChange={() => setErrorMessage('')}
                className={styles.dados_info}
                type="email"
                placeholder="e-mail"
                autoComplete="off"
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

            <Form.Group controlId='formCadastroNascimento'>
              <Form.Label className={styles.birth}>Data de nascimento<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control 
                className={styles.dados_info} 
                type="date"
                id='birth'
                max={maxDate}
                autoComplete="off"
                {...register("birthDate", { required: "Campo obrigatório", validate: validateAge })}
                />
                {errors.birthDate && <p className={styles.erro}>{errors.birthDate.message}</p>}
              </Form.Group>

            <Form.Group controlId='formCadastroSenha'>
              <Form.Label className={styles.label_dados}>Senha<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                className={styles.dados_info}
                type="password"
                placeholder="senha"
                autoComplete="off"
                {...register("password", { required: 'Campo obrigatório' })}
              />
              {errors.password && <p className={styles.erro}>{errors.password.message}</p>}
            </Form.Group>

            <Form.Group controlId='formCadastrarConfirmSenha'>   
              <Form.Label className={styles.label_dados}>Confirmar senha<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                className={styles.dados_info}
                type="password"
                placeholder="confirmação de senha"
                autoComplete="off"
                {...register("confirmPassword", { 
                  required: 'Campo obrigatório',
                  minLength: {value: 8, message: "Mínimo 8 caracteres"},
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                    message: "A senha deve conter letras e números" 
                  },
                  validate: validatePassword
                })}
              />
              {errors.confirmPassword && <p className={styles.erro}>{errors.confirmPassword.message}</p>}
            </Form.Group>

            <Form.Group className={`mb-3 ${styles.remember}`} controlId="formCadastroRemember">
              <Form.Check type="checkbox" label="Lembrar-me" />
            </Form.Group>

            <div className={styles.button}>
              <input 
                className={styles.submit_button} 
                type="submit" 
                value={isSubmitting ? "Cadastrando..." : "Cadastrar"} 
                disabled={isSubmitting}
              />
            </div>
          </Form>
        </div>

        <div className={styles.right}>
          <h3>Seja Bem-vindo(a) de volta à</h3>
          <img className={styles.patamania} src={logo_patamania} alt="Logo Patamania" />
          <p>Já possui conta?</p>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>
    </>
  )
}

export default Cadastrar;
