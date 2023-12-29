import styles from './ListBox.module.css';

import { getDoc, doc } from 'firebase/firestore';

import { ApiContext } from '../../context/ApiContext';
import { useContext, useEffect, useState } from 'react';


const ListBox = () => {


    const {curVehicle, setCurVehicle, db, vehicles} = useContext(ApiContext);
    
 


    const handleOnChange = (val) => {
        setCurVehicle(val.target.value);
    }


    return(

        <select value={curVehicle} onChange={value => handleOnChange(value)} className={styles.selectBox}>
            
            {vehicles &&
                Object.keys(vehicles).map((veiculo, index) => {
                    
                    let vehDisplay = vehicles[veiculo].modelo + ' - ' + (vehicles[veiculo].placa).toUpperCase(); 
                    return(
                        <option value={veiculo} key={index}>     
                            {vehDisplay}
                        </option>
                    );
                })
            }   
            
        </select>    
        );

}
export default ListBox;