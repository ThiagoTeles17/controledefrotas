import React from "react";
import styles from './Header.module.css';
import brasao from '../../assets/imgs/brasao.png'
import { useState, useContext } from "react";
import { ScreenContext } from "../../context/ScreenContext";

import { AiFillCar } from 'react-icons/ai';
import { FiTool } from 'react-icons/fi';
import { BsPersonVcard } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FaRegCircleUser } from "react-icons/fa6";
const Header = ({screens, handleOnClick}) => {

    const {curScreen, setCurScreen} = useContext(ScreenContext);

    const [isUserOptionsOpened, setIsUserOptionsOpened] = useState(false);

    const handleOnClickScreen = (screen) => {
        setCurScreen(screen);
        handleOnClick(screen);
    };

    const headerIcons = {
        'Visão Geral' : <AiFillCar size={20}/>,
        'Gerenciar Veículos' : <FiTool size={25}/>,
        'Condutores' : <BsPersonVcard/>,
        'Relatórios' : <HiOutlineDocumentText size={20}/>
    };

    return(
        <div className={styles.headerContainer}>
            <div className={styles.titleContainer}>
               <img className={styles.logo} src={brasao} alt="" />
               <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h2>Controle de Frota</h2>
                    <h1>Secretaria Municipal de Assistência Social</h1>
               </div>
               
            </div>
            <div className={styles.screensContainer}>
                {
                    screens.map((screen, index) => {
                        
                        return(
                                <div 
                                className={curScreen == screen ? styles.screenBtnSelected : styles.screenBtn}
                                onClick={() => handleOnClickScreen(screen)}>
                                    {headerIcons[screen]}
                                    {screen}
                                </div>                        
                        );
                    })
                }
            </div>
            
            <div onClick={() => setIsUserOptionsOpened(!isUserOptionsOpened)} className={styles.userContainer}>
                <FaRegCircleUser color="white" size={20}/>
                <div>Thiago Everton Teles</div>
                <div>Admin</div>
            </div>
            {isUserOptionsOpened &&
            <div className={styles.userOptions}>
                <div>Alterar Senha</div>
                <div>Logout</div>
            </div>
            }
            

        </div>
    );


}

export default Header;