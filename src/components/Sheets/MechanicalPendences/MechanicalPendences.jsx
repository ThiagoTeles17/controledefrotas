import styles from './MechanicalPendences.module.css';
import {CiCircleRemove} from 'react-icons/ci';
import {HiCheck} from 'react-icons/hi';
import {BsTools} from 'react-icons/bs';
import {AiFillPlusCircle} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const MechanicalPendences = ({data, curVehicle, fetchData}) => {

    const pendencesList = data.pendenciasMec ? data.pendenciasMec[curVehicle] : '';

    const [modalVisible, setModalVisible] = useState(false);

    const [pendenceValue, setPendenceValue] = useState(false);

    const handleOnClickAdd = () => {
        setModalVisible(true);
    }
    
    const handleAddPendence = () =>{
        let pendencias = data.pendenciasMec;

        //concat pendenceValue without change the previous pendences.
        let newArray = {'pendenciasMec':{
            ...pendencias, 
            [curVehicle] : [
                ...pendencias[curVehicle],
                pendenceValue
            ]
        }
        };
        //concat previous data from json with the new pendences.
        let toPostArray = {
            ...data,
            ...newArray
        };
        console.log(toPostArray)
        //fetch new data from toPostArray to json
        fetch('http://localhost:5000/assistencia', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(toPostArray)
        })
        .then (response => response.json)
        .catch(err => console.log(err))

        setModalVisible(!modalVisible);

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
                    <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}> 
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <span style={{fontSize: '12px', marginBottom: '.3rem'}}>Descrição:</span>
                        <input autoFocus onChange={(val) => setPendenceValue(val.target.value)} className={styles.modalInput} type='text'></input>
                    </div>
                    <div style={{display: 'flex', gap: '.8rem'}}>

                        <button 
                        onSubmit={(e) => {e.preventDefault(); handleAddPendence()}} 
                        type='submit' 
                        className={styles.modalBtn} 
                        onClick={handleAddPendence}>
                            Adicionar
                        </button>

                        <button onClick={() => setModalVisible(false)} className={styles.modalBtn}>Cancelar</button>
                    </div> 
                    </form>            
                
            </Modal>    
    
            </div>
    
        );
    }
    
    
}
export default MechanicalPendences;