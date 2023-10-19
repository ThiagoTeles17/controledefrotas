import React from "react";
import styles from './Header.module.css';
import brasao from '../../assets/imgs/brasao.png'
import { useState, useContext } from "react";
import { ScreenContext } from "../../context/ScreenContext";

const Header = ({screens, handleOnClick}) => {

    const {curScreen, setCurScreen} = useContext(ScreenContext);

    const handleOnClickScreen = (screen) => {
        setCurScreen(screen);
        handleOnClick(screen);
    };

    return(
        <div className={styles.headerContainer}>
            <div className={styles.titleContainer}>
               <img className={styles.logo} src={brasao} alt="" />
               <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h2>Relatório de veículos</h2>
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
                                {screen}
                            </div>                          
                        );
                    })
                }
            </div>
            
            
        </div>
    );


}

export default Header;