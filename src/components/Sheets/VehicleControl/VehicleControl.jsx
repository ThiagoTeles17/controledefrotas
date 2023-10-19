import LargeBtn from '../../Buttons/LargeBtn/LargeBtn';
import styles from './VehicleControl.module.css';
import {FaRegFilePdf} from 'react-icons/fa6';

const VehicleControl = ({years, months, dir}) => {
    return(
        <div className={styles.boxContainer}>
            <div className={styles.boxHeader}><FaRegFilePdf/>Controle de Veículo</div>

            <div className={styles.itemContainer}>
                <select className={styles.selectBox}> 
                            {
                            years.map((year, index) => {
                            return(
                            <option value={year} key={index}>{year}</option>
                            )
                            })
                            }
                            </select>   

                            <select className={styles.selectBox}> 
                            {
                            months.map((month, index) => {
                            return(
                            <option value={month} key={index}>{month}</option>
                            )
                            })
                            }
                 </select>
            </div>
            <a target='_blank' href='file:///C:\Users\thiag\Downloads\'>
                <button className={styles.btnContainer}>
                    Consultar
                </button>
            </a>
            <a target='_blank' href=''>
                <button className={styles.btnContainer}>
                    Abrir Diretório
                </button>
            </a>                

        </div>
           
    );
}
export default VehicleControl;