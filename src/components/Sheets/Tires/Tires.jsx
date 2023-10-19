import styles from './Tires.module.css';
import { useState } from 'react';

import {GiFlatTire} from 'react-icons/gi';


const Tires = ({data, curVehicle}) => {

    if(data.pneus[curVehicle] == null){
        return
    }

    const tires = data.pneus[curVehicle] ? data.pneus : ''; 

    const corEstado = {
            'Bom' : 'rgba(29, 255, 0, 0.67)',
            'Médio' : 'rgba(236, 255, 0, 0.67)',
            'Ruim' : 'rgba(255, 61, 0, 0.67)',
            'notSpecified' : 'rgba(158, 158, 158, 0.541)'
    };

    return(
        <div className={styles.boxContainer}>
            <div className={styles.boxHeader}><GiFlatTire/>Pneus</div>

            <div className={styles.itemContainer}>
                {tires[curVehicle].tipo ? tires[curVehicle].tipo : 'Tipo de pneu não especificado'}
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{borderRight: '1px solid black'}} className={styles.doubleItemContainer}>Referência:</div>
                
                <div className={styles.doubleItemContainer}>
                    Estado:
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div 
                style={{borderRight: '1px solid black', backgroundColor: corEstado[tires[curVehicle] ? tires[curVehicle].dd : 'notSpecified']}}
                className={styles.stateDoubleItemContainer}
                >
                Dianteiro Direito
                </div>

                <div 
                style={{backgroundColor: corEstado[tires[curVehicle].dd ? tires[curVehicle].dd : 'notSpecified']}}
                className={styles.stateDoubleItemContainer}
                >
                {tires[curVehicle].dd ? tires[curVehicle].dd : 'Não especificado'}
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div 
                style={{borderRight: '1px solid black', backgroundColor: corEstado[tires[curVehicle] ? tires[curVehicle].de : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                Dianteiro Esquerdo
                </div>
                
                <div 
                style={{backgroundColor: corEstado[tires[curVehicle] ? tires[curVehicle].de : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                {tires[curVehicle].de ? tires[curVehicle].de : 'Não especificado'}
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div 
                style={{borderRight: '1px solid black', backgroundColor: corEstado[tires[curVehicle] ? tires[curVehicle].td : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                    Traseiro Direito
                </div>

                <div 
                style={{backgroundColor: corEstado[tires[curVehicle].td ? tires[curVehicle].td : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                {tires[curVehicle].td ? tires[curVehicle].td : 'Não especificado'}
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div 
                style={{borderRight: '1px solid black', backgroundColor: corEstado[tires[curVehicle] ? tires[curVehicle].te : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                    Traseiro Esquerdo
                </div>
                <div 
                style={{backgroundColor: corEstado[tires[curVehicle].te ? tires[curVehicle].te : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                {tires[curVehicle].te ? tires[curVehicle].te : 'Não especificado'}
                </div>
            </div> 

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div 
                style={{borderRight: '1px solid black', backgroundColor: corEstado[tires[curVehicle] ? tires[curVehicle].estepe : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                    Estepe
                </div>
                <div 
                style={{backgroundColor: corEstado[tires[curVehicle].estepe ? tires[curVehicle].estepe : 'notSpecified']}} 
                className={styles.stateDoubleItemContainer}
                >
                {tires[curVehicle].estepe ? tires[curVehicle].estepe : 'Não especificado'}
                </div>
            </div> 



        </div>
    );
}
export default Tires;