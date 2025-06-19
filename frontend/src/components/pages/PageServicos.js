import { Link } from 'react-router-dom';
import styles from './PageServicos.module.css';

import banhoIcon from '../img/banho.png';
import consultaIcon from '../img/consulta_vet.png';
import passeioIcon from '../img/passeio.png';
import hospedagemIcon from '../img/hospedagem.png';

function PageServicos() {
  const servicos = [
    {
      nome: 'Banho&Tosa',
      icone: banhoIcon,
      link: '/agendamentos/banho-e-tosa'
    },
    {
      nome: 'Consulta',
      icone: consultaIcon,
      link: '/agendamentos/consulta-veterinaria'
    },
    {
      nome: 'Passeio',
      icone: passeioIcon,
      link: '/agendamentos/passeio'
    },
    {
      nome: 'Hospedagem',
      icone: hospedagemIcon,
      link: '/agendamentos/hospedagem'
    },
  ];

  return (
    <section className={styles.servicos_container}>
      <h1 className={styles.titulo}>Nossos Serviços</h1>
      <div className={styles.servicos_grid}>
        {servicos.map((servico, index) => (
          <div key={index} className={styles.servico_card}>
            <img 
              src={servico.icone} 
              alt={servico.nome} 
              className={styles.icone}
            />
            <h2>{servico.nome}</h2>
            <Link to={servico.link}>
              <button className={styles.botao_agendar}>Agendar</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PageServicos;