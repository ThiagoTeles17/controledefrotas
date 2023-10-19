import styles from './MechanicalPendences.module.css';
import {CiCircleRemove} from 'react-icons/ci';
import {HiCheck} from 'react-icons/hi';
import {BsTools} from 'react-icons/bs';
import {AiFillPlusCircle} from 'react-icons/ai';
import { useState } from 'react';
import Modal from 'react-modal';

const MechanicalPendences = ({data, curVehicle}) => {

    const pendencesList = data.pendenciasMec ? data.pendenciasMec[curVehicle] : '';

    const [modalVisible, setModalVisible] = useState(false);

    const [pendenceValue, setPendenceValue] = useState(false);

    const handleOnClickAdd = () => {
        setModalVisible(true);
    }
    
    const handleAddPendence = () =>{

        let newArray = [...data.pendenciasMec[curVehicle], pendenceValue];

        fetch('http://localhost:5000/assistencia', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application.json'
            },
            body : JSON.stringify(newArray)
        })
        .then (response => response.json)
        .catch(err => console.log(err))

    }

    
    if(data.pendenciasMec[curVehicle] == "[]"){
        return
    }
    else{
        return(
            <div className={styles.boxContainer}>
            <div className={styles.boxHeader}>
                <BsTools/>
                Manutenções Pendentes
                <AiFillPlusCircle onClick={handleOnClickAdd} className={styles.addButton}/>
            </div>
                {
                pendencesList ?    
                pendencesList.map((item, index) => {
                    return(
                        <div key={index} className={styles.itemContainer}>
                            <div className={styles.boxItem}>{item}</div>
                            <div style={{display: 'flex', gap: '1rem'}}>
                                <HiCheck className={styles.checkBtn}/>
                                <CiCircleRemove className={styles.rmvBtn}/>
                            </div>
                        </div>
                    );
                })
                :
                <div className={styles.doNotHaveMaintanences}>Não há manutenções pendentes.</div>
                }        
            <Modal
            isOpen={modalVisible}
            className={styles.modal}
            >   
                    <span className={styles.modalTitle}>Nova Pendência</span>
                              
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Descrição:</span>
                        <input onChange={(val) => setPendenceValue(val.target.value)} className={styles.modalInput} type='text'></input>
                    </div>
                    <div style={{display: 'flex', gap: '.8rem'}}>
                        <button className={styles.modalBtn} onClick={handleAddPendence}>Adicionar</button>
                        <button onClick={() => setModalVisible(false)} className={styles.modalBtn}>Cancelar</button>
                    </div>            
                
            </Modal>    
    
            </div>
    
        );
    }
    
    
}
export default MechanicalPendences;