import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import { useNavigate } from  "react-router-dom";
import axios from 'axios';

import { useAuth, login } from '../../context/AuthContext';

import logo_google from '../img/google.png'
import logo_patamania from '../img/Logo Patamania + nome.png'
import arrow_back from '../img/arrow_back.svg';

import styles from './Login.module.css'

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { login } = useAuth(); // Hook de autenticação
  
  const onSubmit = async (data) => {
  setIsSubmitting(true);
  setSubmitError(''); // Limpa erros anteriores
  
  try {
    const response = await axios.post('http://localhost:3001/login', 
      {
      usuario_email: data.email,
      usuario_senha: data.password
    }, {
      headers: {
      'Content-Type': 'application/json' 
      }
    }
  );
 
  if (response.status === 200) {
    const { usuario, token } = response.data;

    if (usuario) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));

      await login({
        usuario_email: data.email,
        usuario_senha: data.password
      });

        const tipoUsuario = usuario.tipo?.toUpperCase() || '';

        if (tipoUsuario === 'ADMIN') {
          navigate('/home_admin');
        } else {
          navigate('/');
        }
      } else {
        setSubmitError('Dados do usuários não retornados');
      }
    } else {
      throw new Error(response.data?.message || 'Resposta inválida');
    }
      } catch (error) {
        console.log("Erro completo:", error); 
        
        if (error.response) { 
          // Erro com resposta do servidor (4xx/5xx)
          if (error.response.status === 404) {
            setError('email', {
              type: 'manual',
              message: 'E-mail não encontrado'
            });
          } else if (error.response.status === 401) {
            setError('password', {
              type: 'manual',
              message: 'Senha inválida'
            });
          } else {
            setSubmitError(error.response.data?.message || 'Erro no servidor');
          }
        } else if (error.request) {
          // A requisição foi feita mas não houve resposta
          setSubmitError('Sem resposta do servidor');
        } else {
          // Erro ao configurar a requisição
          setSubmitError('Erro ao acessar o servidor');
        }
      }
      finally {
        setIsSubmitting(false); // Reseta o estado de submissão
      }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_login}>
          <div className={styles.arrow_back}><Link to="/"><img src={arrow_back} alt="" /></Link></div>
          <div className={styles.part_login}>
            <h1 className={styles.title_login}>Login</h1>
            <div className={styles.social_list}>
              <div className={styles.image}><img src={logo_google} alt="Google" /></div>
            </div>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='formLoginEmail'>
              <Form.Label className={styles.email_senha}>E-mail<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
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

            <Form.Group controlId='formLoginPassword'>
              <Form.Label className={styles.email_senha}>Senha<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control 
                className={styles.dados_info} 
                type="password"
                placeholder="senha"
                autoComplete="off"
                {...register("password", {required: "Campo obrigatório"})}  
              />
              {errors.password && <p className={styles.erro}>{errors.password.message}</p>}
            </Form.Group>

            <div className={styles.login_section}>
              <div className={styles.remember}>
                <input 
                  type="checkbox" 
                  id="remember" 
                  name="remember"/>
                <label>Lembrar-me</label>
                <Link className={styles.link} to="/esqueci_senha">Esqueceu a senha?</Link>
              </div>
              <div className={styles.button}>
                <input 
                  className={styles.submit_button} 
                  type="submit" 
                  value={isSubmitting ? "Logando..." : "Logar"} 
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </Form>
        </div>
        <div className={styles.right}>
          <div className={styles.mobile_screen_p1}>
            <h3>Seja Bem-vindo(a) de volta à</h3>
            <img className={styles.patamania} src={logo_patamania} alt="Logo Patamania" />
          </div>
          <div className={styles.mobile_screen_p2}>
            <p>Não possui conta?</p>
            <Link to="/cadastrar"><button>Cadastrar</button></Link> 
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;