import page_not_found from '../img/404_not_found.png';

import styles from './PageNotFound.module.css';

function PageNotFound() {
    return(
        <>
            <div className={styles.main}>
                <h1>404</h1>
                <p>Página não encontrada</p>
                <img src={page_not_found}/>
                <a className={styles.button_back} href="/">Voltar para Home</a>
            </div>
        </>
    )
}

export default PageNotFound;