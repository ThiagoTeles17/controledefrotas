import styles from './ListBox.module.css';

import { ApiContext } from '../../context/ApiContext';
import { useContext, useState } from 'react';

const ListBox = ({data, items}) => {

    const vehicles = data.veiculos;

    const {curVehicle, setCurVehicle} = useContext(ApiContext);
    
    const handleOnChange = (val) => {
        setCurVehicle(val.target.value);
    }
    
    return(
        <select value={curVehicle} onChange={value => handleOnChange(value)} className={styles.selectBox}>
            {vehicles &&
                Object.keys(vehicles).map((veiculo, index) => {
                    return(
                        <option value={veiculo} key={index}>
                            {veiculo} - {vehicles[veiculo].placa}
                        </option>
                    );
                })
            }
        </select>
    );

}
export default ListBox;