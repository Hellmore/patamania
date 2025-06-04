import styles from './HomeAdmin.module.css';
import { Link } from 'react-router-dom';
import { Collapse } from "antd";

export default function HomeAdmin() {
    
    return (
        <section className={styles.home_container}>
          <Collapse>
            <div className={styles.optionCard}>
                <Link to="/cadastrar_produto"><button>Gerenciar produtos</button></Link> 
            </div>
            <div>
                <Link to="/cadastrar_servico"><button>Gerenciar serviços</button></Link> 
            </div>
            <div>
                <Link to="/cadastrar"><button>Gerenciar usuários</button></Link> 
            </div>
          </Collapse>
        </section>
    )
}
