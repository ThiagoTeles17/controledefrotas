import styles from './MaintenancesHistory.module.css';
import {IoIosArrowDown} from 'react-icons/io';
import {LuHistory} from 'react-icons/lu';
import {HiMiniArrowTopRightOnSquare} from 'react-icons/hi2'
import { setDoc, doc } from 'firebase/firestore';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../../context/ApiContext';
import { reportMaintenanceService } from '../../../screens/Reports/Scripts/ReportMaintenanceService';
import { IoDocumentTextOutline } from "react-icons/io5";


const MaintenancesHistory = ({history, db}) => {

    const {getMaintenanceHistory, curVehicle, vehicles} = useContext(ApiContext);

    const [sortedHistory, setSortedHistory] = useState('');


    const formatDate = (data) => {
        //return date on DD/MM/YYYY format
        const curDate = new Date(data);
        const month = String(curDate.getUTCMonth() + 1);
        const day = String(curDate.getUTCDate());
        const year = curDate.getUTCFullYear();

        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
    };

    const sortHistory = () => {
        //Sort maintenances history by date in ascending order
        if(history){
            if(history[curVehicle]){
            const sortedData = Object.keys(history[curVehicle]).sort((a, b) => {
                return history[curVehicle][a].date < history[curVehicle][b].date ? 1 : -1
            });
            setSortedHistory(sortedData);
            }
        }
    }

    useEffect(() => {
        sortHistory()
    }, [history, curVehicle])


    if(history == undefined){
        return
    };
   

    const handleOnClickLink = async(item) => {
        //If there's a nf linked, open it in new tab, else open prompt to insert a valid link.
        if(history[curVehicle][item].nfLink){
            window.open(history[curVehicle][item].nfLink, '_blank')
        }
        else{

            let NFLink = prompt('Insira um link para a Nota Fiscal');

            if(NFLink){
                let newNFLink = {
                    [curVehicle] : {
                        [item] : {
                            'nfLink' : NFLink
                        }
                    }
                } 
    
                await setDoc(doc(db, 'assistencia', 'historicoMec'), newNFLink, {merge: true});
                getMaintenanceHistory();
            }
            
        }

    };

    return(
        <div className={styles.boxContainer}>

        <div className={styles.boxHeader}><LuHistory/>Histórico de Manutenções</div>

            <div className={styles.historyContainer}>
            {
            (history[curVehicle]) 
            ?    
            sortedHistory && sortedHistory.map((item, index) => {
            
                if(!(!(history[curVehicle][item]))){
                return(
                    <details key={index}>
                        <summary className={styles.itemContainer}>
                            <div>{history[curVehicle] && history[curVehicle][item].desc}</div>
                            <div><IoIosArrowDown size={12} className={styles.arrowDown}/></div>
                        </summary>
                        <div className={styles.accordionDesc}>
                            <div className={styles.accordionRow}>

                                <div>Oficina: {history[curVehicle][item].shop ? history[curVehicle][item].shop : 'Não especificado'}</div>

                                <div>Data: {history[curVehicle][item].date ? formatDate(history[curVehicle][item].date) : 'Não especificado'}</div>

                                <div style={{display: 'flex', gap: '1rem'}}>
                                    <IoDocumentTextOutline className={styles.accordionBtn} title='Detalhes' onClick={
                                        () => reportMaintenanceService(history, item, curVehicle, vehicles)
                                    }/>
                                    <HiMiniArrowTopRightOnSquare title='Vizualizar NF' className={styles.accordionBtn} onClick={() => handleOnClickLink(item)}/>
                                </div>

                            </div>
                            <div className={styles.accordionRow}>
                                <div>NF: {history[curVehicle][item].nfNumber ? history[curVehicle][item].nfNumber : 'Não especificado'}</div>
                            </div>
                            <div className={styles.accordionRow}>
                                <div>Empenho: {history[curVehicle][item].commitment ? history[curVehicle][item].commitment : 'Não especificado'}</div>
                            </div>
                           
                        </div>
                             
                        
                    </details>
                );
                }
            })
            :
            <div className={styles.doNotHavePrevRegisters}>Sem registro de manutenções anteriores.</div>
            }
            </div>
                 
        </div>
    );
}
export default MaintenancesHistory;