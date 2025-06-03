import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import styles from './EsqueceuSenha.module.css'; // Certifique-se de ter este arquivo CSS
import arrow_back from '../img/arrow_back.png';
import logo_patamania from '../img/Logo Patamania + nome.png';

function EsqueceuSenha() {
  return (
    <container className={styles.container}>
        <div className={styles.left}>
            <div className={styles.arrow_back}><Link to="/login"><img src={arrow_back} alt="" /></Link></div>
            <div className={styles.form}>
                <h1 className={styles.title}>Redefinição de senha</h1>
                <p className={styles.info}>Informe um email e eviaremos um link para recuperação da sua senha.</p>
                <Form className="w-full max-w-sm">
                    <Form.Control
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                    />
                    <button
                    type="submit"
                    className={styles.submit_button}
                    >
                    Enviar instruções
                    </button>
                </Form>
            </div>
        </div>
            <div className={styles.right}>
            <h3>Bem-vindo(a) à Patamania</h3>
            <img className={styles.patamania} src={logo_patamania} alt="Logo Patamania" />
            </div>
    </container>
  );
}
export default EsqueceuSenha;