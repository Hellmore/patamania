import styles from './styles.module.css';

import Button from 'react-bootstrap/Button';

export default function ConfirmationScreen() {
    return (
      <div className={styles.selectionContainer}>
        <h2>Cadastro realizado com sucesso!</h2>
        <p>Seu serviço foi cadastrado no sistema.</p>
        <Button
         variant="primary" 
         onClick={() => window.location.reload()}>Cadastrar novo serviço</Button>
      </div>
    );
  };