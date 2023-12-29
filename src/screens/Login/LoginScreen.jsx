import styles from './LoginScreen.module.css';
import { useState } from 'react';
import brasao from '../../assets/imgs/brasao.png'

export const LoginScreen = () => {

    const {email, setEmail} = useState();

    return(
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.titleContainer}>
                    <img className={styles.logo} src={brasao} alt="" />
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h2 className={styles.title}>Controle de Frota</h2>
                    <h1 className={styles.subtitle}>Secretaria Municipal de Assistência Social</h1>
                </div>
               
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputContainer}>
                        <span>Email:</span>
                        <input type="text" />
                    </div>
                    <div className={styles.inputContainer}>
                        <span>Senha:</span>
                        <input type="password" />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                
            </div>
        </div>
    );

    
}