import styles from './ListBox.module.css';

import { getDoc, doc } from 'firebase/firestore';

import { ApiContext } from '../../context/ApiContext';
import { useContext, useEffect, useState } from 'react';


const ListBox = () => {


    const {curVehicle, setCurVehicle, db} = useContext(ApiContext);

    const [vehicles, setVehicles] = useState([]);



    useEffect(() => {
        const getVehicles = async() => {
            setVehicles((await getDoc(doc(db, 'assistencia', 'veiculos'))).data());

        }
        getVehicles();
    }, []);
    
    const handleOnChange = (val) => {
        setCurVehicle(val.target.value);
    }


    return(

        <select value={curVehicle} onChange={value => handleOnChange(value)} className={styles.selectBox}>
            
            {vehicles &&
                Object.keys(vehicles).map((veiculo, index) => {
                    
                    console.log('id do veiculo: ' + veiculo);

                    let vehDisplay = vehicles[veiculo].modelo + ' - ' + vehicles[veiculo].placa; 
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