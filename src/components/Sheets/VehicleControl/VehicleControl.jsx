import LargeBtn from '../../Buttons/LargeBtn/LargeBtn';
import styles from './VehicleControl.module.css';
import {FaRegFilePdf} from 'react-icons/fa6';
import {BsPrinter} from 'react-icons/bs';

const VehicleControl = ({years, montehs, dir}) => {
    return(
        <div className={styles.boxContainer}>
            <div className={styles.boxHeader}><FaRegFilePdf/>Controle de Veículo</div>
            <div className={styles.itemContainer}>
                <a target='_blank' href='' style={{textDecoration: 'none'}}>
                <button className={styles.btnContainer}>
                    <BsPrinter/>
                    Imprimir Controle de Veículo
                </button>
                </a> 
            </div>
                           

        </div>
           
    );
}
export default VehicleControl;