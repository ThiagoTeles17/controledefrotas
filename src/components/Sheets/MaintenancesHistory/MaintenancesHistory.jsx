import styles from './MaintenancesHistory.module.css';
import {IoIosArrowDown} from 'react-icons/io';
import {LuHistory} from 'react-icons/lu';
import {HiMiniArrowTopRightOnSquare} from 'react-icons/hi2'

const MaintenancesHistory = ({curVehicle, data}) => {

    const history = data.historicoMec ? data.historicoMec[curVehicle] : null;

    return(
        <div className={styles.boxContainer}>

        <div className={styles.boxHeader}><LuHistory/>Histórico de Manutenções</div>

            <div className={styles.historyContainer}>
            {
            history ?    
            Object.keys(history).map((item, index) => {
                return(
                    <details key={index}>
                        <summary className={styles.itemContainer}>
                            <div>{item}</div>
                            <div><IoIosArrowDown size={12} className={styles.arrowDown}/></div>
                        </summary>
                        <div className={styles.accordionDesc}>

                            <div>Oficina: {history[item].shop ? history[item].shop : 'Não especificado'}</div>

                            <div>Data: {history[item].date ? history[item].date : 'Não especificada'}</div>

                            <div className={styles.openNfeBtn}><HiMiniArrowTopRightOnSquare/></div>
                            
                        </div>            
                    </details>
                );
            })
            :
            <div className={styles.doNotHavePrevRegisters}>Sem registro de manutenções anteriores.</div>
            }
            </div>         
        </div>
    );
}
export default MaintenancesHistory;