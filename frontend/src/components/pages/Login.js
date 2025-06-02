import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import logo_instagram from '../img/instagram.png'
import logo_facebook from '../img/facebook.png'
import logo_google from '../img/google.png'
import logo_x from '../img/x.png'
import logo_patamania from '../img/Logo Patamania + nome.png'
import arrow_back from '../img/arrow_back.png';

import styles from './Login.module.css'

function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  
  console.log(watch("formulário de login")); // watch input value by passing the name of it
  return (
    <>
      <container className={styles.container}>
        <div className={styles.form_login}>
          <div className={styles.arrow_back}><Link to="/"><img src={arrow_back} alt="" /></Link></div>
          <div className={styles.part_login}>
            <h1 className={styles.title_login}>Login</h1>
            <div className={styles.social_list}>
              <div className={styles.image}><img src={logo_google} alt="Google" /></div>
              <div className={styles.image}><img src={logo_x} alt="X" /></div>
              <div className={styles.image}><img src={logo_facebook} alt="Facebook" /></div>
              <div className={styles.image}><img src={logo_instagram} alt="Instagram" /></div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label className={styles.email_senha} for="email"><span>E-mail</span></label>
            <input
              className={styles.dados_info}
              type="email"
              placeholder="e-mail"
              autoComplete="off"
              {...register("email", {required: true})}
              required
              rulles={{maxLength: 100}}
            />

            <label className={styles.email_senha} for="password"><span>Senha</span></label>
            <input 
              className={styles.dados_info} 
              type="password"
              placeholder="senha"
              autoComplete="off"
              {...register("password", {required: true})}  
              required
            />
            
            <div className={styles.remember}>
              <input type="checkbox" id="remember" name="remember"/>
              <label for="remember">Lembrar-me</label>
             <Link className={styles.link} to="/esqueceu-senha">Esqueceu a senha?</Link>
            </div>
            <input className={styles.submit_button} type="submit" />
          </form>
        </div>
        <div className={styles.right}>
          <h3>Seja Bem-vindo(a) de volta à</h3>
          <img className={styles.patamania} src={logo_patamania} alt="Logo Patamania" />
          <p>Não possui conta?</p>
          <Link to="/cadastrar"><button>Cadastrar</button></Link> 
        </div>
      </container>
    </>
  )
}

export default Login;
